/* ══════════════════════════════════════════════
   ProjectsSection — 3D sticky-stack with GSAP
══════════════════════════════════════════════ */

.section {
  background: var(--black);
  padding: 8rem 6vw 20rem;
  position: relative;
}

.section::before {
  content: '';
  position: absolute;
  top: 0; left: 0; right: 0;
  height: 1px;
  background: linear-gradient(90deg, transparent, var(--orange-dim), transparent);
}

.inner    { max-width: 900px; margin: 0 auto; }
.header   { margin-bottom: 4rem; }

.eyebrow {
  display: inline-block;
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.7rem;
  letter-spacing: 0.25em;
  text-transform: uppercase;
  color: var(--orange);
  margin-bottom: 0.8rem;
}

.heading {
  font-family: 'Bebas Neue', sans-serif;
  font-size: clamp(3rem, 6vw, 5rem);
  line-height: 1;
  color: var(--white);
}

/* ── Stack container ── */
.stack {
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0;          /* gap is handled by sticky top offsets */
  /* tall enough to let cards travel through */
  padding-bottom: 4rem;
}

/* ── Individual card ── */
.card {
  position: sticky;
  /* top is set inline per card: 18px, 36px, 54px */
  background: rgba(13,13,13,0.92);
  border: 1px solid rgba(255,255,255,0.09);
  border-radius: 10px;
  padding: 2.5rem;
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  margin-bottom: 1.5rem;
  transform-origin: center top;   /* scale shrinks from top-center */
  will-change: transform, opacity, filter;
  overflow: hidden;
  transition: border-color 0.3s;
}

.card:hover {
  border-color: rgba(232,112,42,0.25);
}

/* Left accent bar */
.card::before {
  content: '';
  position: absolute;
  left: 0; top: 0; bottom: 0;
  width: 3px;
  background: linear-gradient(180deg, var(--orange) 0%, transparent 100%);
  border-radius: 10px 0 0 10px;
  opacity: 0.6;
}

/* Large watermark number */
.cardWatermark {
  position: absolute;
  right: 2rem;
  bottom: 1.2rem;
  font-family: 'Bebas Neue', sans-serif;
  font-size: 5rem;
  color: rgba(255,255,255,0.03);
  line-height: 1;
  pointer-events: none;
  user-select: none;
}

/* ── Card internals ── */
.cardMeta {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1.4rem;
}

.cardId {
  font-family: 'Bebas Neue', sans-serif;
  font-size: 0.9rem;
  letter-spacing: 0.15em;
  color: var(--orange);
}

.cardRight {
  display: flex;
  gap: 1rem;
  align-items: center;
}

.cardType {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.1em;
  text-transform: uppercase;
  color: var(--white-dim);
  background: var(--glass);
  border: 1px solid var(--glass-border);
  padding: 0.2rem 0.6rem;
  border-radius: 100px;
}

.cardYear {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  color: var(--white-dim);
}

.cardTitle {
  font-size: clamp(1.4rem, 2.5vw, 1.9rem);
  font-weight: 600;
  color: var(--white);
  margin-bottom: 0.9rem;
  line-height: 1.2;
}

.cardDesc {
  font-size: 0.92rem;
  line-height: 1.8;
  color: var(--white-dim);
  margin-bottom: 1.5rem;
  max-width: 680px;
}

.techWrap {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
}

.tag {
  font-family: 'JetBrains Mono', monospace;
  font-size: 0.65rem;
  letter-spacing: 0.05em;
  color: var(--orange-light);
  background: rgba(232,112,42,0.08);
  border: 1px solid rgba(232,112,42,0.18);
  padding: 0.25rem 0.65rem;
  border-radius: 3px;
}

/* ── Responsive ── */
@media (max-width: 768px) {
  .section { padding: 5rem 5vw 10rem; }
  /* Disable sticky stacking on mobile — just normal flow */
  .card {
    position: relative !important;
    top: 0 !important;
    margin-bottom: 1.2rem;
  }
  .stack { gap: 0; }
}

@media (max-width: 480px) {
  .section { padding: 4rem 4vw 8rem; }
  .card    { padding: 1.5rem; }
  .cardMeta { flex-direction: column; align-items: flex-start; gap: 0.4rem; }
  .cardWatermark { font-size: 3.5rem; }
}
