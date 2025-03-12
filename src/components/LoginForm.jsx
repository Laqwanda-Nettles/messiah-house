import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "@/config/firebase";

export default function LoginForm() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
      const userCredential = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );

      const idToken = await userCredential.user.getIdToken();

      const response = await fetch(
        "http://localhost:5000/api/auth/verify-token",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ token: idToken }),
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Login failed");

      //Store user session in localStorage
      localStorage.setItem("token", data.token);

      setMessage({ type: "success", text: "Login successful!" });

      router.push("/admin/portal");
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-base-200">
      <div className="card w-96 bg-white shadow-xl p-6 m-2">
        <h1 className="text-success text-3xl font-semibold text-center mb-4">
          Login
        </h1>
        {message && (
          <div
            role="alert"
            className={`alert ${
              message.type === "success" ? "alert-success" : "alert-error"
            } my-3`}
          >
            {message.text}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              id="email"
              type="email"
              name="email"
              placeholder="Enter your email"
              className="input input-bordered focus:input-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <input
              id="password"
              type="password"
              name="password"
              placeholder="Enter your password"
              className="input input-bordered focus:input-primary w-full"
              onChange={handleChange}
              required
              aria-required="true"
            />
          </div>{" "}
          <div>
            <button
              type="submit"
              className={`btn btn-primary w-full ${
                loading ? "btn-secondary" : ""
              }`}
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </div>
        </form>
        <p className="m-3 text-xs text-gray-700">
          New to the team?{" "}
          <Link href="/register" className="italic text-secondary font-medium">
            Register here.
          </Link>
        </p>
      </div>
    </div>
  );
}
