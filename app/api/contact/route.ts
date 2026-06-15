import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

const MY_EMAIL     = "bhuvanesh2228895@gmail.com";
const APP_PASSWORD = process.env.GMAIL_APP_PASSWORD!;

export async function POST(req: NextRequest) {
  try {
    const { name, phone, email, message } = await req.json();

    if (!name || !phone || !email || !message) {
      return NextResponse.json({ error: "All fields are required." }, { status: 400 });
    }

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: MY_EMAIL,
        pass: APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"Bhuvanesh Gopal" <${MY_EMAIL}>`,
      to: email,
      cc: MY_EMAIL,
      subject: "Thank you for contacting Bhuvanesh Gopal",
      html: `
        <div style="font-family:Inter,Arial,sans-serif;max-width:600px;margin:0 auto;background:#080808;color:#f5f0ea;border-radius:8px;overflow:hidden;">
          <div style="background:#e8702a;padding:32px 40px;">
            <h1 style="margin:0;font-size:28px;color:#fff;letter-spacing:-0.5px;">Thank you, ${name}!</h1>
          </div>
          <div style="padding:40px;">
            <p style="font-size:16px;line-height:1.7;color:rgba(245,240,234,0.8);margin-bottom:24px;">
              Thank you for reaching out! I have received your message and will get back to you as soon as possible, usually within 24–48 hours.
            </p>
            <div style="background:rgba(255,255,255,0.05);border:1px solid rgba(255,255,255,0.1);border-radius:6px;padding:24px;margin-bottom:24px;">
              <h3 style="margin:0 0 16px;font-size:13px;letter-spacing:0.15em;text-transform:uppercase;color:#e8702a;">Your Message Details</h3>
              <table style="width:100%;border-collapse:collapse;">
                <tr><td style="padding:8px 0;color:rgba(245,240,234,0.5);font-size:13px;width:120px;">Name</td><td style="padding:8px 0;color:#f5f0ea;font-size:14px;">${name}</td></tr>
                <tr><td style="padding:8px 0;color:rgba(245,240,234,0.5);font-size:13px;">Phone</td><td style="padding:8px 0;color:#f5f0ea;font-size:14px;">${phone}</td></tr>
                <tr><td style="padding:8px 0;color:rgba(245,240,234,0.5);font-size:13px;">Email</td><td style="padding:8px 0;color:#f5f0ea;font-size:14px;">${email}</td></tr>
                <tr><td style="padding:8px 0;color:rgba(245,240,234,0.5);font-size:13px;vertical-align:top;">Message</td><td style="padding:8px 0;color:#f5f0ea;font-size:14px;line-height:1.6;">${message.replace(/\n/g, "<br/>")}</td></tr>
              </table>
            </div>
            <p style="font-size:14px;color:rgba(245,240,234,0.5);line-height:1.7;">
              Best regards,<br/>
              <strong style="color:#f5f0ea;">Bhuvanesh Gopal</strong><br/>
              IT Engineer &amp; DevOps Practitioner<br/>
              Vellore, Tamil Nadu, India
            </p>
          </div>
          <div style="padding:20px 40px;border-top:1px solid rgba(255,255,255,0.06);text-align:center;">
            <p style="margin:0;font-size:12px;color:rgba(245,240,234,0.25);">© ${new Date().getFullYear()} Bhuvanesh Gopal · All rights reserved</p>
          </div>
        </div>
      `,
    });

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error("Mail error:", err);
    return NextResponse.json({ error: "Failed to send email." }, { status: 500 });
  }
}
