export type Transakcja = { id: string, name: string, amount: number, type: "Przychód"|"Wydatek", category:string}



export function Add_LocalStorage(item: Transakcja, key:string){
    localStorage.setItem(key, JSON.stringify({item }))
    
}

export function Get_LocalStorage_item(id:string){
    const data = localStorage.getItem(id);


    if(data == null){
        return null
    }
    let item:any = JSON.parse(data)
    
    
    return item.item
    
}

export function Remove_LocalStorage_item(id:string){
    let del = confirm("Czy na pewno chcesz usunąć tę transakcję?");
    if(!del) return;
    else{
        localStorage.removeItem(id);
        window.location.reload();
        console.log("Usunięto item o kluczu: "+id)
    }

    
}
  