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
        <div className="mb-3">
          <label htmlFor="tol" className="form-label">
            Dátumtól:
          </label>
          <input type="date" name="tol" id="tol" className="form-control" />
        </div>
        <div className="mb-3">
          <label htmlFor="ig" className="form-label">
            Dátumig:
          </label>
          <input type="date" name="ig" id="ig" className="form-control" />
        </div>
      </form>
      <BankSelector />
      <div className="md-3">
        <button onClick={onClickHandle} className="btn btn-primary">
          keres
        </button>
      </div>
    </>
  );
}
