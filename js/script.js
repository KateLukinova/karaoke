var bookingData = {
    settings: {
        forinta_euro: 0
    }
};
var homeUrl = 'http://obobrazovanii.ru/';

var isServicesOpened = false;
var workingHoursCount = 8;
// localStorage.setItem('choosedHours', '');
// localStorage.setItem('choosedDate', '');
// localStorage.setItem('persons', 5);
// localStorage.setItem('duration', 2);

var isFullPaymentDiscount = false;
var isPromotionsHtmlSet = false;
var isCheckboxChecked = false;
var uuid = uuidv4();
var isTimerStarted = false;
var choosedRoom = '';
var totalPrice = 0;
var isStepTwoOpened = false;
var currentBookingData = {
    duration: 0,
    persons: 0,
    date: '',
    time: '',
    room: '',
    event: '',
    addServices: [],
    services: {},
    first_name: '',
    last_name: '',
    email: '',
    phone: '',
    country: 'Hungary',
    paymentMethod: 'card',
    paymentType: null,
    couponCode: '',
    dayName: '',
    packageId: 2
};

let subTypes = [];

$(document).ready(function () {

    let localStorageDuration = localStorage.getItem('duration') ? localStorage.getItem('duration') : 2;
    if ($('#current-time').length) {
        $('#current-time').val(localStorageDuration);
    }
    currentBookingData.duration = localStorageDuration;
    localStorage.setItem('duration', localStorageDuration);

    let localStoragePersons = localStorage.getItem('persons') ? localStorage.getItem('persons') : 5;
    if ($('#current-persons').length) {
        $('#current-persons').val(localStoragePersons);
    }
    currentBookingData.persons = localStoragePersons;
    localStorage.setItem('persons', localStoragePersons);

    //optimization loading img
    [].forEach.call(document.querySelectorAll('img[data-src]'), function (img) {
        img.setAttribute('src', img.getAttribute('data-src'));
        img.onload = function () {
            img.removeAttribute('data-src');
        };
    });

    // settings aos
    document.addEventListener('aos:in:room-accordion-item', ({detail}) => {
        setTimeout(() => {
            $('.rooms-accordion__item').attr('style', 'transition: width 1s ease !important');
        }, 1500);
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
            $('.nav').toggleClass('show').css('z-index', '15');
            $('a.nav-item').toggleClass('nav-animation');
            $('a.nav-item').removeClass('no-animation');
            $('.nav__secondary').toggleClass('clip-animation');
            $('.nav__secondary').removeClass('clip-animation-no');
            $('.nav__button-box').toggleClass('clip-animation');
            $('.nav__button-box').removeClass('clip-animation-no');
            $('.nav__main').css('display', 'flex');
            if ($(window).width() <= '640') {
                $('.nav-wrap').css('display', 'flex');
            }
        } else {
            $('.nav').removeClass('show');
            $('.nav').toggleClass('hide').css('z-index', '-15000');
            $('a.nav-item').toggleClass('no-animation');
            $('a.nav-item').removeClass('nav-animation');
            $('.nav__secondary').toggleClass('clip-animation-no');
            $('.nav__secondary').removeClass('clip-animation');
            $('.nav__button-box').toggleClass('clip-animation-no');
            $('.nav__button-box').removeClass('clip-animation');
            $('.nav__main').css('display', 'none');
            if ($(window).width() <= '540') {
                $('.nav-wrap').css('display', 'none');
            }

        }
    });

    // menu active item
    $('a.nav-item').click(function () {

        $('.nav').removeClass('show');
        $('.nav').toggleClass('hide');
        $('a.nav-item').toggleClass('no-animation');
        $('a.nav-item').removeClass('nav-animation');
        $('.nav__secondary').toggleClass('clip-animation-no');
        $('.nav__secondary').removeClass('clip-animation');
        $('.nav__button-box').toggleClass('clip-animation-no');
        $('.nav__button-box').removeClass('clip-animation');
        $('.nav__main').css('display', 'none');

        isOpenedMenu = false;
    });

    if ($(window).width() >= '1200') {
        //main-cursor
        $(document).on('mousemove', function (e) {
            let x = e.pageX - 130;
            let y = e.pageY + 7;
            $('.main').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(28, 11, 63, 0.85) 153px,                                                
                           rgba(28, 11, 63, 0.85) 15%)`
            });
            $('#strip').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(49, 18, 135, 0.7) 153px,
                           rgba(49, 18, 135, 0.7) 20%)`
            });
            $('#reggae').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(231, 18, 109, 0.7) 153px,
                           rgba(231, 18, 109, 0.7) 20%)`
            });
            $('#gatsby').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(97, 4, 95, 0.8) 153px,
                           rgba(97, 4, 95, 0.8) 20%)`
            });
            $('#comics').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(5, 117, 230, 0.8) 153px,
                           rgba(5, 117, 230, 0.8) 20%)`
            });
            $('#iceberg').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(5, 117, 230, 0.7) 153px,
                           rgba(5, 117, 230, 0.7) 20%)`
            });
            $('#birthday').css({
                'background': `radial-gradient(circle at ${x}px ${y}px, 
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(28, 11, 63, 0.83) 153px,
                           rgba(28, 11, 63, 0.83) 20%)`
            });
            $('#bachelor').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(19, 5, 47, 0.8) 153px,
                           rgba(19, 5, 47, 0.8) 20%)`
            });
            $('#hen').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(56, 9, 65, 0.8) 153px,
                           rgba(56, 9, 65, 0.8) 20%)`
            });
            $('#private').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(44, 16, 102, 0.8) 153px,
                           rgba(44, 16, 102, 0.8) 20%)`
            });
            $('#graduation').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(32, 12, 98, 0.8) 153px,
                           rgba(32, 12, 98, 0.8) 20%)`
            });
            $('#corporate').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(44, 16, 102, 0.8) 153px,
                           rgba(44, 16, 102, 0.8) 20%)`
            });
            $('#disco').css({
                'background': `radial-gradient(circle at ${x}px ${y}px,
                           rgb(202, 253, 53) 8px, 
                           rgba(0, 0, 0, 0) 8px,
                           rgba(0, 0, 0, 0) 152px,
                           rgb(202, 253, 53) 152px, 
                           rgb(202, 253, 53) 153px,
                           rgba(28, 11, 63, 0.83) 153px,
                           rgba(28, 11, 63, 0.83) 20%)`
            });
        });
    }


    initCarousel();

    $('.cases').owlCarousel({
        loop: true,
        navText: ["<i class=\"fas fa-chevron-left\" id=\"portfolio-btn-prev\"></i>", "<i class=\"fas fa-chevron-right\" id=\"portfolio-btn-next\"></i>"],
        responsiveClass: true,
        responsive: {
            0: {
                items: 1,
                dots: true,
                margin: 10,
                stagePadding: 50,
                nav: false
            },
            600: {
                items: 2,
                stagePadding: 60,
                margin: 15,
            },
            769: {
                items: 2,
                dots: false,
                nav: true,
                stagePadding: 80,
                margin: 15,
            },
            1025: {
                items: 3,
                dots: false,
                stagePadding: 120,
                margin: 30,
                nav: true
            },
            1300: {
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
        responsiveClass: true,
        responsive: {
            1024: {
                items: 1,
                dots: false,
                margin: 30,
                stagePadding: 220,
                navText: ["<i class=\"fas fa-chevron-left\" id=\"portfolio-btn-prev\"></i>", "<i class=\"fas fa-chevron-right\" id=\"portfolio-btn-next\"></i>"],
                nav: true
            },
            768: {
                items: 1,
                dots: false,
                margin: 10,
                stagePadding: 60,
                navText: ["<i class=\"fas fa-chevron-left\" id=\"portfolio-btn-prev\"></i>", "<i class=\"fas fa-chevron-right\" id=\"portfolio-btn-next\"></i>"],
                nav: true
            },
            0: {
                items: 1,
                dots: true,
                margin: 10,
                navText: ["<i class=\"fas fa-chevron-left\" id=\"portfolio-btn-prev\"></i>", "<i class=\"fas fa-chevron-right\" id=\"portfolio-btn-next\"></i>"],
                nav: true,
            }
        }

    });

    $(".rooms-accordion__item").hover(
        function () {
            $(this).siblings().addClass("text-center");
        }, function () {
            $(this).siblings().removeClass("text-center");
        }
    );

    $('#current-persons').change(() => {
        var input = $('#current-persons');
        currentBookingData.persons = parseInt(input.val());
        $("#booking-persons").text(input.val());

        localStorage.setItem('persons', input.val());

        if (isStepTwoVisible()) {
            if (! isStepTwoOpened) {
                showStepTwo();
            } else {
                $('.musicRoom__price').each(function() {
                    let packageId = $(this).siblings('.musicRoom__buyPrice').find('input[type="radio"]:checked').val();
                    let choosedPackage = bookingData.packages.find(el => {
                        return el.id == packageId;
                    });
                    let prices = getPrices(choosedPackage);
                    setBookingsPricesDivs($(this), prices);
                });

                if (choosedRoom.length) {
                    let packageId = choosedRoom.siblings('.musicRoom__buyPrice').find('input[type="radio"]:checked').val();
                    let choosedPackage = bookingData.packages.find(el => {
                        return el.id == packageId;
                    });
                    let prices = getPrices(choosedPackage);
                    setPriceDivHtml(prices.totalPriceWithDiscount);
                }
            }

            if (isStepTwoContinue()) {
                continueStepTwo()
            }
        }
        updateSamePricePersonsCount();
    });

    // input-current
    $('.minus-person').click(function () {
        let input = $(this).parent().find('input');
        let count = parseInt(input.val());

        if (count > 1) {
            input.val(count - 1);
            input.change();
        }
    });


    $('.plus-person').click(function () {
        let input = $(this).parent().find('input');
        let count = parseInt(input.val());

        if (count < 25) {
            input.val(parseInt(input.val()) + 1)
            input.change();;
        }
    });

    $('#current-time').change(() => {
        let input = $('#current-time');
        let count = input.val();
        if (count > workingHoursCount) {
            input.val(workingHoursCount);
            count = workingHoursCount;
        }

        $("#booking-time").text(count + ' hours');
        setCurrentBookingData();

        localStorage.setItem('duration', input.val());

        if (isStepTwoVisible()) {
            showStepTwo();

            if (isStepTwoContinue()) {
                continueStepTwo()
            }
        }
    });

    $('.minus-hours').click(function () {
        var input = $(this).parent().find('input');
        let count = parseInt(input.val());

        if (count > 1) {
            count--;
            input.val(count);
            input.change();
        }
    });

    $('.plus-hours').click(function () {
        var input = $(this).parent().find('input');
        let count = parseInt(input.val());
        if (count < workingHoursCount) {
            count++;
            input.val(count);
            input.change();
        }
    });

    if (
        document.URL == homeUrl ||
        document.URL == homeUrl + '#' ||
        document.URL == homeUrl + 'index.html' ||
        document.URL == homeUrl + 'index.html/#'
    ) {

        if ($(window).width() >= 1024) {
            // scrolling to block
            var anchors = [];
            var currentAnchor = -1;
            var isAnimating = false;
            $(function () {
                function updateAnchors() {
                    anchors = [];
                    $('.anchor').each(function (i, element) {
                        anchors.push($(element).offset().top);
                    });
                }

                $('.scroll-down').on('click', function (e) {
                    e.preventDefault();
                    e.stopPropagation();
                    if (isAnimating) {
                        return false;
                    }
                    isAnimating = true;
                    if (e.originalEvent.wheelDelta >= 0) {
                        currentAnchor--;
                    } else {
                        currentAnchor++;
                    }
                    if (currentAnchor > (anchors.length - 1)
                        || currentAnchor < 0) {
                        currentAnchor = 0;
                    }
                    isAnimating = true;
                    $('html, body').animate({
                        scrollTop: parseInt(anchors[currentAnchor])
                    }, 300, 'swing', function () {
                        isAnimating = false;
                    });
                });
                updateAnchors();
            });
        }


        function checkOffset() {
            if ($(document).scrollTop() + window.innerHeight + $('.scroll-down').height()
                >= $('.button-up').offset().top - 10) {
                $('.scroll-down').css('animation', 'scroll-animation-no 0.3s forwards ease');
                $('.button-up').css('animation', 'scroll-animation 0.3s forwards ease');
            } else {
                $('.scroll-down').css('animation', 'scroll-animation 0.3s forwards ease');
                $('.button-up').css('animation', 'scroll-animation-no 0.3s forwards ease');
            }
        }
        $(document).scroll(function () {
            checkOffset();
        });

        $('.button-up').on('click', function (e) {
            e.preventDefault();
            $('html, body').animate({scrollTop: 0}, '2000');
        });
    }


    if (window.location.href.includes('pagePost')) {
        var initialBoardCoordinate = $('#post__board').offset().top;

        var footerCoordinate = $('.footer').first().offset().top;
        var footerHeight = $('.footer').first().height();
        var boardWidth = $('#post__board').width();
        var boardHeight = $('#post__board').height();
        var headerHeight = $('.header').first().height();
        // var htmlHeight = footerCoordinate + footerHeight;
        // console.log(htmlHeight)

        $(window).scroll(function () {
            $('#post__board').css('width', boardWidth);
            var currentCoordinate = $(window).scrollTop();

            // console.log('initial ' + initialBoardCoordinate)
            console.log('current ' + currentCoordinate)
            // console.log('initial - board heigth ' + (initialBoardCoordinate - boardHeight))
            // console.log('footer coordinate ' + footerCoordinate)
            // console.log('footer coord - (fH - bH) ' + (footerCoordinate - (footerHeight + boardHeight)))
            if (
                currentCoordinate >= (initialBoardCoordinate - boardHeight) &&
                currentCoordinate < footerCoordinate - (footerHeight + boardHeight + 160)
            ) {
                $('#post__board').css('position', 'fixed').css('top', '160px').css('bottom', 'auto');
            } else if (currentCoordinate >= footerCoordinate - ( + footerHeight + boardHeight + headerHeight)) {
                // console.log('asdfasdf')
                $('#post__board').css('position', 'absolute').css('bottom', '0').css('top', 'auto');
            } else {
                 $('#post__board').css('position', 'absolute').css('top', '0').css('bottom', 'auto');
            }
        });
    }

    // smooth scroll
    if (window.location.href.includes('pageAdditionalServices')) {
        $("#smooth-scroll").on("click", function (event) {
            event.preventDefault();

            var id = $(this).attr('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }

    if (window.location.href.includes('pageMenu')) {
        $("#order-scroll").on("click", function (event) {
            event.preventDefault();

            var id = $(this).attr('href');
            document.querySelector(id).scrollIntoView({
                behavior: 'smooth'
            });
        });
    }


    // header height
    var width = $(window).width();


    $(window).scroll(function () {
        if (width >= 1024) {
            if ($(window).scrollTop() == 0) {
                $('.header').css('height', '150px');
            } else {
                $('.header').css('height', '100px').css('background-color', '#1C0A3B');
            }
        } else {
            if ($(window).scrollTop() == 0) {
                $('.header').css('height', '90px').css('transform', 'translateY(0)').css('background-color', '#1C0A3B');
                $('.btn.btn-sidebar-mobile').css('opacity', '0');
                $('.sidebar-logo').css('opacity', '0');
            } else {
                $('.header').css('transform', 'translateY(-100%)').css('background-color', '#1C0A3B');
                $('.btn.btn-sidebar-mobile').css('opacity', '1');
                $('.sidebar-logo').css('opacity', '1');
            }
        }
    });

    var isPhotographerChecked = false;
    var isDecorChecked = false;

    //!!!!!!!!!!!!!!!!!!  BOOKING PAGE BEGIN   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    if (window.location.href.includes('pageBooking') ||
        window.location.href.includes('index') ||
        window.location.href.includes('pagePrice') ||
        window.location.href.includes('pageEventBachelor') ||
        window.location.href.includes('pageEventBachelor') ||
        window.location.href.includes('pageEventBirthday') ||
        window.location.href.includes('pageEventCorporate') ||
        window.location.href.includes('pageEventDisco') ||
        window.location.href.includes('pageEventGraduation') ||
        window.location.href.includes('pageEventHen') ||
        window.location.href.includes('pageEventPrivate') ||
        window.location.href.includes('pageRoomStrip') ||
        window.location.href.includes('pageRoomReggae') ||
        window.location.href.includes('pageRoomGatsby') ||
        window.location.href.includes('pageRoomComics') ||
        window.location.href.includes('pageRoomIcberg') ||
        window.location.href === homeUrl
    ) {
        getBookingData();
        // showStepTwo();
        $("#booking-time").text(2 + ' hours');
        $("#booking-persons").text(5);

        $('#booking__userAgree').click(() => {
            isCheckboxChecked = !isCheckboxChecked;
            if (! isBookAllowed()) {
                $('.booking__pricePanelBookBtn').css('cursor', 'not-allowed');
            } else {
                $('.booking__pricePanelBookBtn').css('cursor', 'pointer');
            }
        });

        // datepicker
        $('#datepicker').datepicker({
            minDate: new Date(),
            language: 'en',
            autoClose: true,
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
            onSelect: function (formattedDate, date, inst) {
                let shortMonth = date.toLocaleString('en', {month: 'short'});
                let longMonth = date.toLocaleString('en', {month: 'long'});
                let day = date.getDate();

                currentBookingData.dayName = getDayName(date.getDay());
                currentBookingData.date = moment(date);

                $('#chosen-day').text(day);
                $('#chosen-month').text(shortMonth);
                $('#booking-day').text(day);
                $('#booking-month').text(longMonth);

                if (isStepTwoVisible()) {
                    if (isStepTwoOpened) {
                        showStepTwo();
                    }

                    if (isStepTwoContinue()) {
                        continueStepTwo()
                    }
                }

                $('.datepicker').css('z-index', '-5');

                if (isPromotionsHtmlSet) {
                    isPromotionsHtmlSet = false;
                    getPromotionsDiscount();
                }

                localStorage.setItem('choosedDate', currentBookingData.date.format('YYYY-MM-DD'));
            },
            onShow: function (el, inst) {
                $('.datepicker').css('z-index', '10');
            }
        });

        var datePicker = $('#datepicker').data('datepicker');
        let choosedDate = localStorage.getItem('choosedDate') ?
            new Date(localStorage.getItem('choosedDate')) :
            new Date();
        // debugger

        currentBookingData.dayName = getDayName(choosedDate.getDay());
        currentBookingData.date = moment(choosedDate);
        datePicker.selectDate(choosedDate);

        $('.chosen-date').click(() => {
            datePicker.show()
        });
    }

    if (window.location.href.includes('pageBooking')) {

        $('.chosen-date').click(() => {
            datePicker.show()
        });

        const DECOR_SERVICE_ID = 2;
        const PHOTO_SERVICE_ID = 1;
        $(".checkbox").change(function () {
            var input = $(this).find('input');
            var checkValue = input.attr('id');

            var contentAddServices = '<div class="booking__priceInfoTitle">Add. Service:</div>';

            if (input.is(':checked')) {
                if (checkValue == 'chose1') {
                    isPhotographerChecked = true;
                    handleAdditionalServicePrice(PHOTO_SERVICE_ID, true);
                }

                if (checkValue == 'chose2') {
                    isDecorChecked = true;
                    handleAdditionalServicePrice(DECOR_SERVICE_ID, true);
                }
            } else {
                if (checkValue == 'chose1') {
                    isPhotographerChecked = false;
                    handleAdditionalServicePrice(PHOTO_SERVICE_ID, false);
                }

                if (checkValue == 'chose2') {
                    isDecorChecked = false;
                    handleAdditionalServicePrice(DECOR_SERVICE_ID, false);
                }
            }

            if (!isDecorChecked && !isPhotographerChecked) {
                contentAddServices = '';
            } else if (isDecorChecked && isPhotographerChecked) {
                contentAddServices += '<div class="booking__priceInfoValue">Photographer, Decor</div>';
            } else if (isDecorChecked && !isPhotographerChecked) {
                contentAddServices += '<div class="booking__priceInfoValue">Decor</div>';
            } else if (!isDecorChecked && isPhotographerChecked) {
                contentAddServices += '<div class="booking__priceInfoValue">Photographer</div>';
            }

            $('#additional-services').html(contentAddServices);
        });

        $('#celebrate').change(() => {
            var contentCelebrate = '<div class="booking__priceInfoTitle">Celebrate:</div>';
            contentCelebrate += '<div class="booking__priceInfoValue">' + $("#celebrate option:selected").text() + '</div>';
            $('#what-to-celebrate').html(contentCelebrate);
            currentBookingData.event = $("#celebrate option:selected").text();
        });

        $('#name-value').change(() => {
            var contentNameValue = '<div class="booking__priceInfoTitle">First Name:</div>';
            contentNameValue += '<div class="booking__priceInfoValue">' + $("#name-value").val() + '</div>';
            $('#what-to-first_name').html(contentNameValue);
            currentBookingData.first_name = $("#name-value").val();
        });

        $('#name2-value').change(() => {
            var contentNameValue = '<div class="booking__priceInfoTitle">Last Name:</div>';
            contentNameValue += '<div class="booking__priceInfoValue">' + $("#name2-value").val() + '</div>';
            $('#what-to-last_name').html(contentNameValue);
            currentBookingData.last_name = $("#name2-value").val();
        });

        $('#email-value').change(() => {
            var contentEmailValue = '<div class="booking__priceInfoTitle">Email:</div>';
            contentEmailValue += '<div class="booking__priceInfoValue">' + $("#email-value").val() + '</div>';
            $('#what-to-email').html(contentEmailValue);
            currentBookingData.email = $("#email-value").val();
        });

        $('#phone-value').change(() => {
            var contentPhoneValue = '<div class="booking__priceInfoTitle">Phone:</div>';
            contentPhoneValue += '<div class="booking__priceInfoValue">' + $("#phone-value").val() + '</div>';
            $('#what-to-phone').html(contentPhoneValue);
            currentBookingData.phone = $("#phone-value").val();
        });

        $('#country-select').change(() => {
            var contentCountry = '<div class="booking__priceInfoTitle">Country:</div>';
            contentCountry += '<div class="booking__priceInfoValue">' + $("#country-select option:selected").text() + '</div>';
            $('#what-to-country').html(contentCountry);
            currentBookingData.country = $("#country-select option:selected").text();
        });

        $('input[name ="payment"]').change(() => {
            var contentPayment = '<div class="booking__priceInfoTitle">Payment:</div>';
            contentPayment += '<div class="booking__priceInfoValue">' + $("#payment-div input[type='radio']:checked").val() + '</div>';
            $('#what-to-payment').html(contentPayment);
            currentBookingData.paymentMethod = 'Credit card' ? 'card' : 'paypal';
        });

        $('#coupon-cod').change(() => {
            var contentCouponCod = '<div class="booking__priceInfoTitle">Coupon cod:</div>';
            contentCouponCod += '<div class="booking__priceInfoValue">' + $("#coupon-cod").val() + '</div>';
            $('#what-to-coupon').html(contentCouponCod);
        });


        // continue booking
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
                if (isStepTwoContinue()) {
                    if ($('#continue-btn').text() == 'Book a room') {
                        handlePostRequest();
                    }

                    setTimeout(() => {
                        selectCountryDivWidth = $(".booking__userInfoPersonal").first().width();
                        selectCountryWidth = $(".form__row").first().width();
                    }, 500);

                    if (currentOrderPage == 1) {

                        currentOrderPage++;
                        $("html, body").animate({ scrollTop: 0 }, "fast");

                        $('.booking__step1Wrap').css('display', 'none');
                        $('.booking__foodStepWrap').css('display', 'flex');
                    } else if (currentOrderPage == 2) {

                        currentOrderPage++;
                        $("html, body").animate({ scrollTop: 0 }, "fast");

                        $('.booking__foodStepWrap').css('display', 'none');
                        $('.booking__userInfoStepWrap').css('display', 'flex');
                    } else {

                    }

                    if (currentOrderPage == 3) {
                        $('#continue-btn').text('Book a room');
                        if (! isBookAllowed()) {
                            $('.booking__pricePanelBookBtn').css('cursor', 'not-allowed');
                        }
                    } else {
                        $('#continue-btn').text('Continue');
                        $('.booking__pricePanelBookBtn').css('cursor', 'pointer');
                    }

                    // timer
                    if (currentOrderPage == 2 && ! isTimerStarted) {
                        function dailyMissionTimer(duration) {
                            isTimerStarted = true;

                            var timer = duration * 3600;
                            var minutes, seconds;

                            var interval = setInterval(function () {
                                minutes = parseInt(timer / 60 % 60, 10);
                                seconds = parseInt(timer % 60, 10);

                                minutes = minutes < 10 ? "0" + minutes : minutes;
                                seconds = seconds < 10 ? "0" + seconds : seconds;

                                $('#time-min').text(minutes);
                                $('#time-sec').text(seconds);

                                if (--timer < 0) {
                                    timer = 0;
                                    clearInterval(interval);
                                }
                            }, 1000);
                        }

                        dailyMissionTimer(bookingData.settings.timer / 60);
                        sendPreBookingRequest();
                    }
                }
            }
        );

        $('.booking-prev-btn').click(
            function () {
                if (currentOrderPage == 2) {
                    currentOrderPage--;
                    $("html, body").animate({ scrollTop: 0 }, "fast");

                    $('.booking__step1Wrap').css('display', 'flex');
                    $('.booking__foodStepWrap').css('display', 'none');
                } else if (currentOrderPage == 3) {
                    currentOrderPage--;
                    $("html, body").animate({ scrollTop: 0 }, "fast");

                    $('.booking__foodStepWrap').css('display', 'flex');
                    $('.booking__userInfoStepWrap').css('display', 'none');
                }
                $('#continue-btn').text('Continue');
                console.log(currentOrderPage)
            }
        );

        $('#pen-link').click(
            function () {
                $('.booking__foodStepWrap').css('display', 'none');
                $('.booking__userInfoStepWrap').css('display', 'none');
                $('.booking__step1Wrap').css('display', 'flex');
            }
        );


        //panel fixed
        if ($(window).width() >= '990') {
            function checkOffset() {
                if ($('.booking__pricePanel').offset().top + $('.booking__pricePanel').height()
                    >= $('.footer').offset().top - 10)
                    $('.booking__pricePanel').css('position', 'absolute').css('width', '25%');
                if ($(document).scrollTop() + window.innerHeight < $('.footer').offset().top)
                    $('.booking__pricePanel').css('position', 'fixed').css('width', '23%');
            }

            $(document).scroll(function () {
                checkOffset();
            });
        }

        //form validation
        $(".user-name").on("keypress", function (e) {

            var char = /["a-zA-Z]/;
            var val = String.fromCharCode(e.which);
            var test = char.test(val);

            if (!test) {
                $(this).addClass('not-valid');
                $(this).find('.text-not-valid').css('display', 'flex');
            } else {
                $(this).removeClass('not-valid');
                $(this).addClass('valid');
                $(this).find('.text-not-valid').css('display', 'none');
            }
        });

        $(".e-mail").on("keypress", function (e) {
            var char = /\S+@\S+\.\S+/i;
            var val = e.target.value;
            var test = char.test(val);

            if (!test) {
                $(this).addClass('not-valid');
                $(this).find('.text-not-valid').css('display', 'flex');
            } else {
                $(this).removeClass('not-valid');
                $(this).addClass('valid');
                $(this).find('.text-not-valid').css('display', 'none');
            }
        });

        $(".number-tel").on("keypress", function (e) {
            var char = /^(\s*)?(\+)?([- _():=+]?\d[- _():=+]?){10,14}(\s*)?$/;
            var val = e.target.value;
            var test = char.test(val);

            if (!test) {
                $(this).addClass('not-valid');
                $(this).find('.text-not-valid').css('display', 'flex');
            } else {
                $(this).removeClass('not-valid');
                $(this).addClass('valid');
                $(this).find('.text-not-valid').css('display', 'none');
            }
        });
    }
    //!!!!!!!!!!!!!!!!!!  BOOKING PAGE END   !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    //food tabs
    $('.switch').each(function () {
        $(this).find('.food-radio').each(function (i) {
            $(this).click(function () {
                $(this).addClass('active')
                    .siblings()
                    .removeClass('active')
                    .parents('.booking__foodStepWrap')
                    .find('.tabs__content')
                    .eq(i)
                    .css('display', 'flex')
                    .siblings('.tabs__content')
                    .hide();
            });
        });
    });

    $('.switch').each(function () {
        $(this).find('.food-radio').each(function (i) {
            $(this).click(function () {
                $(this).addClass('active').siblings().removeClass('active')
                    .parents('.menu-box').find('.tabs__content').eq(i).css('display', 'flex').siblings('.tabs__content').hide();
            });
        });
    });

    $('.switch label').on('click', function () {
        var indicator = $(this).parent('.food-radio').parent('.switch').find('span');
        if ($(this).hasClass('right')) {
            $(indicator).addClass('right');
        } else {
            $(indicator).removeClass('right');
        }
    });


    $(".fa-search").click(function () {
        $(".search-wrap, .input").toggleClass("active");
        $("input[type='text']").focus();
    });

    var selectedRoom = $(".jq-selectbox__dropdown").find(".selected");
    var rooms = $(".jq-selectbox__dropdown ul li");

    rooms.hover(() => {
        selectedRoom.addClass('selected');
    });

    rooms.click(() => {
        selectedRoom = $(".jq-selectbox__dropdown").find(".selected");
        selectedRoom.addClass('selected');
    });
});

function getWeek(d) {
    d = new Date(Date.UTC(d.getFullYear(), d.getMonth(), d.getDate()));
    d.setUTCDate(d.getUTCDate() + 4 - (d.getUTCDay() || 7));
    var yearStart = new Date(Date.UTC(d.getUTCFullYear(), 0, 1));
    var weekNo = Math.ceil((((d - yearStart) / 86400000) + 1) / 7);

    return {year: d.getUTCFullYear(), number: weekNo};
}

function initCarousel() {

    if ($(window).width() <= '1024') {
        $('#home__rooms-accordion').owlCarousel({
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                540: {
                    items: 2,
                    nav: false
                }
            },

        });

        $('.event-box').owlCarousel({
            margin: 10,
            loop: true,
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false,
                    stagePadding: 60,
                },
                640: {
                    stagePadding: 0,
                    items: 3,
                    nav: false,
                    dots: true
                },
                768: {
                    stagePadding: 0,
                    items: 3,
                    nav: false,
                    dots: true
                }
            },

        });

        $('#other-room-accordion').owlCarousel({
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                },
                640: {
                    items: 2,
                    nav: false
                }
            },

        });
    }

    if ($(window).width() <= '640') {
        $('.about-box').owlCarousel({
            stagePadding: 60,
            margin: 10,
            loop: true,
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                }
            },

        });
    }

    if ($(window).width() <= '540') {
        $('.booking__stepFoodWrap').owlCarousel({
            margin: 10,
            loop: true,
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                }
            },

        });
    }
}

function getBookingData() {
    $.get("https://bbrooms.zerrno.com/api/v1/index", (data) => {
        bookingData = data.data;
        console.log(bookingData)
        subTypes = getSubTypes();
        workingHoursCount = getWorkingHoursCount();

        var tid = setInterval( function () {
            if ( document.readyState !== 'complete' ) return;
            clearInterval(tid);
            $('#time-min').text(bookingData.settings.timer);
            setPrePaymentHtml();
            setCurrentBookingData();
            currentBookingData.duration = localStorage.getItem('duration') + ' hours';
            currentBookingData.persons = localStorage.getItem('persons');
            $('.step-four').css('display', 'none');
            showStepTwo();
        }, 100 );
    });
}

function setPrePaymentHtml() {
    currentBookingData.paymentType = bookingData.prepayment[1];
    let discountHtml = isFullPaymentDiscount ? '<span class="discount">5%</span>' : '';

    html = '<div class="radio">' +
               '<input id="deposit" value="' + bookingData.prepayment[1] + '" name="pay" type="radio" checked>' +
           '<label for="deposit">' + bookingData.prepayment[1] + '%</label>' +
           '</div>' +
           '<div class="radio">' +
               '<input id="full-pay" value="' + bookingData.prepayment[0] + '" name="pay" type="radio">' +
               '<label for="full-pay">Pay in full 100% ' + discountHtml + '</label>' +
           '</div>';
    $('#pay-div').append(html);

    $('input[name ="pay"]').change(() => {
        var contentPay = '<div class="booking__priceInfoTitle">Pay:</div>';
        let prePayment = $("#pay-div input[type='radio']:checked").val();
        contentPay += '<div class="booking__priceInfoValue">' + prePayment + '%</div>';
        $('#what-to-pay').html(contentPay);
        currentBookingData.paymentType = prePayment;

        if (isFullPaymentDiscount) {
            if (prePayment == 100) {
                totalPrice = totalPrice * 0.95;
            } else {
                totalPrice = totalPrice * 100 / 95;
            }

            setPriceDivHtml(totalPrice);
        }
    });
}

function setCurrentBookingData() {
    currentBookingData.duration = $('#booking-time').text();
    currentBookingData.persons = $('#booking-persons').text();
    // currentBookingData.date = $('#booking-month').text() + ' ' + $('#booking-day').text();
    currentBookingData.time = $('#booking-time-start').text();
    currentBookingData.room = $('#booking-room').text();
    currentBookingData.event = $('#what-to-celebrate').find('.booking__priceInfoValue').text();
    currentBookingData.first_name = $('#what-to-first_name').find('.booking__priceInfoValue').text();
    currentBookingData.last_name = $('#what-to-last_name').find('.booking__priceInfoValue').text();
    currentBookingData.email = $('#what-to-email').find('.booking__priceInfoValue').text();
    currentBookingData.phone = $('#what-to-phone').find('.booking__priceInfoValue').text();
    currentBookingData.country = $('#what-to-country').find('.booking__priceInfoValue').text() ? $('#what-to-country').find('.booking__priceInfoValue').text() : currentBookingData.country;
    currentBookingData.paymentMethod = $('#what-to-payment').find('.booking__priceInfoValue').text() ? $('#what-to-payment').find('.booking__priceInfoValue').text() : currentBookingData.paymentMethod;
    currentBookingData.paymentType = $('#what-to-pay').find('.booking__priceInfoValue').text() ? $('#what-to-pay').find('.booking__priceInfoValue').text() : currentBookingData.paymentType;
    console.log(currentBookingData)
}

function isStepTwoVisible() {
    // return currentBookingData.date && currentBookingData.duration && currentBookingData.persons;
    return true;
}

function getWorkingHoursCount() {
    let opening = bookingData.opening.find(obj => {
        return obj.day === currentBookingData.dayName;
    });


    return 24 - parseInt(opening.from.substr(0, 2)) + parseInt(opening.to.substr(0, 2));
}

function showStepTwo() {
    if (window.location.href.includes('pageBooking')) {
        $('.step-two').remove();
        setPriceDivHtml(0);
        $('#currency-span').css('display', 'none');
        isStepTwoOpened = false;
        var input = $('#current-persons');
        $("#booking-persons").text(input.val());
        var input = $('#current-time');
        $("#booking-time").text(input.val() + ' hours');

        let opening = bookingData.opening.find(obj => {
            return obj.day === currentBookingData.dayName;
        });

        let startHours = moment(opening.from, "HH:mm");
        let endHours = moment(opening.to, "HH:mm");

        let startDate = moment(currentBookingData.date.format('YYYY-MM-DD') + ' ' + opening.from, 'YYYY-MM-DD HH:mm');
        let endDate = moment(currentBookingData.date.format('YYYY-MM-DD') + ' ' + opening.to, 'YYYY-MM-DD HH:mm');

        if (endHours.isBefore(startHours)) {
            endDate = endDate.add(1, 'days');
        }

        // [2021, 2122, 2223, 2300, 0001, 0102, 0203]
        let workingHours = getHours(startDate, endDate);

        let tablesBookings = {};
        for (i = 0; i < bookingData.tables.length; ++i) {
            tablesBookings[bookingData.tables[i].id] = {
                freeHours: workingHours,
                freeSlots: [],
                bookedSlots: []
            }
        }

        for (index = 0; index < bookingData.bookings.length; ++index) {
            var timeFrom = moment(bookingData.bookings[index].time_from);
            var timeTo = moment(bookingData.bookings[index].time_to);

            if (
                startDate.isBefore(timeFrom) &&
                endDate.isAfter(timeTo)
            ) {
                let bookedHours = getHours(timeFrom, timeTo);
                tablesBookings[bookingData.bookings[index].table_id].freeHours = tablesBookings[bookingData.bookings[index].table_id].freeHours.filter(n => ! bookedHours.includes(n));
                tablesBookings[bookingData.bookings[index].table_id].bookedSlots.push({start: bookedHours[0], end: bookedHours[bookedHours.length - 1]});
            }
        }

        for (i = 0; i < bookingData.tables.length; ++i) {
            tablesBookings[bookingData.tables[i].id].freeSlots = getDurationSlots(tablesBookings[bookingData.tables[i].id].freeHours, currentBookingData.duration[0]);
        }

        getBookingsHtml(tablesBookings);

        $('.step-two').css('display', 'flex');
        if (! isServicesOpened) {
            getServicesHtml();
        }
        isServicesOpened = true;
        handleBookButtonClick();
        handleTooltipsOfPackages();
        handlePackageRadioButtonClick();
        isStepTwoOpened = true;
    }
}

function getPromotionsDiscount() {
    let totalDiscount = 0;

    let promotions = bookingData.promotions;
    for (o = 0; o < promotions.length; ++o) {
        let timeFrom = moment(promotions[o].time_from);
        let timeTo = moment(promotions[o].time_to);

        if (
            promotions[o].status === 'active' &&
            currentBookingData.date.isAfter(timeFrom) &&
            currentBookingData.date.isBefore(timeTo)
        ) {
            totalDiscount += promotions[o].amount;
        }
    }

    getPromotionHtml(totalDiscount);

    return totalDiscount / 100;
}

function getPromotionHtml(discount) {
    let html = '<div class="booking__priceInfoUserMessage" id="current-promotion-div">' +
        '<div class="booking__priceInfoUserLogo"><img src="img/fireworks.svg"></div>' +
        '<div class="booking__priceInfoUserTitle">Day deal</div>' +
        '<div class="booking__priceInfoUserValue">On ' + currentBookingData.dayName + ', <span>get a -' + discount + '% on all</span> reservations!</div>' +
    '</div>';


    if (discount) {
        if (! isPromotionsHtmlSet) {
            $(html).insertAfter('.price-panel__food-title');
        }
    } else {
        // $('.price-panel__food-title').remove();
        $('#current-promotion-div').remove();
    }

    isPromotionsHtmlSet = true;
}

function getBookingsHtml(tablesData) {
    getRoomsHtml();

    for (i = 0; i < bookingData.tables.length; ++i) {
        let tableData = bookingData.tables[i];

        if (! tablesData[tableData.id].freeSlots.length) {
            let noFreeSlotsHtml = '<div class="musicRoom__userMessage no-free-hours">Oh no, too late! This room is no longer available on <span class="date-bold">' + currentBookingData.date.format('DD MMMM') + '</span></div>';
            $('#' + tableData.table_number + '-room').parent().find('.dop-info').html(noFreeSlotsHtml);
        } else {
            let html = '';

            let freeSlots = tablesData[tableData.id].freeSlots;
            if (freeSlots[0].hoursCount < parseInt(currentBookingData.duration)) {
                $('#' + tableData.table_number + '-room').parent().find('.dop-info').append('<div class="musicRoom__userMessage">This room available only for ' + freeSlots[0].hoursCount + ' hours. You can book it for less duration or choose another room for this time.</div>')
            }

            let roomName = capitalizeFirstLetter(tableData.table_number);

            for (j = 0; j < freeSlots.length; ++j) {
                let start = freeSlots[j].start.substring(0, 2);
                let end = freeSlots[j].end.slice(-2);
                let packageData = getPackagesHtml(j, roomName);

                html += '<div class="musicRoom__buyItem"><span class="musicRoom__buyItemTime">' + start + ':00-' + end + ':00</span>' +
                    '<div class="musicRoom__buyPrice">';

                html += packageData.html;

                html += '</div>' +
                    '<div class="musicRoom__price">' +
                    '<div class="musicRoom__priceValueOld">' + packageData.totalPrice + ' HUF</div>' +
                    getTotalPriceDiv(packageData.totalPriceWithDiscount) +
                    '<div class="musicRoom__priceValuePerson">' + packageData.priceForPerson + ' HUF/person</div>' +
                    '</div>' +
                    '<div class="musicRoom__buyBtn">' +
                    '<span class="booking-name-room">' + roomName + '</span>' +
                    '</div>' +
                    '</div>' +
                    '</div>';
            }

            let bookedSlots = tablesData[tableData.id].bookedSlots;
            for (j = 0; j < bookedSlots.length; ++j) {
                let start = bookedSlots[j].start.substring(0, 2);
                let end = bookedSlots[j].end.slice(-2);

                html += '<div class="musicRoom__buyItem disabled">' +
                    '<span class="musicRoom__buyItemTime">' + start + ':00-' + end + ':00</span>' +
                    '<div class="musicRoom__buyBtnDisabled">Booked</div>' +
                    '</div>';
            }

            $('#' + tableData.table_number + '-room').html(html);
        }
    }
}

function getPackagesHtml(index, roomName) {
    let totalPrice = 0;
    let totalPriceWithDiscount = 0;
    let priceForPerson = 0;
    let initialTotalPrice = 0;
    let initialTotalPriceWithDiscount = 0;
    let initialPriceForPerson = 0;
    let packagesHtml = '';

    for (k = 0; k < bookingData.packages.length; ++k) {
        if (bookingData.packages[k].name == 'Singer' || bookingData.packages[k].name == 'Drinker') {
            let packageName = capitalizeFirstLetter(bookingData.packages[k].name);
            let packageDescription = bookingData.packages[k].description;
            let checked = '';

            let prices = getPrices(bookingData.packages[1]);

            priceForPerson = prices.priceForPerson;
            totalPrice = prices.totalPrice;
            totalPriceWithDiscount = prices.totalPriceWithDiscount;

            if (k === 1) {
                checked = 'checked';
                initialPriceForPerson = priceForPerson;
                initialTotalPrice = totalPrice;
                initialTotalPriceWithDiscount = totalPriceWithDiscount;
            }

            packagesHtml += '<div class="radio handle-prices">' +
                '<svg width="15" height="15" viewBox="0 0 15 15" fill="none" class="tooltip-icon" xmlns="http://www.w3.org/2000/svg">' +
                '<g id="information">' +
                '<path id="Path" fill-rule="evenodd" clip-rule="evenodd" d="M12.0703 3.98438C12.0703 4.14608 12.2016 4.27734 12.3633 4.27734C12.525 4.27734 12.6562 4.14608 12.6562 3.98438C12.6562 3.82267 12.525 3.69141 12.3633 3.69141C12.2016 3.69141 12.0703 3.82267 12.0703 3.98438Z" fill="white"/>' +
                '<path id="Path_2" fill-rule="evenodd" clip-rule="evenodd" d="M13.2421 7.4999C13.2421 7.87515 13.2044 8.24972 13.1303 8.61318C13.0979 8.77168 13.2002 8.9264 13.3587 8.95879C13.3785 8.96291 13.3982 8.96486 13.4177 8.96486C13.5539 8.96486 13.6761 8.86907 13.7044 8.73037C13.7865 8.32834 13.828 7.9144 13.828 7.4999C13.828 6.57739 13.628 5.68967 13.2333 4.86135C13.1637 4.71532 12.989 4.6533 12.8428 4.72288C12.6967 4.79246 12.6348 4.96732 12.7043 5.11346C13.0612 5.86236 13.2421 6.66528 13.2421 7.4999Z" fill="white"/>' +
                '<path id="Shape" fill-rule="evenodd" clip-rule="evenodd" d="M8.67188 10.1367H8.96484C9.12666 10.1367 9.25781 10.2679 9.25781 10.4297V11.6016C9.25781 11.7634 9.12666 11.8945 8.96484 11.8945H6.03516C5.87334 11.8945 5.74219 11.7634 5.74219 11.6016V10.4297C5.74219 10.2679 5.87334 10.1367 6.03516 10.1367H6.32812V7.79297H6.03516C5.87334 7.79297 5.74219 7.66182 5.74219 7.5V6.32812C5.74219 6.16631 5.87334 6.03516 6.03516 6.03516H8.37891C8.54073 6.03516 8.67188 6.16631 8.67188 6.32812V10.1367ZM6.32812 11.3086H8.67188V10.7227H8.37891C8.2172 10.7227 8.08594 10.5915 8.08594 10.4297V6.62109H6.32812V7.20703H6.62109C6.78291 7.20703 6.91406 7.33818 6.91406 7.5V10.4297C6.91406 10.5915 6.78291 10.7227 6.62109 10.7227H6.32812V11.3086Z" fill="white"/>' +
                '<path id="Shape_2" fill-rule="evenodd" clip-rule="evenodd" d="M8.67188 4.27734C8.67188 4.92348 8.14613 5.44922 7.5 5.44922C6.85387 5.44922 6.32812 4.92348 6.32812 4.27734C6.32812 3.63121 6.85387 3.10547 7.5 3.10547C8.14613 3.10547 8.67188 3.63121 8.67188 4.27734ZM8.08594 4.27734C8.08594 3.95428 7.82307 3.69141 7.5 3.69141C7.17693 3.69141 6.91406 3.95428 6.91406 4.27734C6.91406 4.60041 7.17693 4.86328 7.5 4.86328C7.82307 4.86328 8.08594 4.60041 8.08594 4.27734Z" fill="white"/>' +
                '<path id="Shape_3" fill-rule="evenodd" clip-rule="evenodd" d="M1.27758e-05 7.5C1.27758e-05 3.45119 3.45773 0 7.50001 0C11.5485 0 15 3.45669 15 7.5C15 11.5483 11.5433 15 7.50001 15C6.11699 15 4.6462 14.6038 3.53383 13.9355L0.385679 14.9849C0.280965 15.0199 0.164693 14.993 0.0858435 14.9142C0.007337 14.8358 -0.0200144 14.7196 0.0150045 14.6144L1.06454 11.4663C0.396322 10.3538 1.27758e-05 8.88302 1.27758e-05 7.5ZM3.72781 13.3668C4.76316 14.0226 6.1733 14.4141 7.50001 14.4141C11.2478 14.4141 14.4141 11.2478 14.4141 7.5C14.4141 3.75217 11.2478 0.585938 7.50001 0.585938C3.75219 0.585938 0.58595 3.75217 0.58595 7.5C0.58595 8.82671 0.977453 10.237 1.6332 11.2722C1.68035 11.3466 1.69156 11.4381 1.66364 11.5217L0.756238 14.2438L3.47833 13.3364C3.56302 13.3081 3.65445 13.3204 3.72781 13.3668Z" fill="white"/>' +
                '</g>' +
                '</svg>' +
                '<input class="package-radio" id="' + packageName + roomName + index + '" name="pack' + roomName + index + '" type="radio" ' + checked + ' value="' + bookingData.packages[k].id + '">' +
                '<label for="' + packageName + roomName + index + '">' + packageName + '</label>' +
                '<div class="musicRoom__buyPriceTooltip">' +
                    '<div class="tooltip__title">' + packageName + '</div>' +
                    '<div class="tooltip__text">' + packageDescription + '</div>' +
                    // '<div class="tooltip__price">' +
                    //     'Price to pay ' +
                    //     '<span>' + totalPriceWithDiscount + getEuroPrice(totalPriceWithDiscount) + '</span>' +
                    // '</div>' +
                '</div>' +
                '</div>';
        }
    }

    return {
        html: packagesHtml,
        totalPrice: totalPrice,
        totalPriceWithDiscount: totalPriceWithDiscount,
        priceForPerson: priceForPerson
    };
}

var roomsImages = {
    1: 'roombook1',
    2: 'icberg',
    3: 'gatsby',
    4: 'reggae',
    5: 'comics'
};

function getRoomsHtml() {
    let html = '';
    let bookedTimes = {
        Strip: 'This room has been booked 3 times for last 24 hours',
        Iceberg: 'This room has been booked 4 times for last 48 hours',
        Gatsby: 'This room has been booked 2 times for last 24 hours',
        Reggae: 'This room has been booked 4 times for last 24 hours',
        Comics: 'This room has been booked 5 times for last 48 hours'
    };
    for (i = 0; i < bookingData.tables.length; ++i) {
        let samePricePersons = getSamePricePersonsCount();
        let samePricePersonsHtml = samePricePersons == 0 ?
            '<div class="musicRoom__userMessage same-price-persons-count"></div>' :
            '<div class="musicRoom__userMessage same-price-persons-count">For this room, you can invite up to <span>' + samePricePersons + '</span> more persons for the same price</div>';

        html += '<div class="musicRoom__item step-two">' +
                   '<div class="room-descrBlock">' +
                       '<div class="musicRoom__image">' +
                           '<img src="img/' + roomsImages[bookingData.tables[i].id] + '.jpg">' +
                       '</div>' +
                       '<div class="musicRoom__descr">' +
                           '<div class="musicRoom__title">Room ' + capitalizeFirstLetter(bookingData.tables[i].table_number) +
                               '<span class="musicRoom__count">Max - 25 persons</span>' +
                           '</div>' +
                           '<div class="dop-info">' +
                               '<div class="musicRoom__userMessage">The space is perfectly adapted to the size of your group</div>' +
                               samePricePersonsHtml +
                               '<div class="musicRoom__userMessageTime">' + bookedTimes[bookingData.tables[i].table_number] + '</div>' +
                           '</div>' +
                       '</div>' +
                   '</div>' +
                   '<div class="musicRoom__buyWrap" id="' + bookingData.tables[i].table_number + '-room"></div>' +
               '</div>';

        if (i < bookingData.tables.length - 1) {
            html += '<div class="line-divider step-two"></div>';
        }
    }

    $('#rooms-bookings').append(html);
}


function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function getDurationSlots(freeTimes, duration) {
    let length = freeTimes.length;
    let isLessThanWant = false;

    if (length < duration) {
        isLessThanWant = true;
        // return [];
    }

    if (length == 1) {
        return [{start: freeTimes[0], end: freeTimes[0], hoursCount: 1}];
    }

    let slots = [];
    let lessThanWantSlots = [];
    let count = 0;
    let startTime = freeTimes[0];

    for (index = 0; index < length; ++index) {
        count++;

        if (index + 1 < length) {
            if (freeTimes[index].slice(-2) !== freeTimes[index + 1].substring(0, 2)) {
                if (count == duration) {
                    slots.push({start: startTime, end: freeTimes[index], hoursCount: count});
                } else {
                    // if (startTime != freeTimes[index]) {
                        lessThanWantSlots.push({start: startTime, end: freeTimes[index], hoursCount: count});
                    // }
                }

                count = 0;
                startTime = freeTimes[index + 1];

                continue;
            }

            if (count == duration) {
                slots.push({start: startTime, end: freeTimes[index], hoursCount: count});
                count = 0;
                startTime = freeTimes[index + 1];
            } else {
                // if (startTime != freeTimes[index]) {
                    lessThanWantSlots.push({start: startTime, end: freeTimes[index], hoursCount: count});
                // }
            }
        }
    }

    let maxCount = 0;
    if (! slots.length) {
        for (p = 0; p < lessThanWantSlots.length; p++) {
            if (lessThanWantSlots[p].hoursCount > maxCount) {
                maxCount = lessThanWantSlots[p].hoursCount;
            }
        }

        for (p = 0; p < lessThanWantSlots.length; p++) {
            if (lessThanWantSlots[p].hoursCount == maxCount) {
                slots.push(lessThanWantSlots[p]);
            }
        }
    }

    return slots;
}

// return array of hours in interval of time
// e.g. ['2021', '2122']
function getHours(start, end) {
    let result = [];
    let startCopy = start.clone();

    while (startCopy.isBefore(end)) {
        let begginingHour = startCopy.format('HH');

        startCopy.add(1, 'hour');

        let endingHour = startCopy.format('HH');

        result.push(begginingHour.toString() + endingHour.toString());
    }

    return result;
}

function isStepTwoContinue() {
    let result = isStepTwoVisible() && currentBookingData.room.trim() && currentBookingData.time.trim();

    if (! result) {
        $('.booking__pricePanelBookBtn').css('cursor', 'not-allowed');
    }

    return result;
}

function continueStepTwo () {
    $('.booking__pricePanelBookBtn').css('cursor', 'pointer');
}

function isServicesNotEmpty() {
    if (Object.keys(currentBookingData.services).length) {
        return true;
    }

    return false;
}

function setPriceDivHtml(price) {
    let currencySpan = $('#currency-span');
    $('#total-price-span').text(price);
    currencySpan.text(getEuroPrice(price));
}

function handleBookButtonClick() {
    $('body').off('click', '.musicRoom__buyBtn');
    $('body').on('click', '.musicRoom__buyBtn',
        function () {
            let nameRoom = $(this).find('.booking-name-room').text();
            let timeBooking = $(this).parent().find('.musicRoom__buyItemTime').text();
            let currencySpan = $('#currency-span');

            if ($(this).hasClass('choosed')) {
                currencySpan.css('display', 'none');
                $('#total-price-span').text('');
                totalPrice = 0;
                $("#booking-room").text('');
                $("#booking-time-start").text('');
                $('#what-to-package').html('');
                $(this).toggleClass('choosed').parent().toggleClass('choosed');
                choosedRoom = '';
            } else {
                if (choosedRoom.length) {
                    if (! $(this).is(choosedRoom)) {
                        choosedRoom.toggleClass('choosed').parent().toggleClass('choosed');
                    }
                }

                totalPrice = $(this).siblings('.musicRoom__price').first().find('.actual-price').text();
                setPriceDivHtml(totalPrice);
                $('#total-price-span').text(totalPrice);
                currencySpan.css('display', 'flex');
                $("#booking-room").text(nameRoom);
                $("#booking-time-start").text(timeBooking);
                $(this).toggleClass('choosed').parent().toggleClass('choosed');
                setPackageChoosedHtml('Drinker');
                choosedRoom = $(this);
            }

            setCurrentBookingData();

            if (isStepTwoContinue()) {
                continueStepTwo()
            }
        }
    );
}

function handleAddServiceButtonClick() {
    $('body').off('click', '.add-food');
    $('body').on('click', '.add-food', function() {
        $(this).siblings('.plus-portion').trigger('click');
    });
}

function getDayName(dayNumber) {
    var weekdays = new Array(7);
    weekdays[0] = "Sunday";
    weekdays[1] = "Monday";
    weekdays[2] = "Tuesaday";
    weekdays[3] = "Wednesday";
    weekdays[4] = "Thursday";
    weekdays[5] = "Friday";
    weekdays[6] = "Saturday";

    return weekdays[dayNumber];
}

function handleTooltipsOfPackages() {
    // hover tooltip
    if ($(window).width() >= '1024') {
        $('.tooltip-icon').hover(
            function () {
                $(this).siblings('.musicRoom__buyPriceTooltip').css('display', 'flex').css('opacity', '1')
            },
            function () {
                $(this).siblings('.musicRoom__buyPriceTooltip').css('display', 'none').css('opacity', '0')
            }
        );
    }
}

function handlePackageRadioButtonClick() {
    $('body').off('click', '.radio');
    $('body').on('click', '.radio', function() {
        if ($(this).hasClass('handle-prices')) {
            let packageId = $(this).find('.package-radio').val();
            let package = bookingData.packages.find(obj => {
                return obj.id == packageId;
            });
            setPackageChoosedHtml(package.name);

            currentBookingData.packageId = packageId;

            let prices = getPrices(package);

            if (choosedRoom.length) {
                setPriceDivHtml(prices.totalPriceWithDiscount);
            }

            let priceDiv = $(this).parent().parent().find('.musicRoom__price');

            setBookingsPricesDivs(priceDiv, prices);
            if ($(window).width() <= '1024') {
                $(this).find('.musicRoom__buyPriceTooltip').first().addClass('visible');
                setTimeout(() => {
                    $(this).find('.musicRoom__buyPriceTooltip').first().removeClass('visible');
                }, 1500)
            }
            if (packageId == 2) {
                $('.step-four').css('display', 'none');
            } else {
                $('.step-four').css('display', 'block');
            }
        }
    });
}

function setBookingsPricesDivs(div, prices) {
    div.find('.musicRoom__priceValueOld').text(prices.totalPrice + ' HUF');
    div.find('.musicRoom__priceValueNew').html(getTotalPriceDiv(prices.totalPriceWithDiscount));
    div.find('.musicRoom__priceValuePerson').text(prices.priceForPerson + ' HUF/person');
}

function getTotalPriceDiv(price) {
    return '<div class="musicRoom__priceValueNew"><span class="actual-price">' + price + '</span> HUF</div>';
}

function getEuroPrice(price) {
    return ' HUF ≈ ' + price * bookingData.settings.forinta_euro + ' €';
}

function getServicesHtml() {
    let html = '';

    for (j = 1; j < 3; ++j) {
        let activeClass = '';
        let services = [];
        let subTypesNames = [];

        if (j === 1) {
            activeClass = 'active';
            for (service in bookingData.services) {
                if (bookingData.services[service].type == 'food') {
                    services.push(bookingData.services[service]);
                }
            }
            subTypesNames = subTypes.food;
        } else {
            for (service in bookingData.services) {
                if (bookingData.services[service].type == 'drink') {
                    services.push(bookingData.services[service]);
                }
            }
            subTypesNames = subTypes.drink;
        }

        html += '<div class="booking__stepFoodWrap tabs__content step-four' + activeClass + ' owl-carousel">';

        html += '<div class="tabs">' +
                    '<div class="tabs-header">' +
                        // '<div class="border"></div>' +
                        '<ul>';

        for (r = 0; r < subTypesNames.length; r++) {
            let subTypeActive = r === 0 ? 'active' : '';

            html += '<li class="' + subTypeActive + '">' +
                        '<a href="#tab-' + r + '" tab-id="' + j + r + '" ripple="ripple">' + subTypesNames[r] + '</a>' +
                    '</li>';
        }

        html += '</ul>' +
            '</div>';

        html += '<div class="tabs-content">';

        for (r = 0; r < subTypesNames.length; r++) {
            let subTypeActive = r === 0 ? 'active' : '';

            html += '<div class="tab ' + subTypeActive + ' owl-carousel" tab-id="' + j + r + '">';

            for (i = 0; i < services.length; ++i) {
                let service = services[i];

                if (service.sub_type !== subTypesNames[r]) {
                    continue
                }

                let serviceDescription = service.description ? service.description : '';

                html += '<div class="booking__stepFoodItem">' +
                               '<div class="number-food-wrap">' +
                               '<div class="number">' +
                               '<span class="minus minus-portion">-</span>' +
                               '<span class="add-food">Add</span>' +
                               '<div class="service-id" style="display: none;">' + service.id + '</div>' +
                               '<span class="service-count" style="display: none;">0</span>' +
                               '<span class="plus plus-portion">+</span>' +
                            '</div>' +
                            '</div>' +
                                '<div class="booking__stepFoodItemImage"><img src="https://bbrooms.zerrno.com' + service.photo_url + '"></div>' +
                                '<div style="display: none" class="hidden-service-price">' + service.price + '</div>' +
                                '<div class="booking__stepFoodItemText">' +
                                '<div class="booking__stepFoodItemTitle">' + service.name + '</div>' +
                                '<div class="booking__stepFoodItemDescr">' + serviceDescription + '</div>' +
                                '<div class="booking__stepFoodItemPrice"><span>' + service.price + '</span><br><span>' + getEuroPrice(service.price) + '</span></div>' +
                            '</div>' +
                        '</div> ';
            }

            html += '</div>';
        }

        html += '</div>';

        html += '</div>';

        html += '</div>';
    }

    $(html).insertAfter('.booking__stepTypeFood');
    handleServiceAdditionClick();
    handleAddServiceButtonClick();
    handleServicesTabs();
}

function handleServicesHtml() {
    if (isServicesNotEmpty()) {
        $('.price-panel__food-title').css('display', 'flex');

        let services = currentBookingData.services;

        for (service in services) {
            let serviceId = services[service].id;
            let serviceName = services[service].name;
            let serviceCount = services[service].amount;
            let serviceItemDiv = $('#service-item-div-' + serviceId);
            let servicePrice = services[service].price * serviceCount;

            if (serviceItemDiv.length) {
                serviceItemDiv.find('.x-count').text(' x' + serviceCount);
                serviceItemDiv.find('.service-item-div-price').text(servicePrice);
            } else {
                let html = '<div class="booking__priceInfo service-item-div" id="service-item-div-' + serviceId + '">' +
                               '<div class="booking__priceInfoTitle">' +
                                   serviceName +
                                   '<span class="x-count"> x' + serviceCount + '</span>' +
                               '</div>' +
                               '<div class="booking__priceInfoValue">' +
                                    '<span class="service-item-div-price">' + servicePrice + '</span>' + ' HUF' +
                               '</div>' +
                           '</div>';
                $(html).insertAfter('.price-panel__food-title');
            }
        }
    } else {
        $('.price-panel__food-title').css('display', 'none');
    }
}

function handleServiceAdditionClick() {
    $('body').off('click', '.plus-portion');
    $('body').on('click', '.plus-portion', function() {
        let serviceCountSpan = $(this).siblings('.service-count');
        let serviceCount = parseInt(serviceCountSpan.text());
        let currentPrice = parseInt($('#total-price-span').text());
        let servicePrice = parseInt($(this).parent().parent().parent().find('.hidden-service-price').text());
        let serviceId = parseInt($(this).siblings('.service-id').text());
        let serviceName = $(this).parent().parent().siblings('.booking__stepFoodItemText').find('.booking__stepFoodItemTitle').text();
        serviceCount++;

        $(this).siblings('.add-food').css('display', 'none');
        $(this).siblings('.service-count').css('display', 'flex');

        serviceCountSpan.text(serviceCount);

        setPriceDivHtml(currentPrice + servicePrice);
        handleServices(serviceId, serviceCount, servicePrice, serviceName);
    });

    $('body').off('click', '.minus-portion');
    $('body').on('click', '.minus-portion', function() {
        let serviceCountSpan = $(this).siblings('.service-count');
        let serviceCount = parseInt(serviceCountSpan.text());
        let currentPrice = parseInt($('#total-price-span').text());
        let servicePrice = parseInt($(this).parent().parent().parent().find('.hidden-service-price').text());
        let serviceId = parseInt($(this).siblings('.service-id').text());
        let serviceName = $(this).parent().parent().siblings('.booking__stepFoodItemText').find('.booking__stepFoodItemTitle').text();

        if (serviceCount > 0) {
            serviceCount--;
            serviceCountSpan.text(serviceCount);

            if (serviceCount == 0) {
                $(this).siblings('.add-food').css('display', 'flex');
                $(this).siblings('.service-count').css('display', 'none');
                $('#service-item-div-' + serviceId).remove();
            }

            setPriceDivHtml(currentPrice - servicePrice);
        }
        handleServices(serviceId, serviceCount, servicePrice, serviceName);
    });
}

function handleServices(serviceId, serviceCount, servicePrice, serviceName) {
    if (serviceCount == 0) {
        delete currentBookingData.services[serviceId];
    } else {
        currentBookingData.services[serviceId] = {
            id: serviceId,
            amount: serviceCount,
            price: servicePrice,
            name: serviceName
        }
    }

    handleServicesHtml();
}

function getPrices(package) {
    let priceGradation = JSON.parse(package.price_gradation);
    let totalPriceWithDiscount = 0;

    for (u = 0; u < priceGradation.length; ++u) {
        if (parseInt(currentBookingData.persons) >= parseInt(priceGradation[u].from) && parseInt(currentBookingData.persons) <= parseInt(priceGradation[u].to)) {
            totalPriceWithDiscount = priceGradation[u].price * currentBookingData.duration[0];
        }
    }

    let totalPrice = totalPriceWithDiscount * 1.1;

    let discount = getPromotionsDiscount();

    if (discount) {
        totalPrice = (1 - discount) * totalPrice;
        totalPriceWithDiscount = (1 - discount) * totalPriceWithDiscount;
    }

    let priceForPerson = totalPriceWithDiscount / currentBookingData.persons;

    return {
        priceForPerson: Math.round(priceForPerson),
        totalPrice: Math.round(totalPrice),
        totalPriceWithDiscount: Math.round(totalPriceWithDiscount)
    }
}

function handleAdditionalServicePrice(serviceId, isChecked) {
    let service = bookingData.services[serviceId];
    let currentPrice = parseInt($('#total-price-span').text());

    if (isChecked) {
        let price = currentPrice + parseInt(service.price);
        $('#total-price-span').text(price);
        $('#currency-span').text(getEuroPrice(price));

        currentBookingData.services[serviceId] = {
            id: serviceId,
            amount: 1,
            price: service.price,
            name: ''
        }
    } else {
        let price = currentPrice - parseInt(service.price);
        $('#total-price-span').text(price);
        $('#currency-span').text(getEuroPrice(price));

        delete currentBookingData.services[serviceId];
    }
}

function handlePostRequest() {
    let postData = {};
    let table = bookingData.tables.find(table => {
        return table.table_number == currentBookingData.room;
    });
    let dates = getStartAndEndDates(currentBookingData.time);

    let services = {};
    let servicesAmount = {};
    let i = 0;
    for (serviceId in currentBookingData.services) {
        services[i] = serviceId;
        servicesAmount[i] = currentBookingData.services[serviceId].amount;
        i++;
    }

    postData.amount = currentBookingData.persons;
    postData.package = currentBookingData.packageId;
    postData.first_name = currentBookingData.first_name;
    postData.last_name = currentBookingData.last_name;
    postData.phone = currentBookingData.phone;
    postData.email = currentBookingData.email;
    postData.table_id = table.id;
    postData.time_from = dates.start;
    postData.time_to = dates.end;
    postData.country = currentBookingData.country;
    postData.coupon_code = currentBookingData.couponCode;
    postData.payment_method = currentBookingData.paymentMethod;
    postData.payment_type = currentBookingData.paymentType;
    postData.additional_information = currentBookingData.event;
    postData.language = 'en';
    postData.service = services;
    postData.service_amount = servicesAmount;
    postData.reserved_for = uuid;

    var jqxhr = $.post("https://bbrooms.zerrno.com/api/v1/store-tab", postData)
        .done(function() {
            // $('.modal.ok').toggleClass('is-visible');
            localStorage.setItem('choosedHours', currentBookingData.time.split('-')[0]);
            localStorage.setItem('choosedDate', currentBookingData.date.format('D MMMM'));
            window.location.href = '/modalLuck.html';
        })
        .fail(function() {
            // $('.modal.error').toggleClass('is-visible');
            window.location.href = '/modalError.html';
        });
}

function getStartAndEndDates(hours) {
    hoursArray = hours.split('-');

    let start = hoursArray[0].substring(0, 2) + ':00';
    let end = hoursArray[1].substring(0, 2) + ':00';

    let startHours = moment(start, "HH:mm");
    let endHours = moment(end, "HH:mm");

    let startDate = moment(currentBookingData.date.format('YYYY-MM-DD') + ' ' + start, 'YYYY-MM-DD HH:mm');
    let endDate = moment(currentBookingData.date.format('YYYY-MM-DD') + ' ' + end, 'YYYY-MM-DD HH:mm');

    if( endHours.isBefore(startHours) ) {
        endDate.add(1, 'day');
    }

    return {
        start: startDate.format('YYYY-MM-DD HH:mm'),
        end: endDate.format('YYYY-MM-DD HH:mm')
    }
}

function getSubTypes() {
    let result = {
        food: [],
        drink: []
    };

    for (var prop in bookingData.services) {
        if (Object.prototype.hasOwnProperty.call(bookingData.services, prop)) {
            if (bookingData.services[prop].sub_type) {
                if (bookingData.services[prop].type === 'drink') {
                    if (! result.drink.includes(bookingData.services[prop].sub_type)) {
                        result.drink.push(bookingData.services[prop].sub_type);
                    }
                } else {
                    if (! result.food.includes(bookingData.services[prop].sub_type)) {
                        result.food.push(bookingData.services[prop].sub_type);
                    }
                }
            }
        }
    }

    return result;
}

function handleServicesTabs() {
    var activePos = $('.tabs-header .active').position();

    function changePos() {

        activePos = $('.tabs-header .active').position();

        // $('.border').stop().css({
        //     left: activePos.left,
        //     width: $('.tabs-header .active').width()
        // });
    }

    changePos();
    var tabHeight = $('.tab.active').height();

    function animateTabHeight() {
        tabHeight = $('.tab.active').height();
    }

    animateTabHeight();

    // function changeTab() {
    //     var getTabId = $('.tabs-header .active a').attr('tab-id');
    //
    //     $('.tab').stop().fadeOut(300, function () {
    //         $(this).removeClass('active');
    //     }).hide();
    //
    //     $('.tab[tab-id=' + getTabId + ']').stop().fadeIn(300, function () {
    //         $(this).addClass('active');
    //         animateTabHeight();
    //     });
    // }

    $('.tabs-header a').unbind('click');
    $('.tabs-header a').on('click', function (e) {
        e.preventDefault();

        var tabId = $(this).attr('tab-id');
        var tabsContent = $(this).parent().parent().parent().siblings('.tabs-content');

        tabsContent.siblings('.tabs-header').find('a').stop().parent().removeClass('active');

        $(this).stop().parent().addClass('active');

        changePos();

        tabCurrentItem = tabItems.filter('.active');

        tabsContent.find('.tab').stop().fadeOut(300, function () {
            $(this).removeClass('active');
        }).hide();

        $('.tab[tab-id="' + tabId + '"]').stop().fadeIn(300, function () {
            $(this).addClass('active');
            $(this).css('display', 'flex');
            animateTabHeight();
        });
    });

    var tabItems = $('.tabs-header ul li');
    var tabCurrentItem = tabItems.filter('.active');

    $('[ripple]').on('click', function (e) {
        var rippleDiv = $('<div class="ripple" />'),
            rippleOffset = $(this).offset(),
            rippleY = e.pageY - rippleOffset.top,
            rippleX = e.pageX - rippleOffset.left,
            ripple = $('.ripple');

        rippleDiv.css({
            top: rippleY - (ripple.height() / 2),
            left: rippleX - (ripple.width() / 2),
            background: $(this).attr("ripple-color")
        }).appendTo($(this));

        window.setTimeout(function () {
            rippleDiv.remove();
        }, 1500);
    });
    if ($(window).width() <= '540') {
        $('.tab').owlCarousel({
            margin: 10,
            loop: true,
            dots: true,
            responsiveClass: true,
            responsive: {
                0: {
                    items: 1,
                    nav: false
                }
            },

        });
    }
}

function uuidv4() {
    return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
        (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
    );
}

function sendPreBookingRequest() {
    let postData = {};

    let table = bookingData.tables.find(table => {
        return table.table_number == currentBookingData.room;
    });

    let dates = getStartAndEndDates(currentBookingData.time);

    postData.table_id = table.id;
    postData.time_from = dates.start;
    postData.time_to = dates.end;
    postData.reserved_for = uuid;

    var jqxhr = $.post("https://bbrooms.zerrno.com/api/v1/freeze-tab", postData)
        .done(function() {

            // alert( "second success" );
        })
        .fail(function() {
            // alert( "error" );
        });
}

function isBookAllowed() {
    return isCheckboxChecked;
}

function setPackageChoosedHtml(package) {
    var content = '<div class="booking__priceInfoTitle">Package:</div>';
    content += '<div class="booking__priceInfoValue">' + package + '</div>';
    $('#what-to-package').html(content);
}

function getSamePricePersonsCount() {
    let choosedPackage = bookingData.packages.find(el => {
        return el.id == currentBookingData.packageId;
    });

    let priceGradation = JSON.parse(choosedPackage.price_gradation);

    for (u = 0; u < priceGradation.length; ++u) {
        if (parseInt(currentBookingData.persons) < parseInt(priceGradation[u].to)) {
            return priceGradation[u].to - currentBookingData.persons;
        } else if (parseInt(currentBookingData.persons) === parseInt(priceGradation[u].to)) {
            return 0;
        }
    }
}

function updateSamePricePersonsCount() {
    let samePricePersonsCount = getSamePricePersonsCount();
    if (samePricePersonsCount) {
        $('.same-price-persons-count').html('For this room, you can invite up to <span>' + samePricePersonsCount + '</span> more persons for the same price');
    } else {
        $('.same-price-persons-count').html('');
    }
}
