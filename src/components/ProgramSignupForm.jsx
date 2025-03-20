import { useEffect, useState } from "react";

const BACKENDURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function ProgramSignupForm() {
  const [services, setServices] = useState([]);
  const [selectedProgram, setSelectedProgram] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    program: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

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
    setMessage(null);

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

      setMessage("Program signup successful!");
      setFormData({ name: "", email: "", program: "" });
    } catch (error) {
      setMessage(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white shadow-lg rounded-lg">
      <h2 className="text-success text-3xl font-bold text-center mb-4">
        Program Signup
      </h2>
      {message && <p className="text-center text-green-600">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
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
    </div>
  );
}
