import type { ValutaItem } from "../../utils/types/ValutaItem";
import { useValutaStore } from "../../zustand/store";
const nincsAdat = "Nincs Adat";
export default function CurrencyDataTable() {
  const { data, valuta } = useValutaStore();
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
              <tr>
                <th>{item.bank ?? nincsAdat}</th>
                <td>{item.eladas ?? nincsAdat}</td>
                <td>{item.vetel ?? nincsAdat}</td>
                <td>{item.datum?.toISOString() ?? nincsAdat}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
