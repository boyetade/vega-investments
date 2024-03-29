"use client";

import React, { useEffect, useState } from "react";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Tooltip,
  Legend,
  Title,
  ChartOptions,
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(
  LineElement,
  CategoryScale, // x axis
  LinearScale, // y axis
  PointElement,
  Title,
  Tooltip,
  Legend
);

const FilterButton = ({
  title,
  selected,
  onClick,
}: {
  title: string;
  selected: boolean;
  onClick: () => void;
}) => {
  return (
    <button
      className={`px-4 text-base rounded-md mr-2 mb-2 ${selected ? "bg-blue-500 text-white" : "bg-gray-200 text-gray-800"}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const HistoricalValue = () => {
  const [selectedButton, setSelectedButton] = useState<string | null>(
    "All time"
  );
  const [chartData, setChartData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);

  const handleClick = ({ title }: { title: string }) => {
    setSelectedButton(title);

    let filteredDates = chartData.labels; // Use result.labels directly
    if (title === "6 months") {
      filteredDates = filterByMonths(6);
    } else if (title === "9 months") {
      filteredDates = filterByMonths(9);
    } else if (title === "12 months") {
      filteredDates = filterByMonths(12);
    }

    const filteredChartData = {
      labels: filteredDates,
      datasets: chartData.datasets.map((dataset: any) => ({
        ...dataset,
        data: dataset.data.slice(0, filteredDates.length), // Slice data array to match the length of filtered dates
      })),
    };

    setChartData(filteredChartData);
  };

  const filterByMonths = (months: number) => {
    const currentDate = new Date();
    const startDate = new Date(
      currentDate.getFullYear(),
      currentDate.getMonth() - months,
      currentDate.getDate()
    );
    return chartData.labels.filter((label: string | number | Date) => {
      const labelDate = new Date(label);
      return labelDate >= startDate;
    });
  };

  //fetching price data
  useEffect(() => {
    const currentSelectedButton = selectedButton;
    const fetchData = async () => {
      try {
        const response = await fetch(
          "api/portfolios?period=${currentSelectedButton}"
        );
        const result = await response.json();
        const labels = result.labels;
        const totalValues = result.totalValues;

        const datasets = [
          {
            data: totalValues,
            borderColor: "rgb(53, 162, 235)",
            backgroundColor: "rgba(53, 162, 235, 0.5)",
          },
        ];

        if (currentSelectedButton === selectedButton) {
          setChartData({
            labels: labels,
            datasets: datasets,
          });
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [selectedButton]);

  const options: ChartOptions<"line"> = {
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        display: false,
      },
      tooltip: {
        mode: "index", // Display tooltips for each data point in the x-axis
        intersect: false, // Allow tooltips to appear for all points on the x-axis
        backgroundColor: "rgba(255, 255, 255, 0.7)",
        titleColor: "#000",
        bodyColor: "#000",
        borderColor: "#ddd",
        borderWidth: 1,
        displayColors: false,
      },
    },
    scales: {
      y: {
        grid: {
          display: false,
        },
      },
      x: {
        grid: {
          display: false,
        },
      },
    },
  };

  options.plugins = Object.assign({}, options.plugins);
  return (
    <div className="grid items-center min-h screen container mx-auto ">
      <div className="sm:col-span-1 md:col-span-2 lg:col-span-2  ">
        <div className="rounded-xl shadow-lg bg-white">
          <div className="p-5 flex flex-col m-6">
            <p className="text-xl md:text-2xl font-bold pb-3">
              {" "}
              Overall portfolio balance{" "}
            </p>
            {/* filter buttons */}
            <div className="flex flex-wrap gap-2">
              <FilterButton
                title="All time"
                selected={selectedButton === "All time"}
                onClick={() => handleClick({ title: "All time" })}
              />
              <FilterButton
                title="6 months"
                selected={selectedButton === "6 months"}
                onClick={() => handleClick({ title: "6 months" })}
              />
              <FilterButton
                title="9 months"
                selected={selectedButton === "9 months"}
                onClick={() => handleClick({ title: "9 months" })}
              />
              <FilterButton
                title="12 months"
                selected={selectedButton === "12 months"}
                onClick={() => handleClick({ title: "12 months" })}
              />
            </div>
          </div>
          {loading ? (
            <div className="flex flex-col items-center justify-center">
              <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
              <p>Just a moment, crunching the numbers for you!</p>
            </div>
          ) : (
            <Line
              key={JSON.stringify(chartData)}
              data={chartData}
              options={options}
              className="m-6"
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default HistoricalValue;
