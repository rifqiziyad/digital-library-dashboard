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

// const options = [
//   "Most borrowed books",
//   "Monthly lending trends",
//   "Books by category distribution",
// ];

const listDataChart = [MOST_BORROWED, MONTHLY_LENDING_TRENDS, BOOK_BY_CATEGORY];

const Dashboard = () => {
  const [selectedOption, setSelectedOption] = useState("1");
  const [dataCharat, setDataChart] = useState(listDataChart[0]);
  const data = {
    labels: dataCharat.labels,
    datasets: [
      {
        label: "Most borrowed books",
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
    setDataChart(listDataChart[parseInt(selectedOption) - 1]);
  }, [selectedOption]);

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
            <option value="1">Most borrowed books</option>
            <option value="2">Monthly lending trends</option>
            <option value="3">Books by category distribution</option>
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
