import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLinkedin,
  faFacebook,
  faInstagram,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

const Footer = () => {
  return (
    <footer className="text-white py-6">
      <div className="container mx-auto text-center">
        {/* Social Media Icons */}
        <div className="flex justify-center space-x-10">
          <a
            href="https://www.linkedin.com"
            className="text-white hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faLinkedin} size="2x" />
          </a>
          <a
            href="https://www.facebook.com"
            className="text-white hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faFacebook} size="2x" />
          </a>
          <a
            href="https://www.instagram.com"
            className="text-white hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faInstagram} size="2x" />
          </a>
          <a
            href="https://www.youtube.com"
            className="text-white hover:text-green-600"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FontAwesomeIcon icon={faYoutube} size="2x" />
          </a>
        </div>

        {/* Footer Nav Menu */}
        <div className="mt-8 flex flex-col space-y-4 sm:flex-row sm:space-y-0 sm:space-x-8 lg:space-x-16 items-center justify-center">
          <a href="/donate" className="text-white hover:text-green-600">
            Donate
          </a>
          <a href="/flowers" className="text-white hover:text-green-600">
            Flowers
          </a>
          <a href="/about" className="text-white hover:text-green-600">
            About
          </a>
          <a href="/motives" className="text-white hover:text-green-600">
            Motives
          </a>
          <a href="/career" className="text-white hover:text-green-600">
            Career
          </a>
        </div>

        {/* Copyright text */}
        <p className="mt-8 text-sm font-thin border-t-2 pt-6">
          &copy; 2024 FloraBase. All Rights Reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
