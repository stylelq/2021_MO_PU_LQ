// 하단 메뉴 고정탭
var typedPlay = "false";
var fixedPlay;
var sectionH;
$(window).on('load resize', function () {
    var boxAry = [];
    $(".fyl-contents").each(function () {
        var boxH = $(this).offset().top;
        boxAry.push(boxH)
    });
    (function () {
        sectionH = $('.fyl-contents').outerHeight();
        var menuElem = document.querySelector('.fyl-menu');
        var typedElem = document.querySelector('.js-type-line');
        var topH = $('.fyl-full').outerHeight() + (sectionH * 3);
        var currentY;
        function showScroll() {
            typedY = parseInt(typedElem.getBoundingClientRect().top);
            currentY = window.pageYOffset;
            fixedPlay = (currentY < topH) ? false : true;
            if (currentY > 0){
                menuElem.classList.add('is-active');
            }
        };
        window.addEventListener('scroll', function () {
            showScroll();
        })
    }());

    $(".js-hash").on('click', function (e) {
        e.preventDefault();
        var hashNum = $(this).parents('.fyl-menu__link').index();
        console.log($('.fyl-contents').eq(hashNum + 1).offset().top)
        $('html,body').animate({ scrollTop: $('.fyl-contents').eq(hashNum+1).offset().top - 10 }, 500);
    });
});