import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "../components/Loader"; // Assuming you have a Loader component

const EditPostsPage = () => {
  const navigate = useNavigate();
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState(null);

  // Fetch posts when the component mounts
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const token = localStorage.getItem("token"); // Assuming you're using token-based auth
        const response = await axios.get(
          "http://localhost:5000/api/flowers/user",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setPosts(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleDeleteClick = (post) => {
    setPostToDelete(post);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(
        `http://localhost:5000/api/flowers/${postToDelete._id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setPosts(posts.filter((post) => post._id !== postToDelete._id));
      setIsDeleteDialogOpen(false);
    } catch (error) {
      console.error("Failed to delete post:", error);
    }
  };

  const handleCancelDelete = () => {
    setPostToDelete(null);
    setIsDeleteDialogOpen(false);
  };

  if (loading) {
    return <Loader />;
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        {/* Top section */}
        <div className="flex items-center justify-between mb-10 mt-6">
          <div className="flex items-center justify-start">
            <button
              className="text-gray-600 bg-transparent hover:bg-transparent hover:text-green-600 p-0 m-0"
              onClick={() => navigate(-1)}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14 19l-7-7 7-7M7 12h15"
                />
              </svg>
            </button>
          </div>
          <h1 className="text-3xl font-semibold text-center flex-grow">
            Edit Posts
          </h1>
          <div className="w-6"></div>
        </div>

        {/* The posts section */}
        <div className="max-w-5xl mx-auto mt-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {posts.map((post) => (
              <div key={post._id} className="bg-white p-4 rounded-lg shadow-md">
                <img
                  src={post.image_url || "https://via.placeholder.com/150"}
                  alt={post.common_name}
                  className="w-full h-48 object-cover rounded-md"
                />
                <h3 className="text-xl font-semibold mt-4">
                  {post.common_name}
                </h3>
                <div className="flex justify-between mt-4 space-x-4">
                  <button
                    className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 w-full"
                    onClick={() => navigate(`/update-post/${post._id}`)}
                  >
                    Update
                  </button>
                  <button
                    className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 w-full"
                    onClick={() => handleDeleteClick(post)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>

      {/* Delete Confirmation Dialog */}
      {isDeleteDialogOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-black p-6 rounded-md shadow-md max-w-sm w-full">
            <h2 className="text-white text-center text-lg font-semibold mb-4 pb-6">
              Delete this post?
            </h2>
            {postToDelete && (
              <div className="flex items-center justify-center mb-4 text-white">
                <img
                  src={
                    postToDelete.image_url || "https://via.placeholder.com/150"
                  }
                  alt={postToDelete.common_name}
                  className="w-20 h-20 object-cover rounded-md mr-4"
                />
                <p>{postToDelete.common_name}</p>
              </div>
            )}
            <div className="flex justify-end space-x-4 pt-4">
              <button
                className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600"
                onClick={handleConfirmDelete}
              >
                Yes
              </button>
              <button
                className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={handleCancelDelete}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default EditPostsPage;
