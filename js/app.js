"use strict";

// Yandex карта
ymaps.ready(init);

function init() {
  var myMap = new ymaps.Map("map", {
    center: [55.760369, 37.614763],
    zoom: 13,
    controls: []
  });
  var mediaQuery = window.matchMedia('(max-width: 1024px)');

  if (mediaQuery.matches) {
    myMap.setCenter([55.767849, 37.634293]);
  }

  var myPlacemark = new ymaps.Placemark([55.767849, 37.634293], {}, {
    iconLayout: 'default#image',
    iconImageHref: '../img/map-mark.svg',
    iconImageSize: [12, 12],
    iconImageOffset: [-3, -42]
  });
  myMap.geoObjects.add(myPlacemark);
  var popup = document.querySelector('.js-popup');
  myPlacemark.events.add('click', function () {
    popup.classList.toggle('js-popup-hidden');
  });
  var popupBtn = popup.querySelector('.js-popup-btn');
  popupBtn.addEventListener('click', function () {
    popup.classList.add('js-popup-hidden');
  });
} // валидация форм


var feedbackForm = document.querySelector('.contacts__form');
var subscribeForm = document.querySelector('.about__form');
validate(subscribeForm);
validate(feedbackForm);

function inputValidation(input) {
  var nameRegExp = /[^А-яёЁ\s-]/;
  var mailRegExp = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
  var result;
  var inputName = input.getAttribute('name');

  if (inputName === 'name') {
    result = !nameRegExp.test(input.value);
  } else if (inputName === 'email') {
    result = mailRegExp.test(input.value);
  }

  return result;
}

function createFeedback(input, feedbackText, color) {
  // получаем значения padding-left и font-family поля ввода
  var inputPaddingLeft = window.getComputedStyle(input, null).paddingLeft;
  var inputFont = window.getComputedStyle(input, null).fontFamily; // создаем feedback

  var feedback = document.createElement('span');
  feedback.classList.add('input-feedback');
  feedback.style.position = 'absolute';
  feedback.style.top = "3px";
  feedback.style.fontSize = '9px';
  feedback.style.left = inputPaddingLeft;
  feedback.style.fontFamily = inputFont;
  feedback.style.color = color;
  feedback.innerHTML = feedbackText;
  input.style.outline = "1px solid ".concat(color); // проверяем наличие wrapper у поля ввода

  var inputWrapper;

  if (!input.parentNode.classList.contains('input-wrapper')) {
    inputWrapper = document.createElement('div');
    inputWrapper.classList.add('input-wrapper');
    inputWrapper.style.position = 'relative';
    input.parentNode.insertBefore(inputWrapper, input);
    inputWrapper.appendChild(input);
  } // если повторная валидация
  else {
    inputWrapper = input.parentElement;
  }

  inputWrapper.appendChild(feedback);
}

function validate(form) {
  form.addEventListener('submit', function (e) {
    e.preventDefault();
  });
  var formBtn = form.querySelector('button');
  formBtn.addEventListener('click', function () {
    var inputs = form.querySelectorAll('input');
    var isValid = true;
    inputs.forEach(function (input) {
      removeValidationStylesAndFeedback(input);

      if (!inputValidation(input) || input.value.trim() === '') {
        createFeedback(input, 'Недопустимый формат', '#FF3030');
        isValid = false;
      }
    });

    if (!isValid) {
      return;
    }

    form.submit();
  });
}

function removeValidationStylesAndFeedback(input) {
  input.style.outline = "none";

  if (input.nextElementSibling && input.nextElementSibling.classList.contains('input-feedback')) {
    input.nextElementSibling.remove();
  }

  return input;
} // Открытие/закрытие burger menu


var burgerBtn = document.querySelector('.header__burger-btn');
var burgerMenu = document.querySelector(burgerBtn.dataset.target);
burgerBtn.addEventListener('click', function () {
  burgerMenu.classList.toggle('header__nav-list-show');
});
document.addEventListener('click', function (event) {
  if (event.target.closest('.header__nav-list') || event.target.closest('.header__burger-btn')) return;
  burgerMenu.classList.remove('header__nav-list-show');
});