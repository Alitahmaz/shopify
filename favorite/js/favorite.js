$(function () {
    $("#header").load("../../header.html");
    $("#footer").load("../../footer.html")
});

let favoriteBadge = null;

setTimeout(() => {
    favoriteBadge = document.getElementById('favorite-badge');
    favoriteBadge.innerText = JSON.parse(localStorage.getItem('favorites')).length;
}, 500)

const notFound = document.getElementById('no-found');
const favItem = document.getElementById('fav-item');
const favoriteArray = JSON.parse(localStorage.getItem('favorites'))
const tbody = document.getElementById('t-body')
let quantityValue = 1;

if (favoriteArray && favoriteArray.length) {

    notFound.classList.add('d-none')
    renderFavorites(favoriteArray);

} else {
    hideFavoritesList();
    showNotFound();
}

function showNotFound() {
    notFound.classList.remove('d-none')
}

function hideFavoritesList() {
    favItem.classList.add('d-none')
}

function incrementValue() {
    var value = parseInt(document.getElementById('quantityValue').value, 10);
    value = isNaN(value) ? 0 : value;
    value++;
    if (value < 1) {
        value = 1;
    }
    document.getElementById('quantityValue').value = value;
}

function decrementValue() {
    var value = parseInt(document.getElementById('quantityValue').value, 10);
    value = isNaN(value) ? 0 : value;
    value--;
    if (value < 1) {
        value = 1;
    }
    document.getElementById('quantityValue').value = value;
}

function renderFavorites(array) {
    tbody.innerHTML = '';
    for (let i = 0; i < array.length; i++) {
        const template = document.createElement('tr')
        template.innerHTML = `            <td>
                 <a href="" class="image-wrapper">
                                <img id="product-img" src=${array[i].image} alt="">
                         </a>
                      </td>
                     <td>
                          <span id="product-name">${array[i].itemName}</span>
                        </td>
                        <td>
                            <span id="product-price">${array[i].itemPrice}</span>
                        </td>
                        <td>
                            <span>
                            <div class="count-input mt-10 mb-10">
                            <span class="minus" onClick="decrementValue()"><svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                            <input class="quantity-input" id="quantityValue" type="text" readonly="" value="${quantityValue}"><span onClick="incrementValue(event)" class="plus"><svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.5 10.5V1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </span>
                            </div>
                            </span>
                        </td>
                        <td>
                            <button class="add-to-cart">Add to Cart</button>
                        </td>
                       <td>
                            <button data-itemId=${i} onclick="removeFromFavorite(event)" class="remove-btn"><i data-itemId=${i} class="fa fa-close"></i>Remove</button>
                        </td>`;
        tbody.appendChild(template)
    }
    setTimeout(() => {
        favoriteBadge.innerText = JSON.parse(localStorage.getItem('favorites')).length;
    }, 500)
    if (!favoriteArray.length) {
        hideFavoritesList();
        showNotFound();
    }
}


function removeFromFavorite(event) {
    const itemId = event.target.dataset.itemid
    favoriteArray.splice(itemId, 1);
    const newFavoriteList = [...favoriteArray]
    localStorage.setItem('favorites', JSON.stringify(newFavoriteList))
    const fromLocal = JSON.parse(localStorage.getItem('favorites'));
    renderFavorites(fromLocal)
}
