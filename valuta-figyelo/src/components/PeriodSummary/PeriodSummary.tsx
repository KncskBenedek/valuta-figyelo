import { usePeriodSummaryStore } from "../../zustand/store";
import CorrelationChart from "./CorrelationChart.tsx";
import CorrelationSummary from "./CorrelationSummary.tsx";
import PeriodSelector from "./PeriodSelector";

export default function History() {
  const { selectedCorrelation } = usePeriodSummaryStore();
  return (
    <>
      <PeriodSelector />
      <CorrelationSummary />

      {selectedCorrelation.x === null && selectedCorrelation.y === null ? (
        <></>
      ) : (
        <CorrelationChart />
      )}
    </>
  );
}
