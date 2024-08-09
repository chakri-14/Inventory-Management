import { useState, useRef, useEffect } from "react";
import { Line, Pie } from "react-chartjs-2";
import "chart.js/auto";

const PieChart = ({ data }) => {
  const ref = useRef(null);
  useEffect(() => {
    return ref?.current?.destroy();
  }, []);
  return (
    <Pie
      ref={ref}
      data={{
        labels: data.title,
        datasets: [
          {
            label: data.labels,
            data: data.data,
          },
        ],
      }}
    />
  );
};

export default PieChart;
