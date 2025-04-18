import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const BACKENDURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProgramSignupForm() {
  const [services, setServices] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    program: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const response = await fetch("/api/services");
        if (!response.ok) throw new Error("Failed to fetch services");
        const data = await response.json();
        setServices(data.services);
      } catch (error) {
        console.error("Error fetching services:", error);
      }
    };
    fetchServices();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`${BACKENDURL}/api/programs`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const result = await response.json();
      if (!response.ok) {
        throw new Error(result.error || "Failed to submit form");
      }

      //Send email notification to client
      await fetch("/api/program", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      setSuccess(true);
      setFormData({ name: "", email: "", program: "" });
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.div
      className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg"
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <h2 className="text-success text-3xl font-bold text-center mb-4">
        Program Signup
      </h2>

      <AnimatePresence>
        {success ? (
          <motion.div
            key="success-message"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="text-center space-y-6"
          >
            <p className="text-2xl text-green-600 font-semibold">
              Thank you for signing up!
            </p>
            <p className="text-xl text-gray-700">
              You will receive a follow-up email within 24 hours. If you do not
              hear from us, feel free to contact us by phone at{" "}
              <span className="font-bold">(225) 460-0250</span>.
            </p>
            <motion.button
              onClick={() => setSuccess(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="mt-5 btn btn-primary font-bold text-lg rounded-lg"
            >
              Join Another Program
            </motion.button>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <AnimatePresence>
              {error && (
                <motion.p
                  className="text-2xl text-red-600 text-center font-semibold mb-3"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                >
                  {error}
                </motion.p>
              )}
            </AnimatePresence>

            <label className="form-control w-full">
              <span className="label-text font-medium">Name</span>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="input input-bordered focus:input-primary w-full mt-1"
                aria-label="Name"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-medium">Email</span>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="input input-bordered focus:input-primary w-full mt-1"
                aria-label="Email"
              />
            </label>

            <label className="form-control w-full">
              <span className="label-text font-medium">Select a Program</span>
              <select
                name="program"
                value={formData.program}
                onChange={handleChange}
                required
                className="select select-bordered focus:select-primary w-full mt-1"
                aria-label="Select a Program"
              >
                <option value="" disabled>
                  Select a program
                </option>
                {services.flatMap((service) =>
                  service.programs.map((program) => (
                    <option key={program} value={program}>
                      {program}
                    </option>
                  ))
                )}
              </select>
            </label>

            <button
              type="submit"
              className="btn btn-primary w-full"
              disabled={loading}
            >
              {loading ? "Submitting..." : "Sign Up"}
            </button>
          </form>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
