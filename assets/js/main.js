

fetchApi();
amountButton();
favouriteButton();
    function fetchApi(){

        //  Item Vars
        const title = document.getElementById("item-title");
        const titlebc = document.getElementById("item-title-breadcrum");
        const brand = document.getElementById("item-brand");
        const desc = document.getElementById("item-desc");
        const images = document.getElementById("item-images");
        const price = document.getElementById("item-price");
        const compareprice = document.getElementById("item-compare-price");
        const variantscolors = document.getElementById("variants-colors");
        const variantsSizes = document.getElementById("variants-size");
        const totalprice = document.getElementById("total-price");


        const url = "https://graditest-store.myshopify.com/products/free-trainer-3-mmw.js"
        fetch(url)
        .then(response => response.json())
        .then(data => { 
            console.log(data);
            titlebc.innerHTML = data.title;
            title.innerHTML = data.title;
            brand.innerHTML = data.brand;
            desc.innerHTML = data.description;
            price.innerHTML = `<span id="current-price" data-price="${data.price}">${priceFormat(data.price)}</span>`;
            compareprice.innerHTML = `${priceFormat(data.compare_at_price)}`;
            totalprice.innerHTML = `&nbsp;${priceFormat(totalPrice(data.price,1))}`;

            // Images
            var imagesItem = data.images.map(imageSRC => {
                return `<div class="carousel-item"><img src="${imageSRC}" class="d-block w-100"></div>`;
            }).join('');
            
            //Variants
            var colorslist = data.options[0].values.map(color => {
                return `<input class="form-check-input mx-1" name="color" type="checkbox" value="${color}" onclick="onlyOneColor(this)"style="background: ${color}"></input>`;
            }).join('');
            
            var sizeslist = data.options[1].values.map((size, index) => {
                return `<input class="item-size" type="checkbox" name="size" id="${size}" onclick="onlyOneSize(this)" value="${size}"><label class="item-size-label" for="${size}"> ${size}</label>`;
            }).join('');

            images.innerHTML = imagesItem;
            variantscolors.innerHTML = colorslist;
            variantsSizes.innerHTML = sizeslist;

        })

}

function totalPrice(price,cant){
    return price * cant
}

function onlyOneSize(checkbox) {
    var checkboxes = document.getElementsByName("size");
    checkboxes.forEach((item) => {
        if (item !== checkbox) 
        item.checked = false;
    })
}
function onlyOneColor(checkbox) {
    var checkboxes = document.getElementsByName("color");
    checkboxes.forEach((item) => {
        if (item !== checkbox) 
        item.checked = false;
    })
}


function amountButton() {

    var minusBtn = document.getElementById("minus"),
        plusBtn = document.getElementById("plus"),
        numberPlace = document.getElementById("numberPlace"),
        number = 1,
        min = 1,
        max = 30;
    numberPlace.oninput = function() {
        if (number > 1) {
            numberPlace.value = 1;
        }
    }
    minusBtn.onclick = function () {
        if (number > min) {
            number = number - 1;
            numberPlace.value = number;
            var itemprice = document.getElementById("current-price");
            var totalprice = document.getElementById("total-price");

            totalprice.innerHTML = `  ${priceFormat(itemprice.getAttribute("data-price") * number)}`;
        }
    }
    plusBtn.onclick = function () {
        if (number < max) {
            number = number + 1;
            numberPlace.value = number; 

            var itemprice = document.getElementById("current-price");
            var totalprice = document.getElementById("total-price");

            totalprice.innerHTML = `  ${priceFormat(itemprice.getAttribute("data-price") * number)}`;
        }
    }
    
}


function priceFormat(amount){
    const options2 = { style: 'currency', currency: 'USD' };
    const numberFormat2 = new Intl.NumberFormat('en-US', options2);
    return `${numberFormat2.format(amount).replace(/,/g, '.')}`;
}





function favouriteButton(){
    var btn = document.getElementById("favourite");
    btn.onclick = function () {
        swal({
            title: "Added to favorites!",
            text: "You clicked the button!",
            icon: "success",
            button: "OK",
          });
    }
}



