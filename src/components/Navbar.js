import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import axios from "axios";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
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
          setUser(response.data);
        } catch (error) {
          console.error("Failed to fetch user data", error);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    navigate("/login");
  };

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="sticky top-0 z-10 bg-white shadow-lg">
      <div className="container mx-auto p-4 flex justify-between items-center">
        <div className="text-2xl font-bold text-black">
          <Link to="/">FloraBase</Link>
        </div>
        <div className="hidden md:flex space-x-6">
          <Link to="/about" className="text-gray-600 hover:text-green-600">
            About
          </Link>
          <ScrollLink
            to="motives"
            smooth={true}
            duration={500}
            className="text-gray-600 hover:text-green-600 cursor-pointer"
          >
            Motives
          </ScrollLink>
          <Link to="/flowers" className="text-gray-600 hover:text-green-600">
            Flowers
          </Link>
        </div>
        <div className="hidden md:flex space-x-4 relative">
          {user ? (
            <div className="flex items-center space-x-4">
              <span className="text-gray-600">Welcome, {user.firstname}</span>
              <div className="relative">
                <img
                  src={
                    user.isAdmin
                      ? "https://via.placeholder.com/100" // Default image for admin
                      : user.profilePicture || "https://via.placeholder.com/100"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full cursor-pointer"
                  onClick={toggleDropdown}
                />
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow-lg z-10">
                    {user.isAdmin ? (
                      <Link
                        to="/admin/dashboard"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Dashboard
                      </Link>
                    ) : (
                      <Link
                        to="/profile"
                        className="block px-4 py-2 text-gray-800 hover:bg-gray-200"
                        onClick={() => setDropdownOpen(false)}
                      >
                        Profile
                      </Link>
                    )}
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="text-black font-bold px-4 py-2 nav-user-btns"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="text-black font-bold px-4 py-2 nav-user-btns"
              >
                Log In
              </Link>
            </>
          )}
        </div>
        <div className="md:hidden flex items-center">
          <button onClick={toggleMenu}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d={isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16m-7 6h7"}
              ></path>
            </svg>
          </button>
        </div>
      </div>
      {isOpen && (
        <div className="md:hidden">
          <Link
            to="/about"
            className="block px-4 py-2 text-gray-600 hover:text-green-500"
          >
            About
          </Link>
          <ScrollLink
            to="motives"
            smooth={true}
            duration={500}
            className="block px-4 py-2 text-gray-600 hover:text-green-500 cursor-pointer"
          >
            Motives
          </ScrollLink>
          <Link
            to="/flowers"
            className="block px-4 py-2 text-gray-600 hover:text-green-500"
          >
            Flowers
          </Link>
          {user ? (
            <div className="block px-4 py-2 text-gray-600">
              <span>Welcome, {user.firstname}</span>
              <Link to={user.isAdmin ? "/admin/dashboard" : "/profile"}>
                <img
                  src={
                    user.isAdmin
                      ? "https://via.placeholder.com/100" // Default image for admin
                      : user.profilePicture || "https://via.placeholder.com/100"
                  }
                  alt="Profile"
                  className="w-8 h-8 rounded-full"
                />
              </Link>
              <button
                onClick={handleLogout}
                className="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-200"
              >
                Logout
              </button>
            </div>
          ) : (
            <>
              <Link
                to="/register"
                className="block px-4 py-2 text-black hover:text-gray-800 nav-user-btns"
              >
                Sign Up
              </Link>
              <Link
                to="/login"
                className="block px-4 py-2 text-black hover:text-gray-800 nav-user-btns"
              >
                Log In
              </Link>
            </>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
