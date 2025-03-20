import AdminNavbar from "@/components/AdminNavbar";
import LatestBlogs from "@/components/LatestBlogs";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthProvider";
import Head from "next/head";
import Link from "next/link";

const admin = process.env.NEXT_PUBLIC_ADMIN_USER;

export default function Portal() {
  const { user } = useAuth();

  return (
    <ProtectedRoute>
      <Head>
        <title>MHCDC Portal | Dashboard</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit portal dashboard home page"
          key="desc"
        />
      </Head>
      <div className="flex h-screen">
        <AdminNavbar />
        <div className="flex-1 overflow-y-auto m-4">
          <div className="bg-emerald-100 p-4 rounded-md shadow-md mb-4">
            <h1 className="text-xl font-semibold">
              {user ? `Welcome, ${user.email}!` : "Welcome to MHCDC Portal!"}
            </h1>
          </div>
          <div className="bg-rose-50 p-4 rounded-md shadow-md mb-4">
            {user && user.email === admin ? (
              <div className="flex justify-evenly">
                <Link
                  href={"/register"}
                  className="btn btn-outline btn-success md:btn-wide text-lg transition duration-300"
                >
                  Register
                </Link>
                <a
                  href="https://calendar.google.com/calendar/u/0/r"
                  className="btn btn-outline btn-secondary md:btn-wide text-lg transition duration-300"
                >
                  Add an Event
                </a>
              </div>
            ) : (
              <div className="flex justify-center">
                <Link
                  href={"/register"}
                  className="btn btn-outline btn-success btn-wide text-lg transition duration-300"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <LatestBlogs />
        </div>
      </div>
    </ProtectedRoute>
  );
}
