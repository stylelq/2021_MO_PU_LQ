//팝업닫기
const popupCloseAll = document.querySelectorAll('.js-popup-close');
const popupOpenAll = document.querySelectorAll('.js-popup-open');

Array.prototype.forEach.call(popupCloseAll, function (popupClose) {
    popupClose.addEventListener('click', function (e) {
        e.preventDefault();
        const popupElem = document.querySelectorAll('.popup');
        popupElem[0].classList.remove('is-active');
    }) 
});

Array.prototype.forEach.call(popupOpenAll, function (popupOpen) {
    popupOpen.addEventListener('click', function (e) {
        e.preventDefault();
        const popupElem = document.querySelectorAll('.popup');
        popupElem[0].classList.add('is-active');
    }) 
});

