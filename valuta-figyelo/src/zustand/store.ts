import type { NapiValutaAtlag } from './../components/PeriodSummary/CorrelationSummary';
import { CurrencyEnum } from './../utils/enums/CurrencyEnum';
import { create } from 'zustand';
import axios from 'axios';
import { parseXML } from '../utils/parseXML';
import type { ValutaItem } from '../utils/types/ValutaItem';
import type { BankEnum } from '../utils/enums/BankEnum';
import { immer } from 'zustand/middleware/immer';
import { elokeszites } from '../utils/util';


interface ValutaDataState {
  tableData: ValutaItem[];
  chartData: ValutaItem[];
  valuta: CurrencyEnum | null;
  bank: BankEnum | string | null;
  loading: boolean;
  error: string | null;
 
}
interface ValutaDataActions{
 setTableData: (query?) => void; //ide kell egy type
  setChartData: (query?) => void;
  fetchData:  (query?) => Promise<ValutaItem[]>;
  setValuta: (valuta:CurrencyEnum)=>void;
  setBank: (bank: BankEnum | string)=>void;
}

export const useValutaStore = create<ValutaDataState & ValutaDataActions>()(
  immer((set,get) => ({
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
    set(()=>({ tableData: d, loading: false }));
  },
  setChartData: async (query?) => {
    const d = await get().fetchData(query);
    set(()=>({ chartData: d, loading: false }));
  },
  setValuta: (valuta)=>{
    set(()=>({ valuta : valuta}))
  },
  setBank: (bank)=>{
    set(()=>({bank : bank}))
  }
  })),
)
interface PeriodDataState{
  periodus: {tol: string|null,  ig: string|null};
  periodData: ValutaItem[];
  bank: BankEnum| string|null;
  selectedCorrelation: {x: string|null, y:string|null};
  napiAtlagok: NapiValutaAtlag[];
  valutak: string[];

}
interface PeriodDataAction{
  setTolIg: (tol:string, ig:string)=> Promise<void>;
  fetchPeriod: (query) => Promise<ValutaItem[]>;
  setBank: (bank:string|BankEnum)=>void ;
  setSelectedCorrelation: (x:string, y:string) =>void;
}
export const usePeriodSummaryStore = create<PeriodDataState & PeriodDataAction>()(
  immer((set, get) => ({
    periodus: {tol : null,ig:null},
  periodData: [],
  selectedCorrelation: {x:null, y:null},
  bank: null,
  valutak:[],
  napiAtlagok:[],
  setTolIg: async (tol, ig) =>{
    set((state)=>{ state.periodus= {tol:tol, ig:ig}})
    const data = await get().fetchPeriod({datumend: ig.replace(/-/g, ""), datum: tol.replace(/-/g, ""), bank: get().bank})
    const d = elokeszites(data)
    set(()=>({periodData:data, valutak:d.valutakArray,napiAtlagok:d.napiAtlagok }))
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
    set((state)=>{state.bank=bank})
  },
  setSelectedCorrelation: (x,y)=>{
    set((state) =>{state.selectedCorrelation={x:x, y:y}})
  }
  })),
)