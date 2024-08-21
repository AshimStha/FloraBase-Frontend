import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { LoadScript, GoogleMap, Marker } from "@react-google-maps/api";
import Loader from "../components/Loader";

const MongoDBFlowerDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [flower, setFlower] = useState(null);
  const [error, setError] = useState(null);
  const [isMapOpen, setIsMapOpen] = useState(false);
  const [coordinates, setCoordinates] = useState({ lat: 0, lng: 0 });

  useEffect(() => {
    const fetchFlowerDetails = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setError("No token found. Please log in.");
        return;
      }

      try {
        const response = await fetch(
          `http://localhost:5000/api/flowers/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setFlower(data); // MongoDB data

        // Parse the location into coordinates (latitude and longitude)
        if (data.location) {
          const [lat, lng] = data.location.split(",").map(Number);
          setCoordinates({ lat, lng });
        }
      } catch (error) {
        console.error("Error fetching flower details:", error);
        setError("Could not load flower details");
      }
    };

    fetchFlowerDetails();
  }, [id]);

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline">{error}</span>
      </div>
    );
  }

  if (!flower) {
    return <Loader />;
  }

  const {
    image_url,
    common_name,
    scientific_name,
    family,
    genus,
    observations,
    bibliography,
    synonyms,
    varieties,
    vegetable,
    edible,
    location, // Assume location is a string like "latitude,longitude"
  } = flower;

  const toggleMapModal = () => {
    setIsMapOpen(!isMapOpen);
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        {/* Top section */}
        <div className="flex items-center justify-between mt-4 mb-14">
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
            Flower Details
          </h1>
          <div className="w-6"></div>
        </div>

        {/* Flower details section */}
        <div className="bg-white p-6 rounded-lg shadow-md max-w-4xl mx-auto">
          <div className="flex flex-wrap justify-around md:flex-nowrap pb-8">
            <img
              src={image_url || "default_image_url"} // Use a default image if imageUrl is not available
              alt={common_name || "Flower"}
              className="w-full md:w-1/3 h-64 object-cover rounded-md" // Set a constant height
            />
            <div className="md:ml-6 md:flex md:flex-col md:justify-center">
              <h2 className="text-2xl font-bold mt-4 md:mt-0">
                {common_name || "Unknown Flower"}
              </h2>
              <div className="mt-4 space-y-2">
                {scientific_name && (
                  <p>
                    <span className="font-bold">Scientific Name:</span>{" "}
                    <span className="text-green-700">{scientific_name}</span>
                  </p>
                )}
                {family && (
                  <p>
                    <span className="font-bold">Family Name:</span>{" "}
                    <span className="text-green-700">{family}</span>
                  </p>
                )}
                {genus && (
                  <p>
                    <span className="font-bold">Genus:</span>{" "}
                    <span className="text-green-700">{genus}</span>
                  </p>
                )}
                {observations && (
                  <p>
                    <span className="font-bold">Observations:</span>{" "}
                    <span className="text-green-700">{observations}</span>
                  </p>
                )}
                {location && (
                  <p>
                    <span className="font-bold">Location:</span>{" "}
                    <span
                      className="text-green-700 cursor-pointer"
                      onClick={toggleMapModal}
                    >
                      {location} (<span className="text-red-500">Click to view on map</span>)
                    </span>
                  </p>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Synonyms section */}
            <div>
              <h3 className="text-xl font-semibold">Synonyms:</h3>
              <ul className="mt-2 bg-gray-200 p-4 rounded-md">
                {synonyms && synonyms.length > 0 ? (
                  synonyms.map((synonym, index) => (
                    <li key={index}>{synonym}</li>
                  ))
                ) : (
                  <p>No synonyms available</p>
                )}
              </ul>
            </div>

            {/* Bibliography section */}
            <div>
              <h3 className="text-xl font-semibold">Bibliography:</h3>
              <p className="mt-2 bg-gray-200 p-4 rounded-md">
                {bibliography || "No bibliography available"}
              </p>
            </div>

            {/* Varieties section */}
            <div>
              <h3 className="text-xl font-semibold">Varieties:</h3>
              <ul className="mt-2 bg-gray-200 p-4 rounded-md">
                {varieties && varieties.length > 0 ? (
                  varieties.map((variety, index) => (
                    <li key={index}>{variety.scientific_name}</li>
                  ))
                ) : (
                  <p>No varieties available</p>
                )}
              </ul>
            </div>

            {/* Edibility section */}
            <div>
              <h3 className="text-xl font-semibold">Edibility:</h3>
              <p className="mt-2 bg-gray-200 p-4 rounded-md">
                {edible ? "This plant is edible." : "This plant is not edible."}
              </p>
            </div>

            {/* Vegetable status section */}
            <div>
              <h3 className="text-xl font-semibold">Vegetable:</h3>
              <p className="mt-2 bg-gray-200 p-4 rounded-md">
                {vegetable
                  ? "This plant is a vegetable."
                  : "This plant is not a vegetable."}
              </p>
            </div>
          </div>
        </div>

        {/* Google Map Modal */}
        {isMapOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-4 rounded-lg shadow-lg max-w-lg w-full">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-lg font-semibold">Location Map</h2>
                <button
                  className="text-white font-bold w-fit"
                  onClick={toggleMapModal}
                >
                  Close
                </button>
              </div>
              <LoadScript googleMapsApiKey={process.env.GOOGLE_MAPS_API_KEY}>
                <GoogleMap
                  mapContainerStyle={{
                    height: "500px",
                    width: "100%",
                  }}
                  center={coordinates}
                  zoom={14}
                >
                  <Marker position={coordinates} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default MongoDBFlowerDetailsPage;
