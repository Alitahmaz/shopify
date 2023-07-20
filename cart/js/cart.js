$(function () {
    $("#header").load("../../header.html");
    $("#footer").load("../../footer.html")
});

let cartBadge = null;
const notFound = document.getElementById('no-found');
const favItem = document.getElementById('fav-item');
const cartArray = JSON.parse(localStorage.getItem('cart'))
const tbody = document.getElementById('t-body')

setTimeout(() => {
    cartBadge = document.getElementById('cart-badge');
    cartBadge.innerText = JSON.parse(localStorage.getItem('cart')).length;
}, 500)




if (cartArray && cartArray.length) {
    notFound.classList.add('d-none')
    renderList(cartArray);

} else {
    hideCartList();
    showNotFound(notFound);
}

function showNotFound(notFound) {
    notFound.classList.remove('d-none')
}

function hideCartList() {
    favItem.classList.add('d-none')
}

function renderList(array) {
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
                            <span class="minus"><svg width="11" height="2" viewBox="0 0 11 2" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 1H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg></span>
                            <input class="quantity-input" type="text" readonly="" value="1"><span class="plus"><svg width="11" height="12" viewBox="0 0 11 12" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M1 6H10" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M5.5 10.5V1.5" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                            </span>
                            </div>
                            </span>
                        </td>
                       <td>
                            <button data-itemId=${i} onclick="removeFromCart(event)" class="remove-btn"><i data-itemId=${i} class="fa fa-close"></i>Remove</button>
                        </td>`;
        tbody.appendChild(template)
    }
    const notFound = document.getElementById('no-found');
    setTimeout(() => {
        cartBadge.innerHTML = JSON.parse(localStorage.getItem('cart')).length;
    }, 500)
    if (!cartArray.length) {
        hideCartList();
        showNotFound(notFound);
    }
}

function clearCart(){
    localStorage.setItem('cart', JSON.stringify([]))
    const fromLocal = JSON.parse(localStorage.getItem('cart'));
    cartArray.length = 0;
    renderList(fromLocal)
}

function removeFromCart(event) {
    const itemId = event.target.dataset.itemid
    cartArray.splice(itemId, 1);
    const newCartArray = [...cartArray]
    localStorage.setItem('cart', JSON.stringify(newCartArray))
    const fromLocal = JSON.parse(localStorage.getItem('cart'));
    renderList(fromLocal)
}
