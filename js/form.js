'use strict';

(function () {
  var SPACE_KEY_CODE = 32;
  var MAX_LENGTH_DECRIPTION_PICTURE = 100;
  var MIN_LENGTH_DECRIPTION_PICTURE = 30;
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var ERROR_TOO_SMALL_MESSAGE = 'Сообщение должено содержать не менее 30 символов';
  var ERROR_TOO_BIG_MESSAGE = 'Сообщение может содержать не более 100 символов';
  var ERROR_MAX_HASHTAGS = 'Не более 5 хэштегов';
  var FILE_TYPES = ['gif', 'jpg', 'jpeg', 'png'];
  var SEND_URL = 'https://1510.dump.academy/kekstagram';
  var uploadForm = document.querySelector('.upload-form');
  var inputUploadFile = uploadForm.querySelector('#upload-file');
  var uploadFormCancel = uploadForm.querySelector('.upload-form-cancel');
  var descriptionPicture = uploadForm.querySelector('.upload-form-description');
  var scaleElement = document.querySelector('.upload-resize-controls');
  var effectImagePreview = uploadForm.querySelector('.effect-image-preview');
  var hashtags = uploadForm.querySelector('.upload-form-hashtags');
  var editImageForm = document.querySelector('.upload-overlay');
  var closeEditFormBtn = document.querySelector('.gallery-overlay-close');
  var btnSubmit = document.querySelector('.upload-form-submit');
  var filterElement = document.querySelector('[name=upload-filter]');
  var form = document.querySelector('.upload-effect');
  var fileChooser = document.querySelector('.upload-input');
  window.filterEffect = '';

  window.addAndRemoveClassHidden = function (action, elem) {
    if (action === 'remove') {
      elem.classList.remove('hidden');
    } else if (action === 'add') {
      elem.classList.add('hidden');
    }
  };
  function addTabIndex() {
    closeEditFormBtn.setAttribute('tabindex', 0);
  }
  function opemImageForm(evt) {
    window.addAndRemoveClassHidden('remove', editImageForm);
    addEventCloseImageForm();
  }
  inputUploadFile.addEventListener('change', opemImageForm);

  function removeEventListenerCloseImageForm() {
    uploadFormCancel.removeEventListener('click', closeImageForm);
    uploadFormCancel.removeEventListener('keydown', closeImageForm);
    document.body.removeEventListener('keydown', closeImageForm);
  }
  function closeImageForm(evt) {
    if (evt.type === 'click' || evt.keyCode === ENTER_KEY_CODE || evt.keyCode === ESC_KEY_CODE) {
      if (descriptionPicture !== document.activeElement) {
        window.addAndRemoveClassHidden('add', editImageForm);
        window.resetPicture();
        uploadForm.reset();
        removeEventListenerCloseImageForm();
      }
    }
  }

  function addEventCloseImageForm() {
    uploadFormCancel.addEventListener('click', closeImageForm);
    uploadFormCancel.addEventListener('keydown', closeImageForm);
    document.body.addEventListener('keydown', closeImageForm);
  }

  function addAttributesForm() {
    descriptionPicture.setAttribute('maxlength', MAX_LENGTH_DECRIPTION_PICTURE);
    descriptionPicture.setAttribute('minlength', MIN_LENGTH_DECRIPTION_PICTURE);
    uploadForm.setAttribute('action', SEND_URL);
  }
  function removeErrorBlock(parent, classError) {
    if (parent.querySelector('.' + classError)) {
      parent.removeChild(parent.querySelector('.' + classError));
    }
  }
  function addErrorBlock(parent, before, message, classError) {
    var errorBlock = document.createElement('div');
    parent.insertBefore(errorBlock, before);
    before.previousSibling .classList.add('error-message');
    before.previousSibling .classList.add(classError);
    before.previousSibling.textContent = message;
  }
  function checkDescriptionPicture(event) {
    var thisMessage = descriptionPicture.value;
    var commentError = 'comment-error';
    if (thisMessage.length > 0 && thisMessage.length < 30) {
      removeErrorBlock(form, commentError);
      descriptionPicture.classList.add('invalid-input');
      descriptionPicture.setCustomValidity(ERROR_TOO_SMALL_MESSAGE);
      addErrorBlock(form, btnSubmit, ERROR_TOO_SMALL_MESSAGE, commentError);
      return false;
    } else if (thisMessage.length > 100) {
      removeErrorBlock(form, commentError);
      descriptionPicture.classList.add('invalid-input');
      descriptionPicture.setCustomValidity(ERROR_TOO_BIG_MESSAGE);
      addErrorBlock(form, btnSubmit, ERROR_TOO_BIG_MESSAGE, commentError);
      return false;
    } else {
      descriptionPicture.classList.remove('invalid-input');
      descriptionPicture.setCustomValidity('');
      removeErrorBlock(form, commentError);
      return true;
    }
  }

  function addEventDescriptionPicture() {
    descriptionPicture.addEventListener('input', checkDescriptionPicture);
    descriptionPicture.addEventListener('keydown', function (event) {
      if (event.keyCode === ESC_KEY_CODE) {
        event.preventDefault();
      }
    });
  }


  function addFirstHashtag(event) {
    hashtags.setAttribute('type', 'text');
    hashtags.setAttribute('value', '');
    var thisMessage = event.target;
    var thisMessageMass = event.target.value.split(' ');
    if (!thisMessage.value || thisMessage.value[thisMessage.value.length - 1] === ' ') {
      thisMessage.value += '#';
    } else if (thisMessageMass.length >= 5) {
      thisMessage.value += '';
    }
  }

  function saveValueHashtags(event) {
    var thisMessage = hashtags.value;
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
    var thisMessage = hashtags.value;
    if (thisMessage[thisMessage.length - 2] + thisMessage[thisMessage.length - 1] === ' #') {
      hashtags.value = thisMessage.substring(0, thisMessage.length - 2);
    } else if (thisMessage[thisMessage.length - 1] === '#' || thisMessage[thisMessage.length - 1] === ' ') {
      hashtags.value = thisMessage.substring(0, thisMessage.length - 1);
    }
    window.hashtagsMassive = hashtags.value.split(' ');
    for (var i = 0; i < window.hashtagsMassive.length; i++) {
      if (window.hashtagsMassive[i].charAt(0) !== '#') {
        window.hashtagsMassive[i] = '#' + window.hashtagsMassive[i];
      }
    }
    hashtags.value = window.hashtagsMassive.join(' ');
    var hashtagError = 'hashtag-error';
    if (window.hashtagsMassive.length > 5) {
      removeErrorBlock(form, hashtagError);
      hashtags.setCustomValidity(ERROR_MAX_HASHTAGS);
      addErrorBlock(form, descriptionPicture, ERROR_MAX_HASHTAGS, hashtagError);
      return false;
    } else {
      removeErrorBlock(form, hashtagError);
      hashtags.setCustomValidity('');
      return true;
    }
  }

  function addEventHashtags() {
    hashtags.addEventListener('input', saveValueHashtags);
    hashtags.addEventListener('focus', addFirstHashtag);
    hashtags.addEventListener('keydown', addHashtag);
    hashtags.addEventListener('blur', checkHashtag);
  }

  addAttributesForm();
  // addEventEditImageForm();
  addEventHashtags();
  addEventDescriptionPicture();
  addTabIndex();

  window.initializeScale(scaleElement, function (scale) {
    effectImagePreview.style.transform = 'scale(' + scale + ')';
  });

  window.initializeFilters(filterElement, function (newFilter) {
    effectImagePreview.className = effectImagePreview.classList[0] + ' ' + newFilter;
  });

  function onLoad() {
    window.addAndRemoveClassHidden('add', editImageForm);
    window.resetPicture();
    uploadForm.reset();
  }
  function onError(error) {
    var errorBlock = document.createElement('div');
    form.appendChild(errorBlock);
    form.lastChild.classList.add('error-message');
    form.lastChild.textContent = 'Произошла ошибка:' + ' ' + error;
  }

  btnSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    if (checkDescriptionPicture() && checkHashtag()) {
      var formData = new FormData(uploadForm);
      window.backend.save(formData, onLoad, onError);
    }
  });

  fileChooser.addEventListener('change', function () {
    var file = fileChooser.files[0];
    var fileName = file.name.toLowerCase();
    var matches = FILE_TYPES.some(function (it) {
      return fileName.endsWith(it);
    });
    if (matches) {
      var reader = new FileReader();
      reader.addEventListener('load', function () {
        effectImagePreview.src = reader.result;
      });
      reader.readAsDataURL(file);
    }
  });

})();
