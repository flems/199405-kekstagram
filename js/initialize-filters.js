'use strict';
(function () {
  var effectElements = document.querySelectorAll('.upload-effect-label');
  var effectScale = document.querySelector('.upload-effect-level');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var valueScale = document.querySelector('.upload-resize-controls-value');
  var DEFAULT_SIZE_LOAD_PICTURE = 50;
  var dragButton = document.querySelector('.upload-effect-level-pin');
  var dragScale = document.querySelector('.upload-effect-level-val');
  window.FILTER_START = 0.2;
  window.filters = {
    'upload-effect-label-chrome': {
      name: 'grayscale',
      max: 1,
      min: 0,
      measure: ''
    },
    'upload-effect-label-sepia': {
      name: 'sepia',
      max: 1,
      min: 0,
      measure: ''
    },
    'upload-effect-label-marvin': {
      name: 'invert',
      max: 100,
      min: 0,
      measure: '%'
    },
    'upload-effect-label-phobos': {
      name: 'blur',
      max: 3,
      min: 0,
      measure: 'px'
    },
    'upload-effect-label-heat': {
      name: 'brightness',
      max: 3,
      min: 0,
      measure: ''
    }
  };

  window.resetPicture = function () {
    valueScale.setAttribute('value', DEFAULT_SIZE_LOAD_PICTURE + '%');
    effectImagePreview.style.transform = 'scale(0.' + DEFAULT_SIZE_LOAD_PICTURE + ')';
    effectImagePreview.className = effectImagePreview.classList[0];
    dragButton.style.left = '20%';
    dragScale.style.width = '20%';
  };
  window.resetPicture();
  function changeFilterIntensity(effect, param) {
    effectImagePreview.style.filter = window.filters[effect].name + '(' + window.filters[effect].max * param + window.filters[effect].measure + ')';
  }
  window.chooseEffect = function (effect, param) {
    if (String(effect) === 'undefined') {
      effectImagePreview.style.filter = '';
    } else {
      changeFilterIntensity(effect, param);
    }
  };
// change pucture's effect
  function changeEffect(event, filterElement, callback) {
    window.resetPicture();
    var thisElement = event.currentTarget;
    window.filterEffect = thisElement.classList[1];
    window.chooseEffect(window.filterEffect, window.FILTER_START);
    var newFilter = thisElement.getAttribute('for').replace('upload-', '');
    if (typeof callback === 'function') {
      callback(newFilter);
    }

    // показывает и скрывает шкалу интенсивности
    if (event.currentTarget.getAttribute('for') !== 'upload-effect-none') {
      effectScale.classList.remove('hidden');
    } else {
      effectScale.classList.add('hidden');
    }

  }

  window.initializeFilters = function (filterElement, callback) {
    for (var i = 0; i < effectElements.length; i++) {
      effectElements[i].addEventListener('click', function () {
        changeEffect(event, filterElement, callback);
      });
    }
  };
})();
