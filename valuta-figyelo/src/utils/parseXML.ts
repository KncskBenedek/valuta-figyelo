import { ValutaItemEnum } from "./enums/ValutaItemEnum";
import type { ValutaItem } from "./types/ValutaItem";

export const parseXML = (xml)=> {
        const parser = new DOMParser();
        const doc = parser.parseFromString(xml, "application/xml");
        const items = doc.querySelectorAll("valuta>item"); 
    
        const data:ValutaItem[] = []
        items.forEach(item => {
            const bank = item.querySelector(ValutaItemEnum.bank)?.textContent??"";                
            const datum = item.querySelector(ValutaItemEnum.datum)?.textContent??"";
            const penznem = item.querySelector(ValutaItemEnum.penznem)?.textContent??"";
            const vetel = Number(item.querySelector(ValutaItemEnum.vetel)?.textContent);
            const eladas = Number(item.querySelector(ValutaItemEnum.eladas)?.textContent);
            data.push({bank: bank, datum: new Date(datum), penznem: penznem, vetel: vetel, eladas:eladas});
        })
        return data;
    }