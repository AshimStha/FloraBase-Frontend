import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdatePostForm = () => {
  const navigate = useNavigate();
  const { id } = useParams(); // Get the post ID from the URL
  const [formData, setFormData] = useState({
    common_name: "",
    scientific_name: "",
    family: "",
    genus: "",
    image: null,
    synonyms: "",
    varieties: "",
    edible: false,
    vegetable: false,
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    // Fetch post data based on the ID and populate the form
    const fetchFlowerData = async () => {
      try {
        const response = await fetch(
          `http://localhost:5000/api/flowers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authentication
            },
          }
        );
        if (response.ok) {
          const data = await response.json();
          setFormData({
            common_name: data.common_name || "",
            scientific_name: data.scientific_name || "",
            family: data.family || "",
            genus: data.genus || "",
            synonyms: data.synonyms ? data.synonyms.join(", ") : "",
            varieties: data.varieties ? data.varieties.join(", ") : "",
            edible: data.edible || false,
            vegetable: data.vegetable || false,
          });
        } else {
          console.error("Failed to fetch flower data");
        }
      } catch (error) {
        console.error("Error fetching flower data:", error);
      }
    };

    fetchFlowerData();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  const validate = () => {
    let tempErrors = {};
    for (let field in formData) {
      if (!formData[field] && field !== "image")
        tempErrors[field] = `${field} is required`;
    }
    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validate()) {
      try {
        const response = await fetch(
          `http://localhost:5000/api/flowers/${id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token for authentication
            },
            body: JSON.stringify(formData),
          }
        );
        if (response.ok) {
          navigate(-1); // Navigate back on successful update
        } else {
          console.error("Failed to update flower data");
        }
      } catch (error) {
        console.error("Error updating flower data:", error);
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
            Update Flower
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

export default UpdatePostForm;
