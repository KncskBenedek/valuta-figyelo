import { corMatrix } from "../../utils/statistics";
import { usePeriodSummaryStore } from "../../zustand/store";
import { elokeszites } from "./CorrelationSummary";
export interface NapiValutaAtlag {
  datum: string;
  penznem: string;
  vetelAtlag: number;
}
export default function CorrelationSummary() {
  const { periodData } = usePeriodSummaryStore();
  //valuta és dátum alapján szétszortírozni,
  if (periodData.length === 0) {
    return <p>Üres</p>;
  }

  const d = elokeszites(periodData);
  const napiAtlagok = d.napiAtlagok;
  const valutak = d.valutak;

  const corMatrixData = corMatrix(napiAtlagok, Array.from(valutak));
  // ellenőrizni a tömbök hosszát,
  //  valutánként korrelációt mérni
  return (
    <>
      <table className="table table-bordered">
        <thead>
          <tr>
            <th> </th>
            {Array.from(valutak).map((value) => {
              return <th>{value}</th>;
            })}
          </tr>
        </thead>
        <tbody className="table-group-divider">
          {Array.from(valutak).map((x, indexX) => {
            return (
              <tr>
                <th>{x}</th>
                {corMatrixData[indexX].map((y, indexY) => {
                  return (
                    <td
                      className={
                        Math.abs(y.toFixed(2)) > 0.7 && indexX !== indexY
                          ? "bg-success"
                          : ""
                      }
                    >
                      {y.toFixed(2)}
                    </td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
}
