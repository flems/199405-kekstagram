'use strict';

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
var detailPicture = document.querySelector('.gallery-overlay');

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
  // pictureElement.querySelector('a').setAttribute('href', '#');
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

function fillDetailPicture(url, likes, comment) {
  detailPicture.querySelector('.gallery-overlay-image').setAttribute('src', url);
  detailPicture.querySelector('.likes-count').textContent = likes;
  detailPicture.querySelector('.comments-count').textContent = comment.length;
}

fillPicturesList(AMOUNT_PICTURES);

/*     module4-task1     */
var previewPicture = document.querySelectorAll('.picture');
var closeButton = document.querySelector('.gallery-overlay-close');

function addTabIndex() {
  for (var i = 0; i < previewPicture.length; i++) {
    previewPicture[i].setAttribute('tabindex', 0);
  }
  closeButton.setAttribute('tabindex', 0);
  detailPicture.setAttribute('tabindex', 0);
}

function openDetailPicture(event) {
  if(event.type === 'click') {
    event.preventDefault();
  };
  if (event.keyCode === 13 || event.type === 'click') {
    var thisElement = event.target.parentNode;
    var url = thisElement.querySelector('img').getAttribute('src');
    var likes = thisElement.querySelector('.picture-likes').textContent;
    var comments = thisElement.querySelector('.picture-comments').textContent;

    fillDetailPicture(url, likes, comments);
    detailPicture.classList.remove('hidden');
  }
}

function addEventOpenDetailPicture() {
  for (var i = 0; i < previewPicture.length; i++) {
    previewPicture[i].addEventListener('click', openDetailPicture);
    previewPicture[i].addEventListener('keydown', openDetailPicture);
  }
}

function addEventCloseDetailPicture() {
  closeButton.addEventListener('click', function () {
    detailPicture.classList.add('hidden');
  });
  closeButton.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      detailPicture.classList.add('hidden');
    }
  });
  document.body.addEventListener('keydown', function () {
    if (event.keyCode === 27) {
      detailPicture.classList.add('hidden');
    }
  });
}
function addAllEvents() {
  addTabIndex();
  addEventOpenDetailPicture();
  addEventCloseDetailPicture();
}
addAllEvents();
