import { Card } from "./Card";

import { Get_LocalStorage_item, Remove_LocalStorage_item } from "../localstorage";

export function Show() {
    // sortowanie kluczy według numerów malejąco
    // Czemu tak? 
    // Nie mam pojęcia ale tak działa więc tak zostawiam
    let klucze: string[] = Object.keys(localStorage)
    .sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, "")); 
      const nb = parseInt(b.replace(/\D/g, "")); 
      return na - nb;}).reverse();


    let przychody: string[] = [];
    let wydatki: string[] = [];

    klucze.map(k=>{
      let item = Get_LocalStorage_item(k)

      if(item.type == "Przychód"){
        przychody.push(k)
      }
      else{
        wydatki.push(k)
      }
     
    })


  return (
    <>
      <div id="przychody">
        {przychody.map(k => {
          let item = Get_LocalStorage_item(k);
          return(
            <Card key={k} id={k} color="lightgreen">
              <h3 id="Name">{item.name}</h3>
              <p id="Kwota"><strong>Kwota:</strong> {item.amount} PLN</p>
              <p id="Kategoria"><strong>Kategoria:</strong> {item.category}</p>
              
            </Card>
          )
        })}
      </div>


      <div id="wydatki">
        {wydatki.map(k => {
          let item = Get_LocalStorage_item(k);
          return(
            <Card key={k} id={k} color="#ff4141ff">
              <h3 id="Name">{item.name}</h3>
              <p id="Kwota"><strong>Kwota:</strong> {item.amount} PLN</p>
              <p id="Kategoria"><strong>Kategoria:</strong> {item.category}</p>
              
            </Card>
          )
        })}
      </div>
      
      
      {/* {klucze.map(k => {

        let item = Get_LocalStorage_item(k);
      

        return(
          <Card key={k} id={k} color={item.type == "Przychód" ? "lightgreen" : "#ff4141ff"}>
            <h3 id="Name">{item.name}</h3>
            <p id="Kwota"><strong>Kwota:</strong> {item.amount} PLN</p>
            <p id="Kategoria"><strong>Kategoria:</strong> {item.category}</p>
            <button onClick={()=>{ Remove_LocalStorage_item(k.toString()) }} className="btn btn-danger" id="Btn">Usuń</button>
          </Card>
        )
        

    })} */}
    </>
  );
}
