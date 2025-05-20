import { usePeriodSummaryStore } from "../../zustand/store";
import CorrelationSummary from "./CorrelationSummary.tsx";
import PeriodSelector from "./PeriodSelector";

export default function History() {
  const { selectedCorrelation } = usePeriodSummaryStore();
  return (
    <>
      <PeriodSelector />
      <CorrelationSummary />

      {selectedCorrelation.x === null && selectedCorrelation.y === null ? (
        <>Válasszon ki korrelációt :- </>
      ) : (
        <>Választva korreláció :::</>
      )}
    </>
  );
}
