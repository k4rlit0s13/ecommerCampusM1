//introduccion a DOM
//interpolarizacion
let header__information=document.querySelector(".header__information")
let[p,span]=header__information.children;
    // usar innerhtml para modificar datos con h1 o html en general, si no, innertext no mas
span.innerHTML="Carlos David";
console.log(getAllCategory());

import { menuListCategoryIndex } from "./components/menu.js";
import { galleryIndex } from "./components/gallery.js";
import { getAllProductName, getAllCategory } from "./module/app.js";


let input__search = document.querySelector("#input__search");
let main__article = document.querySelector(".main__article");
let nav__ul = document.querySelector(".nav__ul");

addEventListener("DOMContentLoaded", async e=>{
    if(!localStorage.getItem("getAllCategory")) localStorage.setItem("getAllCategory", JSON.stringify(await getAllCategory()));
    nav__ul.innerHTML = await menuListCategoryIndex(JSON.parse(localStorage.getItem("getAllCategory")));  
})


input__search.addEventListener("change", async (e) => {
    let params = new URLSearchParams(location.search);
    let data = { search : e.target.value, id:params.get('id')}
    console.log(data)
    input__search.value = null;
    let res = await getAllProductName(data)
    main__article.innerHTML = galleryIndex(res,params.get('id'));
});


