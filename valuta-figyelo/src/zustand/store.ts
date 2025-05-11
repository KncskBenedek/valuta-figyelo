import { CurrencyEnum } from './../utils/enums/CurrencyEnum';
import { create } from 'zustand';
import axios from 'axios';
import { parseXML } from '../utils/parseXML';
import type { ValutaItem } from '../utils/types/ValutaItem';


interface DataStore {
  data: ValutaItem[];
  valuta: CurrencyEnum | null;
  loading: boolean;
  error: string | null;
  fetchData:  (query?:string) => Promise<void>;
  setValuta: (valuta:CurrencyEnum)=>void;
}

export const useValutaStore = create<DataStore>((set) => ({
  data: [],
  valuta: null,
  loading: false,
  error: null,

  fetchData: async (query?) => {
    set({ loading: true, error: null });
    try {
      const response = query == ""? 
        await axios.get("http://localhost:3001/") 
        :
        await axios.get("http://localhost:3001/", {params: {valuta: query}}); 

      set({ data: parseXML(response.data), loading: false });
    } catch (error: any) {
        console.error(error);
        
        set({
        error: error.response?.data?.message || error.message || 'Unknown error',
        loading: false,
      });
    }
  },
  setValuta: (valuta)=>{
    set((state)=>({ valuta : valuta}))
  }
}));