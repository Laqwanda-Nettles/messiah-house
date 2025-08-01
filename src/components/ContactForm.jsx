import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setStatus(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({
          type: "success",
          message: result.message || "Message sent successfully!",
        });
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus({
          type: "error",
          message: result.error || "Failed to send message. Try again.",
        });
      }
    } catch (error) {
      console.error("Error submitting form: ", error);
      setStatus({
        type: "error",
        message: "An error occurred. Please try again.",
      });
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="max-w-lg mx-auto bg-white p-6 rounded-xl shadow-lg m-6">
      <div className="flex flex-col items-center m-6 gap-2">
        <h2 className="text-secondary text-4xl font-extrabold">Contact Us</h2>
        <p className="text-xl font-medium italic">
          Have questions? Want to partner with us? Reach out—we&apos;d love to
          hear from you.
        </p>
      </div>

      {/* Alert Message */}
      {status && status.type !== "success" && (
        <div
          className={`alert ${
            status.type === "success" ? "alert-success" : "alert-error"
          } shadow-lg mb-4`}
        >
          <span>{status.message}</span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {status?.type === "success" ? (
          <motion.div
            key="thank-you"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-4"
          >
            <p className="text-2xl font-semibold text-green-700">
              Thank you for reaching out!
            </p>
            <p className="text-lg">
              We&apos;ll be in touch within the next 24 hours. If you don&apos;t
              hear from us, please feel free to reach out again or call us
              directly at <span className="font-bold">(225) 460-0250</span>.
            </p>
            <button
              onClick={() => setStatus(null)}
              className="mt-4 btn btn-primary text-lg font-bold rounded-lg"
            >
              Send Another Message
            </button>
          </motion.div>
        ) : (
          <motion.form
            key="form"
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Name Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Email Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>

            {/* Message Field */}
            <div>
              <label className="block text-lg font-medium text-gray-700">
                Message
              </label>
              <textarea
                name="message"
                rows="4"
                value={formData.message}
                onChange={handleChange}
                required
                className="w-full mt-1 px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              ></textarea>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-primary text-white font-bold py-2 rounded-lg hover:bg-primary-dark transition"
              disabled={loading}
            >
              {loading ? "Sending..." : "Send Message"}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}
