const img = document.getElementsByClassName('product-img');
const name = document.getElementById('item-name');
const category = document.getElementById('item-category');
const categoryClass = document.getElementsByClassName('item-category');
const itemData = JSON.parse(localStorage.getItem('item'));

img[0].src = itemData.itemImage;
img[0].style = 'display:block; margin: 0 auto; width: 100%'
name.innerText = itemData.itemName;
category.innerText = itemData.itemCategory;

for (let i = 0; i < categoryClass.length; i++) {
    categoryClass[i].innerText = itemData.itemCategory;
}


$(function () {
    $("#header").load("header.html");
});


function incrementValue(e) {
    e.preventDefault();
    const fieldName = $(e.target).data('field');
    const parent = $(e.target).closest('div');
    const currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

    if (!isNaN(currentVal)) {
        parent.find('input[name=' + fieldName + ']').val(currentVal + 1);
    } else {
        parent.find('input[name=' + fieldName + ']').val(0);
    }
}

function decrementValue(e) {
    e.preventDefault();
    const fieldName = $(e.target).data('field');
    const parent = $(e.target).closest('div');
    const currentVal = parseInt(parent.find('input[name=' + fieldName + ']').val(), 10);

    if (!isNaN(currentVal) && currentVal > 0) {
        parent.find('input[name=' + fieldName + ']').val(currentVal - 1);
    } else {
        parent.find('input[name=' + fieldName + ']').val(0);
    }
}

$('.input-group').on('click', '.button-plus', function (e) {
    incrementValue(e);
});

$('.input-group').on('click', '.button-minus', function (e) {
    decrementValue(e);
});
$(function () {
    $("#header").load("header.html");
    $("#footer").load("footer.html")
});

function toggleActive(event) {
    const target = event.target || event.srcElement;
    const buttonList = document.querySelectorAll(".active-toggle");
    buttonList.forEach(function(button) {
        if (button === target && !button.classList.contains("active")) {
            return button.classList.add("active");
        }
        return button.classList.remove("active");
    });
}
