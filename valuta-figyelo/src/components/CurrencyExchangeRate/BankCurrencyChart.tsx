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
import { useValutaStore } from "../../zustand/store";
import type { ValutaItem } from "../../utils/types/ValutaItem";
import {
  createInputData,
  createOptions,
  createInputDatasetObject,
} from "./BankCurrencyChartController";

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

export default function BankCurrencyChart() {
  const { chartData, bank } = useValutaStore();
  const options = createOptions(`Bank (${bank}) Currency Chart`);

  const inputData = createInputData([
    createInputDatasetObject(
      "Vétel ár",
      chartData,
      (dp: ValutaItem) => ({
        x: dp.datum?.toISOString().replace("T", " ").slice(0, 19),
        y: dp.vetel,
      }),
      "rgb(255, 99, 132)",
      "rgba(255, 99, 132, 0.5)"
    ),
    createInputDatasetObject(
      "Eladási ár",
      chartData,
      (dp: ValutaItem) => ({
        x: dp.datum?.toISOString().replace("T", " ").slice(0, 19),
        y: dp.eladas,
      }),
      "rgb(125, 99, 255)",
      "rgba(125, 99, 255, 0.5)"
    ),
  ]);
  const percent =
    ((chartData[chartData.length - 1].vetel - chartData[0].vetel) /
      chartData[0].vetel) *
    100;
  return (
    <>
      <h2>
        Az elmült 7 napban {percent.toFixed(3)}%-os változás történt a ({bank})
        banknál .
      </h2>

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
