import { useEffect, useState } from "react";
import { useValutaStore } from "../../zustand/store";

import SelectCurrency from "./SelectCurrency";
import CurrencyDataTable from "./CurrencyDataTable";

export default function CurrencyExchangeRate() {
  const { loading, data, valuta, error, fetchData } = useValutaStore();

  useEffect(() => {
    if (valuta != null) {
      fetchData(valuta);
    }
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
      <SelectCurrency />
      {data.length !== 0 && <CurrencyDataTable />}
    </>
  );
}
