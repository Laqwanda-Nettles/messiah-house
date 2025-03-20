import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const clientEmail = process.env.CLIENT_EMAIL;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method Not Allowed" });
  }

  const { name, email, program } = req.body;

  if (!name || !email || !program) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  const emailHTML = `
          <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
            <div style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
              <h2 style="margin: 0;">📝 New Program Signup</h2>
            </div>
            <div style="padding: 20px;">
              <p style="font-size: 16px; color: #333;">Hello,</p>
              <p style="font-size: 16px; color: #333;">A new user has registered for a program. See details:</p>
    
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
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Program:</strong></td>
                  <td style="padding: 8px; border-bottom: 1px solid #ddd;">${program}</td>
                </tr>
              </table>
    
              <div style="text-align: center; margin-top: 20px;">
                <a href="mailto:${email}" style="background-color: #007bff; color: #fff; padding: 12px 20px; border-radius: 5px; text-decoration: none; font-size: 16px;">Reply to User</a>
              </div>
            </div>
            <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 14px; color: #666;">
              <p style="margin: 0;">This is an automated notification. Do not reply to this email.</p>
            </div>
          </div>
        `;

  try {
    const emailResponse = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: clientEmail,
      subject: "New Program Signup Notification",
      html: emailHTML,
    });

    return res
      .status(200)
      .json({ message: "Signup notification sent", emailResponse });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ error: "Failed to send notification" });
  }
}
