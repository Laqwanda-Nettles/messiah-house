import { useEffect, useState } from "react";

const BACKENDURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function LatestBlogs() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch(`${BACKENDURL}/api/blog`);
        const data = await response.json();
        // Sort by createdAt and get the latest 5
        const latestBlogs = data
          .sort((a, b) => b.createdAt - a.createdAt)
          .slice(0, 5);
        setBlogs(latestBlogs);
      } catch (error) {
        console.error("Error fetching blogs:", error);
      }
    };

    fetchBlogs();
  }, []);

  return (
    <div className="p-4 bg-sky-50 shadow-md rounded-lg">
      <h2 className="text-3xl font-bold mb-4">Latest News & Events</h2>
      {blogs.map((blog) => (
        <div key={blog.id} className="border-b pb-2 mb-2">
          <h3 className="text-xl text-secondary font-semibold">{blog.title}</h3>
          <div className="flex items-center gap-2">
            <img
              className="mask mask-circle h-6 bg-green-300 p-1"
              src="/favicon.ico"
              alt="Logo"
            />
            <p className="text-md font-semibold text-zinc-500">{blog.author}</p>
          </div>
          <p className="mt-1 text-lg font-medium">{blog.content}</p>
        </div>
      ))}
    </div>
  );
}
