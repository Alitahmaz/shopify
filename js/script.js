

$(window).scroll(function () {
    const height = $(window).scrollTop();
    if (height > 100) {
        $("#top-header").addClass("sticky-header");
    } else {
        $("#top-header").removeClass("sticky-header");
    }
});



$(".carousel").swipe({
    swipe: function (event, direction) {
        if (direction === 'left') $(this).carousel('next');
        if (direction === 'right') $(this).carousel('prev');
    },
});

const items = Array.from(document.getElementsByClassName('product-carousel-item'));

items.forEach(item => {
    const itemData = {
        itemId: Math.random(1, 10),
        itemName: item.children[0].children[1].children[1].innerText,
        itemImage: item.children[0].children[0].children[0].children[0].currentSrc,
        itemCategory: item.children[0].children[1].children[0].innerText
    }
    item.children[0].children[0].children[0].addEventListener('click', (e, element) => {
        e.stopPropagation();
        document.location.href = './item-detail.html';
        localStorage.setItem('item', JSON.stringify(itemData))
    })
})



const wishlistBtns = Array.from(document.getElementsByClassName('tooltip'));
let favoriteBadge = null;
let cartBadge = null;




wishlistBtns.forEach((product, index) => {
    const data = {
        itemName: product.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[1].children[0].innerHTML,
        itemPrice: product.parentElement.parentElement.parentElement.parentElement.parentElement.children[1].children[3].children[1].innerHTML,
        image: product.parentElement.parentElement.parentElement.parentElement.parentElement.children[0].children[0].children[0].src,
    }
    if (product.innerHTML.includes('Wishlist')) {
        product.setAttribute('itemId', String(index));
        product.parentElement.addEventListener('click', () => {
            const stored = JSON.parse(String(localStorage.getItem('favorites')));
            let fav = stored ? stored : [];
            for (let i = 0; i < stored.length; i++) {
                if (product.getAttribute('itemId') === stored[i].id) {
                    fav.splice(i, 1);
                    localStorage.setItem('favorites', JSON.stringify(fav))
                    favoriteBadge.innerText -= 1;
                    return
                }
            }
            favoriteBadge.innerText++;
            fav.push({...data, id: product.getAttribute('itemId')});
            localStorage.setItem("favorites", JSON.stringify(fav));
        })
    }
    if (product.innerHTML.includes('Cart')) {
        product.setAttribute('itemId', String(index));
        product.parentElement.addEventListener('click', () => {
            const stored = JSON.parse(String(localStorage.getItem('cart')));
            let fav = stored ? stored : [];
            for (let i = 0; i < stored.length; i++) {
                if (product.getAttribute('itemId') === stored[i].id) {
                    fav.splice(i, 1);
                    localStorage.setItem('cart', JSON.stringify(fav))
                    cartBadge.innerText -= 1;
                    return
                }
            }
            cartBadge.innerText++;
            fav.push({...data, id: product.getAttribute('itemId')});
            localStorage.setItem("cart", JSON.stringify(fav));
        })
    }
})


$(document).ready(function () {
    $('.home-menu').hover(function () {
        $('.home-megamenu').addClass('show');
    }, function () {
        $('.home-megamenu').removeClass('show');
    });
    $('.product-menu').hover(function () {
        $('.product-megamenu').addClass('show');
    }, function () {
        $('.product-megamenu').removeClass('show');
    });
    $('.shop-menu').hover(function () {
        $('.shop-megamenu').addClass('show');
    }, function () {
        $('.shop-megamenu').removeClass('show');
    });
    $('.blog-menu').hover(function () {
        $('.blog-megamenu').addClass('show');
    }, function () {
        $('.blog-megamenu').removeClass('show');
    });
});
