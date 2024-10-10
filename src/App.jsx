import React, { useState } from "react";
import axios from "axios";
import "animate.css";

const App = () => {
  const [prompt, setPrompt] = useState(""); // User input
  const [images, setImages] = useState([]); // Images array
  const [loading, setLoading] = useState(false); // Loading state
  const [error, setError] = useState(null); // Error state

  // Fetch images from Unsplash API based on the user's prompt
  const fetchImages = async () => {
    setLoading(true);
    setError(null);
    setImages([]);

    try {
      const response = await axios.get(
        "https://api.unsplash.com/search/photos",
        {
          params: {
            query: prompt,
            per_page: 10,
          },
          headers: {
            Authorization: `Client-ID fblvEw8nfIVCRehFXzSoBBN2Y_lrzMZFDMhQHSJZeY8`, // Replace with your Unsplash API key
          },
        }
      );

      console.log("response :", response);

      setImages(response.data.results); // Store the image results
    } catch (err) {
      setError("Failed to fetch images. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent page refresh
    if (prompt.trim()) {
      fetchImages(); // Fetch images when the form is submitted
    } else {
      setError("Please enter a valid prompt.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-700 to-blue-500 flex flex-col items-center justify-center text-white">
      <h1 className="text-4xl font-bold text-[#cae6ef] my-8 animate-pulse">
        Image Search with Unsplash
      </h1>

      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md flex justify-center mb-8"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter a search term"
          className="w-full px-4 py-2 rounded-l-lg shadow-lg focus:outline-none text-black"
        />
        <button
          type="submit"
          className="bg-[#3f768a]  hover:bg-[#325e6d] transition duration-300 text-white px-4 py-2 rounded-r-lg shadow-lg"
        >
          Search
        </button>
      </form>

      {loading && <p className="text-lg animate-bounce">Loading...</p>}

      {error && <p className="text-red-500 text-lg">{error}</p>}

      {images.length > 0 && (
        <div className=" grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 px-4 w-full max-w-5xl">
          {images.map((image) => (
            <div
              key={image.id}
              className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-300 hover:scale-105"
            >
              <img
                src={image.urls.small}
                alt={image.alt_description || "Unsplash Image"}
                className="w-full h-64 object-cover"
              />
              <div className="p-4">
                <p className="text-gray-700">
                  {image.alt_description || "No description available"}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Show message if no images found */}
      {!loading && !error && images.length === 0 && (
        <p className="text-lg">
          No images found. Try searching for something else.
        </p>
      )}
    </div>
  );
};

export default App;
