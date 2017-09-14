'use strict';

(function () {
  var SPACE_KEY_CODE = 32;
  var MAX_LENGTH_DECRIPTION_PICTURE = 100;
  var MIN_LENGTH_DECRIPTION_PICTURE = 30;
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
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
  var filters = document.querySelector('.filters');
  var filterElement = document.querySelector('[name=upload-filter]');
  window.filterEffect = '';

  function addAttributeRequired(elem) {
    elem.setAttribute('required', 'required');
  }

  function addAndRemoveClassHidden(action, elem) {
    if (action === 'remove') {
      elem.classList.remove('hidden');
    } else if (action === 'add') {
      elem.classList.add('hidden');
    }
  }
  function addTabIndex() {
    closeEditFormBtn.setAttribute('tabindex', 0);
  }

  function addEventEditImageForm() {
    inputUploadFile.addEventListener('change', function () {
      addAndRemoveClassHidden('remove', editImageForm);
    });
    uploadFormCancel.addEventListener('click', function () {
      addAndRemoveClassHidden('add', editImageForm);
      window.resetPicture();
    });
    uploadFormCancel.addEventListener('keydown', function (event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        addAndRemoveClassHidden('add', editImageForm);
        window.resetPicture();
      }
    });
  }

  function addAttributesForm() {
    addAttributeRequired(descriptionPicture);
    descriptionPicture.setAttribute('maxlength', MAX_LENGTH_DECRIPTION_PICTURE);
    descriptionPicture.setAttribute('minlength', MIN_LENGTH_DECRIPTION_PICTURE);
    uploadForm.setAttribute('action', 'https://1510.dump.academy/kekstagram');
  }
  function checkDescriptionPicture(event) {
    var thisMessage = descriptionPicture.value;
    if (thisMessage.length < 30) {
      descriptionPicture.classList.add('invalid-input');
      descriptionPicture.setCustomValidity('Это Обязательное поле (минимум 30 символов)');
      return false;
    } else if (thisMessage.length > 100) {
      descriptionPicture.classList.add('invalid-input');
      descriptionPicture.setCustomValidity('Сообщение может содержать не более 100 символов');
      return false;
    } else {
      descriptionPicture.classList.remove('invalid-input');
      descriptionPicture.setCustomValidity('');
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

  document.body.addEventListener('keydown', function (event) {
    if (event.keyCode === ESC_KEY_CODE) {
      if (descriptionPicture !== document.activeElement) {
        addAndRemoveClassHidden('add', editImageForm);
        window.resetPicture();
        uploadForm.reset();
      }
    }
  });

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
    if (window.hashtagsMassive.length > 5) {
      hashtags.setCustomValidity('Не более 5 хэштегов');
      return false;
    } else {
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
  addEventEditImageForm();
  addEventHashtags();
  addEventDescriptionPicture();
  addTabIndex();

  window.initializeScale(scaleElement, function (scale) {
    effectImagePreview.style.transform = 'scale(' + scale + ')';
  });

  window.initializeFilters(filterElement, function (newFilter) {
    effectImagePreview.className = effectImagePreview.classList[0] + ' ' + newFilter;
  });

  var onLoad = function () {
    window.resetPicture();
    addAndRemoveClassHidden('add', editImageForm);
    addAndRemoveClassHidden('remove', filters);
  };
  var onError = function (error) {
    var errorBlock = document.createElement('div');
    var form = document.querySelector('.upload-effect');
    form.appendChild(errorBlock);
    form.lastChild.classList.add('error-message');
    form.lastChild.textContent = 'Произошла ошибка:' + ' ' + error;
  };

  btnSubmit.addEventListener('click', function (event) {
    event.preventDefault();
    if (checkDescriptionPicture() && checkHashtag()) {
      var formData = new FormData(uploadForm);
      window.backend.save(formData, onLoad, onError);
    }
  });

})();
