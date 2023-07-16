
$(".carousel").swipe({
    swipe: function(event, direction) {
        if (direction === 'left') $(this).carousel('next');
        if (direction === 'right') $(this).carousel('prev');
    },
});
