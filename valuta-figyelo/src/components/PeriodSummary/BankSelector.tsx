import { useRef } from "react";
import { usePeriodSummaryStore } from "../../zustand/store";
import { BankEnum } from "../../utils/enums/BankEnum";

export default function BankSelector() {
  const { setBank } = usePeriodSummaryStore();
  const banks = Object.keys(BankEnum) as Array<keyof typeof BankEnum>;
  const selectorRef = useRef(null);
  function handleOnSelectChange(): void {
    setBank(BankEnum[selectorRef.current.value]);
    console.log(BankEnum[selectorRef.current.value]);
  }

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={handleOnSelectChange}
      name="CurrencySelector"
      id="CurrencySelector"
      ref={selectorRef}
    >
      <option selected hidden>
        Válassz Bankot
      </option>
      {banks.map((bank) => {
        return <option key={bank}>{bank}</option>;
      })}
    </select>
  );
}
