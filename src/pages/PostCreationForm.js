import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const PostCreationForm = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    common_name: "",
    scientific_name: "",
    family: "",
    genus: "",
    observations: "",
    bibliography: "",
    synonyms: "",
    varieties: "",
    vegetable: false,
    edible: false,
    image: null,
    location: "", // Add the location field
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;
    if (type === "file") {
      setFormData({
        ...formData,
        image: files[0],
      });
    } else {
      setFormData({
        ...formData,
        [name]: type === "checkbox" ? checked : value,
      });
    }
  };

  const validate = () => {
    let tempErrors = {};
    if (!formData.common_name)
      tempErrors.common_name = "Common name is required";
    if (!formData.scientific_name)
      tempErrors.scientific_name = "Scientific name is required";
    if (!formData.family) tempErrors.family = "Family is required";
    if (!formData.genus) tempErrors.genus = "Genus is required";
    if (!formData.image) tempErrors.image = "Image is required";
    if (!formData.location) tempErrors.location = "Location is required"; // Validate location

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const token = localStorage.getItem("token");

        // Upload the image first
        const imageFormData = new FormData();
        imageFormData.append("image", formData.image);
        const uploadResponse = await axios.post(
          "http://localhost:5000/api/flowers/upload",
          imageFormData,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "multipart/form-data",
            },
          }
        );

        // Prepare the final form data with the image URL and location
        const formDataToSubmit = {
          ...formData,
          image_url: uploadResponse.data.imageUrl,
        };

        // Submit the rest of the form data
        const response = await axios.post(
          "http://localhost:5000/api/flowers",
          formDataToSubmit,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        console.log("Flower created:", response.data);
        navigate("/profile");
      } catch (error) {
        console.error("Error creating flower:", error);
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
            Add Flower
          </h1>
          <div className="w-6"></div>
        </div>

        {/* Form section */}
        <div className="bg-gray-200 p-6 rounded-lg shadow-md max-w-3xl mx-auto">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700">Common Name</label>
                <input
                  type="text"
                  name="common_name"
                  value={formData.common_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.common_name && (
                  <p className="text-red-500 text-sm">{errors.common_name}</p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
                <label className="block text-gray-700">Scientific Name</label>
                <input
                  type="text"
                  name="scientific_name"
                  value={formData.scientific_name}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.scientific_name && (
                  <p className="text-red-500 text-sm">
                    {errors.scientific_name}
                  </p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700">Family</label>
                <input
                  type="text"
                  name="family"
                  value={formData.family}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.family && (
                  <p className="text-red-500 text-sm">{errors.family}</p>
                )}
              </div>
              <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
                <label className="block text-gray-700">Genus</label>
                <input
                  type="text"
                  name="genus"
                  value={formData.genus}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.genus && (
                  <p className="text-red-500 text-sm">{errors.genus}</p>
                )}
              </div>
            </div>

            {/* New Location Input Field */}
            <div className="flex flex-wrap -mx-2">
              <div className="w-full px-2">
                <label className="block text-gray-700">Location</label>
                <input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                  placeholder="Enter the latitudes"
                />
                {errors.location && (
                  <p className="text-red-500 text-sm">{errors.location}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full px-2">
                <label className="block text-gray-700">Image</label>
                <input
                  type="file"
                  name="image"
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
                {errors.image && (
                  <p className="text-red-500 text-sm">{errors.image}</p>
                )}
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700">Synonyms</label>
                <textarea
                  name="synonyms"
                  value={formData.synonyms}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
                <label className="block text-gray-700">Varieties</label>
                <textarea
                  name="varieties"
                  value={formData.varieties}
                  onChange={handleChange}
                  className="w-full p-2 border border-gray-300 rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-2">
              <div className="w-full md:w-1/2 px-2">
                <label className="block text-gray-700">Edible</label>
                <input
                  type="checkbox"
                  name="edible"
                  checked={formData.edible}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
              </div>
              <div className="w-full md:w-1/2 px-2 mt-4 md:mt-0">
                <label className="block text-gray-700">Vegetable</label>
                <input
                  type="checkbox"
                  name="vegetable"
                  checked={formData.vegetable}
                  onChange={handleChange}
                  className="w-4 h-4"
                />
              </div>
            </div>

            <div className="flex justify-around mt-8 pt-6">
              <button
                type="submit"
                className="bg-green-500 max-w-fit text-white px-4 py-2 rounded-md hover:bg-green-600"
              >
                Create
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

export default PostCreationForm;
