import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.setHeader("Allow", ["POST"]);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  const { name, email, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  try {
    const data = await resend.emails.send({
      from: "Acme <onboarding@resend.dev>",
      to: "messiahhousedev@gmail.com",
      subject: "New Contact Form Submission",
      html: `<h2>New Message from ${name}</h2>
       <p><strong>Email:</strong> ${email}</p>
       <p><strong>Message:</strong> ${message}</p>`,
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
