import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json();

    if (!email) {
      return NextResponse.json(
        { error: "Email is required." },
        { status: 400 },
      );
    }

    const resendApiKey = process.env.RESEND_API_KEY;
    if (!resendApiKey) {
      return NextResponse.json(
        { error: "Email service not configured." },
        { status: 503 },
      );
    }

    const resend = new Resend(resendApiKey);

    const { error } = await resend.emails.send({
      from: "Healthy Daily Bites <offers@medziel.de>",
      to: "info@medziel.de",
      replyTo: email,
      subject: `Domain interest from ${email} - $500 asking price`,
      text: `New Domain Sale Interest\n\nEmail: ${email}\n\nThis person is interested in the $500 domain offer on the Healthy Daily Bites website.\nReply to this email to contact them.`,
      html: `
        <!DOCTYPE html>
        <html>
          <head><meta charset="utf-8"></head>
          <body style="margin:0;padding:0;font-family:Arial,sans-serif;background:#f4f4f4;">
            <table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f4;padding:20px 0;">
              <tr>
                <td align="center">
                  <table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;">
                    <tr>
                      <td style="background:#0f9d6a;padding:24px 30px;">
                        <h1 style="margin:0;color:#ffffff;font-size:22px;">New Domain Sale Interest</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:8px 0;border-bottom:1px solid #eee;">
                              <strong style="color:#0f9d6a;">Email:</strong>
                            </td>
                            <td style="padding:8px 0;border-bottom:1px solid #eee;">
                              <a href="mailto:${email}" style="color:#0f9d6a;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;">
                              <strong style="color:#0f9d6a;">Asking Price:</strong>
                            </td>
                            <td style="padding:8px 0;font-size:20px;font-weight:bold;color:#0f9d6a;">
                              $500
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 30px;background:#f9fafb;border-top:1px solid #eee;font-size:13px;color:#6b7280;">
                        <p style="margin:0;">This interest was submitted from the Healthy Daily Bites website.</p>
                        <p style="margin:8px 0 0;">Reply directly to this email to get in touch.</p>
                      </td>
                    </tr>
                  </table>
                </td>
              </tr>
            </table>
          </body>
        </html>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return NextResponse.json(
        { error: `Email failed: ${error.message}` },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (err) {
    console.error("Send offer error:", err);
    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
