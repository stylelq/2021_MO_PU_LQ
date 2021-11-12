"use strict";

jQuery(function () {
  //팝업열기
  function openPopup() {
    var el = $(this).attr('href').replace("#", "");
    $('.popup').removeClass('is-active');
    $('#' + el).addClass('is-active');
    $('html').addClass('is-hidden');
    return false;
  }

  $(document).on('click', '.js-popup-open', openPopup); //확대축소(플러그인 panzoom)

  function productZoom() {
    var area = document.querySelectorAll('.js-product-zoom');
    var instance = "";

    for (var i = 0; i < area.length; i++) {
      var item = area.item(i);
      instance = panzoom(item);
    }
  }

  if ($('.product-zoom').length > 0) {
    productZoom();
  } //확대축소(플러그인 panzoom):reset


  function resetPanZoom() {
    var area = document.querySelectorAll('.js-product-zoom');
    var instance = "";

    for (var i = 0; i < area.length; i++) {
      var item = area.item(i);
      instance = panzoom(item).zoomAbs(0, 0, 1);
    }
  } //zoom slider


  if ($('.popup-slider').length > 0) {
    var zoomSlide = new Swiper('.popup-slider__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      allowTouchMove: false,
      slidesPerView: 1,
      navigation: {
        nextEl: ".popup-slider__button--next",
        prevEl: ".popup-slider__button--prev"
      },
      on: {
        slideChange: function slideChange() {
          resetPanZoom();
        }
      }
    });
  } //팝업닫기


  function closePopup() {
    $('.popup, .small-popup, .slide-popup').removeClass('is-active');
    $('html').removeClass('is-hidden');

    if ($(this).hasClass('slide-popup__close')) {
      resetPanZoom();
    }
  }

  $(document).on('click', '.js-popup-close', closePopup);
});