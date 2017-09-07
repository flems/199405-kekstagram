'use strict';
(function () {
  var uploadForm = document.querySelector('.upload-form');
  var effectElements = document.querySelectorAll('.upload-effect-label');
  var effectScale = document.querySelector('.upload-effect-level');
  var effectImagePreview = document.querySelector('.effect-image-preview');
  var valueScale = document.querySelector('.upload-resize-controls-value');
  var DEFAULT_SIZE_LOAD_PICTURE = 50;
  var dragButton = document.querySelector('.upload-effect-level-pin');
  var dragScale = document.querySelector('.upload-effect-level-val');

  window.resetPicture = function () {
    valueScale.setAttribute('value', DEFAULT_SIZE_LOAD_PICTURE + '%');
    effectImagePreview.style.transform = 'scale(0.' + DEFAULT_SIZE_LOAD_PICTURE + ')';
    effectImagePreview.className = effectImagePreview.classList[0];
    uploadForm.reset();
    dragButton.style.left = '20%';
    dragScale.style.width = '20%';
  };
  window.resetPicture();

// change pucture's effect
  function changeEffect(event, filterElement, callback) {
    window.resetPicture();
    // var previewPictureClass = effectImagePreview.classList[0];
    var thisElement = event.currentTarget;
    var newFilter = thisElement.getAttribute('for').replace('upload-', '');
    // effectImagePreview.className = previewPictureClass + ' ' + thisEffect;
    callback(newFilter);
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
