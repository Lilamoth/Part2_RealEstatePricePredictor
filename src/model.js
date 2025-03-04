// import * as brain from "brain.js";
// import dataset from './data/dataset.json';

// // Normalize dataset (convert price from thousands to a scale of 0-1)
// const maxArea = 5000, maxBedrooms = 5, maxBathrooms = 3, maxLocation = 2, maxAge = 50, maxPrice = 1500;

// const trainingData = dataset.map(({ area, bedrooms, bathrooms, location, age, price }) => ({
//   input: [area / maxArea, bedrooms / maxBedrooms, bathrooms / maxBathrooms, location / maxLocation, age / maxAge],
//   output: [price / maxPrice] // ✅ Normalize price properly
// }));

// // Create a neural network with better learning
// const net = new brain.NeuralNetwork({
//   hiddenLayers: [10, 10, 5], // Improved accuracy with more layers
// });

// // Load or train model
// const loadModel = () => {
//   const savedModel = localStorage.getItem('model');
//   if (savedModel) {
//     net.fromJSON(JSON.parse(savedModel));
//     console.log("✅ Loaded model from LocalStorage");
//   } else {
//     console.log("🚀 Training new model...");
//     net.train(trainingData, {
//       iterations: 20000,  // ✅ Increased training iterations for better accuracy
//       log: true,
//       logPeriod: 1000,  // Log progress every 1000 iterations
//       errorThresh: 0.002,  // Lower error threshold for better predictions
//     });

//     saveModel();
//   }
// };

// // Function to predict price
// export const predictPrice = (area, bedrooms, bathrooms, location, age) => {
//   const output = net.run([area / maxArea, bedrooms / maxBedrooms, bathrooms / maxBathrooms, location / maxLocation, age / maxAge]);
//   return Math.round(output[0] * maxPrice * 1000);  // ✅ Convert back to actual price in dollars
// };

// // Save trained model
// export const saveModel = () => {
//   localStorage.setItem('model', JSON.stringify(net.toJSON()));
// };

// // Load model when app starts
// loadModel();


import * as brain from "brain.js";
import dataset from './data/dataset.json';

// Normalize dataset for training
const maxArea = 5000, maxBedrooms = 5, maxBathrooms = 3, maxLocation = 2, maxAge = 50, maxPrice = 1500;

const trainingData = dataset.map(({ area, bedrooms, bathrooms, location, age, price }) => ({
  input: [area / maxArea, bedrooms / maxBedrooms, bathrooms / maxBathrooms, location / maxLocation, age / maxAge],
  output: [price / maxPrice]
}));

// Create Neural Network
const net = new brain.NeuralNetwork({
  hiddenLayers: [10, 10, 5], // Improves accuracy
});

// Save Model to LocalStorage
export const saveModel = () => {  // ✅ Now explicitly exported
  localStorage.setItem('model', JSON.stringify(net.toJSON()));
  console.log("💾 Model saved to LocalStorage.");
};

// Load Model from LocalStorage
export const loadModel = () => {  // ✅ Also explicitly exported
  const savedModel = localStorage.getItem('model');
  if (savedModel) {
    net.fromJSON(JSON.parse(savedModel));
    console.log("✅ Loaded saved model from LocalStorage.");
  } else {
    console.log("🚀 No saved model found. Training a new model...");
    trainModel();
  }
};

// Train and Save Model
const trainModel = () => {
  net.train(trainingData, {
    iterations: 20000,
    log: true,
    logPeriod: 5000,
    errorThresh: 0.002, 
  });

  saveModel();
};

// Predict Price
export const predictPrice = (area, bedrooms, bathrooms, location, age) => {
  const output = net.run([area / maxArea, bedrooms / maxBedrooms, bathrooms / maxBathrooms, location / maxLocation, age / maxAge]);
  return Math.round(output[0] * maxPrice * 1000);
};

// Start by loading the model
loadModel();
