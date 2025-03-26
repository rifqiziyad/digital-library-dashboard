"use client";
import Navigation from "@/components/navigation";
import dynamic from "next/dynamic";
import "chart.js/auto";
const Bar = dynamic(() => import("react-chartjs-2").then((mod) => mod.Bar), {
  ssr: false,
});
import MOST_BORROWED from "../../data/MOST_BORROWED.json";
import MONTHLY_LENDING_TRENDS from "../../data/MONTHLY_LENDING.json";
import BOOK_BY_CATEGORY from "../../data/BOOK_BY_CATEGORY.json";
import { useEffect, useState } from "react";
import axios from "axios";

const options = [
  "Most borrowed books",
  "Monthly lending trends",
  "Books by category distribution",
];

const listUrlChart = [
  "https://run.mocky.io/v3/0fd10adb-85d1-4762-89d4-f1939cc1f9f7",
  "https://run.mocky.io/v3/2e67680d-d4bf-493c-b824-0aa26a6f4570",
  "https://run.mocky.io/v3/fef9ff42-57ef-4d65-8335-a6d7c93b6865",
];

const listDataChart = [MOST_BORROWED, MONTHLY_LENDING_TRENDS, BOOK_BY_CATEGORY];

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("0");
  const [dataCharat, setDataChart] = useState(listDataChart[0]);
  const data = {
    labels: dataCharat.labels,
    datasets: [
      {
        label: options[parseInt(selectedOption)],
        data: dataCharat.data,
        backgroundColor: [
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: ["rgba(255, 159, 64, 1)", "rgba(153, 102, 255, 1)"],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    handleGetCharts();
  }, [selectedOption]);

  const handleGetCharts = () => {
    axios
      .get(listUrlChart[parseInt(selectedOption)])
      .then((res) => {
        const data = res.data;
        setDataChart(data);
      })
      .catch((err) => {
        console.log(err.response);
      });
  };

  return (
    <div className="container mx-auto px-4 py-8 mt-16">
      <Navigation />
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <div className="flex">
        <form className="mr-10">
          <label
            htmlFor="countries"
            className="block mb-2 text-sm font-medium text-gray-900"
          >
            Select an option
          </label>
          <select
            id="countries"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
            // defaultValue="1"
            onChange={(e) => setSelectedOption(e.target.value)}
            value={selectedOption}
          >
            {options.map((option, index) => (
              <option key={index} value={index}>
                {option}
              </option>
            ))}
          </select>
        </form>

        <div style={{ width: "700px", height: "700px" }} className="flex-2">
          <Bar data={data} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
