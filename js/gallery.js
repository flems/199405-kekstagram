'use strict';

(function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var previewPicture;
  var detailPicture = document.querySelector('.gallery-overlay');
  var closeDetailPictureBtn = document.querySelector('.gallery-overlay-close');

  function fillDetailPicture(url, likes, comment) {
    detailPicture.querySelector('.gallery-overlay-image').setAttribute('src', url);
    detailPicture.querySelector('.likes-count').textContent = likes;
    detailPicture.querySelector('.comments-count').textContent = comment;
  }
  function addAndRemoveClassHidden(action, elem) {
    if (action === 'remove') {
      elem.classList.remove('hidden');
    } else if (action === 'add') {
      elem.classList.add('hidden');
    }
  }
  function addTabIndex(elem) {
    elem.setAttribute('tabindex', 0);
  }

  function addAllTabIndex() {
    for (var i = 0; i < previewPicture.length; i++) {
      previewPicture[i].setAttribute('tabindex', 0);
    }
    addTabIndex(closeDetailPictureBtn);
    addTabIndex(detailPicture);
  }

  function openDetailPicture(event) {
    if (event.type === 'click' || event.keyCode === ENTER_KEY_CODE) {
      if (event.type === 'click') {
        event.preventDefault();
      }
      var thisElement = event.currentTarget;
      var url = thisElement.querySelector('img').getAttribute('src');
      var likes = thisElement.querySelector('.picture-likes').textContent;
      var comments = thisElement.querySelector('.picture-comments').textContent;
      fillDetailPicture(url, likes, comments);
      addAndRemoveClassHidden('remove', detailPicture);
    }
  }

  function addEventOpenDetailPicture() {
    for (var i = 0; i < previewPicture.length; i++) {
      previewPicture[i].addEventListener('click', openDetailPicture);
      previewPicture[i].addEventListener('keydown', openDetailPicture);
    }
  }

  function addEventCloseDetailPicture() {
    closeDetailPictureBtn.addEventListener('click', function () {
      addAndRemoveClassHidden('add', detailPicture);
    });
    closeDetailPictureBtn.addEventListener('keydown', function (event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        addAndRemoveClassHidden('add', detailPicture);
      }
    });
    document.body.addEventListener('keydown', function () {
      if (event.keyCode === ESC_KEY_CODE) {
        addAndRemoveClassHidden('add', detailPicture);
      }
    });
  }

  window.addPicturePopup = function () {
    previewPicture = document.querySelectorAll('.picture');
    addAllTabIndex();
    addEventOpenDetailPicture();
    addEventCloseDetailPicture();
  };
})();
