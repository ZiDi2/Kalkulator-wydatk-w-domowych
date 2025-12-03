import { useEffect, useState } from "react";
import "../css/Form.css";

import { Add_LocalStorage, Get_LocalStorage_item } from "../localstorage";
import type { Transaction } from "../types/Transakcja";
import { Show } from "./Show";

let key: string = "o";
let id_key: number = 0;

export function Formularz() {
  const [keys, setKeys] = useState<string[]>([]);

  let name = "";
  let amount = 0;
  let category = "";

  useEffect(() => {
    let ids: string[] = Object.keys(localStorage).sort();

    for (let i = 0; i < ids.length; i++) {
      // prev - ostatnia wartość tablicy i połączenie jej z nowym elementem
      setKeys((prev) => [...prev, ids[i]]);
    }
    // przypisanie id_key do liczby z ostatniego keya
    id_key = ids[ids.length - 1]
      ? parseInt(ids[ids.length - 1].substring(1)) + 1
      : 0;

    calculateBill();
  }, []);

  // dodawanie itemu oraz keya mu odpowiadającemu (Funkcja do dodawania key do localStorage w pliku localstorage.tsx)
  function Add(): void {
    // połączenie key i id_key żeby stworzyć id dla localstorage
    let id = key + id_key.toString();
    id_key++;
    // przypisanie itemu do null żeby był zinicjalizowany bo inaczej jest błąd. A i as any też musi być bo inne typy ma item i null
    let item: Transaction = null as any;

    // if jest temu do każdego pobrania bo inaczej błąd wywala i musi być bo inaczej może być null bo render jest chyba później ale nie wiem. Wiem że inaczej nie działa
    // as HTMLInputElement bo inaczej nie działa
    if (document.querySelector("#tekst") != null) {
      const input_name = document.querySelector("#tekst") as HTMLInputElement;
      name = input_name.value;
    }

    if (document.querySelector("#kwota") != null) {
      const input_amount = document.querySelector("#kwota") as HTMLInputElement;
      amount = parseFloat(input_amount.value);
    }
    if (document.querySelector("#kategoria") != null) {
      const input_category = document.querySelector(
        "#kategoria"
      ) as HTMLInputElement;
      category = input_category.value;
    }

    if (
      document.querySelector("#radio1") != null &&
      document.querySelector("#radio2") != null
    ) {
      const radio1 = document.querySelector("#radio1") as HTMLInputElement;
      const radio2 = document.querySelector("#radio2") as HTMLInputElement;
      if (radio1.checked) {
        //przychód
        item = {
          id: id,
          name: name,
          amount: amount,
          type: "Przychód",
          category: category,
        };
      } else if (radio2.checked) {
        //wydatek
        if (amount > 0) {
          amount = amount * -1;
        }

        item = {
          id: id,
          name: name,
          amount: amount,
          type: "Wydatek",
          category: category,
        };
      }
    }
    calculateBill();
    setKeys([...keys, id]);
    Add_LocalStorage(item, id);
  }

  // Obliczanie bilansu na podstawie amount wyciąganego z itemów w localStorage
  function calculateBill(): number {
    let bil = 0;

    keys.forEach((k) => {
      let item = Get_LocalStorage_item(k);

      bil += item.amount;
    });

    return bil;
  }

  return (
    <>
      <div className="container mt-5" style={{ width: "50vw" }}>
        <div id="form">
          <div className="card-body" style={{ color: "white" }}>
            <h2 className="text-center mb-4">
              Bilans konta: {calculateBill()} PLN
            </h2>

            {/* formularz z akcją która wywołuje funkcję Add() */}
            <form action={Add}>
              <div className="mb-3">
                <label className="form-label">Nazwa</label>

                <input
                  type="text"
                  id="tekst"
                  placeholder="Nazwa"
                  className="form-control"
                  required
                />
              </div>

              <div className="mb-3">
                <label className="form-label">Kwota</label>

                <input
                  type="number"
                  id="kwota"
                  placeholder="Kwota"
                  className="form-control"
                  required
                />
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

                  <label className="form-check-label" htmlFor="radio1">
                    Przychód
                  </label>
                </div>

                <div className="form-check form-check-inline">
                  <input
                    type="radio"
                    name="rg1"
                    id="radio2"
                    className="form-check-input"
                  />

                  <label className="form-check-label" htmlFor="radio2">
                    Wydatek
                  </label>
                </div>
              </div>

              <div className="mb-4">
                <label className="form-label">Kategoria</label>

                <input
                  type="text"
                  id="kategoria"
                  placeholder="Kategoria"
                  className="form-control"
                  required
                />
              </div>

              <button className="btn btn-success w-100">Dodaj</button>
            </form>
          </div>
        </div>

        <div id="cards" className="mt-4">
          <Show />
        </div>
      </div>
    </>
  );
}
