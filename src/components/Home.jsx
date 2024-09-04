// components/Home.jsx
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { analyzePlantWithGemini } from "../utils/geminiApi";

function Home({ setPlantData }) {
  const [plantDetails, setPlantDetails] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const response = await analyzePlantWithGemini(plantDetails, imageFile);
      setPlantData(response);
      navigate("/plant-details");
    } catch (error) {
      console.error("Error analyzing plant:", error);
      alert("An error occurred while analyzing the plant. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setImageFile(e.target.files[0]);
    }
  };

  return (
    <div className="max-w-2xl mx-auto">
      <h1 className="text-3xl font-bold mb-6 text-center text-green-800">
        Analyze Your Plant
      </h1>
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="plantDetails"
          >
            Plant Details
          </label>
          <textarea
            id="plantDetails"
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            rows="4"
            value={plantDetails}
            onChange={(e) => setPlantDetails(e.target.value)}
            placeholder="Enter plant details..."
          />
        </div>
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="plantImage"
          >
            Plant Image (optional)
          </label>
          <input
            type="file"
            id="plantImage"
            accept="image/*"
            onChange={handleImageChange}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
          />
        </div>
        {imageFile && (
          <div className="mb-4">
            <img
              src={URL.createObjectURL(imageFile)}
              alt="Plant preview"
              className="max-w-full h-auto rounded-md"
            />
          </div>
        )}
        <div className="flex items-center justify-between">
          <button
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Analyzing..." : "Analyze Plant"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default Home;
