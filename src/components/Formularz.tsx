import { useEffect, useState } from "react";
import "../css/Formularz.css"


import { Add_LocalStorage, Get_LocalStorage_item } from "../localstorage";
import type { Transakcja } from "../localstorage";
import { Show } from "./Show";





 let klucz:string = "o"
 let id_klucz:number = 0

 // pobranie wartości formularza
 


export function Formularz(){
    

    const [klucze, setKlucze] = useState<string[]>([]);


    let name = "";
    let amount = 0;
    let category = "";
    


    useEffect(()=>{
        let ids:string[] = Object.keys(localStorage).sort()
        
        
        for(let i = 0; i < ids.length; i++){
            
            setKlucze(prev => [...prev, ids[i]])
            
        }
        id_klucz = ids[ids.length -1] ? parseInt(ids[ids.length -1].substring(1)) +1 : 0
        
         calculateBilans();
        
        
    }, [])

    function Add(){


        let id = klucz + id_klucz.toString()
        id_klucz++;
        let item: Transakcja = null as any;


        if(document.querySelector("#tekst") != null){
            const input_name = document.querySelector("#tekst") as HTMLInputElement
            name = input_name.value
        }

        if(document.querySelector("#kwota") != null){
            const input_amount = document.querySelector("#kwota") as HTMLInputElement
            amount = parseFloat(input_amount.value)
        }
        if(document.querySelector("#kategoria") != null){
            const input_category = document.querySelector("#kategoria") as HTMLInputElement
            category = input_category.value
            
        }

        if(document.querySelector("#radio1") != null && document.querySelector("#radio2") != null){
            const radio1 = document.querySelector("#radio1") as HTMLInputElement
            const radio2 = document.querySelector("#radio2") as HTMLInputElement
            if(radio1.checked){
                //przychód
                item = {id: id, name: name, amount: amount, type: "Przychód", category: category}        
            }
            else if(radio2.checked){
                //wydatek
                if(amount > 0){
                    amount = amount * -1
                }
                
                item = {id: id, name: name, amount: amount, type: "Wydatek", category: category}
            }
        }

        calculateBilans();
        setKlucze([...klucze, id])
        
        Add_LocalStorage(item,id)

        
 
    }


    function calculateBilans(){
        let bil = 0;
        
        klucze.forEach(k => {
            let item = Get_LocalStorage_item(k);
            
            bil += item.amount
           
            
        })
        

        return bil;
    }

    return(
        <>
            <div className="container mt-5" style={{maxWidth: "40vw"}}>

                <div className="card shadow-sm">
                    <div className="card-body">

                        <h2 className="text-center mb-4">
                            Bilans konta: {calculateBilans()} PLN
                        </h2>

                        <form>

                            <div className="mb-3">
                                <label className="form-label">Nazwa</label>
                                <input type="text" id="tekst" placeholder="Nazwa" className="form-control" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label">Kwota</label>
                                <input type="number" id="kwota" placeholder="Kwota" className="form-control" required />
                            </div>

                            <div className="mb-3">
                                <label className="form-label d-block">Typ transakcji</label>

                                <div className="form-check form-check-inline">
                                    <input 
                                        type="radio" 
                                        name="rg1" 
                                        id="radio1" 
                                        className="form-check-input"
                                        defaultChecked={true}
                                    />
                                    <label className="form-check-label" htmlFor="radio1">Przychód</label>
                                </div>

                                <div className="form-check form-check-inline">
                                    <input 
                                        type="radio" 
                                        name="rg1" 
                                        id="radio2" 
                                        className="form-check-input"
                                    />
                                    <label className="form-check-label" htmlFor="radio2">Wydatek</label>
                                </div>

                            </div>

                            <div className="mb-4">
                                <label className="form-label">Kategoria</label>
                                <input type="text" id="kategoria" placeholder="Kategoria" className="form-control" required />
                            </div>

                        </form>

                        <button onClick={Add} className="btn btn-success w-100">
                            Dodaj
                        </button>

                    </div>
                </div>

                <div id="cards" className="mt-4">
                    <Show />
                </div>

            </div>

        
        </>
    )
}