import { usePeriodSummaryStore } from "../../zustand/store";
import BankSelector from "./BankSelector";
import PeriodSelector from "./PeriodSelector";

export default function History() {
  const { periodus } = usePeriodSummaryStore();
  return (
    <>
      <PeriodSelector />
    </>
  );
}
