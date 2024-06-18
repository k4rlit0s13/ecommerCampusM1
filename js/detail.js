import { buttonCartDetails } from "./components/footer.js";
import { galleryCategory } from "./components/gallery.js";
import { productDetail, titleProductDetail } from "./components/section.js";
import { getProductId } from "./module/detail.js";

let main__section_gallery = document.querySelector("#main__section__gallery");
let main__section__title = document.querySelector("#main__section__title");
let product__information = document.querySelector(".product__information");
let footer__ul = document.querySelector(".footer__ul");

addEventListener("DOMContentLoaded", async(e)=>{
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    if(!localStorage.getItem(id)) localStorage.setItem(id, JSON.stringify(await getProductId({id})));

    let info = JSON.parse(localStorage.getItem(id));
    main__section_gallery.innerHTML = await galleryCategory(info);
    main__section__title.innerHTML = await titleProductDetail(info);
    let btn_minus = document.querySelector("#btn_minus");
    let btn_plus = document.querySelector("#btn_plus");
    product__information.innerHTML = await productDetail(info);
    footer__ul.innerHTML = await buttonCartDetails(info);

    btn_minus.addEventListener("click",quantity)
    btn_plus.addEventListener("click",quantity)

})

    const quantity = async (e)=>{
    let span_quantity = document.querySelector("#span_quantity");
    let price_discount = document.querySelector("#price_discount");
    let price_original = document.querySelector("#price_original");
    let params = new URLSearchParams(location.search);
    let id = params.get('id');
    let res = JSON.parse(localStorage.getItem(id)).data;

    let product_original_price = undefined;
    if(res.product_original_price) product_original_price = Number(res.product_original_price.replace("$", ""));
    let product_price= Number(res.product_price.replace("$", ""));


    if(e.target.id == "btn_plus")span_quantity.innerHTML = Number(span_quantity.innerHTML) + 1
    if(e.target.id == "btn_minus" && span_quantity.innerHTML > "1") span_quantity.innerHTML = Number(span_quantity.innerHTML) - 1;

    price_discount.innerHTML = `$${(product_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
    if(product_original_price) price_original.innerHTML = `$${(product_original_price * Number(span_quantity.innerHTML)).toFixed(2)}`;
    // Swal.fire({
    //     position: "top-end",
    //     title: `<small>Product ${id} with a quantity of ${span_quantity.innerHTML} was added to the cart</small>`,
    //     showConfirmButton: false,
    //     timer: 2000
    // });
}