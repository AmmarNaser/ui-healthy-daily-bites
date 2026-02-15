import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

export async function POST(request: NextRequest) {
  try {
    const { name, email, price } = await request.json();

    if (!name || !email || !price) {
      return NextResponse.json(
        { error: "All fields are required." },
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
    const formattedPrice = parseFloat(price).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });

    const { error } = await resend.emails.send({
      from: "Healthy Daily Bites <offers@medziel.de>",
      to: "info@medziel.de",
      replyTo: email,
      subject: `Domain Offer from ${name} - $${formattedPrice}`,
      text: `New Domain Offer\n\nName: ${name}\nEmail: ${email}\nPrice: $${formattedPrice}\n\nThis offer was submitted from the Healthy Daily Bites website.\nReply to this email to contact the offerer.`,
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
                      <td style="background:#059669;padding:24px 30px;">
                        <h1 style="margin:0;color:#ffffff;font-size:22px;">New Domain Offer Received</h1>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:30px;">
                        <table width="100%" cellpadding="0" cellspacing="0">
                          <tr>
                            <td style="padding:8px 0;border-bottom:1px solid #eee;">
                              <strong style="color:#059669;">Name:</strong>
                            </td>
                            <td style="padding:8px 0;border-bottom:1px solid #eee;">${name}</td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;border-bottom:1px solid #eee;">
                              <strong style="color:#059669;">Email:</strong>
                            </td>
                            <td style="padding:8px 0;border-bottom:1px solid #eee;">
                              <a href="mailto:${email}" style="color:#059669;">${email}</a>
                            </td>
                          </tr>
                          <tr>
                            <td style="padding:8px 0;">
                              <strong style="color:#059669;">Offer Price:</strong>
                            </td>
                            <td style="padding:8px 0;font-size:20px;font-weight:bold;color:#059669;">
                              $${formattedPrice}
                            </td>
                          </tr>
                        </table>
                      </td>
                    </tr>
                    <tr>
                      <td style="padding:20px 30px;background:#f9fafb;border-top:1px solid #eee;font-size:13px;color:#6b7280;">
                        <p style="margin:0;">This offer was submitted from the Healthy Daily Bites website.</p>
                        <p style="margin:8px 0 0;">Reply directly to this email to contact the offerer.</p>
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
