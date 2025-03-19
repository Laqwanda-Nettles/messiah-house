import AdminNavbar from "@/components/AdminNavbar";
import LatestBlogs from "@/components/LatestBlogs";
import ProtectedRoute from "@/components/ProtectedRoute";
import { useAuth } from "@/context/AuthProvider";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";

export default function Portal() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  if (loading) return <p>Loading...</p>;
  if (!user) return null;

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
          <div className="bg-emerald-100 p-4 rounded shadow-md mb-4">
            <h1 className="text-xl font-semibold">Welcome, {user.email}!</h1>
          </div>
          <LatestBlogs />
        </div>
      </div>
    </ProtectedRoute>
  );
}
