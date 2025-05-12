import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale,
} from "chart.js";
import { Line } from "react-chartjs-2";
import "chartjs-adapter-date-fns";
import { useEffect } from "react";
import { useValutaStore } from "../../zustand/store";
import { ValutaItemEnum } from "../../utils/enums/ValutaItemEnum";
import type { ValutaItem } from "../../utils/types/ValutaItem";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  TimeScale
);

const options = {
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      position: "top",
    },
    title: {
      display: true,
      text: "Bank Currency Chart",
      font: { size: 16 },
    },
    tooltip: {
      callbacks: {
        title: (tooltipItems) => {
          const date = new Date(tooltipItems[0].parsed.x);
          return date.toISOString().replace("T", " ").slice(0, 19);
        },
      },
    },
  },
  scales: {
    x: {
      type: "time",
      time: {
        unit: "day",
        displayFormats: {
          day: "yyyy-MM-dd",
        },
      },
      ticks: {
        source: "auto",
        callback: function (value, index, ticks) {
          const date = new Date(value);
          if (
            date.getHours() === 0 &&
            date.getMinutes() === 0 &&
            date.getSeconds() === 0
          ) {
            return date.toISOString().slice(0, 10);
          }
          return null;
        },
        maxTicksLimit: 31,
        maxRotation: 45,
        minRotation: 45,
        font: { size: 12 },
      },
      title: {
        display: true,
        text: "Dátum",
        font: { size: 14 },
      },
      grid: {
        display: true,
      },
    },
    y: {
      title: {
        display: true,
        text: "Érték",
        font: { size: 14 },
      },
      ticks: {
        stepSize: 0.1,
      },
      grid: {
        display: true,
      },
    },
  },
};

export default function BankCurrencyChart() {
  const { chartData } = useValutaStore();

  const inputData = {
    datasets: [
      {
        label: "Eladási ár",
        data: chartData.map((dp: ValutaItem) => ({
          x: dp.datum?.toISOString().replace("T", " ").slice(0, 19),
          y: dp.vetel,
        })),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        pointRadius: 2,
        tension: 0.1,
      },
    ],
  };
  return (
    <>
      <div className="w-full max-w-5xl p-4">
        <div className="overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400">
          <div className="h-96" style={{ height: "700px" }}>
            <Line options={options} data={inputData} />
          </div>
        </div>
      </div>
    </>
  );
}
