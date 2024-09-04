import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import Home from './components/Home';
import PlantDetails from './components/PlantDetails';

function App() {
  const [plantData, setPlantData] = useState(null);

  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <nav className="bg-green-600 text-white p-4">
          <div className="container mx-auto">
            <Link to="/" className="text-2xl font-bold">Plant Disease Detector</Link>
          </div>
        </nav>

        <div className="container mx-auto mt-8 p-4">
          <Routes>
            <Route path="/" element={<Home setPlantData={setPlantData} />} />
            <Route path="/plant-details" element={<PlantDetails plantData={plantData} />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;