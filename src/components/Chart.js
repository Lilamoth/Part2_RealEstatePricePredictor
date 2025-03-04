import { useEffect, useRef } from "react";
import { Chart } from "chart.js/auto";

const ChartComponent = ({ actualPrices = [], predictedPrices = [] }) => {
  const chartRef = useRef(null);

  useEffect(() => {
    const ctx = document.getElementById("chartCanvas");

    // ✅ Destroy previous chart instance before creating a new one
    if (chartRef.current !== null) {
      chartRef.current.destroy();
    }

    chartRef.current = new Chart(ctx, {
      type: "bar", // Changed from "line" to "bar"
      data: {
        labels: actualPrices.map((_, index) => `House ${index + 1}`),
        datasets: [
          { label: "Actual Price ($1000)", data: actualPrices, borderColor: "blue", backgroundColor: "black", fill: false },
          { label: "Predicted Price ($1000)", data: predictedPrices, borderColor: "red", backgroundColor: "white", fill: false }
        ]
      },
      options: {
        indexAxis: 'y', // Set the bar chart to be horizontal
        responsive: true,
        plugins: { legend: { display: true } }
      }
    });

    return () => {
      if (chartRef.current !== null) {
        chartRef.current.destroy();
      }
    };
  }, [actualPrices, predictedPrices]);

  return <canvas id="chartCanvas"></canvas>;
};

export default ChartComponent;
