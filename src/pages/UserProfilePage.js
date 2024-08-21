import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom"; // Import Link
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCog, faHeart, faEdit } from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import Loader from "../components/Loader";

const UserProfilePage = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/users/me",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    const fetchUserFlowers = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          const response = await axios.get(
            "http://localhost:5000/api/flowers/user",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFlowers(response.data);
          setLoading(false);
        } catch (error) {
          console.error("Failed to fetch user flowers", error);
          setLoading(false);
        }
      }
    };

    fetchUserData();
    fetchUserFlowers();
  }, []);

  if (loading) {
    return <Loader />;
  }

  if (!user) {
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
            User Profile
          </h1>
          <div className="w-6"></div>
        </div>

        {/* The user details section */}
        <div className="bg-gray-200 p-4 mb-14 rounded-lg shadow-md flex justify-around items-center max-w-3xl mx-auto">
          <div className="flex items-center">
            <div className="text-center flex flex-col items-center mr-10">
              <img
                src={user.profilePicture || "https://via.placeholder.com/100"}
                alt="User"
                className="rounded-full w-20 h-20"
              />
              <p className="font-bold mt-2">
                {user.firstname} {user.lastname}
              </p>
            </div>

            <div className="text-center">
              <div className="mb-2 flex justify-around items-center space-x-2">
                <p className="text-sm">POSTS</p>
                <p className="text-lg font-bold">{flowers.length}</p>
              </div>
              <hr className="my-2 border-gray-600" />
              <div className="mt-2 flex justify-around items-center space-x-2">
                <p className="text-sm">FRIENDS</p>
                <p className="text-lg font-bold">3</p>
              </div>
            </div>
          </div>

          <div className="flex flex-col space-y-2 items-end">
            <button
              className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              onClick={() => navigate("/update-profile")}
            >
              <FontAwesomeIcon icon={faCog} className="mr-2" />
              Settings
            </button>

            <button className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700">
              <FontAwesomeIcon icon={faHeart} className="mr-2" />
              Favourites
            </button>
            <button
              className="flex items-center bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700"
              onClick={() => navigate("/edit-post")}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Edit Posts
            </button>
          </div>
        </div>

        {/* The posts section */}
        <div className="max-w-3xl mx-auto mt-6">
          {flowers.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {flowers.map((flower) => (
                <Link
                  key={flower._id}
                  to={`/flower/mongodb/${flower._id}`} // Link to the flower details page in MongoDB
                  className="bg-white p-4 rounded-lg shadow-md block"
                >
                  <img
                    src={flower.image_url}
                    alt={flower.common_name}
                    className="w-full h-48 object-cover rounded-md"
                  />
                  <h3 className="text-xl font-semibold mt-4">
                    {flower.common_name}
                  </h3>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center text-gray-600 text-lg">
              No posts available!
            </div>
          )}
        </div>

        <div className="text-center mt-8">
          <button
            className="bg-red-500 max-w-fit text-white my-8 px-4 py-2 rounded-md hover:bg-red-700"
            onClick={() => navigate("/create-post")}
          >
            Create Post
          </button>
        </div>
      </main>
    </div>
  );
};

export default UserProfilePage;
