import React from "react";

function PlantDetails({ plantData }) {
  if (!plantData)
    return (
      <div className="text-center text-gray-600">No plant data available</div>
    );

  return (
    <div className="max-w-2xl mx-auto bg-white shadow-md rounded px-8 pt-6 pb-8">
      <h2 className="text-2xl font-bold mb-4 text-green-800">
        Plant Analysis Results
      </h2>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-green-700">
          Plant Details
        </h3>
        <p className="text-gray-700">{plantData.details}</p>
      </div>
      <div className="mb-4">
        <h3 className="text-xl font-semibold mb-2 text-green-700">
          Detected Diseases
        </h3>
        <ul className="list-disc list-inside text-gray-700">
          {plantData.diseases.map((disease, index) => (
            <li key={index}>{disease}</li>
          ))}
        </ul>
      </div>
      <div>
        <h3 className="text-xl font-semibold mb-2 text-green-700">Treatment</h3>
        <p className="text-gray-700">{plantData.treatment}</p>
      </div>
    </div>
  );
}

export default PlantDetails;
