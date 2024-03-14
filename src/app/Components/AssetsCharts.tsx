"use client";

import React, { useEffect, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from "chart.js";

Chart.register(ArcElement, Tooltip, Legend);

//Filter buttons
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
      className={`px-4 text-base rounded-md mr-2 mb-2 ${selected ? "bg-blue-500 text-white  font-semibold" : "bg-gray-200 text-gray-800 "}`}
      onClick={onClick}
    >
      {title}
    </button>
  );
};

const AssetsCharts = () => {
  const [assets, setAssets] = useState<any[]>([]);
  const [prices, setPrices] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [allData, setAllData] = useState<any>({
    labels: [],
    datasets: [
      {
        label: "Poll",
        data: [] as number[],
        backgroundColor: ["blue", "rgb(6 182 212)", "red", "black", "purple"],
      },
    ],
  });
  const [filteredData, setFilteredData] = useState<any>(null);
  const [filter, setFilter] = useState<string>("all");

  //Fetching asset and pricing data
  useEffect(() => {
    const fetchData = async () => {
      try {
        const assetsResponse = await fetch("/api/assets");
        const assetsData = await assetsResponse.json();
        setAssets(assetsData);

        const pricesResponse = await fetch("/api/prices");
        const pricesData = await pricesResponse.json();
        setPrices(pricesData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  //changes to data depending on filter
  useEffect(() => {
    if (assets.length > 0 && prices.length > 0) {
      setAllData(generateChartData("all"));
    }
  }, [assets, prices]);

  useEffect(() => {
    if (assets.length > 0 && prices.length > 0) {
      setFilteredData(generateChartData(filter));
    }
  }, [assets, prices, filter]);

  const filteredAssets =
    filter === "all" ? assets : assets.filter((asset) => asset.type === filter);
  const assetTypes = Array.from(
    new Set(filteredAssets.map((asset) => asset.type))
  );

  const assetTypesList = Array.from(new Set(assets.map((asset) => asset.type)));

  //Random blue generator
  const generateShadesOfBlue = (baseColor: string, numShades: number) => {
    const shades = [];
    const baseRGB = baseColor.match(/\d+/g);

    if (!baseRGB || baseRGB.length !== 3) {
      return Array(numShades).fill("rgba(6 182 212)");
    }

    const increment = 140 / (numShades - 1);

    for (let i = 0; i < numShades; i++) {
      const newR = Math.round(Number(baseRGB[0]) + i * increment);
      const newG = Math.round(Number(baseRGB[1]) + i * increment);
      const newB = Math.round(Number(baseRGB[2]) + i * increment);
      shades.push(`rgba(${newR}, ${newG}, ${newB}, 0.6)`);
    }

    return shades;
  };

  const generateChartData = (filter: string) => {
    let chartData;
    if (filter === "all") {
      const assetTypes = Array.from(new Set(assets.map((asset) => asset.type)));
      chartData = {
        labels: assetTypes,
        datasets: [
          {
            label: "Asset Price",
            data: assetTypes.map((assetType) => {
              const filteredAssetsOfType = assets.filter(
                (asset) => asset.type === assetType
              );
              const totalValue = filteredAssetsOfType.reduce(
                (sum, accumulator) => {
                  const price = prices.find(
                    (price) => price.asset === accumulator.name
                  );
                  return sum + (price ? price.price : 0);
                },
                0
              );
              return totalValue;
            }),
            backgroundColor: generateShadesOfBlue(
              "rgb(6 182 212);",
              assetTypes.length
            ),
            borderColor: [],
          },
        ],
      };
    } else {
      const filteredAssetsOfType = assets.filter(
        (asset) => asset.type === filter
      );
      chartData = {
        labels: filteredAssetsOfType.map((asset) => asset.name),
        datasets: [
          {
            label: "Asset Price",
            data: filteredAssetsOfType.map((asset) => {
              const price = prices.find((price) => price.asset === asset.name);
              return price ? price.price : 0;
            }),
            backgroundColor: generateShadesOfBlue(
              "rgb(6 182 212);",
              filteredAssetsOfType.length
            ),
            borderColor: [],
          },
        ],
      };
    }

    return chartData;
  };

  const handleFilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const options = {
    elements: {
      arc: {
        borderWidth: 0,
      },
    },
    plugins: {
      tooltip: {
        backgroundColor: "rgba(0, 0, 0, 0.3)",
      },
    },
  };

  return (
    <div className="grid  min-h-screen  container mx-auto ">
      <div className="col-span-1 md:col-span-1 lg:col-span-1">
        <div className="rounded-xl shadow-lg bg-white ">
          <div className="p-5 flex flex-col m-6">
            <p className="text-xl md:text-2xl font-bold pb-3">
              {" "}
              Your Portfolio diversity
            </p>
            <div className="flex">
              <FilterButton
                title={"All"}
                selected={filter === "all"}
                onClick={() => handleFilterChange("all")}
              />
              {assetTypesList.map((assetType) => (
                <FilterButton
                  key={assetType}
                  title={assetType}
                  selected={assetType === filter}
                  onClick={() => handleFilterChange(assetType)}
                />
              ))}
            </div>

            {loading ? (
              <div className="flex flex-col items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500 mb-2"></div>
                <p>Sit back and relax while we whip up your chart magic</p>
              </div>
            ) : (
              <Doughnut
                data={filter === "all" ? allData : filteredData}
                options={options}
                className="m-6"
              ></Doughnut>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AssetsCharts;
