'use strict';

(function () {
  var COMMENTS = [
    'Всё отлично!',
    'В целом всё неплохо. Но не всё.',
    'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
    'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
    'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
    'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
  ];
  var AMOUNT_PICTURES = 25;
  var AMOUNT_LIKES = {
    min: 15,
    max: 200,
  };

  function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function createPictures(picture, like, comment) {
    var pictures = [];
    for (var i = 1; i < picture + 1; i++) {
      pictures[i - 1] = {
        url: 'photos/' + i + '.jpg',
        likes: getRandomInt(like.min, like.max),
        comments: comment[getRandomInt(0, comment.length - 1)],
      };
    }
    return pictures;
  }
  var pictures = createPictures(AMOUNT_PICTURES, AMOUNT_LIKES, COMMENTS);

  function createPictureElement(picture) {
    var pictureElement = document.querySelector('#picture-template').content.cloneNode(true);
    pictureElement.querySelector('a').setAttribute('href', '#');
    pictureElement.querySelector('img').setAttribute('src', picture.url);
    pictureElement.querySelector('.picture-likes').textContent = picture.likes;
    pictureElement.querySelector('.picture-comments').textContent = picture.comments;
    return pictureElement;
  }

  function fillPicturesList(picture) {
    var picturesListFragment = document.createDocumentFragment();
    for (var i = 0; i < picture; i++) {
      picturesListFragment.appendChild(createPictureElement(pictures[i]));
    }
    document.querySelector('.pictures').appendChild(picturesListFragment);
  }

  fillPicturesList(AMOUNT_PICTURES);

})();
