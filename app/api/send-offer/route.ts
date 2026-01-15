import { NextRequest, NextResponse } from "next/server";

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

    // Using EmailJS-like approach or direct email service
    // You can use any email service here. Examples:
    
    // Option 1: Using Resend (recommended - add to package.json: "resend": "^latest")
    /*
    import { Resend } from 'resend';
    const resend = new Resend(process.env.RESEND_API_KEY);
    await resend.emails.send({
      from: 'Domain Offer <noreply@yourdomain.com>',
      to: 'info@medziel.de',
      subject: 'Domain Offer - Healthy Daily Bites',
      html: `
        <h2>New Domain Offer Received</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Offer Price:</strong> $${price}</p>
        <hr>
        <p>This offer was submitted from the Healthy Daily Bites website.</p>
      `,
    });
    */

    // Option 2: Using Nodemailer with SMTP
    // Option 3: Using SendGrid
    // Option 4: Using AWS SES

    // For now, we'll log and return success
    // You should integrate with an actual email service above
    console.log("Domain Offer Received:", { name, email, price });
    
    // In production, replace this with actual email sending code above
    // For testing, this will show success but won't actually send emails
    // until you configure an email service

    return NextResponse.json(
      { 
        success: true,
        message: "Offer sent successfully" 
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending offer:", error);
    return NextResponse.json(
      { error: "Failed to send offer. Please try again." },
      { status: 500 }
    );
  }
}
