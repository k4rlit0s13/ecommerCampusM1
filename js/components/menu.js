export const menuListCategoryIndex = (res) => {
    if (!res || !res.data) {
        console.error("El resultado o los datos son indefinidos.");
        return "";
    }

    let { data } = res;
    let plantilla = "";
    data.forEach((value) => {
        plantilla += /*html*/`
        <li title="${value.name}">
            <a href="?id=${value.id}">
                <img src="storage/img/category.svg">
                <span>${value.name}</span>
            </a>
        </li>
        `;
    });
    return plantilla;
};
