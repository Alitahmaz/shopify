(function () {
    window.onpageshow = function (event) {
        if (event.persisted) {
            window.location.reload();
        }
    };
})();


const favorites = JSON.parse(localStorage.getItem('favorites'));
const cartList = JSON.parse(localStorage.getItem('cart'));
const overlay = document.getElementById('overlayed');
const rightMenu = document.getElementById('right-menu');
const listItem = document.getElementById('list-item-menu');
const emptyList = document.getElementById('empty-cart');

if (!favorites && !favorites?.length) {
    localStorage.setItem('favorites', JSON.stringify([]))
}
if (!cartList && !cartList?.length) {
    localStorage.setItem('cart', JSON.stringify([]))
}



setTimeout(() => {
    favoriteBadge = document.getElementById('favorite-badge');
    favoriteBadge.innerText = JSON.parse(localStorage.getItem('favorites')).length;
    cartBadge = document.getElementById('cart-badge');
    cartBadge.innerText = JSON.parse(localStorage.getItem('cart')).length;
}, 500)

function renderCartList(array) {
    if (rightMenu) {
        const tbody = document.getElementById('list-item-menu')
        tbody.innerHTML = '';
        for (let i = 0; i < array.length; i++) {
            const template = document.createElement('div')
            template.innerHTML = `
          <div class="pt-3 d-flex gap-3">
            <div style="border: 1px solid #eaebed">
             <img style="width: 100px; height: 100%" src=${array[i].image} />
            </div>
            <div class="d-flex align-items-start w-100 justify-content-between">
              <div>
                <h5 style="font-size: 15px;margin-bottom: 4px;font-weight: 500;">${array[i].itemName}</h5>
                <span style="font-size: 14px;font-weight: 500;color: #0989ff">${array[i].itemPrice}</span>
               </div>
            </div>
           </div>
        `
            tbody.appendChild(template)
        }
        setTimeout(() => {
            cartBadge.innerHTML = JSON.parse(localStorage.getItem('cart')).length;
        }, 500)
    }
}


function openSideMenu() {
    if (rightMenu) {
        const emptyCart = document.getElementById('empty-cart');
        const cartArray = JSON.parse(localStorage.getItem('cart'))
        rightMenu.classList.add('menu-opened');
        overlay.classList.add('overlay-opened');
        const subtotal = document.getElementById('subtotal');
        subtotal.innerText = cartArray?.length;
        if (cartArray && cartArray.length) {
            emptyCart.classList.add('d-none')
            listItem.classList.remove('d-none')
            renderCartList(cartArray);
        }
    }
}

function closeSideMenu() {
    const emptyCart = document.getElementById('empty-cart');
    const cartArray = JSON.parse(localStorage.getItem('cart'))
    rightMenu.classList.remove('menu-opened');
    overlay.classList.remove('overlay-opened');
    if (cartArray && cartArray.length) {
        emptyCart.classList.add('d-none')
        renderCartList(cartArray);
    }
    if (!cartArray && !cartArray.length) {
        hideCartList();
        showNotFound(emptyList);
    }
}

if (overlay) {
    overlay.addEventListener('click', () => {
        closeSideMenu();
    })
}

function goToCart() {
    location.href = './cart/cart.html';
}
