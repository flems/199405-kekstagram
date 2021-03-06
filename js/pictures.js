'use strict';

(function () {
  var filters = document.querySelector('.filters');

  function createPictureElement(picture) {
    var pictureElement = document.getElementById('picture-template').content.cloneNode(true);
    pictureElement.querySelector('a').setAttribute('href', '#');
    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
    return pictureElement;
  }
  window.loadPicture = function (elem) {
    var picturesListFragment = document.createDocumentFragment();
    for (var i = 0; i < elem.length; i++) {
      picturesListFragment.appendChild(createPictureElement(elem[i]));
    }
    document.querySelector('.pictures').appendChild(picturesListFragment);
    window.addPicturePopup();
  };
  var onLoad = function (elem) {
    window.loadPicture(elem);
    window.filterPictureMass(elem);
    window.addAndRemoveClassHidden('remove', filters);
  };
  var onError = function (error) {
    var errorBlock = document.createElement('div');
    var form = document.querySelector('.upload-image');
    form.appendChild(errorBlock);
    form.lastChild.classList.add('error-message');
    form.lastChild.textContent = 'Произошла ошибка:' + ' ' + error;
  };
  window.backend.load(onLoad, onError);
})();
