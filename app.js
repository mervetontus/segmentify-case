
let userCategories = [];
let sizeOzel = [];
let tamir = [];
let mobilya = [];
let saglik = [];
let bilgisayar = [];
let isitma = [];
let recommendedProducts;

/*
const main=document.querySelector(".product-card")

const listItems=(image,name,priceText,shippingFee)=>{
/*
    let product= document.querySelector(".product-card")
    let productImage= document.querySelector(".product-image");
    let productName= document.querySelector(".product-title");
    let productPriceText= document.querySelector(".product-price");
    let productCargo= document.querySelector(".product-cargo");
    let button = document.querySelector(".buy-button")

*/
/*
    let product= document.createElement("div")
    let productImage= document.createElement("img");
    let productName= document.createElement("p");
    let productPriceText= document.createElement("p");
    let productCargo= document.createElement("p");
    let button = document.createElement("div")

   
    productImage.classList.add("product-image")
    productName.classList.add("product-title")
    productPriceText.classList.add("product-price")
    button.classList.add("buy-button")

    productImage.src=image;
    productName.textContent=name;
    productPriceText.textContent=priceText;
    productCargo.textContent=shippingFee;    

    product.appendChild(productImage);
    product.appendChild(productName);
    product.appendChild(productPriceText);
    product.appendChild(productCargo);
    product.appendChild(button)
    main.appendChild(product);
}
*/
function slider() {

    var swiper = new Swiper('.js-product-slider', {
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev'
        },
        pagination: {
            el: ".swiper-pagination",
            type: "progressbar"
        },
        lazy: true,
        breakpoints: {
            350: {
                slidesPerView: 1,
            },
            425: {
                slidesPerView: 2,
            },
            768: {
                slidesPerView: 3,
            },
            1300: {
                slidesPerView: 3,
            }
        },
        slidesPerView: 1
    });
};


async function getProduct() {
    let response = await fetch("product-list.json");
    let data = await response.json();

    userCategories = data.responses[0][0].params.userCategories;
    recommendedProducts = data.responses[0][0].params.recommendedProducts;
    sizeOzel = data.responses[0][0].params.recommendedProducts["Size Özel"];
    tamir = data.responses[0][0].params.recommendedProducts["Yapı Market & Tamirat > Tamir, Tadilat Gereçleri"];
    mobilya = data.responses[0][0].params.recommendedProducts["Ev, Dekorasyon, Bahçe > Mobilya"];
    saglik = data.responses[0][0].params.recommendedProducts["Kozmetik & Kişisel Bakım > Sağlık, Medikal"];
    bilgisayar = data.responses[0][0].params.recommendedProducts["Bilgisayar, Tablet > Dizüstü Bilgisayar (Laptop)"];
    isitma = data.responses[0][0].params.recommendedProducts["Beyaz Eşya & Küçük Ev Aletleri > Isıtma, Soğutma Sistemi"];

    let categoryTitles = [];

    for (i = 0; i < userCategories.length; i++) {
        if (userCategories[i].includes(">")) {
            let categoryTitle = userCategories[i].slice(userCategories[i].indexOf(">") + 2);
            categoryTitles[i] = categoryTitle;
        } else {
            categoryTitles[i] = userCategories[i];
        }
    }

    const createCategoryItems = () => {
        const categoriesEl = document.querySelector(".categories");
        let categoriesHtml = "";
        let categoryName = ["Size Özel"];
        categoryTitles.forEach((type) => {
            if (categoryName.findIndex((filter) => filter == type) == -1)
                categoryName.push(type);
        })
        categoryName.forEach((type, index) => {
            categoriesHtml += `<li class="${index == 0 ? "active" : null}"> ${categoryTitles[type] || type}</li> `;
        })
        categoriesEl.innerHTML = categoriesHtml;
    }

    const listSizeOzel = () => {
        let listEl = document.querySelector(".card-list ");
        let listHtml = "";
        sizeOzel.forEach((item) => {
            listHtml += ` 
            <div class="product-card">
            <div class="product-image">
                <img src="${item.image}" alt="test image"
                    width="200px" height="210px"></img>
            </div>
            <div class="product-title">
                <p>${item.name}</p>
            </div>
            <div class="product-price">
                <p>${item.priceText}</p>
            </div>
            <div class="product-cargo">
             <p><i class="bi bi-truck"></i> Ücretsiz Kargo</p>
            </div>
            <div>
                <button class="buy-button">Sepete Ekle</button>
            </div>
        </div>
        `
        })
    
        listEl.innerHTML = listHtml;
    }

/*
    const listSizeOzel=()=>{
        sizeOzel.map((item)=>{
            listItems(item.image, item.name, item.priceText)
        })
    }
*/
    setTimeout(() => {
        createCategoryItems();
        listSizeOzel();
    }, 100)

}

getProduct();
