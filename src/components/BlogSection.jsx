import { useEffect, useState } from "react";
const BACKENDURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const BlogCard = ({ blog, onUpdate, onDelete }) => {
  return (
    <div className="card bg-base-100 shadow-xl p-5 border-2">
      <div className="flex items-center gap-4">
        <img
          className="mask mask-circle h-6 bg-green-300 p-1"
          src="/favicon.ico"
          alt="Author"
        />
        <p className="text-lg font-semibold text-black">{blog.author}</p>
      </div>
      <h2 className="text-2xl font-bold text-secondary mt-1">{blog.title}</h2>
      <p className="text-gray-600 text-lg">{blog.content}</p>

      <div className="mt-4">
        <button className="btn btn-primary mr-2" onClick={() => onUpdate(blog)}>
          Update
        </button>
        <button className="btn btn-error" onClick={() => onDelete(blog.id)}>
          Delete
        </button>
      </div>
    </div>
  );
};

const BlogSection = () => {
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
      const res = await fetch(`${BACKENDURL}/api/blog`);
      const data = await res.json();
      setBlogs(data);
    } catch (error) {
      console.error("Error fetching blogs:", error);
    }
  };

  const handleUpdate = async (e) => {
    e.preventDefault();
    if (!editingBlog) return;
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BACKENDURL}/api/blog/${editingBlog.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });
      setEditingBlog(null);
      setFormData({ title: "", content: "", author: "" });
      fetchBlogs();
    } catch (error) {
      console.error("Error updating blog:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await fetch(`${BACKENDURL}/api/blog/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      fetchBlogs();
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };

  return (
    <div className="p-5 w-full flex flex-col items-center">
      {editingBlog && (
        <form
          className="w-full md:w-4/6 mb-5 p-4 border-2 rounded-md shadow-md"
          onSubmit={handleUpdate}
        >
          <h2 className="text-secondary text-2xl font-bold text-center">
            <span className="text-emerald-600">Editing:</span>{" "}
            {editingBlog.title}
          </h2>
          <input
            className="input input-bordered w-full my-2"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            placeholder="Title"
          />
          <textarea
            className="textarea textarea-bordered w-full my-2"
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            placeholder="Content"
          />
          <input
            className="input input-bordered w-full my-2"
            value={formData.author}
            onChange={(e) =>
              setFormData({ ...formData, author: e.target.value })
            }
            placeholder="Author"
          />
          <button className="btn btn-block btn-success">Update</button>
        </form>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map((blog) => (
          <BlogCard
            key={blog.id}
            blog={blog}
            onUpdate={(b) => {
              setEditingBlog(b);
              setFormData(b);
            }}
            onDelete={handleDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default BlogSection;
