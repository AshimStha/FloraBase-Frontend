import React, { useEffect, useState, useCallback } from "react";
import { Link } from "react-router-dom";
import axios from "../utils/AxiosConfig";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import Loader from "../components/Loader";
import debounce from "lodash.debounce";

const FlowerListPage = () => {
  const [flowers, setFlowers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [sortOption, setSortOption] = useState("Sort By");
  const [searchQuery, setSearchQuery] = useState("");
  const [page, setPage] = useState(1);

  // Function to fetch flowers based on search query and pagination
  const fetchFlowers = useCallback(async () => {
    try {
      const params = {
        page: page,
        distribution: "Canada",
        category: "flower",
      };

      if (searchQuery) {
        params.q = searchQuery;
      }

      console.log("Fetching flowers with params:", params); // Debugging line

      const response = await axios.get(`/flowers/trefle`, { params });
      setFlowers(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching flowers:", error);
      setError("Failed to fetch flowers");
      setLoading(false);
    }
  }, [page, searchQuery]);

  // Debounce the fetchFlowers function to prevent it from firing too often
  const debouncedFetchFlowers = useCallback(debounce(fetchFlowers, 300), [
    fetchFlowers,
  ]);

  // Fetch flowers when the component mounts and when the page changes
  useEffect(() => {
    debouncedFetchFlowers();
  }, [debouncedFetchFlowers]);

  // Toggle the sort dropdown visibility
  const toggleSortDropdown = () => {
    setSortDropdownOpen(!sortDropdownOpen);
  };

  // Handle sort option click and close the dropdown
  const handleSortOptionClick = (option) => {
    setSortOption(option);
    setSortDropdownOpen(false);
  };

  // Handle input change in the search field
  const handleSearchInputChange = (e) => {
    setSearchQuery(e.target.value);
  };

  // Handle form submission for search, prevents default form submission behavior
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    setPage(1); // Reset to the first page when performing a new search
    fetchFlowers(); // Fetch flowers for the new search query
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return (
      <div
        className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative"
        role="alert"
      >
        <strong className="font-bold">Error:</strong>
        <span className="block sm:inline"> {error}</span>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-14 bg-gray-100">
      <div className="flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0 lg:space-x-8">
        <h1 className="text-3xl font-semibold">Known Flowers</h1>
        <div className="flex flex-col md:flex-row items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* Search form */}
          <form
            onSubmit={handleSearchSubmit}
            className="flex items-center border border-gray-500 rounded-md"
          >
            <input
              type="text"
              placeholder="Search a flower"
              className="outline-none pl-2 bg-transparent"
              value={searchQuery}
              onChange={handleSearchInputChange}
            />
            <button type="submit" className="ml-2 text-white">
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </form>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={toggleSortDropdown}
              className="text-white flex items-center space-x-1 pl-2 rounded-md"
            >
              <span>{sortOption}</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-5 w-5"
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.707 7.707a1 1 0 010-1.414L10 2.586l4.293 3.707a1 1 0 01-1.414 1.414L11 5.414V16a1 1 0 11-2 0V5.414l-1.879 1.879a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
            {sortDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 rounded-md shadow-lg z-8">
                <ul className="py-1">
                  <li>
                    <button
                      onClick={() => handleSortOptionClick("Name (asc)")}
                      className="block mb-1 text-white hover:bg-black w-full text-left"
                    >
                      Name (asc)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSortOptionClick("Name (desc)")}
                      className="block mb-1 text-white hover:bg-black w-full text-left"
                    >
                      Name (desc)
                    </button>
                  </li>
                  <li>
                    <button
                      onClick={() => handleSortOptionClick("Rarity")}
                      className="block text-white hover:bg-black w-full text-left"
                    >
                      Rarity
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Flowers List */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {flowers.map((flower) => (
          <Link
            key={flower.id}
            to={`/flower/${flower.id}`}
            className="bg-white p-4 rounded-lg shadow-md block"
          >
            <img
              src={flower.image_url}
              alt={flower.common_name}
              className="w-full h-48 object-cover rounded-md"
            />
            <h3 className="text-xl font-semibold mt-4">{flower.common_name}</h3>
          </Link>
        ))}
      </div>

      {/* Pagination Controls */}
      <div className="flex justify-center items-center space-x-4 mt-8">
        <button
          className="bg-gray-500 w-fit text-white px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={() => setPage((prevPage) => Math.max(prevPage - 1, 1))}
          disabled={page === 1}
        >
          Previous
        </button>
        <span className="text-lg font-semibold">Page {page}</span>
        <button
          className="bg-gray-500 w-fit text-white px-4 py-2 rounded-md hover:bg-gray-600"
          onClick={() => setPage((prevPage) => prevPage + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default FlowerListPage;
