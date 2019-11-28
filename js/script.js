
$(document).ready(function () {

    // settings aos

    document.addEventListener('aos:in:room-accordion-item', ({ detail }) => {
        setTimeout(() => {$('.rooms-accordion__item').attr('style', 'transition: width 1s ease !important');}, 1500);
    });


    // scrolling to block


    var anchors = [];
    var currentAnchor = -1;
    var isAnimating  = false;
    $(function(){
        function updateAnchors() {
            anchors = [];
            $('.anchor').each(function(i, element){
                anchors.push( $(element).offset().top );
            });
        }
        $('.scroll-down').on('click', function(e){
            e.preventDefault();
            e.stopPropagation();
            if( isAnimating ) {
                return false;
            }
            isAnimating  = true;
            if( e.originalEvent.wheelDelta >= 0 ) {
                currentAnchor--;
            }else{
                currentAnchor++;
            }
            if( currentAnchor > (anchors.length - 1)
                || currentAnchor < 0 ) {
                currentAnchor = 0;
            }
            isAnimating  = true;
            $('html, body').animate({
                scrollTop: parseInt( anchors[currentAnchor] )
            }, 500, 'swing', function(){
                isAnimating  = false;
            });
        });
        updateAnchors();
    });



    // init select

    $('.lang').styler();
    $('.nav__lang').styler();
    $('.select-celebrate').styler();
    $('.country').styler();
    $('.header__rooms').styler();
    $('.tour__rooms').styler();
    $('.nav__rooms').styler();

    //menu-toggle
    var isOpenedMenu = false;

    $('.menu-icon').click(function (e) {
        isOpenedMenu = !isOpenedMenu;

        e.preventDefault();
        $(this).toggleClass('open');

        if (isOpenedMenu) {
            $('.nav').removeClass('hide');
            $('.nav').toggleClass('show');
            $('a.nav-item').toggleClass('nav-animation');
            $('a.nav-item').removeClass('no-animation');
            $('.nav__secondary').toggleClass('clip-animation');
            $('.nav__secondary').removeClass('clip-animation-no');
            $('.nav__button-box').toggleClass('clip-animation');
            $('.nav__button-box').removeClass('clip-animation-no');
            $('.nav__main').css('display', 'flex');

        } else {
            $('.nav').removeClass('show');
            $('.nav').toggleClass('hide');
            $('a.nav-item').toggleClass('no-animation');
            $('a.nav-item').removeClass('nav-animation');
            $('.nav__secondary').toggleClass('clip-animation-no');
            $('.nav__secondary').removeClass('clip-animation');
            $('.nav__button-box').toggleClass('clip-animation-no');
            $('.nav__button-box').removeClass('clip-animation');
            $('.nav__main').css('display', 'none');
        }
    });

    var menuItemName = setInitialMenuName();
    handleMenus(menuItemName);

    // menu active item
    $('.nav a').click(function () {
        $('.nav').removeClass('show');
        $('.nav').toggleClass('hide');

        $('.menu-icon').removeClass('open');

        $('.footer_nav').css('opacity', '1');
        $('.link-page1').css('opacity', '1');

        isOpenedMenu = false;

        handleMenus($(this).attr('href'));
    });

    // hover tooltip

    $('.tooltip-icon').hover(
        function () {
            $(this).siblings('.musicRoom__buyPriceTooltip').css('height', 'auto').css('opacity', '1')
        },
        function () {
            $(this).siblings('.musicRoom__buyPriceTooltip').css('height', '0').css('opacity', '0')
        }
    );

    $('.booking__stepFoodItem').click(function () {
        $(this).addClass('active')
    });

//main-cursor

    $(document).on('mousemove', function(e) {
        let x = e.pageX;
        let y = e.pageY;
        $('.main').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0), rgba(28, 11, 63, 0.8) 15%)`
        });
        $('#strip').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0), rgba(49, 18, 135, 0.7) 20%)`
        });
        $('#reggae').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(231, 18, 109, 0.7) 20%)`
        });
        $('#gatsby').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(97, 4, 95, 0.8) 20%)`
        });
        $('#comics').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(5, 117, 230, 0.8) 20%)`
        });
        $('#iceberg').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(5, 117, 230, 0.7) 20%)`
        });
        $('#birthday').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(28, 11, 63, 0.83) 20%)`
        });
        $('#bachelor').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(19, 5, 47, 0.8) 20%)`
        });
        $('#hen').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(56, 9, 65, 0.8) 20%)`
        });
        $('#private').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(44, 16, 102, 0.8) 20%)`
        });
        $('#graduation').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(32, 12, 98, 0.8) 20%)`
        });
        $('#corporate').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(44, 16, 102, 0.8) 20%)`
        });
        $('#disco').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0), rgba(28, 11, 63, 0.83) 20%)`
        });
    });

    initCarousel();

    $('.cases').owlCarousel({
        loop: true,
        navText : ["<i class=\"fas fa-chevron-left\" id=\"portfolio-btn-prev\"></i>" ,"<i class=\"fas fa-chevron-right\" id=\"portfolio-btn-next\"></i>"],
        responsiveClass:true,
        responsive:{
            0:{
                items: 1,
                dots: true,
                margin: 10,
                stagePadding: 50,
                nav: false
            },
            600:{
                items: 2,
                stagePadding: 60,
                margin: 15,
            },
            769:{
                items: 2,
                dots: false,
                nav: true,
                stagePadding: 80,
                margin: 15,
            },
            1025:{
                items: 4,
                dots: false,
                stagePadding: 120,
                margin: 30,
                nav: true
            }
        },

    });
    $('.rooms-gallery').owlCarousel({
        loop: true,
        responsiveClass:true,
        responsive:{
            1024:{
                items: 1,
                dots: false,
                margin: 30,
                stagePadding: 220,
                navText : ["<i class=\"fas fa-chevron-left\" id=\"portfolio-btn-prev\"></i>" ,"<i class=\"fas fa-chevron-right\" id=\"portfolio-btn-next\"></i>"],
                nav: true
            },
            768:{
                items: 1,
                dots: false,
                margin: 10,
                stagePadding: 60,
                navText : ["<i class=\"fas fa-chevron-left\" id=\"portfolio-btn-prev\"></i>" ,"<i class=\"fas fa-chevron-right\" id=\"portfolio-btn-next\"></i>"],
                nav: true
            },
            0:{
                items: 1,
                dots: true,
                margin: 10,
                navText : ["<i class=\"fas fa-chevron-left\" id=\"portfolio-btn-prev\"></i>" ,"<i class=\"fas fa-chevron-right\" id=\"portfolio-btn-next\"></i>"],
                nav: true,
            }
        }

    });


    $( ".rooms-accordion__item" ).hover(
        function() {
            $( this ).siblings().addClass( "text-center" );
        }, function() {
            $( this ).siblings().removeClass( "text-center" );
        }
    );


    // datepicker
    $('#datepicker').datepicker({
        language: 'en',
        onRenderCell: function (date, cellType) {
            if (cellType == 'day') {
                var day = date.getDay();
                var week = getWeek(date);
                var isDisabled = false;

                if (week.number == 48) {
                    isDisabled = true;
                }

                return {
                    disabled: isDisabled
                }
            }
        },
        onSelect: function(formattedDate, date, inst) {
            let shortMonth = date.toLocaleString('en', { month: 'short' });
            let longMonth = date.toLocaleString('en', { month: 'long' });
            let day = date.getDate();

            $('#chosen-day').text(day);
            $('#chosen-month').text(shortMonth);
            $('#booking-day').text(day);
            $('#booking-month').text(longMonth);

        }
    });

    var datePicker = $('#datepicker').data('datepicker');

    $('.chosen-date').click(() => {datePicker.show()});

    $('#time-box').html(
        '<div class="time-box__item"><span class="time-start">20:00</span> - <span>22:00</span></div>' +
        '<div class="time-box__item"><span class="time-start">20:00</span> - <span>22:00</span></div></div>' +
        '<div class="time-box__item"><span class="time-start">20:00</span> - <span>22:00</span></div></div>' +
        '<div class="time-box__item"><span class="time-start">20:00</span> - <span>22:00</span></div></div>'
    );

    $('.time-box__item').click(
        function () {
            var timeStart = $(this).find('.time-start').text();
            $("#booking-time-start").text(timeStart);
        }
    );

    $('.musicRoom__buyBtn').click(
        function () {
            var nameRoom = $(this).find('.booking-name-room').text();
            $("#booking-room").text(nameRoom);
        }
    );

    // input-current
    $('.minus-person').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        $("#booking-persons").text(count);
        return false;
    });
    $('.plus-person').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        $("#booking-persons").text($input.val());
        return false;
    });

    $('.minus-hours').click(function () {
        var $input = $(this).parent().find('input');
        var count = parseInt($input.val()) - 1;
        count = count < 1 ? 1 : count;
        $input.val(count);
        $input.change();
        $("#booking-time").text(count + ' hours');
        return false;
    });
    $('.plus-hours').click(function () {
        var $input = $(this).parent().find('input');
        $input.val(parseInt($input.val()) + 1);
        $input.change();
        $("#booking-time").text($input.val() + ' hours');
        return false;
    });

    var isPhotographerChecked = false;
    var isDecorChecked = false;

    $(".checkbox").change(function() {
        var input = $(this).find('input');
        var checkValue = input.attr('id');

        if (input.is(':checked')) {
            var contentAddServices = '<div class="booking__priceInfoTitle">Add. Service:</div>';

            if (checkValue == 'chose1') {
                isPhotographerChecked = true;
            }

            if (checkValue == 'chose2') {
                isDecorChecked = true;
            }
        } else {
            if (checkValue == 'chose1') {
                isPhotographerChecked = false;
            }

            if (checkValue == 'chose2') {
                isDecorChecked = false;
            }
        }

        if (! isDecorChecked && ! isPhotographerChecked) {
            contentAddServices = '';
        } else if (isDecorChecked && isPhotographerChecked) {
            contentAddServices += '<div class="booking__priceInfoValue">Photographer, Decor</div>';
        } else if (isDecorChecked && ! isPhotographerChecked) {
            contentAddServices += '<div class="booking__priceInfoValue">Decor</div>';
        } else if (! isDecorChecked && isPhotographerChecked) {
            contentAddServices += '<div class="booking__priceInfoValue">Photographer</div>';
        }

        $('.booking__pricePanelTop').find('.booking__priceInfo').last().html(contentAddServices);
    });

//panel fixed
    if (window.location.href.includes('pageBooking') ) {
        if ($(window).width() >= '990') {
            function checkOffset() {
                if($('.booking__pricePanel').offset().top + $('.booking__pricePanel').height()
                    >= $('.footer').offset().top - 10)
                    $('.booking__pricePanel').css('position', 'absolute').css('width', '25%');
                if($(document).scrollTop() + window.innerHeight < $('.footer').offset().top)
                    $('.booking__pricePanel').css('position', 'fixed').css('width', '23%');
            }
            $(document).scroll(function() {
                checkOffset();
            });
        }
    }

    if (window.location.href.includes('index') ) {
        function checkOffset() {
            if($('.scroll-down').offset().top + $('.scroll-down').height()
                >= $('.button-up').offset().top - 10)
                $('.scroll-down').css('animation', 'scroll-animation-no 0.3s forwards ease');
                $('.button-up').css('animation', 'scroll-animation-no 0.3s forwards ease');
            if($(document).scrollTop() + window.innerHeight < $('.button-up').offset().top)
                $('.scroll-down').css('animation', 'scroll-animation 0.3s forwards ease');
                $('.button-up').css('animation', 'scroll-animation 0.3s forwards ease');
        }
        $(document).scroll(function() {
            checkOffset();
        });
    }


    if (window.location.href.includes('pagePost') ) {
        var initialBoardCoordinate = $('#post__board').offset().top;

        var footerCoordinate = $('.footer').first().offset().top;
        var footerHeight = $('.footer').first().height();
        var boardWidth = $('#post__board').width();
        var boardHeight = $('#post__board').height();
        console.log(boardHeight)
        console.log(footerCoordinate)

        $(window).scroll(function(){
            $('#post__board').css('width', boardWidth);
            var currentCoordinate = $(window).scrollTop();

            // var boardCoordinate = $('#post__board').offset().top;
            var boardBottomCoordinate = initialBoardCoordinate + boardHeight;
            console.log('curr: ' + currentCoordinate)
            console.log('board bottom: ' + boardBottomCoordinate)

            if (
                currentCoordinate >= (initialBoardCoordinate - 160) &&
                currentCoordinate < footerCoordinate - (footerHeight + boardHeight)
            ) {
                $('#post__board').css('position','fixed').css('top', '160px').css('bottom', 'auto');
            } else {
                if (currentCoordinate >= footerCoordinate - (footerHeight + boardHeight)) {
                    $('#post__board').css('position','absolute').css('bottom', '0').css('top', 'auto');

                } else {
                    $('#post__board').css('position','absolute').css('top', '0').css('bottom', 'auto');
                }
            }
        });
    }
// smooth scroll
    if (window.location.href.includes('pageAdditionalServices') ) {
        $("#smooth-scroll").on("click", function (event) {
            event.preventDefault();

            var id  = $(this).attr('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    if (window.location.href.includes('pageMenu') ) {
        $("#order-scroll").on("click", function (event) {
            event.preventDefault();

            var id  = $(this).attr('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }


    // header height

    var width = $(window).width();


    $(window).scroll(function() {
        if (width >=1024) {
            if ( $(window).scrollTop() == 0 ) {
                $('.header').css('height','150px');
            } else {
                $('.header').css('height','100px');
            }
        } else {
            if ( $(window).scrollTop() == 0 ) {
                $('.header').css('height', '90px').css('transform', 'translateY(0)').css('background-color', '#1C0A3B');
            } else {
                $('.header').css('transform', 'translateY(-100%)').css('background-color', '#1C0A3B');
            }
        }
    });


// modal

   $('.modal-toggle').on('click', function(e) {
        e.preventDefault();
        $('.modal').toggleClass('is-visible');
    });


// continue booking

    if (window.location.href.includes('pageBooking') ) {

        var currentOrderPage = 1;
        var selectCountryWidth = $(".booking__userInfoPersonal").first().width();
        var selectCountryDivWidth = $("#country-select").width();
        $('#country-select').change(() => {
            $("#country-select").css('width', selectCountryWidth)
            $(".booking__userInfoPersonal").find('.form__row').css('width', selectCountryWidth)
            $(".country").css('width', selectCountryWidth)
            $(".booking__userInfoPersonal").css('width', selectCountryDivWidth)
        });

        $('#continue-btn').click(
            function () {
                setTimeout(() => {
                    selectCountryDivWidth = $(".booking__userInfoPersonal").first().width();
                    selectCountryWidth = $(".form__row").first().width();
                }, 500);

                if (currentOrderPage == 1) {

                    currentOrderPage++;

                    $('.booking__step1Wrap').css('display', 'none');
                    $('.booking__foodStepWrap').css('display', 'flex');
                } else if (currentOrderPage == 2) {

                    currentOrderPage++;

                    $('.booking__foodStepWrap').css('display', 'none');
                    $('.booking__userInfoStepWrap').css('display', 'flex');
                } else {

                }

            }
        );

        $('.booking-prev-btn').click(
            function () {
                if (currentOrderPage == 2) {
                    currentOrderPage--;

                    $('.booking__step1Wrap').css('display', 'flex');
                    $('.booking__foodStepWrap').css('display', 'none');
                } else if (currentOrderPage == 3) {
                    currentOrderPage--;

                    $('.booking__foodStepWrap').css('display', 'flex');
                    $('.booking__userInfoStepWrap').css('display', 'none');
                } else {

                }
            }
        );

        $('#pen-link').click(
            function () {
                $('.booking__foodStepWrap').css('display', 'none');
                $('.booking__userInfoStepWrap').css('display', 'none');
                $('.booking__step1Wrap').css('display', 'flex');
            }
        );

        if (currentOrderPage == 3) {
            $('#continue-btn').text('Book a room');
        }


        var interval;

        function countdown() {
            clearInterval(interval);
            interval = setInterval( function() {
                var timer = $('.js-timeout').html();
                timer = timer.split(':');
                var minutes = timer[0];
                var seconds = timer[1];
                seconds -= 1;
                if (minutes < 0) return;
                else if (seconds < 0 && minutes != 0) {
                    minutes -= 14;
                    seconds = 59;
                }
                else if (seconds < 10 && length.seconds != 2) seconds = '0' + seconds;

                $('.js-timeout').html(minutes + ':' + seconds);

                if (minutes == 0 && seconds == 0) clearInterval(interval);
            }, 1000);
        }

        if (currentOrderPage >= 2) {
            $('.js-timeout').text("15:00");
            countdown();
        } else {
            $('.js-timeout').text("15:00");
            clearInterval(interval);
        }

    }

    //food tabs
    $('.switch').each(function() {
        $(this).find('.food-radio').each(function(i) {
            $(this).click(function(){
                $(this).addClass('active').siblings().removeClass('active')
                    .parents('.booking__foodStepWrap').find('.tabs__content').eq(i).css('display', 'flex').siblings('.tabs__content').hide();
            });
        });
    });

    $('.switch').each(function() {
        $(this).find('.food-radio').each(function(i) {
            $(this).click(function(){
                $(this).addClass('active').siblings().removeClass('active')
                    .parents('.menu-box').find('.tabs__content').eq(i).css('display', 'flex').siblings('.tabs__content').hide();
            });
        });
    });

    $('.switch label').on('click', function() {
        var indicator = $(this).parent('.food-radio').parent('.switch').find('span');
        if ( $(this).hasClass('right') ){
            $(indicator).addClass('right');
        } else {
            $(indicator).removeClass('right');
        }
    });

//form validation
    $(".user-name").on("keypress", function(e) {

        var char = /["a-zA-Z]/;
        var val = String.fromCharCode(e.which);
        var test = char.test(val);

        if(!test){
            $(this).addClass('not-valid');
            $(this).find('.text-not-valid').css('display', 'flex');
        } else {
            $(this).removeClass('not-valid');
            $(this).addClass('valid');
            $(this).find('.text-not-valid').css('display', 'none');
        }

    });

    $(".e-mail").on("keypress", function(e) {

        var char = /^[_A-Za-z0-9-\\+]+(\\.[_A-Za-z0-9-]+)*@[A-Za-z0-9-]+(\\.[A-Za-z0-9]+)*(\\.[A-Za-z]{2,})$/;

        var val = String.fromCharCode(e.which);
        var test = char.test(val);

        if(!test){
            $(this).addClass('not-valid');
            $(this).find('.text-not-valid').css('display', 'flex');
        } else {
            $(this).removeClass('not-valid');
            $(this).addClass('valid');
            $(this).find('.text-not-valid').css('display', 'none');
        }

    });

    $(".number-tel").on("keypress", function(e) {

        var char = /^\+\d{2}\(\d{3}\)\d{3}-\d{2}-\d{2}$/;

        var val = String.fromCharCode(e.which);
        var test = char.test(val);

        if(!test){
            $(this).addClass('not-valid');
            $(this).find('.text-not-valid').css('display', 'flex');
        } else {
            $(this).removeClass('not-valid');
            $(this).addClass('valid');
            $(this).find('.text-not-valid').css('display', 'none');
        }
    });

    $(".fa-search").click(function(){
        $(".search-wrap, .input").toggleClass("active");
        $("input[type='text']").focus();
    });

    var selectedRoom = $(".jq-selectbox__dropdown").find(".selected");
    var rooms = $(".jq-selectbox__dropdown ul li");

    rooms.hover(() => {
        selectedRoom.addClass('selected');
    });

    rooms.click(() => {
        selectedRoom = $(".jq-selectbox__dropdown").find(".selected");;
        selectedRoom.addClass('selected');
    });

});

function handleMenus(menuItemName) {
    $('.nav-item').removeClass("active");
    $('.footer_nav-item').removeClass("active");

    $('.nav a[href$="' + menuItemName + '"]').addClass("active");
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

function getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay()||7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(),0,1));
    var weekNo = Math.ceil(( ( (d - yearStart) / 86400000) + 1)/7);

    return {year:d.getUTCFullYear(), number: weekNo};
}

function initCarousel() {

    if ($(window).width() <= '1024'){
        $('#home__rooms-accordion').owlCarousel({
            dots:true,
            responsiveClass:true,
            responsive:{
                0:{
                    items: 1,
                    nav: false
                },
                540:{
                    items: 2,
                    nav: false
                }
            },

        });

        $('.event-box').owlCarousel({
            margin: 10,
            loop: true,
            dots:true,
            responsiveClass:true,
            responsive:{
                0:{
                    items: 1,
                    nav: false,
                    stagePadding: 60,
                },
                640:{
                    stagePadding: 0,
                    items:3,
                    nav: false,
                    dots: true
                },
                768:{
                    stagePadding: 0,
                    items:3,
                    nav: false,
                    dots: true
                }
            },

        });
    };

    if ($(window).width() <= '640'){
        $('.about-box').owlCarousel({
            stagePadding: 60,
            margin: 10,
            loop: true,
            dots:true,
            responsiveClass:true,
            responsive:{
                0:{
                    items: 1,
                    nav: false
                }
            },

        });

        $('#other-room-accordion').owlCarousel({
            dots:true,
            responsiveClass:true,
            responsive:{
                0:{
                    items: 2,
                    nav: false
                }
            },

        });
    };

    if ($(window).width() <= '540'){
        $('.booking__stepFoodWrap').owlCarousel({
            stagePadding: 60,
            margin: 10,
            loop: true,
            dots:true,
            responsiveClass:true,
            responsive:{
                0:{
                    items: 1,
                    nav: false
                }
            },

        });
    }
}





