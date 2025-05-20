import { cor } from "../../utils/statistics";
import { usePeriodSummaryStore } from "../../zustand/store";

export default function CorrelationSummary() {
  const { periodData } = usePeriodSummaryStore();
  //valuta és dátum alapján szétszortírozni,
  if (periodData.length === 0) {
    return <p>Üres</p>;
  }
  const grouped = Object.groupBy(periodData, (row) => {
    if (!row.datum || !row.penznem || row.eladas == null) {
      return "invalid";
    }
    const date = row.datum.toISOString().split("T")[0];
    return `${date}_${row.penznem}`;
  });

  const napiAtlagok: {
    datum: string;
    penznem: string;
    vetelAtlag: number;
  }[] = [];
  const valutak = new Set();
  delete grouped.invalid;

  //  napi átlagot aggregálni,
  for (const [key, rows] of Object.entries(grouped)) {
    const [datum, penznem] = key.split("_");
    const eladasAtlag =
      rows.reduce((sum, row) => sum + (row.vetel ?? 0), 0) / rows.length;
    napiAtlagok.push({
      datum,
      penznem,
      vetelAtlag: Number(eladasAtlag.toFixed(4)), // 4 tizedes pontosság
    });
    valutak.add(penznem);
  }
  // ellenőrizni a tömbök hosszát,
  //  valutánként korrelációt mérni
  return (
    <>
      <table>
        <thead>
          <tr>
            <th> </th>
            {Array.from(valutak).map((value) => {
              return <th>{value}</th>;
            })}
          </tr>
        </thead>
        <tbody>
          {Array.from(valutak).map((x) => {
            return (
              <tr>
                <th>{x}</th>
                {Array.from(valutak).map((y) => {
                  return (
                    <td>
                      {x === y
                        ? "1"
                        : cor(
                            napiAtlagok
                              .filter((row) => row.penznem === x)
                              .map((o) => o.vetelAtlag),
                            napiAtlagok
                              .filter((row) => row.penznem === y)
                              .map((o) => o.vetelAtlag)
                          ).toFixed(3)}
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
