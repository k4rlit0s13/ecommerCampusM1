import { productSelectedCheckout } from "./components/section.js";

let checkout__details = document.querySelector('.checkout__details');

// Function to fetch valid entries from sessionStorage
const getAllValidEntries = (storage) => {
    const validEntries = [];
    for (let i = 0; i < storage.length; i++) {
        let key = storage.key(i);
        let value = storage.getItem(key);
        if (value && !/^(true|false|\d+)$/.test(value)) {
            validEntries.push({ key, value });
        }
    }
    return validEntries;
};

// Function to handle the change in quantity
const handleQuantityChange = (event, productElement) => {
    const span = productElement.querySelector('.product__select span');
    let quantity = parseInt(span.textContent);
    if (event.target.classList.contains('minus')) {
        quantity = Math.max(0, quantity - 1);
    } else if (event.target.classList.contains('plus')) {
        quantity += 1;
    }
    span.textContent = quantity;

    // Remove the product if quantity is 0
    if (quantity === 0) {
        productElement.remove();
    }
};

document.addEventListener("DOMContentLoaded", async () => {
    const allValidEntries = getAllValidEntries(sessionStorage);

    allValidEntries.forEach(entry => {
        const plantilla = productSelectedCheckout(entry);
        if (plantilla) {
            const productElement = document.createElement('div');
            productElement.innerHTML = plantilla;
            productElement.querySelector('.product__select').addEventListener('click', (event) => handleQuantityChange(event, productElement));
            checkout__details.appendChild(productElement);
        }
    });
});
