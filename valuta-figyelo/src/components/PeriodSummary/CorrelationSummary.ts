import type { NapiValutaAtlag } from './CorrelationSummary.tsx';
export const elokeszites = (periodData)=>{
      const grouped = Object.groupBy(periodData, (row) => {
    if (!row.datum || !row.penznem || row.eladas == null) {
      return "invalid";
    }
    const date = row.datum.toISOString().split("T")[0];
    return `${date}_${row.penznem}`;
  });

  const napiAtlagok: NapiValutaAtlag[] = [];
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
  return {valutak, napiAtlagok}
}