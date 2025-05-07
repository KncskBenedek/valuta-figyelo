import axios from "axios";
import {create} from "zustand"

const initialState = {
    loading: false,
    success: false,
    error: false,
    data: null,
    errorData: null
}
export const useGetData = create((set, get) => ({
    execute: async ()=>{
        set({...initialState, loading:true})
        try {
            const response = await axios.get("http://localhost:3001/" )
            console.log(response);
            
        } catch (error) {   
            console.error(error);
            set({...initialState, error:true, errorData: error.message})
        }
    }
}))