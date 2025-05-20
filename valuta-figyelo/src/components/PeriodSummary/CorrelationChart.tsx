import { Line } from "react-chartjs-2";
import { usePeriodSummaryStore } from "../../zustand/store";

export default function CorrelationChart() {
  const { napiAtlagok, selectedCorrelation, valutak, periodData } =
    usePeriodSummaryStore();

  const xAtlag = napiAtlagok
    .filter((o) => o.penznem == valutak[selectedCorrelation.x ?? 0])
    .map((o) => {
      return { x: o.datum, y: o.vetelAtlag };
    });
  const x = periodData
    .filter((o) => o.penznem == valutak[selectedCorrelation.x ?? 0])
    .map((o) => {
      return { x: o.datum, y: o.vetel };
    });
  const xLabel = `${valutak[selectedCorrelation.x ?? 0]} átlaga`;

  const yAtlag = napiAtlagok
    .filter((o) => o.penznem == valutak[selectedCorrelation.y ?? 0])
    .map((o) => {
      return { x: o.datum, y: o.vetelAtlag };
    });
  const y = periodData
    .filter((o) => o.penznem == valutak[selectedCorrelation.y ?? 0])
    .map((o) => {
      return { x: o.datum, y: o.vetel };
    });
  const yLabel = `${valutak[selectedCorrelation.y ?? 0]} átlaga`;
  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: "top" as const,
      },
      title: {
        display: true,
        text: `${xLabel} és ${yLabel} összehasonlítása`,
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
            return date.toISOString().slice(0, 10);
          },
          maxTicksLimit: 31,
          maxRotation: 45,
          minRotation: 45,
          font: { size: 12 },
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

  const labels: string[] = xAtlag.map((o) => o.x);
  const data1 = {
    labels: labels,
    datasets: [
      {
        label: xLabel,
        data: xAtlag,
        borderColor: "rgb(255, 99, 132)",
        backgroundColor: "rgba(255, 99, 132, 0.1)",
      },
      {
        label: `${valutak[selectedCorrelation.x ?? 0]}`,
        data: x,
        borderColor: "rgb(99, 255, 143)",
        backgroundColor: "rgba(122, 255, 99, 0.5)",
      },
    ],
  };
  const data2 = {
    labels: labels,

    datasets: [
      {
        label: yLabel,
        data: yAtlag,
        borderColor: "rgb(53, 162, 235)",
        backgroundColor: "rgba(53, 162, 235, 0.1)",
      },
      {
        label: `${valutak[selectedCorrelation.y ?? 0]}`,
        data: y,
        borderColor: "rgb(190, 235, 53)",
        backgroundColor: "rgba(190, 235, 53, 0.5)",
      },
    ],
  };

  return (
    <>
      <Line options={options} data={data1} />
      <Line options={options} data={data2} />
    </>
  );
}
