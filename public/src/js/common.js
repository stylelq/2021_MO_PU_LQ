jQuery(function(){
    //Gnb Menu
    function GnbMenu() {
        if($('.type-1depth').hasClass('is-active')){
            $('.gnb').removeClass('is-active');
            $('.dim').removeClass('is-active');
            $('.header').removeClass('type-bg');

            if($(window).scrollTop() == 0){
                $('.header').removeClass('is-active');
            }
        }else {
            $('.type-1depth').addClass('is-active');
            $('.dim').addClass('is-active');
            $('.header').addClass('type-bg');
            $('.header').addClass('is-active');

            if($(window).scrollTop() == 0){
                $('.header').addClass('is-active');
            }
        }
        return false;
    }
    $(document).on('click', '.js-menu-btn', GnbMenu);

    //Gnb Action
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

    //Search Open
    $('.js-search-open').off('click').on('click',function(e){
        e.preventDefault();
        $('.search').addClass('is-active');
    })

    //Search Close
    $('.js-search-close').off('click').on('click', function (e) {
        e.preventDefault();
        $('.search').removeClass('is-active');
    })

    //Gnb 2Depth Close
    $('.js-gnb-back').off('click').on('click',function(e){
        e.preventDefault();
        $('.gnb.type-2depth').removeClass('is-active');
        $('.gnb-body__item, .gnb-3depth').removeClass('is-active');
    })
});

//Header Scroll Bg
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
  } else {
    // 평상 시
  }

  beforePosition = afterPosition;
});


//아코디언메뉴
const accordionElemAll = document.querySelectorAll('.js-accordion');
Array.prototype.forEach.call(accordionElemAll, function (accordionElem) {
  accordionElem.addEventListener('click', function (e) {
    e.preventDefault();
    const parent = this.parentNode
    const accordionList = parent.querySelector('ul')
    if (this.classList.contains('is-active')) {
        //닫기
        accordionList.classList.remove('is-hide');
        this.classList.remove('is-active');
    }else{
        //열기
        accordionList.classList.add('is-hide');
        this.classList.add('is-active');
    }
  });
});

//전체선택
function selectAll(selectAll,name)  {
    const checkboxes = document.querySelectorAll(`input[name="${name}"]`);
    checkboxes.forEach((checkbox) => {
        checkbox.checked = selectAll.checked
    })
}

jQuery(function(){
    //Lnb 2Depth Menu Open
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

    //Lnb 2Depth Menu Close
    function depthMenuClose() {
        $('.lnb').removeClass('is-open');
    }
    $(document).on('click', '.js-lnb-close', depthMenuClose);
});
