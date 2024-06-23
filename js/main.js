// Elements to interact with
let header__information = document.querySelector(".header__information");
let [p, span] = header__information.children;
span.innerHTML = "Carlos David";

let input__search = document.querySelector("#input__search");
let main__article = document.querySelector(".main__article");
let nav__ul = document.querySelector(".nav__ul");
let loader = document.getElementById('loader');


// Import external spells from other wizards
import { menuListCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductName, getAllCategory, getAllProductRandom } from "./module/app.js";

// Función para cargar las categorías y actualizar el menú de navegación
const loadCategories = async () => {
    let categorias = JSON.parse(localStorage.getItem("getAllCategory"));
        if (!categorias) {
            const result = await getAllCategory();
            categorias = result.data;
            localStorage.setItem("getAllCategory", JSON.stringify(categorias));
            console.log("Datos obtenidos de la API y guardados en localStorage.");
        } else {
            console.log("Usando categorías almacenadas en localStorage.");
        }
            nav__ul.innerHTML = menuListCategoryIndex({ data: categorias });

            // Agregar evento de clic a cada categoría del menú
            nav__ul.querySelectorAll("li").forEach((li) => {
                li.addEventListener("click", async (e) => {
                    const categoryId = e.target.dataset.categoryId; // Obtener el ID de la categoría
                    await searchProductsByCategory(categoryId); // Llamar a la búsqueda por categoría
                });
            });
};

// Función para cargar y mostrar productos automáticamente al cargar la página
const loadAndShowGalleryIndex = async () => {
    try {
        const category = "videogames"; // Categoría específica
        const cacheKey = "getAllProductRandom_videogames";
        let cachedProducts = localStorage.getItem(cacheKey);

        // Función para obtener productos y actualizar caché
        const fetchProductsAndUpdateCache = async () => {
            const res = await getAllProductRandom({ category_id: "videogames" });
            const jsonRes = JSON.stringify(res);
            localStorage.setItem(cacheKey, jsonRes);
            console.log("Productos cargados y almacenados correctamente en caché.");
            return res.data; // Devolver solo los datos de productos
        };

        // Verificar si los productos están en caché y cargar o actualizar
        if (!cachedProducts) {
            const products = await fetchProductsAndUpdateCache();
            main__article.innerHTML = galleryIndex(products, category);
        } else {
            const products = JSON.parse(cachedProducts);
            main__article.innerHTML = galleryIndex(products, category);
            // Actualizar caché en segundo plano
            fetchProductsAndUpdateCache();
        }
    } catch (error) {
        console.error("Error al cargar los productos:", error);
    }
};


// Event listener for search input
const setupSearchListener = () => {
    let timeoutId;

    input__search.addEventListener('input', async (e) => {
        const searchText = e.target.value.trim();

        if (e.inputType === 'insertText' && e.data === '\n') {
            e.preventDefault();
            showLoader(); // Mostrar el indicador de carga al iniciar la búsqueda
            searchProducts(searchText);
            return;
        }

        clearTimeout(timeoutId);

        timeoutId = setTimeout(async () => {
            showLoader(); // Mostrar el indicador de carga al iniciar la búsqueda
            searchProducts(searchText);
        }, 500);
    });
};

const showLoader = () => {
    loader.style.display = 'block'; // Mostrar el indicador de carga
};

const hideLoader = () => {
    loader.style.display = 'none'; // Ocultar el indicador de carga
};

// Función para realizar la búsqueda de productos
const searchProducts = async (searchText) => {
        if (searchText.length === 0) {
            main__article.innerHTML = '';
            hideLoader(); // Ocultar el indicador si no hay texto de búsqueda
            return;
        }
    
        const products = await getAllProductName({ search: searchText });
        main__article.innerHTML = galleryIndex(products, "Search Results");
    
        input__search.value = '';
        hideLoader(); // Ocultar el indicador después de cargar los resultados
    };
    

// Initialize spells on DOMContentLoaded
document.addEventListener('DOMContentLoaded', async () => {
    await loadCategories(); // Cargar categorías
    await loadAndShowGalleryIndex(); // Cargar y mostrar productos
    setupSearchListener(); // Configurar el listener de búsqueda
});
