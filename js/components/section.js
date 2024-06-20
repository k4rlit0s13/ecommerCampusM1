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

export const productSelectedCheckout = (res) => {
    let prueba = res.value;
    console.log(prueba);

    // Verificar si 'prueba' no es undefined ni una cadena vacía
    if (!prueba) {
        console.error('El valor recibido es undefined o una cadena vacía');
        return '';
    }

    let data;
    try {
        data = JSON.parse(prueba);
    } catch (error) {
        console.error('Error al analizar JSON:', error);
        return '';
    }
    console.log(data);

    // Extraer los datos necesarios de 'data'
    const productTitle = data.product_title || 'Título no disponible';
    const productDescription = data.product_description || 'Descripción no disponible';
    const productPrice = data.product_price || '0.00'; // Ajusta esto según la estructura de tu data
    const productImage = data.product_photo || '../storage/img/foto2.png'; // Ajusta esto según la estructura de tu data

    // Construir la plantilla dinámica
    let plantilla = "";
    plantilla += /*html*/`
        <article class="detail__product">
            <div class="product__image">
                <img src="${productImage}" alt="">
            </div>
            <div class="product__description">
                <h3>${productTitle}</h3>
                <small>${productDescription}</small>
                <span>$${productPrice}</span>
            </div>
            <div class="product__custom">
                <img src="../storage/img/option.svg" alt="">
                <div class="product__select">
                    <img src="../storage/img/minusCheckout.svg" alt="">
                    <span></span>
                    <img src="../storage/img/plusCheckout.svg" alt="">
                </div>
            </div>
        </article>`;
    return plantilla;
};


