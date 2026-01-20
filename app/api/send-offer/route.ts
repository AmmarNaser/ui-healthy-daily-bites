import { NextRequest, NextResponse } from "next/server";
import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, price } = body;

    // Validate required fields
    if (!name || !email || !price) {
      return NextResponse.json(
        { error: "All fields are required" },
        { status: 400 }
      );
    }

    // Check if Resend API key is configured
    if (!process.env.RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      // Log the offer for debugging/record-keeping
      console.log("Domain Offer Received (email not sent - API key missing):", { name, email, price });
      // Surface a clear error to the client instead of pretending success
      return NextResponse.json(
        { error: "Email service not configured. Please try again later." },
        { status: 500 }
      );
    }

    // Send email using Resend
    try {
      // Use verified sender (from env or default) with user's email as replyTo
      // This ensures emails are always deliverable regardless of user's email domain
      const fromEmail = process.env.RESEND_FROM_EMAIL || "Domain Offer <onboarding@resend.dev>";
      
      const { data, error } = await resend.emails.send({
        from: fromEmail,
        to: "info@medziel.de",
        replyTo: email,
        subject: `Domain Offer from ${name} - Healthy Daily Bites`,
        html: `
          <!DOCTYPE html>
          <html>
            <head>
              <meta charset="utf-8">
              <style>
                body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                .header { background: linear-gradient(135deg, #10b981 0%, #059669 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; }
                .content { background: #f9fafb; padding: 20px; border: 1px solid #e5e7eb; border-top: none; }
                .field { margin-bottom: 15px; }
                .label { font-weight: bold; color: #059669; }
                .value { margin-top: 5px; font-size: 16px; }
                .footer { margin-top: 20px; padding-top: 20px; border-top: 1px solid #e5e7eb; font-size: 12px; color: #6b7280; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h2 style="margin: 0;">New Domain Offer Received</h2>
                </div>
                <div class="content">
                  <div class="field">
                    <div class="label">Name:</div>
                    <div class="value">${name}</div>
                  </div>
                  <div class="field">
                    <div class="label">Email:</div>
                    <div class="value"><a href="mailto:${email}">${email}</a></div>
                  </div>
                  <div class="field">
                    <div class="label">Offer Price:</div>
                    <div class="value" style="font-size: 20px; color: #059669; font-weight: bold;">$${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</div>
                  </div>
                  <div class="footer">
                    <p>This offer was submitted from the Healthy Daily Bites website.</p>
                    <p>You can reply directly to this email to contact the offerer.</p>
                  </div>
                </div>
              </div>
            </body>
          </html>
        `,
        text: `
New Domain Offer Received

Name: ${name}
Email: ${email}
Offer Price: $${parseFloat(price).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}

This offer was submitted from the Healthy Daily Bites website.
You can reply to ${email} to contact the offerer.
        `.trim(),
      });

      if (error) {
        console.error("Resend API error:", error);
        throw new Error(`Email service error: ${error.message}`);
      }

      console.log("✅ Email sent successfully to info@medziel.de:", data);
    } catch (emailError: any) {
      console.error("Error sending email:", emailError);
      // Log the offer even if email fails
      console.log("Domain Offer Received (email failed):", { name, email, price });
      throw emailError;
    }

    return NextResponse.json(
      { 
        success: true,
        message: "Offer sent successfully" 
      },
      { status: 200 }
    );
  } catch (error: any) {
    console.error("Error processing offer:", error);
    return NextResponse.json(
      { error: error.message || "Failed to send offer. Please try again." },
      { status: 500 }
    );
  }
}
