// import { useState } from "react";
// import dataset from "../data/dataset.json";

// const Prediction = ({ price, formData }) => {
//   const [feedback, setFeedback] = useState(null);

//   // ✅ Improved Similar House Matching
//   const findSimilarHouses = () => {
//     if (!formData) return [];

//     const similarHouses = dataset.filter((house) => {
//       const isSimilar =
//         Math.abs(house.area - formData.area) <= 3000 &&  // ✅ Increased to ±3000 sqft
//         Math.abs(house.bedrooms - formData.bedrooms) <= 2 &&  // ✅ Allow ±2 bedrooms
//         Math.abs(house.bathrooms - formData.bathrooms) <= 2 &&  // ✅ Allow ±2 bathrooms
//         Math.abs(house.age - formData.age) <= 20 &&  // ✅ Allow ±20 years difference
//         (house.location === formData.location || formData.location === "");  // ✅ Relax location matching slightly

//       return isSimilar;
//     });

//     console.log("🔍 Found Similar Houses:", similarHouses);
//     return similarHouses.slice(0, 5);  // ✅ Show up to 5 similar houses
//   };

//   const similarHouses = findSimilarHouses();

//   const handleFeedback = (response) => {
//     setFeedback(response);
//     localStorage.setItem("prediction_feedback", response);
//   };

//   return (
//     <div className="container mt-3">
//       {price !== null ? (
//         <>
//           <h4>Predicted Price: ${price.toLocaleString()}</h4>

//           <h5>🔍 Similar Houses:</h5>
//           {similarHouses.length > 0 ? (
//             <ul>
//               {similarHouses.map((house, index) => (
//                 <li key={index}>
//                   {house.area} sqft | {house.bedrooms} Bed | {house.bathrooms} Bath | Age: {house.age} years →  
//                   <strong> ${house.price.toLocaleString()}</strong>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>⚠️ No exact matches, but consider adjusting your search.</p>
//           )}

//           <p>Was this prediction accurate?</p>
//           <button className="btn btn-success m-2" onClick={() => handleFeedback("accurate")}>
//             ✅ Yes
//           </button>
//           <button className="btn btn-danger m-2" onClick={() => handleFeedback("inaccurate")}>
//             ❌ No
//           </button>

//           {feedback && <p className="mt-2">Thank you for your feedback! ({feedback})</p>}
//         </>
//       ) : (
//         <p>No prediction yet.</p>
//       )}
//     </div>
//   );
// };

// export default Prediction;


// import { useState } from "react";
// import dataset from "../data/dataset.json";

// const Prediction = ({ price, formData }) => {
//   const [feedback, setFeedback] = useState(null);

//   console.log("🟢 Prediction.js Loaded Successfully");

//   const findSimilarHouses = () => {
//     console.log("🟢 Running findSimilarHouses...");

//     if (!formData) {
//       console.log("⚠️ No formData available. Exiting function.");
//       return [];
//     }

//     console.log("🔍 User Input (Form Data):", formData);
//     console.log("📊 Checking dataset for matches...");

//     const similarHouses = dataset.filter((house) => {
//       const matchesArea = Math.abs(house.area - formData.area) <= 3000;
//       const matchesBedrooms = Math.abs(house.bedrooms - formData.bedrooms) <= 2;
//       const matchesBathrooms = Math.abs(house.bathrooms - formData.bathrooms) <= 2;
//       const matchesAge = Math.abs(house.age - formData.age) <= 20;
//       const matchesLocation = house.location === Number(formData.location); // ✅ Fixed location type issue

//       console.log(
//         `Checking House: ${house.area} sqft | ${house.bedrooms} Bed | ${house.bathrooms} Bath | Age: ${house.age} years | Location: ${house.location}`,
//         {
//           matchesArea,
//           matchesBedrooms,
//           matchesBathrooms,
//           matchesAge,
//           matchesLocation,
//         }
//       );

//       return matchesArea && matchesBedrooms && matchesBathrooms && matchesAge && matchesLocation;
//     });

//     console.log("🔍 Found Similar Houses:", similarHouses);
//     return similarHouses.slice(0, 5);
//   };

//   const similarHouses = findSimilarHouses();

//   const handleFeedback = (response) => {
//     setFeedback(response);
//     localStorage.setItem("prediction_feedback", response);
//   };

//   return (
//     <div className="container mt-3">
//       {price !== null ? (
//         <>
//           <h4>Predicted Price: ${price.toLocaleString()}</h4>

//           <h5>🔍 Similar Houses:</h5>
//           {similarHouses.length > 0 ? (
//             <ul>
//               {similarHouses.map((house, index) => (
//                 <li key={index}>
//                   {house.area} sqft | {house.bedrooms} Bed | {house.bathrooms} Bath | Age: {house.age} years →  
//                   <strong> ${house.price.toLocaleString()}</strong>
//                 </li>
//               ))}
//             </ul>
//           ) : (
//             <p>⚠️ No exact matches, but consider adjusting your search.</p>
//           )}

//           <p>Was this prediction accurate?</p>
//           <button className="btn btn-success m-2" onClick={() => handleFeedback("accurate")}>
//             ✅ Yes
//           </button>
//           <button className="btn btn-danger m-2" onClick={() => handleFeedback("inaccurate")}>
//             ❌ No
//           </button>

//           {feedback && <p className="mt-2">Thank you for your feedback! ({feedback})</p>}
//         </>
//       ) : (
//         <p>No prediction yet.</p>
//       )}
//     </div>
//   );
// };

// export default Prediction;

// import { useState } from "react";
// import Form from "./components/Form";
// import Prediction from "./components/Prediction";
// import ChartComponent from "./components/Chart";
// import "./styles.css";
// import dataset from "./data/dataset.json";

// const App = () => {
//   const [prediction, setPrediction] = useState(null);
//   const [error, setError] = useState(null);
//   const [formData, setFormData] = useState(null);
//   const [predictedPrices, setPredictedPrices] = useState([]);

//   const actualPrices = dataset.map((data) => data.price);

//   const handlePrediction = (price, data) => {
//     setPrediction(price);
//     setFormData(data);
//     setPredictedPrices([...predictedPrices, price / 1000]);

//     window.scrollTo({ top: 0, behavior: "smooth" });
//   };

//   return (
//     <div className="App container">
//       <h2 className="title">🏡 Real Estate Price Prediction</h2>  
//       <Form setPrediction={handlePrediction} setError={setError} />
//       <Prediction price={prediction} formData={formData} />
//       <ChartComponent actualPrices={actualPrices} predictedPrices={predictedPrices} />
//     </div>
//   );
// };

// export default App;

import { useState } from "react";
import dataset from "../data/dataset.json";

const Prediction = ({ price, formData }) => {
  const [feedback, setFeedback] = useState(null);

  const findSimilarHouses = () => {
    if (!formData) return [];

    const similarHouses = dataset.filter((house) => {
      const matchesArea = Math.abs(house.area - formData.area) <= 3000;
      const matchesBedrooms = Math.abs(house.bedrooms - formData.bedrooms) <= 2;
      const matchesBathrooms = Math.abs(house.bathrooms - formData.bathrooms) <= 2;
      const matchesAge = Math.abs(house.age - formData.age) <= 20;
      const matchesLocation = house.location === Number(formData.location);

      return matchesArea && matchesBedrooms && matchesBathrooms && matchesAge && matchesLocation;
    });

    return similarHouses.slice(0, 5);
  };

  const similarHouses = findSimilarHouses();

  const handleFeedback = (response) => {
    setFeedback(response);
    localStorage.setItem("prediction_feedback", response);
  };

  return (
    <div className="container mt-3">
      {price !== null ? (
        <>
          <h4>Predicted Price: ${price.toLocaleString()}</h4>

          <h5>🔍 Similar Houses:</h5>
          {similarHouses.length > 0 ? (
            <ul>
              {similarHouses.map((house, index) => (
                <li key={index}>
                  {house.area} sqft | {house.bedrooms} Bed | {house.bathrooms} Bath | Age: {house.age} years →  
                  <strong> ${house.price.toLocaleString()}</strong>
                </li>
              ))}
            </ul>
          ) : (
            <p>⚠️ No exact matches, but consider adjusting your search.</p>
          )}

          <p>Was this prediction accurate?</p>
          <button className="btn btn-success m-2" onClick={() => handleFeedback("accurate")}>
            ✅ Yes
          </button>
          <button className="btn btn-danger m-2" onClick={() => handleFeedback("inaccurate")}>
            ❌ No
          </button>

          {feedback && <p className="mt-2">Thank you for your feedback! ({feedback})</p>}
        </>
      ) : (
        <p>No prediction yet.</p>
      )}
    </div>
  );
};

export default Prediction;

