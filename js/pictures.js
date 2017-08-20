'use stict';
const COMMENTS = [
  'Всё отлично!',
  'В целом всё неплохо. Но не всё.',
  'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.',
  'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!',
];
const URL = [];
const  GET_RANDOM_INT = function(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
const PICTURES = [];
function fillUrl(){
  for(var i = 0; i < 25; i++){
    URL[i] = i + 1;
  };
};
fillUrl();
function fillPictures(){
  for(var i = 1; i < 26; i++){
    PICTURES[i - 1] = {
      url: 'photos/' + i + '.jpg',
      likes: GET_RANDOM_INT(15, 200),
      comments: COMMENTS[GET_RANDOM_INT(0, COMMENTS.length - 1)],
    };
  };
};
fillPictures();
var pictureTemplate = document.querySelector('#picture-template').content;
function createPictureElement(picture){
  var pictureElement = pictureTemplate.cloneNode(true);
  // pictureElement.querySelector('.picture').setAttribute('href', picture.url);
  pictureElement.querySelector('img').setAttribute('src', picture.url);
  pictureElement.querySelector('.picture-likes').textContent = picture.likes;
  pictureElement.querySelector('.picture-comments').textContent = picture.comments;
  return pictureElement;
};
var picturesListFragment = document.createDocumentFragment();
function fillPicturesList(){
  for(var i = 0; i < 25; i++){
    picturesListFragment.appendChild(createPictureElement(PICTURES[i]))
  };
  document.querySelector('.pictures').appendChild(picturesListFragment);
}
fillPicturesList();
var detailPicture = document.querySelector('.gallery-overlay');
detailPicture.classList.remove('hidden');
function fillDetailPicture(){
  detailPicture.querySelector('.gallery-overlay-image').setAttribute('src', PICTURES[0].url);
  detailPicture.querySelector('.likes-count').textContent = PICTURES[0].likes;
  detailPicture.querySelector('.comments-count').textContent = COMMENTS.length;
}
fillDetailPicture();
