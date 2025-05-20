import { corMatrix } from "../../utils/statistics";
import { usePeriodSummaryStore } from "../../zustand/store";
export interface NapiValutaAtlag {
  datum: string;
  penznem: string;
  vetelAtlag: number;
}
export default function CorrelationSummary() {
  const { periodData, napiAtlagok, valutak, setSelectedCorrelation } =
    usePeriodSummaryStore();
  //valuta és dátum alapján szétszortírozni,
  if (periodData.length === 0) {
    return <p>Üres</p>;
  }
  const corMatrixData = corMatrix(napiAtlagok, Array.from(valutak));
  // ellenőrizni a tömbök hosszát,
  //  valutánként korrelációt mérni
  const handleCorrelationClick = (x, y) => {
    setSelectedCorrelation(x, y);
  };
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
                  if (indexX === indexY) {
                    return <td className="bg-secondary">{y.toFixed(2)}</td>;
                  }
                  return (
                    <td
                      onClick={() => handleCorrelationClick(indexX, indexY)}
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
