import { useEffect } from "react";
import { useValutaStore } from "../../zustand/store";
import SelectCurrency from "./SelectCurrency";
import CurrencyDataTable from "./CurrencyDataTable";
import BankCurrencyChart from "./BankCurrencyChart";

export default function CurrencyExchangeRate() {
  const {
    loading,
    tableData: data,
    valuta,
    bank,
    setTableData,
    setChartData,
  } = useValutaStore();
  useEffect(() => {
    if (valuta != null) {
      setTableData({ valuta: valuta.toString() });
    }
  }, [setTableData, valuta]);
  useEffect(() => {
    if (bank != null) {
      const today = new Date();

      setChartData({
        valuta: valuta,
        bank: bank,
        datumend: today.toISOString().slice(0, 10).replace(/-/g, ""),
        datum: new Date(today.setDate(today.getDate() - 7))
          .toISOString()
          .slice(0, 10)
          .replace(/-/g, ""),
      });
    }
  }, [bank, valuta, setChartData]);

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
      {bank !== null && <BankCurrencyChart />}
    </>
  );
}
