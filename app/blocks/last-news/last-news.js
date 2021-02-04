$(function() {
    const $more = $('.last-news__more');
    const $container = $('.last-news__list');
    const countAllItems = $('.last-news__item').length;
    const widthWindow = $(window).width();
    let heightContainer = $container.height();
    const rowSpace = parseInt($container.css('gridRowGap'));
    const incrementHeight = heightContainer + rowSpace;
    const speed = 500;
    
    if (widthWindow > 1200) {
        let countVisibleItems = 4;
        let maxHeightContainer = getMaxHeightContainer(countVisibleItems);
        moreItems(maxHeightContainer); 
    } else if (widthWindow > 992 && widthWindow <= 1200) {
        let countVisibleItems = 3;
        let maxHeightContainer = getMaxHeightContainer(countVisibleItems);
        moreItems(maxHeightContainer);
    } else if (widthWindow > 768 && widthWindow <= 992) {
        let countVisibleItems = 2;
        let maxHeightContainer = getMaxHeightContainer(countVisibleItems);
        moreItems(maxHeightContainer);
    } else if (widthWindow <= 768) {
        let countVisibleItems = 1;
        let maxHeightContainer = getMaxHeightContainer(countVisibleItems);
        moreItems(maxHeightContainer);
    }

    function getMaxHeightContainer(countVisibleItems) {
        let step = Math.ceil(countAllItems / countVisibleItems);
        return  step * heightContainer + (--step * rowSpace);
    }

    function moreItems(maxHeightContainer) {
        $more.on('click', function() {
            heightContainer += incrementHeight;
            
            if (heightContainer < maxHeightContainer) {
                $container.animate({height: heightContainer}, speed);
            } else if (heightContainer === maxHeightContainer) {
                $container.animate({height: heightContainer}, speed);
                $(this).addClass('more--disable');
            }
        });
    }
});