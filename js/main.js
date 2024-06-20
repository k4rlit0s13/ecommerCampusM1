import { menuListCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductName, getAllCategory, getAllProductRandom } from "./module/app.js";
import { getProductId } from "./module/detail.js";

//variables del html guardadas 
let input__search = document.querySelector("#input__search");
let main__article = document.querySelector(".main__article");
let nav__ul = document.querySelector(".nav__ul");

//eventos, click, acciones etc, interaciones con prefirer, cargas etc
//evento aautoejecutable, se activa  apenas se carge el html
//ctrl+espacio, muestra los tipos de eventos
//localstorage es una palabra reservada
addEventListener("DOMContentLoaded", async e=>{ 
    //condicion de validacion de los datos existen
    if(!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory()));
    //meter cambios dentro del html de nav__ul con la plantilla dinamica de la lista de categorias con su parametro que sea el get allcategory y el parse convierte de string a valor quita comillas de los datos
    nav__ul.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));  
//gonorrea de 
    history.pushState(null, "", "?id=fashion");
    input__search.value = "zapato"
    const eventoChange = new Event('change');
    input__search.dispatchEvent(eventoChange);
})

let searchProducts = async e => {

    let params = new URLSearchParams(location.search);
    let dataSearch = { search : e.target.value, id: params.get('id')}
    console.log(dataSearch);
    input__search.value = null;
    let res = ""
    if(input__search.dataset.opc == "random"){
        res = await getAllProductRandom({})
        delete input__search.dataset.opc
        history.pushState(null, "", "?id=aps");
        console.log(dataSearch);
    }
    else {
        res = await getAllProductName(dataSearch)
        console.log(dataSearch);
    } 
    console.log(res);

    //IMPRIMIR LOS PRODUCTOS DE LA API
    main__article.innerHTML = galleryIndex(res, params.get('id'));
    
    let {data: {products}} = res;
    let asin = products.map(value => {return {id: value.asin}});

    let proceso = new Promise(async(resolve, reject)=>{
        for (let i = 0; i < asin.length; i++) {
            if(localStorage.getItem(asin[i].id)) continue;
            let data = await getProductId(asin[i])
            localStorage.setItem(asin[i].id, JSON.stringify(data))
        }
        resolve({message: "Datos buscados correctamente" });
    })
    Promise.all([proceso]).then(res => {console.log(res);})

}


input__search.addEventListener("change", searchProducts);