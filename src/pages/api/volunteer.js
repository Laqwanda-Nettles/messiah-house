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

    console.log("Volunteer Form Submitted: ", req.body);

    return res.status(200).json({ message: "Volunteer sign-up successful!" });
  } catch (error) {
    console.error("Error saving volunteer data:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
