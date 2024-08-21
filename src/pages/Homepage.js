import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDatabase,
  faPills,
  faHiking,
} from "@fortawesome/free-solid-svg-icons";

import LandingFlower from "../images/LandingFlower.jpg";
import Trilium from "../images/Trilium.jpg";
import Cardinal from "../images/Cardinal.jpg";
import Bloodroot from "../images/Bloodroot.jpg";

import BannerHome from "../images/bannerHome.jpg"

const HomePage = () => {
  const [flowers, setFlowers] = useState([]);

  useEffect(() => {
    axios
      .get("/api/flowers")
      .then((response) => {
        setFlowers(response.data);
      })
      .catch((error) => {
        console.error("There was an error fetching the flowers!", error);
      });
  }, []);

  return (
    <div>
      {/* Hero section */}
      <section
        className="relative text-center bg-cover bg-center"
        style={{
          height: "calc(100vh - 64px)",
          backgroundImage: `url(${LandingFlower})`,
        }}
      >
        <div className="absolute inset-0 bg-black opacity-50"></div>{" "}
        {/* Dark overlay */}
        <div className="relative container mx-auto flex flex-col justify-center items-center h-full">
          <h1 className="text-5xl font-bold text-white pb-6">FloraBase</h1>
          <p className="text-2xl text-white my-6">
            A platform with details on flowers found in Ontario
          </p>
          <a
            href="/flowers"
            className="mt-4 inline-block text-xl font-semibold text-black px-6 py-2 rounded-full landing-hero-btn"
          >
            Check Flowers
          </a>
        </div>
      </section>

      {/* Motives section */}
      <section id="motives" className="py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-16">Our Motives</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[250px]">
              <FontAwesomeIcon
                icon={faDatabase}
                className="text-green-500 text-4xl mb-4 pb-4"
              />
              <h3 className="text-xl font-semibold">Floral Database</h3>
              <p className="text-gray-600 mt-2 text-center">
                Get information about your favorite Ontario flowers
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[250px]">
              <FontAwesomeIcon
                icon={faPills}
                className="text-green-500 text-4xl mb-4 pb-4"
              />
              <h3 className="text-xl font-semibold">Herbs & Medicine</h3>
              <p className="text-gray-600 mt-2 text-center">
                Details on the medicinal value of the flowers
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-md flex flex-col items-center justify-center min-h-[250px]">
              <FontAwesomeIcon
                icon={faHiking}
                className="text-green-500 text-4xl mb-4 pb-4"
              />
              <h3 className="text-xl font-semibold">Personal Hobby</h3>
              <p className="text-gray-600 mt-2 text-center">
                Encouragement towards your personal hobby
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Flowers Section */}
      <section className="bg-gray-200 py-16">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold mb-16">Popular Flowers</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Link
              to="/flower/trillium"
              className="bg-white p-4 rounded-lg shadow-md block"
            >
              <div className="overflow-hidden rounded-md">
                <img
                  src={Trilium}
                  alt="Trillium"
                  className="w-full h-64 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mt-6 pt-2 border-t-2 border-gray-600">
                Trillium
              </h3>
            </Link>

            <Link
              to="/flower/cardinal"
              className="bg-white p-4 rounded-lg shadow-md block"
            >
              <div className="overflow-hidden rounded-md">
                <img
                  src={Cardinal}
                  alt="Cardinal"
                  className="w-full h-64 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mt-6 pt-2 border-t-2 border-gray-600">
                Cardinal
              </h3>
            </Link>

            <Link
              to="/flower/bloodroot"
              className="bg-white p-4 rounded-lg shadow-md block"
            >
              <div className="overflow-hidden rounded-md">
                <img
                  src={Bloodroot}
                  alt="Bloodroot"
                  className="w-full h-64 object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mt-6 pt-2 border-t-2 border-gray-600">
                Bloodroot
              </h3>
            </Link>
          </div>
          <div className="text-center mt-10">
            <Link to="/flowers" className="text-pink-500 hover:underline">
              Check All Flowers &gt;&gt;
            </Link>
          </div>
        </div>
      </section>

      {/* Banner */}
      <section
        className="py-16 bg-cover bg-center text-center text-black"
        style={{ backgroundImage: `url(${BannerHome})` }}
      >
        <div className="container mx-auto">
          <h2 className="text-2xl lg:text-3xl bannerText">For the people, by the people</h2>
        </div>
      </section>

      {/* <h1>Welcome to FloraBase</h1> */}
      <ul>
        {flowers.map((flower) => (
          <li key={flower._id}>{flower.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default HomePage;
