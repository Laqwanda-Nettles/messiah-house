import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const clientEmail = process.env.CLIENT_EMAIL;
const volunteerUrl = process.env.VOLUNTEER_DASHBOARD_URL;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { name, email, phone, availability, skills, message } = req.body;

    // Validate required fields
    if (!name || !email || !phone) {
      return res
        .status(400)
        .json({ message: "Name, Email, and Phone are required" });
    }

    const emailHTML = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
            <div style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">🙋🏽 New Volunteer Signup</h2>
            </div>
            <div style="padding: 20px;">
              <p style="font-size: 16px; color: #333;">Hello,</p>
              <p style="font-size: 16px; color: #333;">You have a new volunteer signup! Here are the details:</p>
    
              <table style="width: 100%; border-collapse: collapse; margin-top: 10px;">
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Name:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${name}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Email:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${email}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Phone:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${phone}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Availability:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${availability}</td>
                </tr>
                <tr>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Skills:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${skills}</td>
                </tr>
                <tr>
                  <td style="padding: 8px;"><strong>Message:</strong></td>
                  <td style="padding: 8px;">${message}</td>
                </tr>
              </table>
    
              <div style="text-align: center; margin-top: 20px;">
                <a href="${volunteerUrl}" style="background-color: #007bff; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">View in Dashboard</a>
              </div>
            </div>
            <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 14px; color: #666;">
              <p style="margin: 0;">This is an automated notification. Do not reply to this email.</p>
            </div>
          </div>
        `;

    const emailResponse = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: clientEmail,
      subject: "New Volunteer Signup Notification",
      html: emailHTML,
    });

    return res
      .status(200)
      .json({ success: true, message: "Email sent", emailResponse });
  } catch (error) {
    console.error("Error sending email: ", error);
    return res.status(500).json({ error: "Failed to send email" });
  }
}
