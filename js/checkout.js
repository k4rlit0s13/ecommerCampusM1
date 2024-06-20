import { productSelectedCheckout } from "./components/section.js";

let checkout__details=document.querySelector('.checkout__details')

addEventListener("DOMContentLoaded", async(e)=>{

    //toma del primer dato del sessionStorage(dato guardado)
    const getAllValidEntries = (storage) => {
        const validEntries = [];
        for (let i = 0; i < storage.length; i++) {
            let key = storage.key(i), value = storage.getItem(key);
            if (!/^(true|false|\d+)$/.test(value)) {
                validEntries.push({ key, value });
            }
        }
        return validEntries;
    }
    const allValidEntries = getAllValidEntries(sessionStorage);
    
    console.log(allValidEntries);

    productSelectedCheckout(allValidEntries);
    

})