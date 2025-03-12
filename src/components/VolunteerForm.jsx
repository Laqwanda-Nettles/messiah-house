import { useState } from "react";

export default function VolunteerForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    availability: "",
    skills: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const response = await fetch("http://localhost:5000/api/volunteers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Something went wrong. Please try again.");
      }

      setSuccess(true);
      setFormData({
        name: "",
        email: "",
        phone: "",
        availability: "",
        skills: "",
        message: "",
      });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-3xl font-bold text-center text-primary">
        Volunteer With Us
      </h2>
      <p className="text-xl text-center text-gray-600 mb-4">
        Fill out the form below, and we'll get in touch with you!
      </p>

      {success && (
        <p className="text-2xl text-green-600 text-center font-medium mb-3">
          Thank you for signing up!
        </p>
      )}
      {error && (
        <p className="text-2xl text-red-600 text-center font-medium mb-3">
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <label className="block text-md font-medium text-gray-700">
          Full Name
          <input
            type="text"
            name="name"
            placeholder="John Doe"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
            aria-required="true"
          />
        </label>

        {/* Email */}
        <label className="block text-md font-medium text-gray-700">
          Email Address
          <input
            type="email"
            name="email"
            placeholder="johndoe@example.com"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
            aria-required="true"
          />
        </label>

        {/* Phone */}
        <label className="block text-md font-medium text-gray-700">
          Phone
          <input
            type="tel"
            name="phone"
            placeholder="(123) 456-7890"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full p-2 border rounded mt-1"
            aria-required="true"
          />
        </label>

        {/* Availability */}
        <label className="block text-md font-medium text-gray-700">
          Availability (e.g., weekends, evenings)
          <input
            type="text"
            name="availability"
            placeholder="Weekends, evenings, flexible..."
            value={formData.availability}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        {/* Skills */}
        <label className="block text-md font-medium text-gray-700">
          Relevant Skills or Interests
          <input
            type="text"
            name="skills"
            placeholder="Teaching, event planning, fundraising."
            value={formData.skills}
            onChange={handleChange}
            className="w-full p-2 border rounded mt-1"
          />
        </label>

        {/* Message */}
        <label className="block text-md font-medium text-gray-700">
          Why do you want to volunteer?
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="I want to volunteer because..."
            className="w-full p-2 border rounded mt-1"
            aria-describedby="messageHelp"
          />
          <p id="messageHelp" className="text-xs text-gray-500">
            Share your motivation for volunteering with us.
          </p>
        </label>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="btn btn-block btn-primary text-white text-lg p-2 rounded hover:bg-primary-dark transition"
          aria-busy={loading}
        >
          {loading ? "Submitting..." : "Sign Up"}
        </button>
      </form>
    </div>
  );
}
