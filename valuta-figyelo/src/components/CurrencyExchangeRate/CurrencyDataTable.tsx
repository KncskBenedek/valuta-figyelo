import type { ValutaItem } from "../../utils/types/ValutaItem";
import { useValutaStore } from "../../zustand/store";
const nincsAdat = "Nincs Adat";
export default function CurrencyDataTable() {
  const { tableData: data, valuta, setBank } = useValutaStore();
  const handleOnClickBank = (bank) => {
    setBank(bank);
  };
  const today = new Date().toISOString().slice(0, 10);
  return (
    <>
      <h1>
        {valuta} {/* <i className={`fa fa-${valuta} : fa-money-sign`}></i> */}
      </h1>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th>Bank</th>
            <th>Eladás</th>
            <th>Vétel</th>
            <th>Utolsó frissítés</th>
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {data.map((item: ValutaItem) => {
            return (
              <tr key={item.bank}>
                {item.datum?.toISOString().slice(0, 10) === today ? (
                  <th
                    className="bg-success"
                    onClick={() => handleOnClickBank(item.bank)}
                  >
                    {item.bank ?? nincsAdat}
                  </th>
                ) : (
                  <th className="bg-secondary">{item.bank ?? nincsAdat}</th>
                )}
                <th onClick={() => handleOnClickBank(item.bank)}>
                  {item.bank ?? nincsAdat}
                </th>
                <td>{item.eladas ?? nincsAdat}</td>
                <td>{item.vetel ?? nincsAdat}</td>
                <td>
                  {item.datum?.toISOString().replace("T", " ").slice(0, 19) ??
                    nincsAdat}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
