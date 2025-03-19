import AdminNavbar from "@/components/AdminNavbar";
import BlogCard from "@/components/BlogCard";
import BlogForm from "@/components/BlogForm";
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

          {/* Blog Form */}
          <div className="flex justify-center items-center">
            <BlogForm />
          </div>
          <h2 className="text-2xl font-semibold divider divider-accent my-5">
            Blogs
          </h2>

          <BlogCard />
        </div>
      </div>
    </ProtectedRoute>
  );
}
