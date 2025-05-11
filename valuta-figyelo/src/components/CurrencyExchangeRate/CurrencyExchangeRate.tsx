import { useEffect, useState } from "react";
import { useValutaStore } from "../../zustand/store";
import type { CurrencyEnum } from "../../utils/enums/CurrencyEnum";
import type { BankEnum } from "../../utils/enums/BankEnum";
import SelectCurrency from "./SelectCurrency";
import CurrencyDataTable from "./CurrencyDataTable";

export default function CurrencyExchangeRate() {
  const { data, loading, error, fetchData } = useValutaStore();
  const [valuta, setValuta] = useState<CurrencyEnum | string>("");
  const [bank, setBank] = useState<BankEnum | string>("");

  useEffect(() => {
    fetchData(valuta);
  }, [fetchData, valuta]);

  if (loading) {
    return (
      <div className="spinner-border" role="status">
        <span className="visually-hidden">Loading...</span>
      </div>
    );
  }
  return (
    <>
      <SelectCurrency></SelectCurrency>
      <CurrencyDataTable></CurrencyDataTable>
    </>
  );
}

/*
<p>Itt a CurrencyExchangeRate</p>
      {data.length === 0 ? (
        <p>üres</p>
      ) : (
        data.map((valuta: ValutaItem, index) => (
          <ul key={index}>
            <li>{valuta.bank}</li>
            <li>{valuta.datum ? valuta.datum.toString() : "nincs"}</li>
            <li>{valuta.eladas}</li>
            <li>{valuta.penznem}</li>
            <li>{valuta.vetel}</li>
          </ul>
        ))
      )}
*/
