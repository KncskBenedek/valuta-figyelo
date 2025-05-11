import { useValutaStore } from "../../zustand/store";

export default function CurrencyDataTable() {
  const { valuta } = useValutaStore();
  return (
    <>
      <p>{valuta}</p>
    </>
  );
}
