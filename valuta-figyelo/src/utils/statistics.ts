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
    if (N <= 0) return 0;
    let sum = 0;
    for (let i = 1; i < N; i++) {
        sum += ((x[i] - meanX)**2);
    }
    const szorzo = 1/(Math.sqrt(N-1));
    return (szorzo * Math.sqrt(sum));
}
//tapasztalati kovariancia
export const cov = (x: number[], y: number[])=>{
    if(x.length !== y.length) throw new Error("A tapasztalati kovarianciához n darab xi és yi mintára van szükség.")

    let sum = 0;
    const N = x.length;
    const meanX = mean(x);
    const meanY = mean(y);
    for (let i = 1; i < N; i++) {
        sum += (x[i]-meanX)*(y[i]-meanY);
    }
    return ((1/N)*sum)
}

//korreláció
export const cor = (x: number[], y: number[])=>{
    return (cov(x,y))/(mean(x)*mean(y))
}