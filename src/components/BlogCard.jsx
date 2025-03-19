import { useEffect, useState } from "react";

const BACKENDURL = process.env.NEXT_PUBLIC_BACKEND_URL;

export default function BlogCard() {
  const [blogs, setBlogs] = useState([]);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });

  useEffect(() => {
    fetchBlogs();
  }, []);

  const fetchBlogs = async () => {
    try {
      const response = await fetch(`${BACKENDURL}/api/blog`);
      if (!response.ok) throw new Error("Failed to fetch blogs");

      const data = await response.json();

      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleEdit = (blog) => {
    setEditingBlog(blog);
    setFormData({
      title: blog.title,
      content: blog.content,
      author: blog.author,
    });
    document.getElementById("edit_modal").showModal();
  };

  const handleDelete = async (id) => {
    try {
      const response = await fetch(`${BACKENDURL}/api/blog/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) throw new Error("Failed to delete blog");

      setBlogs(blogs.filter((blog) => blog.id !== id));
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${BACKENDURL}/api/blog/${editingBlog.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to update blog");

      setBlogs(
        blogs.map((blog) =>
          blog.id === editingBlog.id ? { ...blog, ...formData } : blog
        )
      );
      document.getElementById("edit_modal").close();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  return (
    <div>
      {blogs.length === 0 ? (
        <p className="text-center text-gray-500">No blogs available.</p>
      ) : (
        blogs.map((blog) => (
          <div
            key={blog.id}
            className="shadow-md shadow-zinc-700 m-4 p-4 rounded-lg"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <img
                  className="mask mask-circle h-10 bg-green-300 p-1"
                  src="/favicon.ico"
                  alt="Author"
                />
                <p className="text-lg font-semibold text-black">
                  {blog.author}
                </p>
              </div>
              <div className="flex gap-2">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEdit(blog)}
                >
                  Edit
                </button>
                <button
                  className="btn btn-error btn-sm"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </div>
            </div>
            <div className="mt-4">
              <h2 className="text-2xl font-bold text-secondary">
                {blog.title}
              </h2>
              <p className="text-lg">{blog.content}</p>
            </div>
          </div>
        ))
      )}

      {/* Edit Blog Modal */}
      <dialog id="edit_modal" className="modal">
        <div className="modal-box flex justify-center items-center">
          <form onSubmit={handleUpdate} className="p-4 w-full">
            <h2 className="text-secondary text-2xl text-center font-bold mb-4">
              Edit Blog Post
            </h2>

            <label className="block text-md font-medium text-gray-700">
              Title
              <input
                type="text"
                name="title"
                className="input input-bordered focus:input-info w-full mt-1 mb-2"
                value={formData.title}
                onChange={handleChange}
              />
            </label>

            <label className="block text-md font-medium text-gray-700">
              Content
              <textarea
                name="content"
                className="textarea textarea-bordered focus:textarea-info w-full mt-1 mb-2"
                value={formData.content}
                onChange={handleChange}
              />
            </label>

            <label className="block text-md font-medium text-gray-700">
              Author
              <input
                type="text"
                name="author"
                className="input input-bordered focus:input-info w-full mt-1 mb-4"
                value={formData.author}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="btn btn-secondary w-full">
              Update Blog
            </button>
          </form>
        </div>
        <form method="dialog" className="modal-backdrop">
          <button>Close</button>
        </form>
      </dialog>
    </div>
  );
}
