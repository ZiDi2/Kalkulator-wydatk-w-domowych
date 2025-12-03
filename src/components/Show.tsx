import { Card } from "./Card";

import {
  Get_LocalStorage_item,
  Remove_LocalStorage_item,
} from "../localstorage";

// funkcja do wyświetlania kart z informacjami na stronie
// Karta to komponent <Card/> (plik Card.tsx)
export function Show() {
  // sortowanie kluczy według numerów malejąco
  // Czemu tak?
  // Nie mam pojęcia ale tak działa więc tak zostawiam
  let klucze: string[] = Object.keys(localStorage)
    .sort((a, b) => {
      const na = parseInt(a.replace(/\D/g, ""));
      const nb = parseInt(b.replace(/\D/g, ""));
      return na - nb;
    })
    .reverse();

  let przychody: string[] = [];
  let wydatki: string[] = [];

  // sortowanie itemów: Przychód/Wydatek
  klucze.map((k) => {
    let item = Get_LocalStorage_item(k);

    if (item.type == "Przychód") {
      przychody.push(k);
    } else {
      wydatki.push(k);
    }
  });

  return (
    <>
      <div id="przychody">
        {/* pętla po tablicy z przychodami i wyświetlenie ich w jednym kontenerze */}
        {przychody.map((k) => {
          // wyciągnięcie itemu z localstorage funkcją z localstorage.tsx
          let item = Get_LocalStorage_item(k);
          return (
            <Card key={k} id={k} color="lightgreen">
              <h3 id="Name">{item.name}</h3>
              <p id="Kwota">
                <strong>Kwota:</strong> {item.amount} PLN
              </p>
              <p id="Kategoria">
                <strong>Kategoria:</strong> {item.category}
              </p>
            </Card>
          );
        })}
      </div>

      {/* pętla po tablicy wydatki i wyświetlenie ich w jednym kontenerze */}
      <div id="wydatki">
        {wydatki.map((k) => {
          // wyciągnięcie itemu z localstorage funkcją z localstorage.tsx
          let item = Get_LocalStorage_item(k);
          return (
            <Card key={k} id={k} color="#ff4141ff">
              <h3 id="Name">{item.name}</h3>
              <p id="Kwota">
                <strong>Kwota:</strong> {item.amount} PLN
              </p>
              <p id="Kategoria">
                <strong>Kategoria:</strong> {item.category}
              </p>
            </Card>
          );
        })}
      </div>
    </>
  );
}
