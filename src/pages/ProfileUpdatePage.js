import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const ProfileUpdatePage = () => {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    phone: "",
    address: "",
    dateOfBirth: "",
    nationality: "",
    profilePicture: null, // Add profile picture to form data
  });

  const navigate = useNavigate();

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
          setFormData(response.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setFormData({
      ...formData,
      [name]: files && files[0] ? files[0] : value, // Handle file input
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    const formDataToSend = new FormData(); // Create FormData to handle file upload

    // Append form data to the FormData object
    for (const key in formData) {
      formDataToSend.append(key, formData[key]);
    }

    if (token) {
      try {
        await axios.put("http://localhost:5000/api/users/me", formDataToSend, {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data", // Set header for file upload
          },
        });
        navigate("/profile");
      } catch (error) {
        console.error("Failed to update user data", error);
      }
    }
  };

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
            Update Profile
          </h1>
          <div className="w-6"></div>
        </div>

        {/* The user details section */}
        <div className="bg-gray-200 p-4 mb-14 rounded-lg shadow-md flex justify-around items-center max-w-3xl mx-auto">
          <div className="flex items-center">
            <div className="text-center flex flex-col items-center mr-10">
              <img
                src={
                  formData.profilePicture &&
                  typeof formData.profilePicture === "object"
                    ? URL.createObjectURL(formData.profilePicture)
                    : formData.profilePicture ||
                      "https://via.placeholder.com/100"
                }
                alt="User"
                className="rounded-full w-20 h-20"
              />
              <p className="font-bold mt-2">
                {formData.firstname} {formData.lastname}
              </p>
            </div>
            <div className="text-center">
              <div className="mb-2 flex justify-around items-center space-x-2">
                <p className="text-sm">POSTS</p>
                <p className="text-lg font-bold">0</p>
              </div>
              <hr className="my-2 border-gray-600" />
              <div className="mt-2 flex justify-around items-center space-x-2">
                <p className="text-sm">FRIENDS</p>
                <p className="text-lg font-bold">3</p>
              </div>
            </div>
          </div>
        </div>

        {/* Update form */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700">Firstname</label>
                <input
                  type="text"
                  name="firstname"
                  value={formData.firstname}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
                <label className="block text-gray-700">Lastname</label>
                <input
                  type="text"
                  name="lastname"
                  value={formData.lastname}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full p-2 border border-gray-300 rounded-md"
              />
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700">Phone</label>
                <input
                  type="text"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
                <label className="block text-gray-700">Address</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700">Date of Birth</label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
                <label className="block text-gray-700">Nationality</label>
                <input
                  type="text"
                  name="nationality"
                  value={formData.nationality}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full px-2">
                <label className="block text-gray-700">Profile Picture</label>
                <input
                  type="file"
                  name="profilePicture"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>
            <div className="flex justify-around mt-8 pt-6">
              <button
                type="submit"
                className="w-fit bg-green-500 text-white px-6 py-2 rounded-md hover:bg-green-600"
              >
                Update
              </button>

              <button
                type="button"
                className="bg-red-500 max-w-fit text-white px-4 py-2 rounded-md hover:bg-red-600"
                onClick={() => navigate(-1)}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
};

export default ProfileUpdatePage;
