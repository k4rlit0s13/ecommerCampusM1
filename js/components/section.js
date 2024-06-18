export const titleProductDetail = async({ data:dataUpdate } = res)=>{
    return /*html*/`
        <article class="article__detail">
            <div class="detail__head">
                <h1>${dataUpdate.product_title}</h1>
                <div class="product__select">
                <img id="btn_minus" src="../storage/img/minus.svg">
                <span id="span_quantity">1</span>
                <img id="btn_plus" src="../storage/img/plus.svg" alt="">
                </div>
            </div>
            <div class="detail__score">
                ${new Array(parseInt(dataUpdate.product_star_rating)).fill(`<img src="../storage/img/star.svg">`).join('')}
                <span>${dataUpdate.product_star_rating}</span>
                <a href="${dataUpdate.product_url}">(${dataUpdate.product_num_ratings} reviews)</a>
            </div>
        </article>`;
}


export const productDetail = async(res)=>{
    let {data} = res;
    let {
        category_path,
        about_product,
        product_details,
        product_information,
        product_photos,
        product_variations,
        rating_distribution,
        review_aspects,
        ...dataUpdate
    } = data;
    // console.log(dataUpdate);
    let string1 = dataUpdate.product_description.slice(0, 165);
    let string2 = dataUpdate.product_description.slice(166);


    return /*html*/`
    <details>
        <summary>${(dataUpdate.product_description.length >= 165) ? string1+"..." : string1}</summary>
        <p>${string2}</p>
    </details>`;
}