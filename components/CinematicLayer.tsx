"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/* ─────────────────────────────────────────────────────────────────────────
   CinematicLayer — floating bokeh / particle overlay using Three.js
   Warm-orange + soft-white bokeh with additive blending, sine-wave drift,
   and smooth mouse-parallax camera movement.
───────────────────────────────────────────────────────────────────────── */
export default function CinematicLayer() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    /* ── Renderer ── */
    const renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: false,
      powerPreference: "high-performance",
    });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.5));
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0x000000, 0);

    /* ── Scene & Camera ── */
    const scene  = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      55,
      window.innerWidth / window.innerHeight,
      0.1,
      1000,
    );
    camera.position.z = 6;

    /* ── Build a soft-circle (bokeh) texture once ── */
    const mkTex = (size: number, innerStop: number) => {
      const tc  = document.createElement("canvas");
      tc.width  = size;
      tc.height = size;
      const cx = tc.getContext("2d")!;
      const r  = size / 2;
      const g  = cx.createRadialGradient(r, r, 0, r, r, r);
      g.addColorStop(0,          "rgba(255,255,255,1)");
      g.addColorStop(innerStop,  "rgba(255,255,255,0.55)");
      g.addColorStop(0.75,       "rgba(255,255,255,0.1)");
      g.addColorStop(1,          "rgba(255,255,255,0)");
      cx.fillStyle = g;
      cx.fillRect(0, 0, size, size);
      return new THREE.CanvasTexture(tc);
    };

    /* Two layers: large dreamy bokeh + small crisp sparkles */
    const texLarge  = mkTex(128, 0.25);
    const texSmall  = mkTex(64,  0.15);

    /* ── Palette ── */
    const palette = [
      new THREE.Color("#e8702a"),   // warm orange
      new THREE.Color("#ff9a56"),   // orange-light
      new THREE.Color("#ffe8d0"),   // warm white
      new THREE.Color("#ffd6b0"),   // peach
      new THREE.Color("#5098dc"),   // monitor-blue accent (rare)
      new THREE.Color("#f5f0ea"),   // near-white
    ];
    const weights = [0.28, 0.22, 0.25, 0.12, 0.05, 0.08]; // probability

    const pickColor = () => {
      let r = Math.random(), cumul = 0;
      for (let i = 0; i < weights.length; i++) {
        cumul += weights[i];
        if (r < cumul) return palette[i];
      }
      return palette[0];
    };

    /* ── Particle system factory ── */
    const buildSystem = (
      count:    number,
      spread:   [number, number, number],
      sizeBase: number,
      sizeVar:  number,
      opacity:  number,
      tex:      THREE.Texture,
    ) => {
      const pos  = new Float32Array(count * 3);
      const col  = new Float32Array(count * 3);
      const orig = new Float32Array(count * 3); // original positions for oscillation

      for (let i = 0; i < count; i++) {
        const x = (Math.random() - 0.5) * spread[0];
        const y = (Math.random() - 0.5) * spread[1];
        const z = (Math.random() - 0.5) * spread[2];
        pos[i*3] = orig[i*3] = x;
        pos[i*3+1] = orig[i*3+1] = y;
        pos[i*3+2] = orig[i*3+2] = z;
        const c = pickColor();
        col[i*3] = c.r; col[i*3+1] = c.g; col[i*3+2] = c.b;
      }

      const geo = new THREE.BufferGeometry();
      geo.setAttribute("position", new THREE.BufferAttribute(pos,  3));
      geo.setAttribute("color",    new THREE.BufferAttribute(col,  3));

      const mat = new THREE.PointsMaterial({
        size:         sizeBase + Math.random() * sizeVar,
        map:          tex,
        vertexColors: true,
        transparent:  true,
        opacity,
        blending:     THREE.AdditiveBlending,
        depthWrite:   false,
        sizeAttenuation: true,
      });

      const pts = new THREE.Points(geo, mat);
      scene.add(pts);
      return { geo, mat, orig, count };
    };

    /* Large bokeh (few, big, dreamy) */
    const large = buildSystem(
      window.innerWidth < 768 ? 60 : 110,
      [22, 16, 8],
      0.55, 0.4,
      0.38,
      texLarge,
    );

    /* Small sparkles (many, tight, bright) */
    const small = buildSystem(
      window.innerWidth < 768 ? 100 : 200,
      [20, 14, 6],
      0.12, 0.1,
      0.5,
      texSmall,
    );

    /* ── Mouse parallax ── */
    const mouse  = { x: 0, y: 0 };
    const target = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      mouse.x =  (e.clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.clientY / window.innerHeight - 0.5) * 2;
    };
    const onTouch = (e: TouchEvent) => {
      if (!e.touches[0]) return;
      mouse.x =  (e.touches[0].clientX / window.innerWidth  - 0.5) * 2;
      mouse.y = -(e.touches[0].clientY / window.innerHeight - 0.5) * 2;
    };
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("touchmove",  onTouch, { passive: true });

    /* ── Resize ── */
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", onResize);

    /* ── Animation loop ── */
    const clock = new THREE.Clock();
    let raf: number;

    const animateSystem = (
      sys: ReturnType<typeof buildSystem>,
      t: number,
      speedX: number,
      speedY: number,
      ampX: number,
      ampY: number,
      ampZ: number,
      phaseShift: number,
    ) => {
      const attr = sys.geo.attributes.position as THREE.BufferAttribute;
      for (let i = 0; i < sys.count; i++) {
        const ox = sys.orig[i*3];
        const oy = sys.orig[i*3+1];
        const oz = sys.orig[i*3+2];
        const phase = i * phaseShift;
        attr.setXYZ(
          i,
          ox + Math.sin(t * speedX + phase)          * ampX,
          oy + Math.cos(t * speedY + phase * 0.7)    * ampY,
          oz + Math.sin(t * 0.07   + phase * 0.4)    * ampZ,
        );
      }
      attr.needsUpdate = true;
    };

    const animate = () => {
      raf = requestAnimationFrame(animate);
      const t = clock.getElapsedTime();

      animateSystem(large, t, 0.10, 0.08, 0.18, 0.14, 0.08, 0.62);
      animateSystem(small, t, 0.16, 0.11, 0.10, 0.07, 0.04, 0.48);

      /* Smooth parallax — large layer drifts more */
      target.x += (mouse.x * 0.5 - target.x) * 0.035;
      target.y += (mouse.y * 0.3 - target.y) * 0.035;
      camera.position.x = target.x;
      camera.position.y = target.y;
      camera.lookAt(scene.position);

      renderer.render(scene, camera);
    };
    animate();

    /* ── Cleanup ── */
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("touchmove",  onTouch);
      window.removeEventListener("resize",     onResize);
      [large, small].forEach(s => { s.geo.dispose(); s.mat.dispose(); });
      texLarge.dispose();
      texSmall.dispose();
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position:      "absolute",
        inset:         0,
        width:         "100%",
        height:        "100%",
        pointerEvents: "none",
        zIndex:        2,
      }}
    />
  );
}
