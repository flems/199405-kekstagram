'use strict';

(function () {
  function createPictureElement(picture) {
    var pictureElement = document.querySelector('#picture-template').content.cloneNode(true);
    pictureElement.querySelector('a').setAttribute('href', '#');
    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments.length;
    return pictureElement;
  }

  var onLoad = function (elem) {
    var picturesListFragment = document.createDocumentFragment();
    for (var i = 0; i < elem.length; i++) {
      picturesListFragment.appendChild(createPictureElement(elem[i]));
    }
    document.querySelector('.pictures').appendChild(picturesListFragment);
    window.addPicturePopup();
  };
  var onError = function (error) {
    console.log(error);
  };

  window.backend.load(onLoad, onError);

})();
