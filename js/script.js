$(document).ready(function () {

    //menu-toggle
    var isOpenedMenu = false;

    $('.menu-icon').click(function (e) {
        isOpenedMenu = !isOpenedMenu;

        e.preventDefault();
        $(this).toggleClass('open');

        if (isOpenedMenu) {
            $('.sidebar_nav').removeClass('hide');
            $('.sidebar_nav').toggleClass('show');
            $('.header').css('z-index', '10');
            $('.footer_nav').css('opacity', '0');
            $('.link-page1').css('opacity', '0');
            $('.form_content').css('z-index', '1');
        } else {
            $('.sidebar_nav').removeClass('show');
            $('.sidebar_nav').toggleClass('hide');
            setTimeout(() => {
                $('.header').css('z-index', '0');
            }, 500);

            $('.footer_nav').css('opacity', '1');
            $('.link-page1').css('opacity', '1');
            setTimeout(() => {
                $('.form_content').css('z-index', '10');
            }, 500);
        }
    });

    var menuItemName = setInitialMenuName();
    handleMenus(menuItemName);

    // menu active item
    $('.sidebar_nav a').click(function () {
        $('.sidebar_nav').removeClass('show');
        $('.sidebar_nav').toggleClass('hide');

        $('.menu-icon').removeClass('open');

        $('.footer_nav').css('opacity', '1');
        $('.link-page1').css('opacity', '1');

        isOpenedMenu = false;

        handleMenus($(this).attr('href'));
    });

    // footer-menu active item
    $('.footer_nav a').click(function () {
        handleMenus($(this).attr('href'));
    });


    // price and photo carousels
    var currentPriceIndex = 0;
    var priceSlidesCount = $('.rate').length;

    $('#items-price').text('/0' + priceSlidesCount);
    updateCurrentSlideNumber('item-price', currentPriceIndex + 1);

    //price carousel
    $('.rates').owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false
    });

    //photo carousel
    $('.photo_rates').owlCarousel({
        items: 1,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false
    });

    $('#price-btn-prev').click(function() {
        if (currentPriceIndex > 0) {
            reinitCarousel(
                'rates',
                currentPriceIndex,
                'slideOutUp',
                'slideInUp'
            ).trigger('prev.owl');

            reinitCarousel(
                'photo_rates',
                currentPriceIndex,
                'fadeOut',
                'fadeIn'
            ).trigger('prev.owl');

            currentPriceIndex--;

            updateCurrentSlideNumber('item-price', currentPriceIndex + 1);

            if (currentPriceIndex === 0) {
                $('#price-btn-next').addClass('active');
                $('#price-btn-prev').removeClass('active');
            } else if (currentPriceIndex > 0 && currentPriceIndex < (priceSlidesCount - 1)) {
                $('#price-btn-next').addClass('active');
                $('#price-btn-prev').addClass('active');
            }
        }
    });

    $('#price-btn-next').click(function() {
        if (currentPriceIndex < (priceSlidesCount - 1)) {
            reinitCarousel(
                'rates',
                currentPriceIndex,
                'slideOutDown',
                'slideInDown'
            ).trigger('next.owl');

            reinitCarousel(
                'photo_rates',
                currentPriceIndex,
                'fadeOut',
                'fadeIn'
            ).trigger('next.owl');

            currentPriceIndex++;
        }
    });



//section scroll

    $(function() {
        $.scrollify({
            section : ".main",
        });
    });

    $.scrollify({
        section : ".main",
        interstitialSection : "",
        easing: "easeOutExpo",
        scrollSpeed: 900,
        offset : 0,
        scrollbars: false,
        standardScrollElements: "",
        setHeights: true,
        overflowScroll: true,
        updateHash: true,
        touchScroll:true,
        after: function (index, sections) {
            handleMenus(setInitialMenuName())
        }
    });

    //timer

    function makeTimer() {

        var endTime = new Date("29 April 2020 9:56:00 GMT+01:00");
        endTime = (Date.parse(endTime) / 1000);

        var now = new Date();
        now = (Date.parse(now) / 1000);

        var timeLeft = endTime - now;

        var days = Math.floor(timeLeft / 86400);
        var hours = Math.floor((timeLeft - (days * 86400)) / 3600);
        var minutes = Math.floor((timeLeft - (days * 86400) - (hours * 3600 )) / 60);
        var seconds = Math.floor((timeLeft - (days * 86400) - (hours * 3600) - (minutes * 60)));

        if (hours < "10") { hours = "0" + hours; }
        if (minutes < "10") { minutes = "0" + minutes; }
        if (seconds < "10") { seconds = "0" + seconds; }

        $("#days").html(days + "<span>D</span>");
        $("#hours").html(hours + "<span>H</span>");
        $("#minutes").html(minutes + "<span>M</span>");
        $("#seconds").html(seconds + "<span>S</span>");

    }

    setInterval(function() { makeTimer(); }, 1000);

    //input-focus
    $('.input-box input').focus(function(){
        $(this).data('placeholder',$(this).attr('placeholder'));
        $(this).attr('placeholder','');
        $(this).siblings().css('display', 'flex');
    });
    $('.input-box input').blur(function(){
        $(this).attr('placeholder',$(this).data('placeholder'));
        $(this).siblings().css('display', 'none');
    });

});

function handleMenus(menuItemName) {
    $('.nav-item').removeClass("active");
    $('.footer_nav-item').removeClass("active");

    $('.sidebar_nav a[href$="' + menuItemName + '"]').addClass("active");
    $('.footer_nav a[href$="' + menuItemName + '"]').addClass("active");
}

function setInitialMenuName() {
    var url = window.location.href;

    if (url.indexOf("#2") > -1) {
        return '#price';
    } else if ( url.indexOf("#3") > -1) {
        return '#bonuses';
    } else if ( url.indexOf("#4") > -1) {
        return '#contacts'
    }

    return '#';
}

function updateCurrentSlideNumber(elementId, number) {
    $('#' + elementId).text('0' + number);
}

function reinitCarousel(carouselClass, startPosition, animateOutClass, animateInClass) {
    carousel = $('.' + carouselClass);

    carousel.data('owl.carousel').destroy();

    return carousel.owlCarousel({
        items: 1,
        startPosition: startPosition,
        animateOut: animateOutClass,
        animateIn: animateInClass,
        loop: true,
        mouseDrag: false,
        touchDrag: false,
        pullDrag: false
    });
}




