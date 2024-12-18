import { useRef, useEffect } from "react";
import styles from "../../styles/users.module.css";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  BarController,
} from "chart.js";
import { Bmi } from "@/types";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend
);

type Props = {
  bmis: Array<Bmi>;
};

const BmiDataTable: React.FC<Props> = ({ bmis }: Props) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstanceRef = useRef<ChartJS | null>(null); // Store the chart instance

  useEffect(() => {
    // Destroy the previous chart instance before creating a new one
    if (chartInstanceRef.current) {
      chartInstanceRef.current.destroy();
    }

    if (bmis.length === 0) return;

    const bmiValues = bmis.map((bmi) => bmi.bmiValue);
    const labels = Array.from({ length: bmiValues.length }, (_, i) => i + 1);

    const maxBmi = Math.max(...bmiValues); // Find the highest BMI value
    const yMax = maxBmi + 10;

    // Create a new chart or update the existing chart
    if (chartRef.current) {
      chartInstanceRef.current = new ChartJS(chartRef.current, {
        type: "bar",
        data: {
          labels,
          datasets: [
            {
              label: "BMI Values",
              data: bmiValues,
              backgroundColor: "rgba(11, 27, 154, 0.5)",
              borderColor: "rgb(5, 16, 115)",
              borderWidth: 2,
            },
          ],
        },
        options: {
          responsive: true, // Make the chart responsive
          maintainAspectRatio: true, // Maintain the aspect ratio
          scales: {
            x: {
              title: {
                display: true,
                text: "Entry Number",
              },
            },
            y: {
              beginAtZero: true,
              title: {
                display: true,
                text: "BMI Values",
              },
              suggestedMax: yMax,
              grid: {
                display: false,
              },
            },
          },
        },
      });
    }
  }, [bmis]); // Ensures effect runs when `bmis` changes

  // If chart already exists, update data without destroying it
  useEffect(() => {
    if (chartInstanceRef.current && bmis.length > 0) {
      const bmiValues = bmis.map((bmi) => bmi.bmiValue);
      const labels = Array.from({ length: bmiValues.length }, (_, i) => i + 1);

      // Update chart data
      chartInstanceRef.current.data.labels = labels;
      chartInstanceRef.current.data.datasets[0].data = bmiValues;
      chartInstanceRef.current.update(); // Update the chart without destroying it
    }
  }, [bmis]); // This effect will trigger when `bmis` changes

  return (
    <>
      <h1 className={styles.h1Graph}>All BMI values</h1>
      <div
        style={{
          position: "relative",
          width: "100%",
          height: "80vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }} //css met classname wil hier op niet werken voor een of andere reden??
      >
        {" "}
        <canvas ref={chartRef} width="100%" height="100%" />
      </div>
    </>
  );
};

export default BmiDataTable;
