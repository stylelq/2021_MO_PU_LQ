"use strict";

jQuery(function () {
  //Gnb Menu
  function GnbMenu() {
    if ($('.type-1depth').hasClass('is-active')) {
      $('.gnb').removeClass('is-active');
      $('.dim').removeClass('is-active');
      $('.header').removeClass('type-bg');
      $('html').removeClass('is-hidden');

      if ($(window).scrollTop() == 0) {
        $('.header').removeClass('is-active');
      }
    } else {
      $('.type-1depth').addClass('is-active');
      $('.dim').addClass('is-active');
      $('.header').addClass('type-bg');
      $('.header').addClass('is-active');
      $('html').addClass('is-hidden');

      if ($(window).scrollTop() == 0) {
        $('.header').addClass('is-active');
      }
    }

    return false;
  }

  $(document).on('click', '.js-menu-btn', GnbMenu); //Gnb Action

  $('.gnb-body__link').off('click').on('click', function (e) {
    e.preventDefault();
    var dataPage = $(this).attr('data-page'); //3depth open/close

    if (dataPage == "3depth") {
      e.preventDefault();
      var gnbItem = $(this).parents('.gnb-body__item');

      if (gnbItem.hasClass('is-active')) {
        gnbItem.removeClass('is-active');
        gnbItem.find('.gnb-3depth').removeClass('is-active');
      } else {
        gnbItem.siblings().removeClass('is-active');
        gnbItem.siblings().find('.gnb-3depth').removeClass('is-active');
        gnbItem.addClass('is-active');
        gnbItem.find('.gnb-3depth').addClass('is-active');
      }
    } else if (dataPage != "none") {
      e.preventDefault();
      $("." + dataPage).addClass('is-active');
      $("." + dataPage).find('.gnb-body__item').eq(0).addClass('is-active');
      $("." + dataPage).find('.gnb-3depth').eq(0).addClass('is-active');
    }
  }); //Search Open

  $('.js-search-open').off('click').on('click', function (e) {
    e.preventDefault();
    $('.search').addClass('is-active');
    $('html').addClass('is-hidden');
  }); //Search Close

  $('.js-search-close').off('click').on('click', function (e) {
    e.preventDefault();
    $('.search').removeClass('is-active');
    $('html').removeClass('is-hidden');
  }); //Gnb 2Depth Close

  $('.js-gnb-back').off('click').on('click', function (e) {
    e.preventDefault();
    $('.gnb.type-2depth').removeClass('is-active');
    $('.gnb-body__item, .gnb-3depth').removeClass('is-active');
  });
}); //Header Scroll Bg

var beforePosition = document.documentElement.scrollTop;
document.addEventListener('scroll', function () {
  var afterPosition = document.documentElement.scrollTop;
  var header = document.querySelector('.header');

  if (afterPosition > 100) {
    if (beforePosition < afterPosition) {
      // 스크롤 위로 
      header.classList.remove('type-bg');
    } else {
      // 스크롤 아래로
      header.classList.add('type-bg');
    }
  } else {// 평상 시
  }

  beforePosition = afterPosition;
}); //아코디언메뉴

var accordionElemAll = document.querySelectorAll('.js-accordion');
Array.prototype.forEach.call(accordionElemAll, function (accordionElem) {
  accordionElem.addEventListener('click', function (e) {
    e.preventDefault();
    var parent = this.parentNode;
    var accordionList = parent.querySelector('ul');

    if (this.classList.contains('is-active')) {
      //닫기
      accordionList.classList.remove('is-hide');
      this.classList.remove('is-active');
    } else {
      //열기
      accordionList.classList.add('is-hide');
      this.classList.add('is-active');
    }
  });
}); //전체선택

function selectAll(selectAll, name) {
  var checkboxes = document.querySelectorAll("input[name=\"".concat(name, "\"]"));
  checkboxes.forEach(function (checkbox) {
    checkbox.checked = selectAll.checked;
  });
}

jQuery(function () {
  //Lnb 2Depth Menu Open
  function depthMenu() {
    var depthHead = $('.js-lnb-btn').closest('.lnb');

    if ($(depthHead).hasClass('is-open')) {
      $(depthHead).removeClass('is-open');
    } else {
      $(depthHead).addClass('is-open');
    }

    return false;
  }

  $(document).on('click', '.js-lnb-btn', depthMenu); //Lnb 2Depth Menu Close

  function depthMenuClose() {
    $('.lnb').removeClass('is-open');
  }

  $(document).on('click', '.js-lnb-close', depthMenuClose); //Product List:Post Change

  function productTypeChage() {
    if ($(this).hasClass('filter__link--list')) {
      $(this).removeClass('filter__link--list');
      $(this).addClass('filter__link--post');
      $('.product-post').removeClass('product-post--post');
      $('.product-post').addClass('product-post--list');
    } else {
      $(this).removeClass('filter__link--post');
      $(this).addClass('filter__link--list');
      $('.product-post').removeClass('product-post--list');
      $('.product-post').addClass('product-post--post');
    }
  }

  $(document).on('click', '.js-layout-chage', productTypeChage); //우측 하단 카트(cart-fix)

  if ($('.cart-fix').length > 0) {
    $(window).scroll(function () {
      var height = $(document).scrollTop();
      var headHeight = $('.header').scrollTop();

      if (height > headHeight) {
        $('.cart-fix').addClass('is-view');
      } else {
        $('.cart-fix').removeClass('is-view');
      }
    });
  } //scrollTop Button


  function scrollTopBtn() {
    $('html, body').animate({
      scrollTop: '0'
    }, 340);
  }

  $(document).on('click', '.js-scrollTop', scrollTopBtn); //Detail Thumb Slide

  if ($('.detail-thumb').length > 0) {
    var detailThumbSlide = new Swiper('.detail-thumb__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      pagination: {
        el: ".detail-thumb__pagination",
        type: "fraction"
      },
      navigation: {
        nextEl: ".detail-thumb--next",
        prevEl: ".detail-thumb--prev"
      }
    });
  } //Detail Share Open


  function detailShareOpen() {
    if ($('.detail-fix__share').hasClass('is-open')) {
      $('.detail-fix__share').removeClass('is-open');
    } else {
      $('.detail-fix__share').addClass('is-open');
    }
  }

  $(document).on('click', '.js-share-btn', detailShareOpen); //카운트 수량

  function quantityPlus(e) {
    e.preventDefault();
    var stat = $('.quantity__text--current').val();
    var num = parseInt(stat, 10);
    num++;
    $('.quantity__text--current').val(num);
  }

  $(document).on('click', '.js-plus', quantityPlus);

  function quantityMinus(e) {
    e.preventDefault();
    var stat = $('.quantity__text--current').val();
    var num = parseInt(stat, 10);
    num--;

    if (num <= 0) {
      alert('구매 최소수량은 1개입니다.');
      num = 1;
    }

    $('.quantity__text--current').val(num);
  }

  $(document).on('click', '.js-minus', quantityMinus); //제품 메뉴 fixed

  if ($('.detail-tab').length > 0) {
    $(window).scroll(function () {
      var height = $(document).scrollTop();
      var topContHeight = $('.product-option').height();
      var mainOuterHeight = $('.site-main').outerHeight(true);
      var mainHeight = $('.site-main').height();
      var marginHeight = mainOuterHeight - mainHeight;
      var totalHeight = topContHeight + marginHeight;

      if (height > totalHeight) {
        $('.detail-tab').addClass('is-fixed');
        $('.header').addClass('is-bg-white');
      } else {
        $('.detail-tab').removeClass('is-fixed');
        $('.header').removeClass('is-bg-white');
      }
    });
  } //제품 탭


  function detailTab() {
    var topContHeight = $('.product-option').height();
    var mainOuterHeight = $('.site-main').outerHeight(true);
    var mainHeight = $('.site-main').height();
    var marginHeight = mainOuterHeight - mainHeight;
    var totalHeight = topContHeight + marginHeight;
    var idx = $(this).parent('li').index();
    $(this).parent('li').addClass('is-current').siblings('li').removeClass('is-current');
    $('.detail-tab__info').eq(idx).addClass('is-current').siblings('.detail-tab__info').removeClass('is-current');
    $('html, body').animate({
      scrollTop: totalHeight
    }, 340);
  }

  $(document).on('click', '.js-tab-link', detailTab); //제품 하단 픽시드 결제 박스

  if ($('.fix-button').length > 0) {
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
  } //RECOMMENDED Slide


  if ($('.recommended-slide').length > 0) {
    var recommendeSlide = new Swiper('.recommended-slide__container', {
      observer: true,
      observeParents: true,
      watchOverflow: true,
      slidesPerView: 1,
      pagination: {
        el: ".recommended-slide__pagination",
        type: "fraction"
      }
    });
  } //리뷰 평가체크


  function checkStar() {
    $(this).parent().children('.js-check-star').removeClass('is-active');
    $(this).addClass('is-active').prevAll('.js-check-star').addClass('is-active');
    return false;
  }

  $(document).on('click', '.js-check-star', checkStar); //리뷰 더보기

  function reviewMore() {
    var parent = $(this).closest('.review-list');

    if (parent.hasClass('is-view')) {
      parent.removeClass('is-view');
      $(this).text('더보기');
    } else {
      parent.addClass('is-view');
      $(this).text('접기');
    }
  }

  $(document).on('click', '.js-more-view', reviewMore); //qna 더보기

  function qnaMore() {
    var parent = $(this).closest('.qna-item');

    if (parent.hasClass('is-view')) {
      parent.removeClass('is-view');
    } else {
      parent.addClass('is-view');
    }
  }

  $(document).on('click', '.js-qna-more', qnaMore); //셀렉트 박스 placeholder

  function selectPlaceholder() {
    $(this).addClass('is-check');
  }

  $(document).on('change', '.js-placeholder', selectPlaceholder);
}); //입고알림

function stoNtsAsk() {
  alert('입고 알림을 \n신청하시겠습니까?');
}