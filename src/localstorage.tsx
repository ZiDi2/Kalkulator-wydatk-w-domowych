import type { Transaction } from "./types/Transakcja";

// Dodanie do localstorage
// Parametry:
//    - item: item typu Transakcja z wszystkimi potrzebnymi parametrami
//    - key: klucz do localStorage
export function Add_LocalStorage(item: Transaction, key: string): void {
  localStorage.setItem(key, JSON.stringify({ item }));
}

// funkcja do wyciągnięcia itemu z localstorage
// parametr id odpowiada id w localStorage
export function Get_LocalStorage_item(id: string): any {
  // nie ma typu bo błąd " Type 'string | null' is not assignable to type 'string' "
  const data = localStorage.getItem(id);

  // jeżeli nie ma itemu o takim id to zwraca null żeby błędu nie było
  if (data == null) {
    return null;
  }
  // Konwert na z formatu json
  let item: any = JSON.parse(data);

  return item.item;
}

// funkcja do usówania itemów z localstorage
export function Remove_LocalStorage_item(id: string): void {
  let del = confirm("Czy na pewno chcesz usunąć tę transakcję?");
  if (!del) return;
  else {
    localStorage.removeItem(id);
    // odświeżenie strony po usuńęciu itemu z localstorage
    // Tak bo nie exportuje useState z kluczami a inaczej się nie odświeży
    window.location.reload();
    console.log("Usunięto item o kluczu: " + id);
  }
}
