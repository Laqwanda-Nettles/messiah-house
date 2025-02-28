export default async function handler(req, res) {
  if (req.method === "POST") {
    const { name, email, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({ error: "All fields are required" });
    }

    try {
      // Example: Send email or save to a database
      console.log("New Contact Form Submission:", { name, email, message });

      return res.status(200).json({ success: true });
    } catch (error) {
      return res.status(500).json({ error: "Something went wrong" });
    }
  }
  res.setHeader("Allow", ["POST"]);
  res.status(405).end(`Method ${req.method} Not Allowed`);
}
