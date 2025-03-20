import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);
const clientEmail = process.env.CLIENT_EMAIL;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const emailHTML = `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #ddd; border-radius: 10px; overflow: hidden; box-shadow: 2px 2px 10px rgba(0,0,0,0.1);">
        <div style="background-color: #007bff; color: #fff; padding: 20px; text-align: center;">
          <h2 style="margin: 0;">📩 New Contact Message</h2>
        </div>
        <div style="padding: 20px;">
          <p style="font-size: 16px; color: #333;">Hello,</p>
          <p style="font-size: 16px; color: #333;">You have received a new message from the contact form. Here are the details:</p>

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
              <td style="padding: 8px;"><strong>Message:</strong></td>
              <td style="padding: 8px;">${message}</td>
            </tr>
          </table>

          <div style="text-align: center; margin-top: 20px;">
            <p style="color: #666; font-size: 14px;">Please respond to the sender at <a href="mailto:${email}" style="color: #007bff;">${email}</a>.</p>
          </div>
        </div>
        <div style="background-color: #f4f4f4; padding: 10px; text-align: center; font-size: 14px; color: #666;">
          <p style="margin: 0;">This is an automated notification. Please do not reply to this email.</p>
        </div>
      </div>
    `;

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: clientEmail,
      subject: "New Contact Form Submission",
      html: emailHTML,
    });

    if (data) {
      return res
        .status(200)
        .json({ success: true, message: "Message sent successfully!" });
    } else {
      throw new Error("Failed to send message.");
    }
  } catch (error) {
    console.error("Resend Error:", error);
    return res.status(500).json({ error: "Something went wrong" });
  }
}
