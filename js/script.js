
$(document).ready(function () {

    $('.lang').styler();
    $('.select-celebrate').styler();
    $('.country').styler();
    $('.header__rooms').styler();
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
        } else {
            $('.nav').removeClass('show');
            $('.nav').toggleClass('hide');
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

    // footer-menu active item
    $('.footer_nav a').click(function () {
        handleMenus($(this).attr('href'));
    });



//main-cursor

    $(document).on('mousemove', function(e) {
        let x = e.pageX;
        let y = e.pageY;
        $('#home').css({
            'background': `radial-gradient(circle at ${x}px ${y}px, rgba(0, 0, 0, 0), rgba(28, 11, 63, 0.95) 15%)`
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
        function checkOffset() {
            if($('.booking__pricePanel').offset().top + $('.booking__pricePanel').height()
                >= $('.footer').offset().top - 10)
                $('.booking__pricePanel').css('position', 'absolute').css('width', '25%');
            if($(document).scrollTop() + window.innerHeight < $('.footer').offset().top)
                $('.booking__pricePanel').css('position', 'fixed').css('width', '23%'); // restore when you scroll up
        }
        $(document).scroll(function() {
            checkOffset();
        });
    }



// continue booking
    $('#continue-btn').click(
        function () {
            $('.booking__step1Wrap').css('display', 'none');
            $('.booking__foodStepWrap').css('display', 'flex');
        }
    );

    $('#food-prev-btn').click(
        function () {
            $('.booking__step1Wrap').css('display', 'flex');
            $('.booking__foodStepWrap').css('display', 'none');
        }
    );

    $('#food-continue-btn').click(
        function () {
            $('.booking__foodStepWrap').css('display', 'none');
            $('.booking__userInfoStepWrap').css('display', 'flex');
        }
    );

    $('#pay-prev-btn').click(
        function () {
            $('.booking__foodStepWrap').css('display', 'flex');
            $('.booking__userInfoStepWrap').css('display', 'none');
        }
    );

    $('#pen-link').click(
        function () {
            $('.booking__foodStepWrap').css('display', 'none');
            $('.booking__userInfoStepWrap').css('display', 'none');
            $('.booking__step1Wrap').css('display', 'flex');
        }
    );


    //food tabs
    $('.booking__stepTypeFood').each(function() {
        $(this).find('.food-radio').each(function(i) {
            $(this).click(function(){
                $(this).addClass('active').siblings().removeClass('active')
                    .parents('.booking__foodStepWrap').find('.tabs__content').eq(i).css('display', 'flex').siblings('.tabs__content').hide();
            });
        });
    });



    //card
if (window.location.href.includes('pageBooking') ) {
    let ccNumberInput = document.querySelector('.cc-number-input'),
        ccNumberPattern = /^\d{0,16}$/g,
        ccNumberSeparator = " ",
        ccNumberInputOldValue,
        ccNumberInputOldCursor,

        ccExpiryInput = document.querySelector('.cc-expiry-input'),
        ccExpiryPattern = /^\d{0,4}$/g,
        ccExpirySeparator = "/",
        ccExpiryInputOldValue,
        ccExpiryInputOldCursor,

        ccCVCInput = document.querySelector('.cc-cvc-input'),
        ccCVCPattern = /^\d{0,3}$/g,

        mask = (value, limit, separator) => {
            var output = [];
            for (let i = 0; i < value.length; i++) {
                if ( i !== 0 && i % limit === 0) {
                    output.push(separator);
                }

                output.push(value[i]);
            }

            return output.join("");
        },
        unmask = (value) => value.replace(/[^\d]/g, ''),
        checkSeparator = (position, interval) => Math.floor(position / (interval + 1)),
        ccNumberInputKeyDownHandler = (e) => {
            let el = e.target;
            ccNumberInputOldValue = el.value;
            ccNumberInputOldCursor = el.selectionEnd;
        },
        ccNumberInputInputHandler = (e) => {
            let el = e.target,
                newValue = unmask(el.value),
                newCursorPosition;

            if ( newValue.match(ccNumberPattern) ) {
                newValue = mask(newValue, 4, ccNumberSeparator);

                newCursorPosition =
                    ccNumberInputOldCursor - checkSeparator(ccNumberInputOldCursor, 4) +
                    checkSeparator(ccNumberInputOldCursor + (newValue.length - ccNumberInputOldValue.length), 4) +
                    (unmask(newValue).length - unmask(ccNumberInputOldValue).length);

                el.value = (newValue !== "") ? newValue : "";
            } else {
                el.value = ccNumberInputOldValue;
                newCursorPosition = ccNumberInputOldCursor;
            }

            el.setSelectionRange(newCursorPosition, newCursorPosition);

            highlightCC(el.value);
        },
        highlightCC = (ccValue) => {
            let ccCardType = '',
                ccCardTypePatterns = {
                    amex: /^3/,
                    visa: /^4/,
                    mastercard: /^5/,
                    disc: /^6/,

                    genric: /(^1|^2|^7|^8|^9|^0)/,
                };

            for (const cardType in ccCardTypePatterns) {
                if ( ccCardTypePatterns[cardType].test(ccValue) ) {
                    ccCardType = cardType;
                    break;
                }
            }

            let activeCC = document.querySelector('.cc-types__img--active'),
                newActiveCC = document.querySelector(`.cc-types__img--${ccCardType}`);

            if (activeCC) activeCC.classList.remove('cc-types__img--active');
            if (newActiveCC) newActiveCC.classList.add('cc-types__img--active');
        },
        ccExpiryInputKeyDownHandler = (e) => {
            let el = e.target;
            ccExpiryInputOldValue = el.value;
            ccExpiryInputOldCursor = el.selectionEnd;
        },
        ccExpiryInputInputHandler = (e) => {
            let el = e.target,
                newValue = el.value;

            newValue = unmask(newValue);
            if ( newValue.match(ccExpiryPattern) ) {
                newValue = mask(newValue, 2, ccExpirySeparator);
                el.value = newValue;
            } else {
                el.value = ccExpiryInputOldValue;
            }
        };

    ccNumberInput.addEventListener('keydown', ccNumberInputKeyDownHandler);
    ccNumberInput.addEventListener('input', ccNumberInputInputHandler);

    ccExpiryInput.addEventListener('keydown', ccExpiryInputKeyDownHandler);
    ccExpiryInput.addEventListener('input', ccExpiryInputInputHandler);
}




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

function initCarousel(){

    if ($(window).width() <= '1024'){
        $('#home__rooms-accordion').owlCarousel({
            dots:true,
            responsiveClass:true,
            responsive:{
                0:{
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





