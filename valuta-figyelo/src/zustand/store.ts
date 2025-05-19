import { CurrencyEnum } from './../utils/enums/CurrencyEnum';
import { create } from 'zustand';
import axios, { type AxiosResponse } from 'axios';
import { parseXML } from '../utils/parseXML';
import type { ValutaItem } from '../utils/types/ValutaItem';
import type { BankEnum } from '../utils/enums/BankEnum';


interface ValutaDataStore {
  tableData: ValutaItem[];
  chartData: ValutaItem[];
  valuta: CurrencyEnum | null;
  bank: BankEnum | string | null;
  loading: boolean;
  error: string | null;
  setTableData: (query?) => void; //ide kell egy type
  setChartData: (query?) => void;
  fetchData:  (query?) => Promise<ValutaItem[]>;
  setValuta: (valuta:CurrencyEnum)=>void;
  setBank: (bank: BankEnum | string)=>void;
}

export const useValutaStore = create<ValutaDataStore>((set, get) => ({
  tableData: [],
  chartData: [],
  valuta: null,
  bank: null,
  loading: false,
  error: null,
  fetchData: async (query?) => {
    set({ loading: true, error: null });
    try {
      const response = query == undefined? 
        await axios.get("http://localhost:3001/") 
        :
        await axios.get("http://localhost:3001/", {params: query}); 
      return parseXML(response.data);
    } catch (error: any) {
        console.error(error);
        set({
        error: error.response?.data?.message || error.message || 'Unknown error',
        loading: false,
      });
      return [];
    }
  },
  setTableData: async (query?) => {
    const d = await get().fetchData(query);
    set((state)=>({ tableData: d, loading: false }));
  },
  setChartData: async (query?) => {
    const d = await get().fetchData(query);
    set((state)=>({ chartData: d, loading: false }));
  },
  setValuta: (valuta)=>{
    set((state)=>({ valuta : valuta}))
  },
  setBank: (bank)=>{
    set((state)=>({bank : bank}))
  }
}));

interface PeriodDataStore{
  periodus: {tol: string|null,  ig: string|null};
  periodData: ValutaItem[];
  bank: BankEnum| string|null;
  setTolIg: (tol:string, ig:string)=> Promise<void>;
  fetchPeriod: (query) => Promise<ValutaItem[]>;
  setBank: (bank:string|BankEnum)=>void ;
}
export const usePeriodSummaryStore = create<PeriodDataStore>((set, get) =>({
  periodus: {tol : null,ig:null},
  periodData: [],
  bank: null,
  setTolIg: async (tol, ig) =>{
    set((state)=>({...state,...state.periodus, periodus: {tol:tol, ig:ig}}))
    const data = await get().fetchPeriod({datumend: ig.replace(/-/g, ""), datum: tol.replace(/-/g, ""), bank: get().bank})
    set((state)=>({...state, ...state.periodus, periodData: data }))
  },
  fetchPeriod: async (query) =>{
    try {
        const response = await axios.get("http://localhost:3001/", {params: query}); 
        return parseXML(response.data);
    } catch (error: any) {
        console.error(error);
      return [];
    }
  },
  setBank: (bank)=>{
    set((state)=>({...state, ...state.periodus, bank:bank}))
  }
}))