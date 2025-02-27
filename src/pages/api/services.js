// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  if (req.method === "GET") {
    res.status(200).json({
      services: [
        {
          category: "Education & Mentorship",
          description:
            "Providing guidance and skills to help individuals grow personally and professionally.",
          image: "/education-mentorship.jpeg",
          programs: [
            "Leadership & Professional Development",
            "Career & Workforce Mentorship",
            "Entrepreneurship & Small Business Support",
            "STEM & Trade Programs",
          ],
        },
        {
          category: "Financial Literacy",
          description:
            "Equipping individuals with financial knowledge to achieve independence and stability.",
          image: "/financial-literacy.jpeg",
          programs: [
            "Budgeting & Money Management",
            "Credit Building & Repair",
            "Investment & Wealth Building",
            "Financial Literacy Classes",
          ],
        },
        {
          category: "Housing & Community Development",
          description:
            "Creating stable living environments and fostering economic growth.",
          image: "/housing-development.jpg",
          programs: [
            "Affordable Housing Assistance",
            "Homeownership Guidance",
            "Real Estate & Property Management",
            "Housing Counseling Center",
          ],
        },
        {
          category: "Community Outreach",
          description:
            "Extending a helping hand to those in need through resources and direct aid.",
          image: "/community-outreach.jpeg",
          programs: [
            "Feeding the Homeless & Food Distribution",
            "Clothing & Essential Supplies Assistance",
            "Civic Engagement & Community Organizing",
            "Nonprofit & Social Enterprise Mentorship",
          ],
        },
        {
          category: "Health & Wellness",
          description:
            "Encouraging overall well-being through mental, emotional, and physical support.",
          image: "/health-wellness.jpeg",
          programs: [
            "Personal Development & Life Skills Training",
            "Faith-Based & Value-Driven Leadership",
            "Community Leadership & Advocacy",
          ],
        },
      ],
    });
  } else {
    res.setHeader("Allow", ["GET"]);
    res.status(405).json({ message: `Method ${req.method} not allowed` });
  }
}
