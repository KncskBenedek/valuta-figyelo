import { Line } from "react-chartjs-2";
import { usePeriodSummaryStore } from "../../zustand/store";

export default function CorrelationChart() {
  const { napiAtlagok, selectedCorrelation, valutak } = usePeriodSummaryStore();
  const x = napiAtlagok.filter(
    (o) => o.penznem == valutak[selectedCorrelation.x ?? 0]
  );
  const xLabel = x[0].penznem;

  const y = napiAtlagok.filter(
    (o) => o.penznem == valutak[selectedCorrelation.y ?? 0]
  );
  const yLabel = y[0].penznem;
  const options = {};

  const labels: string[] = x.map((o) => o.datum);
  const data = {
    labels: labels,
    datasets: [
      {
        label: xLabel,
        data: x.map((o) => {
          return { x: o.datum, y: o.vetelAtlag };
        }),
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.5)",
      },
      {
        label: yLabel,
        data: y.map((o) => {
          return { x: o.datum, y: o.vetelAtlag };
        }),
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.5)",
      },
    ],
  };
  return <Line options={options} data={data} />;
}
