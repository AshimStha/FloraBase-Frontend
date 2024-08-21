import React from "react";

const AboutUsPage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <main className="container mx-auto p-4">
        <div className="bg-white p-8 rounded-lg shadow-md max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-center mb-8 text-green-600">
            About FloraBase
          </h1>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            FloraBase is a comprehensive platform dedicated to connecting plant
            enthusiasts with a rich database of flora. Whether you are a
            botanist, a gardener, or simply someone with a passion for plants,
            FloraBase provides you with detailed information on a wide variety
            of plants, including their common names, scientific names, family,
            genus, and other botanical details.
          </p>

          <h2 className="text-2xl font-semibold text-green-600 mt-8 mb-4">
            My Mission
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            My mission is to make botanical knowledge accessible to everyone. By
            leveraging modern technology, I aim to create a comprehensive and
            user-friendly platform where users can explore, learn, and share
            knowledge about different plant species. I believe in the power of
            education and the importance of preserving nature, and through
            FloraBase, I hope to inspire a greater appreciation for the world’s
            flora.
          </p>

          <h2 className="text-2xl font-semibold text-green-600 mt-8 mb-4">
            The Mind Behind FloraBase
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            FloraBase is the result of my passion for plants and technology.
            With a background in Web Development, I have combined my skills and
            love for nature to create this platform. As the sole developer,
            designer, and researcher behind FloraBase, I am committed to
            continuously enhancing the platform by adding more plant species,
            improving user experience, and staying up-to-date with the latest
            research in botany.
          </p>

          <h2 className="text-2xl font-semibold text-green-600 mt-8 mb-4">
            Contact Me
          </h2>
          <p className="text-lg leading-relaxed text-gray-700 mb-6">
            I love hearing from my users! Whether you have a question, a
            suggestion, or just want to share your love for plants, feel free to
            reach out to me. You can contact me at
            <a href="mailto:ashimshrestha125@gmail.com" className="text-green-600">
              {" "}
              ashimshrestha125@gmail.com
            </a>
            , or connect with me on social media channels.
          </p>

          <div className="text-center mt-8">
            <button
              className="bg-green-500 text-white px-6 py-3 rounded-md hover:bg-green-600"
              onClick={() => window.history.back()}
            >
              Go Back
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AboutUsPage;
