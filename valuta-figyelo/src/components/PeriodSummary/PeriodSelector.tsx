import { useRef } from "react";
import { usePeriodSummaryStore } from "../../zustand/store";
import BankSelector from "./BankSelector";

export default function PeriodSelector() {
  const { setTolIg } = usePeriodSummaryStore();
  const formRef = useRef(null);
  const onClickHandle = () => {
    const tol = formRef.current.tol.value;
    const ig = formRef.current.ig.value;
    setTolIg(tol, ig);
  };
  return (
    <>
      <form ref={formRef}>
        <label htmlFor="tol">tól:</label>
        <input type="date" name="tol" id="tol" />
        <label htmlFor="ig">ig:</label>
        <input type="date" name="ig" id="ig" />
      </form>
      <BankSelector />
      <button onClick={onClickHandle}>keres</button>
    </>
  );
}
