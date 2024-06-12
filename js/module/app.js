import { headers } from "../components/env.js";

export const getAllProductName = async({search:text} = {search:"Phone"})=>{
    console.log("Esperando .......");
    const url = `https://real-time-amazon-data.p.rapidapi.com/search?query=${text}=1&country=US&sort_by=RELEVANCE&product_condition=ALL`;
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