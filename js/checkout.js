import { productSelectedCheckout } from "./components/section.js";

let checkout__details=document.querySelector('.checkout__details')

// checkout.js
addEventListener("DOMContentLoaded", async (e) => {
    const getAllValidEntries = (storage) => {
        const validEntries = [];
        for (let i = 0; i < storage.length; i++) {
            let key = storage.key(i), value = storage.getItem(key);
            if (value && !/^(true|false|\d+)$/.test(value)) {
                validEntries.push({ key, value });
            }
        }
        return validEntries;
    }
    const allValidEntries = getAllValidEntries(sessionStorage);
    console.log(allValidEntries);

    // Insertar dinámicamente el contenido en checkout__details
    allValidEntries.forEach(entry => {
        const plantilla = productSelectedCheckout(entry);
        if (plantilla) {
            checkout__details.innerHTML += plantilla;
        }
    });
});