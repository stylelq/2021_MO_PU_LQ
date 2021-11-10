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

  $(document).on('click', '.js-popup-open', openPopup); //팝업닫기

  function closePopup() {
    $('.popup').removeClass('is-active');
    $('html').removeClass('is-hidden');
  }

  $(document).on('click', '.js-popup-close', closePopup);
});