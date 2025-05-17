export const createOptions = (title: string) => {
  return {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
      title: {
        display: true,
        text: title,
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
};

export const createInputData = (datasets) => {
  return {
    datasets: datasets,
  };
};

export const createInputDatasetObject = (label, data, fn, color, colora) => {
  return {
    label: label,
    data: data.map(fn),
    borderColor: color,
    backgroundColor: colora,
    pointRadius: 3,
    tension: 0.1,
  };
};
