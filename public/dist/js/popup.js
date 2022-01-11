"use strict";

jQuery(function () {
  //팝업열기(공통)
  function openPopup() {
    var el = '';

    if (this.tagName === 'BUTTON') {
      el = this.dataset.popup;
    }

    if (this.tagName === "A") {
      var href = $(this).attr('href');

      if (href.indexOf('#') > -1) {
        el = href.slice(href.indexOf('#') + 1).replace();
      }

      if (href.indexOf('_') > -1) {
        el = href.slice(0, href.indexOf('_')).replace();
      }
    }

    console.log(el);

    if ($('.popup.is-active').length <= 1) {} else {
      $('.popup').removeClass('is-active');
    }

    $('#' + el).addClass('is-active'); // 전체 팝업 body scroll 없앰
    // $('html').addClass('is-hidden'); 
    // //[부분적용] body스크롤 허용되는 레이어 팝업
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
      var item = area.item(i); // item.style.border = '1px solid'

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
});