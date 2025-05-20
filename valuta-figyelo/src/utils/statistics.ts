import type { NapiValutaAtlag } from "../components/PeriodSummary/CorrelationSummary";

//átlag tapasztalati várható érték
export const mean = (x : number[])=> {
    const N = x.length;
    if (N <= 0) return 0;
    let sum = x[0];
    for (let i = 1; i < N; i++) {
        sum += x[i];
    }
    return ((1/N)*sum);
}
//korrigált tapasztalati szórás
export const sd = (x: number[])=>{
    const meanX = mean(x) ;
    const N = x.length;
    if (N <= 1) throw new Error("A korrigált tapasztalati szóráshoz n <= 1 hossz nem megfelelő.");

    let sum = 0;
    for (let i = 0; i < N; i++) {
        sum += ((x[i] - meanX)**2);
    }
    const szorzo = 1/(Math.sqrt(N-1));
    return (szorzo * Math.sqrt(sum));
}
//korrigált tapasztalati kovariancia
export const cov = (x: number[], y: number[])=>{
    if(x.length !== y.length) throw new Error("A tapasztalati kovarianciához n darab xi és yi mintára van szükség.")
    if (x.length <= 1) throw new Error("A tapasztalati kovarianciához n <= 1 hossz nem megfelelő.");
    let sum = 0;
    const N = x.length;
    const meanX = mean(x);
    const meanY = mean(y);
    for (let i = 0; i < N; i++) {
        sum += (x[i]-meanX)*(y[i]-meanY);
    }
    return ((1/(N-1))*sum)
}

//korreláció
export const cor = (x: number[], y: number[])=>{
    const sdX = sd(x);
    const sdY = sd(y);
    if (sdX === 0 || sdY === 0) throw new Error("Nulla szórás miatt nem értelmezhető a korreláció.");
    return cov(x, y) / (sdX * sdY);
}

export const corMatrix = (data: NapiValutaAtlag[], keys)=>{
    const d = matrix(keys.length,keys.length)    
    
    for (let i = 0; i < keys.length; i++) {
        for (let t = 0; t < keys.length; t++) {
            if (keys[i] === keys[t]) {
                d[i][t] = 1;
                 continue
            }
            const x = data.filter((o)=>o.penznem === keys[i]).map(o => o.vetelAtlag);
            const y = data.filter((o)=>o.penznem === keys[t]).map(o => o.vetelAtlag);
            const c = cor(x,y);
            
            d[i][t] = c;
            d[t][i] = c;

        }           
    }
    
    return d;
}
const create = (amount:number) => new Array(amount).fill(0);
const matrix = (rows:number, cols:number) => create(cols).map((o, i) => create(rows))