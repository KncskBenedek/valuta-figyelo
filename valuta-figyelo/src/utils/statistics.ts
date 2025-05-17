//átlag tapasztalati várható érték
export const mean = (data : number[])=> {
    const N = data.length;
    if (N <= 0) return 0
    let sum = data[0]
    for (let i = 1; i < N; i++) {
        sum += data[i]
    }
    return ((1/N)*sum)
}
//korrigált tapasztalati szórás
export const sd = (data: number[])=>{
    const meanX = mean(data) 
    const N = data.length;
    if (N <= 0) return 0
    let sum = data[0]
    for (let i = 1; i < N; i++) {
        sum += ((data[i] - meanX)**2)
    }
    const szorzo = 1/(Math.sqrt(N-1))
    return (szorzo * Math.sqrt(sum))
}
//tapasztalati kovariancia
export const cov = (data: number[])=>{

}

//korreláció
export const cor = (data: number[])=>{

}