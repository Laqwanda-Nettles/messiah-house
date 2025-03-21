import { useState } from "react";

const BACKENDURL = process.env.NEXT_PUBLIC_BACKEND_URL;

const BlogForm = ({ fetchBlogs }) => {
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    author: "",
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess(false);

    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`${BACKENDURL}/api/blog`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Server Error: Failed to save post.");
      }

      setSuccess(true);
      setFormData({
        title: "",
        content: "",
        author: "",
      });

      //Close modal
      document.getElementById("my_modal_2").close();

      // Delay fetching to allow UI updates
      setTimeout(() => {
        fetchBlogs();
      }, 200);
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
        className="btn btn-info"
        onClick={() => document.getElementById("my_modal_2").showModal()}
      >
        Create Blog
      </button>
      <dialog id="my_modal_2" className="modal">
        <div className="modal-box flex justify-center items-center">
          <form onSubmit={handleSubmit} className="p-4 w-full">
            <h2 className="text-secondary text-2xl text-center font-bold mb-4">
              Create a New Blog Post
            </h2>

            {success && (
              <p className="text-xl text-green-600 text-center font-medium mb-3">
                Success: Created a new blog!
              </p>
            )}
            {error && (
              <p className="text-xl text-red-600 text-center font-medium mb-3">
                {error}
              </p>
            )}

            <label className="block text-md font-medium text-gray-700">
              Title
              <input
                type="text"
                name="title"
                placeholder="Sharing Our Impact:"
                className="input input-bordered focus:input-info w-full mt-1 mb-2"
                value={formData.title}
                onChange={handleChange}
              />
            </label>

            <label className="block text-md font-medium text-gray-700">
              Content
              <textarea
                name="content"
                placeholder="Provide details about upcoming events or initiatives..."
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
                placeholder="MHCDC"
                className="input input-bordered focus:input-info w-full mt-1 mb-4"
                value={formData.author}
                onChange={handleChange}
              />
            </label>

            <button type="submit" className="btn btn-secondary w-full">
              {loading ? "Submitting..." : "Submit"}
            </button>
          </form>
        </div>
        <form method="dialog" class="modal-backdrop">
          <button>close</button>
        </form>
      </dialog>
    </>
  );
};

export default BlogForm;
