"use strict";

jQuery(function () {
  //팝업열기(공통)
  function openPopup() {
    var el = '';

    if (this.tagName === 'BUTTON') {
      el = this.dataset.popup;
    }

    if (this.tagName === "A") {
      el = $(this).attr('href').replace('#', '');
    }

    if ($('.popup.is-active').length <= 1) {} else {
      $('.popup').removeClass('is-active');
    }

    $('#' + el).addClass('is-active');
    $('.popup__body').scrollTop(0); // mobile 디바이스 하단 네비게이션 버튼 바

    var vh = window.innerHeight * 0.01;
    document.documentElement.style.setProperty('--vh', vh + 'px');
    window.addEventListener('resize', function () {
      var vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', vh + 'px');
    });
    window.addEventListener('touchmove', function () {
      var vh = window.innerHeight * 0.01; //window.innerHeight/100;

      document.documentElement.style.setProperty('--vh', vh + 'px');
    }); // 전체 팝업 body scroll 없앰

    $('html').addClass('is-hidden'); // 예외 modal-pop

    var typeModal = ['small-popup', 'button-popup', 'modal-pop'];
    var popId = $('#' + el);
    typeModal.forEach(function (name) {
      if (popId.hasClass(name)) {
        $('html').removeClass('is-hidden');
        $('.popup__body').scrollTop(0);
      }

      return false;
    }); // //[부분적용] body스크롤 허용되는 레이어 팝업 ::href값으로
    // var scrollId = ['benefitsPop','giftPop','messagePop','installmentPop']
    // scrollId.forEach(function(item){
    //     var btnId = el.slice(0,el.indexOf('_')).replace();
    //     return btnId === item && $('html').removeClass('is-hidden');
    // });

    return false;
  }

  $(document).on('click', '.js-popup-open', openPopup); //Panzoom = https://github.com/inuyaksa/jquery.panzoom
  //zoom option

  var zoomOption = {
    // bound: 'outer',
    bounds: {
      top: 150,
      right: 50,
      bottom: 50,
      left: 250
    },
    // bounds:true,
    boundsPadding: 0.4,
    // boundsDisabledForZoom: true,
    maxZoom: 2,
    minZoom: 0.5,
    $reset: $(".popup-slider__button, .slide-popup__close, .js-popup-close") //제품 팝업 확대축소(플러그인 panzoom)

  };

  function productZoom() {
    var area = document.querySelectorAll('.js-product-zoom');
    var instance = "";

    for (var i = 0; i < area.length; i++) {
      var item = area.item(i);
      instance = panzoom(item, zoomOption);
    }
  } //확대축소(플러그인 panzoom):reset-슬라이드 이동시, 닫기시


  function resetPanZoom() {
    var area = document.querySelectorAll('.js-product-zoom');
    var instance = "";

    for (var i = 0; i < area.length; i++) {
      var item = area.item(i); // instance  = panzoom(item).zoomAbs( 0, 0, 1 );

      instance = panzoom(item, zoomOption);
    }
  } //확대축소(플러그인 panzoom):play


  if ($('.product-zoom').length > 0) {
    productZoom();
  } //팝업에 사용되는 슬라이드(확대축소팝업, 360도 회전 팝업)


  if ($('.popup-slider').length > 0) {
    var zoomSlide = new Swiper('.popup-slider__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      allowTouchMove: true,
      slidesPerView: 1,
      navigation: {
        nextEl: ".popup-slider__button--next",
        prevEl: ".popup-slider__button--prev"
      },
      on: {
        slideChange: function slideChange() {
          //확대축소 reset
          resetPanZoom();
        }
      }
    });
  } //팝업닫기(공통)


  function closePopup() {
    if ($('.popup.is-active').length <= 1) {
      $('.popup, .small-popup, .slide-popup, .button-popup').removeClass('is-active');
      $('html').removeClass('is-hidden');
    } else {
      $(this).closest('.popup').removeClass('is-active');
    }

    if ($(this).hasClass('slide-popup__close')) {
      resetPanZoom();
    }
  }

  $(document).on('click', '.js-popup-close', closePopup); //배송지 정보 탭

  function shippingTab() {
    var idx = $(this).parent('li').index();
    var shippingIdx = $('.shipping-tab__item:nth-child(4)');
    $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
    $('.js-pop-tab-cont').eq(idx).addClass('is-current').siblings('.js-pop-tab-cont').removeClass('is-current');
    $('html, body').animate({
      scrollTop: $('.popup__body').offset().top
    }, 340);

    if (shippingIdx.hasClass('is-current')) {
      $('#shippingPop .popup-confirm__link').text('확인');
    } else {
      $('#shippingPop .popup-confirm__link').text('선택 주소 사용');
    }
  }

  $(document).on('click', '.js-pop-tab-link', shippingTab); //---- 마이페이지::상품리뷰 이미지보기
  // 상품리뷰 이미지 팝업 오픈

  function reviewImgOpen(id) {
    $('.popup').attr('id', id);

    if ($('.popup.is-active').length <= 1) {} else {
      $('.popup').removeClass('is-active');
    }

    $('#' + id).addClass('is-active');
    $('html').addClass('is-hidden');
  } // 클릭한 리스트의 포토 개수에 따른 slide생성


  function reviewImgSlideDraw(ele) {
    var item = ele.closest('.review-list__photo--list'),
        slideWrap = $('.swiper-wrapper'),
        slide = '',
        imgSrc = [];

    for (var i = 0, len = item.find('li').length; i < len; i++) {
      imgSrc.push(item.find('li').eq(i).find('img').attr('src'));
      slide += '<div class="swiper-slide"><img src="' + imgSrc[i] + '"></div>';
    }

    slideWrap.html(slide);
  } // 상품리뷰 이미지 팝업 콘텐츠 뷰


  function reviewImgView() {
    var id = $(this).attr('href').replace('#', '');
    var idx = $(this).parent('li').index();
    reviewImgOpen(id);
    reviewImgSlideDraw($(this));
    var slide = new Swiper('.reviewImages__view .swiper-container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      initialSlide: idx,
      pagination: {
        el: ".detail-thumb__pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".detail-thumb--next",
        prevEl: ".detail-thumb--prev"
      }
    });
  }

  $(document).on('click', '.js-imgView-open', reviewImgView); //----
  // 필터 팝업 active event

  function inputActive() {
    $('.popup-checkform__item').removeClass('is-active');
    $(this).parent().addClass('is-active');
  }

  $(document).on('input click touchstart', '.list-radio', inputActive); //------[스테이징 기준] ---------
  //버튼 예외처리

  $(document).on('click', function (e) {
    // [개발기준작업] 주문서-배송지정보, 1:1문의-주문검색 팝업
    if (e.target.tagName === 'A' || e.target.tagName === 'BUTTON' || e.target.tagName === 'DIV') {
      if ($('.popup.page-delivery').hasClass('is-active') || $('#inquiryOrder').length > 0) {
        $('html').addClass('is-hidden');
      }

      if (e.target.className === 'popup__close') {
        $('html').removeClass('is-hidden');
      }
    }

    if (e.target.parentNode.parentNode.classList.contains('js-order-open')) {
      $(this).closest('.popup').removeClass('is-active');
      $('html').removeClass('is-hidden');
    }
  }); //취소나, 확인 버튼 클래스 추가

  function htmlClassRemove() {
    $('.popup, .small-popup, .slide-popup, .button-popup').removeClass('is-active');
    $(this).closest('.popup').removeClass('is-active');
    $('html').removeClass('is-hidden');
  }

  $(document).on('click', '.js-html-scroll', htmlClassRemove); // popup 닫기 -> 이용약관, 개인정보처리방침, 1:1문의쪽 주문검색 취소&확인버튼 

  var popupId = ['privacyPop', 'provisionPop', 'shippingPop', 'inquiryOrderPop'];
  $(document).on('click', '[class $= __footer] [class $= __link], [class $= -close], [class $= __close]', function () {
    for (var i = 0, len = popupId.length; i < len; i++) {
      if (this.closest('#' + popupId[i])) {
        $('.popup, .small-popup, .slide-popup, .button-popup').removeClass('is-active');

        if (popupId[i] === 'inquiryOrderPop' || popupId[i] === 'shippingPop') {
          $('html').removeClass('is-hidden');
          setTimeout(function () {
            $('html').removeClass('is-hidden');
          }, 50);
        }
      }
    }
  }); //-------------------------
});