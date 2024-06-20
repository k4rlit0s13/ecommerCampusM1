import { headers } from "../components/env.js";

export const getAllProductName = async({search:text, id:idCategory})=>{
    console.log("Esperando .......");
    console.log(text, idCategory);
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${text}&page=1&country=US&sort_by=RELEVANCE&category_id=${idCategory}&product_condition=ALL`; 
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = res.json();
    return data;
}

export const getAllCategory = async()=>{
    console.log("Esperando .......");
    const url = `https://real-time-amazon-data.p.rapidapi.com/product-category-list?country=US`;
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = res.json();
    return data;
}

export const getAllProductRandom = async({
    query="videogames", 
    page=3000, 
    category_id="gamer",
    min_price=100, 
    max_price=150,
    brand=["adidas", "nike", "puma"]})=>{
    console.log("Esperando .......");
    page = Math.random()*(page/20);
    page = parseInt(Math.round(page));
    if(!page) page = 1;
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${query}&country=US&sort_by=RELEVANCE&category_id=${category_id}&min_price=${min_price}&max_price=${max_price}`;
    const options = {
        method: 'GET',
        headers
    };
    let res = await fetch(url, options);
    let data = res.json();
    return data;
}