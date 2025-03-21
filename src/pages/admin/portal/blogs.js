import AdminNavbar from "@/components/AdminNavbar";
import BlogSection from "@/components/BlogSection";
import ProtectedRoute from "@/components/ProtectedRoute";
import Head from "next/head";

export default function AdminBlogs() {
  return (
    <ProtectedRoute>
      <Head>
        <title>MHCDC Portal | Blogs</title>
        <meta
          name="description"
          content="Messiah House Community Development Corporation non-profit portal for blog management."
          key="desc"
        />
      </Head>
      <div className="flex h-screen">
        <AdminNavbar />
        <div className="flex-1 overflow-y-auto">
          <h1 className="text-3xl font-bold text-center m-4">
            Admin Blog Management
          </h1>

          <BlogSection />
        </div>
      </div>
    </ProtectedRoute>
  );
}
