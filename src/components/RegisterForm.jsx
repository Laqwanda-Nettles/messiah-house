import { useState } from "react";
import { useRouter } from "next/router";
import { auth } from "@/config/firebase";
import Link from "next/link";

export default function RegisterForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    role: "employee",
  });

  const [message, setMessage] = useState(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);

    try {
      const user = auth.currentUser;
      if (!user)
        throw new Error(
          "User must be authenticated as an admin to register employees."
        );

      const idToken = await user.getIdToken();

      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${idToken}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Registration failed");

      setMessage({ type: "success", text: "User registered successfully!" });
      router.push("/login");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-white shadow-xl p-6 m-2">
        <h2 className="text-success text-3xl font-semibold text-center mb-4">
          Register
        </h2>
        {message && (
          <div
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-error"
            } my-3`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Email Input */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered focus:input-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          {/* Password Input */}
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Create a password"
              className="input input-bordered focus:input-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>

          {/* Role Selection */}
          <div>
            <label
              htmlFor="role"
              className="block text-sm font-medium text-gray-700"
            >
              Role
            </label>
            <select
              id="role"
              name="role"
              className="select select-bordered focus:select-primary w-full"
              onChange={handleChange}
              value={formData.role}
              aria-required="true"
            >
              <option value="admin">Admin</option>
              <option value="employee">Employee</option>
            </select>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className={`btn btn-primary w-full ${
              loading ? "btn-disabled" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>
        <p className="m-3 text-xs text-gray-700">
          Already Registered?{" "}
          <Link href="/login" className="italic text-secondary font-medium">
            Login here.
          </Link>
        </p>
      </div>
    </div>
  );
}
