import { useRef } from "react";
import { CurrencyEnum } from "../../utils/enums/CurrencyEnum";
import { useValutaStore } from "../../zustand/store";

export default function SelectCurrency() {
  const { setValuta, valuta } = useValutaStore();
  const valutak = Object.keys(CurrencyEnum) as Array<keyof typeof CurrencyEnum>;
  const ref = useRef(null);
  function handleOnSelectChange() {
    let key: string = ref.current.value;
    setValuta(CurrencyEnum[key]);
  }

  return (
    <select
      className="form-select"
      aria-label="Default select example"
      onChange={handleOnSelectChange}
      name="CurrencySelector"
      id="CurrencySelector"
      ref={ref}
    >
      {valutak.map((element) => {
        return <option key={element}>{element}</option>;
      })}
    </select>
  );
}
