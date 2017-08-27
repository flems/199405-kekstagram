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
var ENTER_KEY_CODE = 13;
var ESC_KEY_CODE = 27;
var SPACE_KEY_CODE = 32;
var STEP_SCALE = 25;
var DEFAULT_SIZE_LOAD_PICTURE = 50;
var MAX_PICTURE_SIZE = 100;
var MIN_PICTURE_SIZE = 25;
var MAX_LENGTH_DECRIPTION_PICTURE = 100;
var MIN_LENGTH_DECRIPTION_PICTURE = 30;
var detailPicture = document.querySelector('.gallery-overlay');
var editImageForm = document.querySelector('.upload-overlay');
var closeDetailPictureBtn = document.querySelector('.gallery-overlay-close');
var closeEditFormBtn = document.querySelector('.gallery-overlay-close');

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function addAndRemoveClassHidden(action, elem) {
  if (action === 'remove') {
    elem.classList.remove('hidden');
  } else if (action === 'add') {
    elem.classList.add('hidden');
  }
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

function fillDetailPicture(url, likes, comment) {
  detailPicture.querySelector('.gallery-overlay-image').setAttribute('src', url);
  detailPicture.querySelector('.likes-count').textContent = likes;
  detailPicture.querySelector('.comments-count').textContent = comment.length;
}

fillPicturesList(AMOUNT_PICTURES);

/*     module4-task1     */
var previewPicture = document.querySelectorAll('.picture');

function addTabIndex(elem) {
  elem.setAttribute('tabindex', 0);
}
function addAllTabIndex() {
  for (var i = 0; i < previewPicture.length; i++) {
    previewPicture[i].setAttribute('tabindex', 0);
  }
  addTabIndex(closeDetailPictureBtn);
  addTabIndex(detailPicture);
  addTabIndex(closeEditFormBtn);
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
/*     module4-task2     */

var uploadForm = document.querySelector('.upload-form');
var inputUploadFile = uploadForm.querySelector('#upload-file');
var uploadFormCancel = uploadForm.querySelector('.upload-form-cancel');
var descriptionPicture = uploadForm.querySelector('.upload-form-description');
var buttonZoomOut = uploadForm.querySelector('.upload-resize-controls-button-dec');
var buttonZoomIn = uploadForm.querySelector('.upload-resize-controls-button-inc');
var valueScale = uploadForm.querySelector('.upload-resize-controls-value');
var effectImagePreview = uploadForm.querySelector('.effect-image-preview');
var effectElements = uploadForm.querySelectorAll('.upload-effect-label');
var hashtags = uploadForm.querySelector('.upload-form-hashtags');

function addEventOnChange() {
  inputUploadFile.addEventListener('change', function () {
    addAndRemoveClassHidden('remove', editImageForm);
  });
}

function resetPicture() {
  valueScale.setAttribute('value', DEFAULT_SIZE_LOAD_PICTURE + '%');
  effectImagePreview.style.transform = 'scale(0.' + DEFAULT_SIZE_LOAD_PICTURE + ')';
  effectImagePreview.className = effectImagePreview.classList[0];
}

function addEventCloseEditImageForm() {
  uploadFormCancel.addEventListener('click', function () {
    addAndRemoveClassHidden('add', editImageForm);
    resetPicture();
  });
  uploadFormCancel.addEventListener('keydown', function (event) {
    if (event.keyCode === ENTER_KEY_CODE) {
      addAndRemoveClassHidden('add', editImageForm);
      resetPicture();
    }
  });
}

function addActionForm() {
  uploadForm.setAttribute('action', 'https://1510.dump.academy/kekstagram');
}
function addAttributeRequired(elem) {
  elem.setAttribute('required', 'required');
}
// VALIDATION
// comment
function addAttributeFieldDesption() {
  addAttributeRequired(descriptionPicture);
  descriptionPicture.setAttribute('maxlength', MAX_LENGTH_DECRIPTION_PICTURE);
  descriptionPicture.setAttribute('minlength', MIN_LENGTH_DECRIPTION_PICTURE);
}
function checkDescriptionPicture(event) {
  var thisMessage = event.target.value;
  if (thisMessage.length < 30) {
    descriptionPicture.classList.add('invalid-input');
    descriptionPicture.setCustomValidity('Это Обязательное поле (минимум 30 символов)');
  } else if (thisMessage.length > 100) {
    descriptionPicture.classList.add('invalid-input');
    descriptionPicture.setCustomValidity('Сообщение может содержать не более 100 символов');
  } else {
    descriptionPicture.classList.remove('invalid-input');
    descriptionPicture.setCustomValidity('');
  }
}
function cancelEsc(event) {
  if (event.keyCode === ESC_KEY_CODE) {
    event.preventDefault();
  }
}
function addEventDescriptionPicture() {
  descriptionPicture.addEventListener('input', checkDescriptionPicture);
  descriptionPicture.addEventListener('keydown', cancelEsc);
}

document.body.addEventListener('keydown', function () {
  if (event.keyCode === ESC_KEY_CODE) {
    if (descriptionPicture !== document.activeElement) {
      addAndRemoveClassHidden('add', editImageForm);
      resetPicture();
    }
  }
});

// scale picture
function zoomPicture(elem) {
  var valueScaleAttribute = uploadForm.querySelector('.upload-resize-controls-value').getAttribute('value');
  var valueScaleNumb = Number(valueScaleAttribute.substring(0, valueScaleAttribute.length - 1));

  if (elem === buttonZoomIn) {
    if (valueScaleNumb !== MAX_PICTURE_SIZE) {
      valueScaleNumb += STEP_SCALE;
      valueScaleAttribute = valueScaleNumb + '%';
      valueScale.setAttribute('value', valueScaleAttribute);
    }
  } else if (elem === buttonZoomOut) {
    if (Number(valueScaleNumb) !== MIN_PICTURE_SIZE) {
      valueScaleNumb -= STEP_SCALE;
      valueScaleAttribute = valueScaleNumb + '%';
      valueScale.setAttribute('value', valueScaleAttribute);
    }
  }
  if (valueScaleNumb === MAX_PICTURE_SIZE) {
    effectImagePreview.style.transform = 'scale(1)';
  } else {
    effectImagePreview.style.transform = 'scale(0.' + valueScaleNumb + ')';
  }
}
function changeSizePicture() {
  resetPicture();
  buttonZoomOut.addEventListener('click', function () {
    zoomPicture(buttonZoomOut);
  });
  buttonZoomIn.addEventListener('click', function () {
    zoomPicture(buttonZoomIn);
  });
}

// change pucture's effect
function changeEffect(event) {
  var previewPictureClass = effectImagePreview.classList[0];
  var thisElement = event.currentTarget;
  var thisEffect = thisElement.getAttribute('for').replace('upload-', '');
  effectImagePreview.className = previewPictureClass + ' ' + thisEffect;
}
function addEventEffects() {
  for (var i = 0; i < effectElements.length; i++) {
    effectElements[i].addEventListener('click', changeEffect);
  }
}

// input hashtag
function addFirstHashtag(event) {
  hashtags.setAttribute('type', 'text');
  hashtags.setAttribute('value', '');
  var thisMessage = event.target;
  var thisMessageMass = event.target.value.split(' ');
  if (!thisMessage.value) {
    thisMessage.value += '#';
  } else if (thisMessage.value[thisMessage.value.length - 1] === ' ') {
    thisMessage.value += '#';
  } else if (thisMessageMass.length >= 5) {
    thisMessage.value += '';
  } else {
    thisMessage.value += ' #';
  }
}

function saveValueHashtags(event) {
  var thisMessage = event.target.value;
  var thisMessageMassive = thisMessage.split(' ');
  var thisMessageHashtags = '';
  for (var i = 0; i < thisMessageMassive.length; i++) {
    thisMessageMassive[i] = '#' + thisMessageMassive[i];
    thisMessageHashtags = thisMessageHashtags + thisMessageMassive[i] + ' ';
  }
}

function addHashtag(event) {
  var thisMessage = event.target.value;
  if (thisMessage[thisMessage.length - 1] === '#') {
    if (event.keyCode === SPACE_KEY_CODE) {
      event.preventDefault();
    }
  } else if (event.keyCode === SPACE_KEY_CODE) {
    event.preventDefault();
    event.target.value += ' #';
  }
}

function checkHashtag(event) {
  var thisMessage = event.target.value;
  if (thisMessage[thisMessage.length - 1] === '#') {
    event.target.value = thisMessage.substring(0, thisMessage.length - 1);
  }
  thisMessage = event.target.value.split(' ');
  if (thisMessage.length > 5) {
    event.target.setCustomValidity('Не более 5 хэштегов');
  } else {
    event.target.setCustomValidity('');
  }
}

function addEvemetHashtags() {
  hashtags.addEventListener('input', saveValueHashtags);
  hashtags.addEventListener('focus', addFirstHashtag);
  hashtags.addEventListener('keydown', addHashtag);
  hashtags.addEventListener('blur', checkHashtag);
}

function addAllAttributes() {
  addAllTabIndex();
  addActionForm();
  addAttributeFieldDesption();
}
function addAllEvents() {
  addEventOpenDetailPicture();
  addEventCloseDetailPicture();
  addEventOnChange();
  addEventCloseEditImageForm();
  changeSizePicture();
  addEventEffects();
  addEvemetHashtags();
  addEventDescriptionPicture();
}
addAllEvents();
addAllAttributes();
