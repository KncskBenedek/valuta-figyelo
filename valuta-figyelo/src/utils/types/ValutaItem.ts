import type { BankEnum } from "../enums/BankEnum";
import type { CurrencyEnum } from "../enums/CurrencyEnum";

export interface ValutaItem{
    bank: BankEnum | string | null | undefined,
    datum: Date| null | undefined,
    penznem: CurrencyEnum | string | null | undefined,
    vetel: number| null | undefined,
    eladas: number| null | undefined
}