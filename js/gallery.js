'use strict';

(function () {
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var previewPicture;
  var detailPicture = document.querySelector('.gallery-overlay');
  var closeDetailPictureBtn = document.querySelector('.gallery-overlay-close');
  var pictureContainer = document.querySelector('.pictures');

  function fillDetailPicture(url, likes, comment) {
    detailPicture.querySelector('.gallery-overlay-image').setAttribute('src', url);
    detailPicture.querySelector('.likes-count').textContent = likes;
    detailPicture.querySelector('.comments-count').textContent = comment;
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

  function closeDetailPictureOnEvent(evt) {
    if (evt.type === 'click' || evt.keyCode === ENTER_KEY_CODE || evt.keyCode === ESC_KEY_CODE) {
      window.addAndRemoveClassHidden('add', detailPicture);
      closeDetailPictureBtn.removeEventListener('click', closeDetailPictureOnEvent);
      closeDetailPictureBtn.removeEventListener('keydown', closeDetailPictureOnEvent);
      document.body.removeEventListener('keydown', closeDetailPictureOnEvent);
    }
  }

  function addEventCloseDetailPicture() {
    closeDetailPictureBtn.addEventListener('click', closeDetailPictureOnEvent);
    closeDetailPictureBtn.addEventListener('keydown', closeDetailPictureOnEvent);
    document.body.addEventListener('keydown', closeDetailPictureOnEvent);
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
      window.addAndRemoveClassHidden('remove', detailPicture);
    }
    addEventCloseDetailPicture();
  }

  pictureContainer.addEventListener('click', openDetailPicture);

  window.addPicturePopup = function () {
    previewPicture = document.querySelectorAll('.picture');
    addAllTabIndex();
  };
})();
