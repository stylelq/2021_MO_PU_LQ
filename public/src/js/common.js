jQuery(function(){
    $(document).ready(function(){
        /*
        //Gnb
        */
        //Gnb 메뉴햄버거버튼 클릭시 노출/비노출 관련 액션
        function GnbMenu() {
            if($('.type-1depth').hasClass('is-active')){
                $('.gnb').removeClass('is-active');
                $('.dim').removeClass('is-active');
                $('.header').removeClass('type-bg');
                $('html').removeClass('is-hidden');

                if($(window).scrollTop() == 0){
                    $('.header').removeClass('is-active');
                }
            }else {
                $('.type-1depth').addClass('is-active');
                $('.dim').addClass('is-active');
                $('.header').addClass('type-bg');
                $('.header').addClass('is-active');
                $('html').addClass('is-hidden');

                if($(window).scrollTop() == 0){
                    $('.header').addClass('is-active');
                }
            }
            return false;
        }
        $(document).on('click', '.js-menu-btn', GnbMenu);

        //Gnb 메뉴 클릭시 공통액션
        $('.gnb-body__link').off('click').on('click', function (e) {
            e.preventDefault();
            var dataPage = $(this).attr('data-page');
            //3depth open/close
            if (dataPage == "3depth") {
                e.preventDefault();
                var gnbItem = $(this).parents('.gnb-body__item');
                if (gnbItem.hasClass('is-active')){
                    gnbItem.removeClass('is-active');
                    gnbItem.find('.gnb-3depth').removeClass('is-active')
                }else{
                    gnbItem.siblings().removeClass('is-active');
                    gnbItem.siblings().find('.gnb-3depth').removeClass('is-active')
                    gnbItem.addClass('is-active');
                    gnbItem.find('.gnb-3depth').addClass('is-active')
                }
            } else if (dataPage != "none"){
                e.preventDefault();
                $("." + dataPage).addClass('is-active');
                $("." + dataPage).find('.gnb-body__item').eq(0).addClass('is-active');
                $("." + dataPage).find('.gnb-3depth').eq(0).addClass('is-active');
            }
        });

        //Gnb 2뎁스 닫기
        $('.js-gnb-back').off('click').on('click',function(e){
            e.preventDefault();
            $('.gnb.type-2depth').removeClass('is-active');
            $('.gnb-body__item, .gnb-3depth').removeClass('is-active');
        })

        /*
        //Header Search
        */
        //헤더 서치박스 열기
        $('.js-search-open').off('click').on('click',function(e){
            e.preventDefault();
            $('.search').addClass('is-active');
            $('html').addClass('is-hidden');
        })

        //헤더 서치박스 닫기
        $('.js-search-close').off('click').on('click', function (e) {
            e.preventDefault();
            $('.search').removeClass('is-active');
            $('html').removeClass('is-hidden');
        })

        /*
        //Join(회원가입, 로그인)
        */
        //전체 체크박스 체크
        function allCheck() {
            var dataName = $(this).attr('name');
            var allCheckInput = $(this);
            $(allCheckInput).change(function(){
                if($(allCheckInput).is( ":checked") == true) {
                    $('[name="' + dataName + '"]:not(:disabled)').prop("checked",true);
                    $(this).parent('li').addClass('is-active');
                } else {
                    $('[name="' + dataName + '"]:not(:disabled)').prop("checked",false);
                }
            });
        };
        $(document).on('click', '.js-check-all', allCheck);
        
        //통합 체크시 관련 체크박스 제어
        function allCheckItem() {
            var label = $(this).prev('[type=checkbox]');
            var dataName = label.attr('name');
            var subInput = $('[name="' + dataName + '"]:not(:disabled):not(.js-check-all)');
            $(label).change(function(){
                if (subInput.length > subInput.filter(":checked").length) {
                    $('[name="' + dataName + '"].js-check-all').prop("checked",false);
                } else {
                    $('[name="' + dataName + '"].js-check-all').prop("checked",true);
                }
            });
        };
        $(document).on('click', '.terms__depth2-item label', allCheckItem);

        /*
        //Product(리스트페이지)
        */
        //Lnb 2뎁스 메뉴 오픈
        function depthMenu() {
            var depthHead = $('.js-lnb-btn').closest('.lnb');
            if($(depthHead).hasClass('is-open')){
                $(depthHead).removeClass('is-open');
            }else {
                $(depthHead).addClass('is-open');
            }
            return false;
        }
        $(document).on('click', '.js-lnb-btn', depthMenu);

        //Lnb 2뎁스 메뉴 닫기
        function depthMenuClose() {
            $('.lnb').removeClass('is-open');
        }
        $(document).on('click', '.js-lnb-close', depthMenuClose);


        //상품리스트 타입 변경 버튼제어
        function productTypeChage() {
            if($(this).hasClass('filter__link--list')){
                $(this).removeClass('filter__link--list');
                $(this).addClass('filter__link--post');
                $('.product-post').removeClass('product-post--post');
                $('.product-post').addClass('product-post--list');
            }else {
                $(this).removeClass('filter__link--post');
                $(this).addClass('filter__link--list');
                $('.product-post').removeClass('product-post--list');
                $('.product-post').addClass('product-post--post');
            }
        }
        $(document).on('click', '.js-layout-chage', productTypeChage);
        
        //우측 하단 카트(cart-fix)
        if($('.cart-fix').length > 0) {
            $(window).scroll(function () {
                var height = $(document).scrollTop();
                var headHeight = $('.header').scrollTop();

                if (height > headHeight) {
                    $('.cart-fix').addClass('is-view');
                } else {
                    $('.cart-fix').removeClass('is-view');
                }
            });
        }

        //스크롤탑 버튼
        function scrollTopBtn() {
            $('html, body').animate({scrollTop: '0'}, 340);
        }
        $(document).on('click', '.js-scrollTop', scrollTopBtn);

        /*
        //Product(상세페이지)
        */
        //상품상세 상단 배너슬라이드
        if($('.detail-thumb').length > 0){
            var detailThumbSlide = new Swiper('.detail-thumb__container', {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                pagination: {
                    el: ".detail-thumb__pagination",
                    type: "fraction",
                },
                navigation: {
                    nextEl: ".detail-thumb--next",
                    prevEl: ".detail-thumb--prev",
                },
            });
        }

        //상품상세 쉐어 버튼 열기/닫기
        function detailShareOpen() {
            if($('.detail-fix__share').hasClass('is-open')){
                $('.detail-fix__share').removeClass('is-open');
            }else {
                $('.detail-fix__share').addClass('is-open');
            }
        }
        $(document).on('click', '.js-share-btn', detailShareOpen);

        //수량 카운트하기
        function quantityPlus(e){
            e.preventDefault();
            var stat = $('.quantity__text--current').val();
            var num = parseInt(stat,10);
            num++;

            $('.quantity__text--current').val(num);
        }
        $(document).on('click', '.js-plus', quantityPlus);

        function quantityMinus(e){
            e.preventDefault();
            var stat = $('.quantity__text--current').val();
            var num = parseInt(stat,10);
            num--;
            if(num<=0){
                alert('구매 최소수량은 1개입니다.');
                num =1;
            }
            $('.quantity__text--current').val(num);
        }
        $(document).on('click', '.js-minus', quantityMinus);

        //제품 서브메뉴 스크롤 픽시드
        if($('.detail-tab').length > 0) {
            $(window).scroll(function () {
                var height = $(document).scrollTop();
                var topContHeight = $('.product-option').height();
                var mainOuterHeight = $('.site-main').outerHeight(true);
                var mainHeight = $('.site-main').height();
                var marginHeight = mainOuterHeight - mainHeight;
                var totalHeight = topContHeight  + marginHeight;
                if (height > totalHeight) {
                    $('.detail-tab').addClass('is-fixed');
                    $('.header').addClass('is-bg-white');
                } else {
                    $('.detail-tab').removeClass('is-fixed');
                    $('.header').removeClass('is-bg-white');
                }
            });
        }

        //제품상세 탭
        function detailTab() {
            var topContHeight = $('.product-option').height();
            var mainOuterHeight = $('.site-main').outerHeight(true);
            var mainHeight = $('.site-main').height();
            var marginHeight = mainOuterHeight - mainHeight;
            var totalHeight = topContHeight  + marginHeight;
            var idx = $(this).parent('li').index();
            $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
            $('.detail-tab__info').eq(idx).addClass('is-current').siblings('.detail-tab__info').removeClass('is-current');
            $('html, body').animate({scrollTop: totalHeight}, 340);
        }
        $(document).on('click', '.js-tab-link', detailTab);

        //제품 상세 하단 픽시드 결제 박스
        if($('.fix-button , .cart-fix__button').length > 0) {
            $(window).scroll(function () {
                var height = $(document).scrollTop();
                var headHeight = $('.header').scrollTop();

                if (height > headHeight) {
                    $('.fix-button').addClass('is-on');
                } else {
                    $('.fix-button').removeClass('is-on');
                }
            });
            $('.cart-fix').addClass('is-up');
            $('.footer').addClass('bottom-fix');
        }

        //연관제품 슬라이드
        if($('.recommended-slide').length > 0){
            var recommendeSlide = new Swiper('.recommended-slide__container', {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                pagination: {
                    el: ".recommended-slide__pagination",
                    type: "fraction",
                },
            });
        }
        //프로젝트 슬라이드
        if($('.project-slider').length > 0){
            var projectSlide = new Swiper('.project-slider__container', {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: ".project-pagination",
                },
            });
        }

        // 프로젝트 작품별 슬라이드
        if($('.project-slide').length > 0){
            var projectSlide2 = new Swiper('.project-slide__container', {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: ".project-slide-pagination",
                },
            });
        }

        // 장소 슬라이드
        if($('.project-place-slide').length > 0){
            var projectSlide2 = new Swiper('.project-place__container', {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: ".project-place-pagination",
                },
            });
        }
        /*if($('.project-place-slide').length > 0){
            var placeSlide = new Swiper('.project-place__container', {
                observer: true,
                observeParents: true,
                watchOverflow: true,
                slidesPerView: 1,
                loop: true,
                pagination: {
                    el: ".project-place-pagination",
                },
            });
        }*/

        //리뷰 평가체크(현재는 사용하지않음. 혹시필요할시 사용하세요)
        function checkStar() {
            $(this).parent().children('.js-check-star').removeClass('is-active');
            $(this).addClass('is-active').prevAll('.js-check-star').addClass('is-active');
            return false;
        }
        $(document).on('click', '.js-check-star', checkStar);

        //리뷰 더보기(아코디언)
        function reviewMore() {
            var parent = $(this).closest('.review-list');
            if(parent.hasClass('is-view')){
                parent.removeClass('is-view');
                $(this).text('더보기');
            }else{
                parent.addClass('is-view');
                $(this).text('접기');
            }
        }
        $(document).on('click', '.js-more-view', reviewMore);

        //qna 더보기(아코디언)
        function qnaMore() {
            var parent = $(this).closest('.qna-item');
            if(parent.hasClass('is-view')){
                parent.removeClass('is-view');
            }else{
                parent.addClass('is-view');
            }

        }
        $(document).on('click', '.js-qna-more', qnaMore);

        //faq 더보기(아코디언)
        function faqMore() {
            var parent = $(this).closest('.notice-faq__item');
            if(parent.hasClass('is-active')){
                parent.removeClass('is-active');
            }else{
                parent.addClass('is-active').siblings('li').removeClass('is-active');
            }
            return false;
        }
        $(document).on('click', '.js-faq-more', faqMore);

        //셀렉트 박스 텍스트 컬러변경(placeholder 시각적 효과)
        function selectPlaceholder() {
            $(this).addClass('is-check');
        }
        $(document).on('change', '.js-placeholder', selectPlaceholder);

        //기본 아코디언
        function accordionMore() {
            var parent = $(this).parent('li');
            if(parent.hasClass('is-active')){
                parent.removeClass('is-active');
            }else{
                parent.addClass('is-active').siblings('li').removeClass('is-active');
            }

            return false;
        }
        $(document).on('click', '.js-accordion', accordionMore);
    });

    //결제탭
    function paymentTab() {
        var el = $(this).attr('href').replace("#","");
        $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
        $('.payment-tool__list--item').removeClass('is-current');
        $('#' + el).addClass('is-current');
        return false;
    }
    $(document).on('click', '.js-payment-open', paymentTab);
});

/*
//Header Scroll Bg
*/
jQuery(function(){
    $(document).ready(function(){
        // 헤더 스크롤 백그라운드
        var didScroll;
        var lastScrollTop = 0;
        var delta = 5;
        var navbarHeight = $('.header').outerHeight();

        $(window).scroll(function(event){
            didScroll = true;
        });

        setInterval(function() {
            if (didScroll) {
                hasScrolled();
                didScroll = false;
            }
        }, 250);

        function hasScrolled() {
            var thisSt = $(window).scrollTop();

            if(Math.abs(lastScrollTop - thisSt) <= delta)
                return;

            if (thisSt > lastScrollTop && thisSt > navbarHeight){
                $('.header').removeClass('type-bg');
            } else {
                if(thisSt + $(window).height() < $(document).height()) {
                    $('.header').addClass('type-bg');
                }
            }
            lastScrollTop = thisSt;
        }
    });

    //메세지 카드 체크시 노출
    function messageCheck() {
        var messageCheckInput = $(this).prev('input[type="checkbox"]');
        var activeClass = $(this).closest('.order-product__item').find('.order-product__message');
        messageCheckInput.change(function(){
            if(messageCheckInput.is( ":checked") == true) {
                activeClass.addClass('is-active');
            } else {
                activeClass.removeClass('is-active');
            }
        });
    }
    $(document).on('click', '.js-open-message', messageCheck);

    //적립금 전액 체크
    function useTotalCheck() {
        var useTotalCheckInput = $(this).prev('input[type="checkbox"]');
        var totalPrice = $('.coupon-info__use--total-price').text().replace(/,/g, '');
        useTotalCheckInput.change(function(){
            if(useTotalCheckInput.is( ":checked") == true) {
                $('.js-full-use-text').attr('value', totalPrice);
            } else {
                $('.js-full-use-text').attr('value', '0');
            }
        });
    }
    $(document).on('click', '.js-full-use', useTotalCheck);

    function textareaKeyup() {
        if ($(this).val().length > 50) {
            alert("글자수는 50자로 이내로 제한됩니다.");
            $(this).val($(this).val().substring(0, 50));
        }
    };

    $(document).off('keyup').on('keyup', '.js-max-keyup', textareaKeyup);

    function customOption() {
        var customOption = $(this).next('.js-select-custom');
        var optionSelected = $(this).find('option:selected');
        if(optionSelected.val() == 6) {
            customOption.addClass('is-active');
        }
        else {
            customOption.removeClass('is-active');
        }
    };

    $(document).on('change', '.js-custom-message', customOption);
});

//입고알림 버튼클릭시
function stoNtsAsk(){
    alert('입고 알림을 \n신청하시겠습니까?')
}

//카트 제품 삭제 버튼클릭시
function basketDelete(){
    alert('삭제하시겠습니까?')
}


/**
 * ScrollMagic: Opacity
 */
if($('.motion-up').length > 0){
    var controller = new ScrollMagic.Controller();
    $('.motion-up').each(function(){
        var Opacity = new ScrollMagic.Scene({
            triggerElement: this.children[0],
            triggerHook:0.9
        })
            .reverse(false)
            .setClassToggle(this, 'motion-up--active')
            .addTo(controller);
    });
}


