'use strict';

(function () {
  var uploadForm = document.querySelector('.upload-form');
  var inputUploadFile = uploadForm.querySelector('#upload-file');
  var uploadFormCancel = uploadForm.querySelector('.upload-form-cancel');
  var descriptionPicture = uploadForm.querySelector('.upload-form-description');
  var scaleElement = document.querySelector('.upload-resize-controls');
  var effectImagePreview = uploadForm.querySelector('.effect-image-preview');

  var hashtags = uploadForm.querySelector('.upload-form-hashtags');
  var SPACE_KEY_CODE = 32;
  var MAX_LENGTH_DECRIPTION_PICTURE = 100;
  var MIN_LENGTH_DECRIPTION_PICTURE = 30;
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var editImageForm = document.querySelector('.upload-overlay');
  var closeEditFormBtn = document.querySelector('.gallery-overlay-close');

  var max = 455;
  var min = 0;
  var dragButton = document.querySelector('.upload-effect-level-pin');
  var dragScale = document.querySelector('.upload-effect-level-val');
  var btnSubmit = document.querySelector('.upload-form-submit');

/* вспомогательные функции */


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
/* /вспомогательные функции */


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

  // VALIDATION
  // comment
  function addAttributesForm() {
    addAttributeRequired(descriptionPicture);
    descriptionPicture.setAttribute('maxlength', MAX_LENGTH_DECRIPTION_PICTURE);
    descriptionPicture.setAttribute('minlength', MIN_LENGTH_DECRIPTION_PICTURE);
    uploadForm.setAttribute('action', 'https://1510.dump.academy/kekstagram');
  }
  function checkDescriptionPicture(event) {
    // var thisMessage = event.target.value;
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

  document.body.addEventListener('keydown', function () {
    if (event.keyCode === ESC_KEY_CODE) {
      if (descriptionPicture !== document.activeElement) {
        addAndRemoveClassHidden('add', editImageForm);
        window.resetPicture();
      }
    }
  });

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
    // var thisMessage = event.target.value;
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
    // var thisMessage = event.target.value;
    var thisMessage = hashtags.value;
    if (thisMessage[thisMessage.length - 1] === '#') {
      event.target.value = thisMessage.substring(0, thisMessage.length - 1);
    }
    // thisMessage = event.target.value.split(' ');
    thisMessage = hashtags.value.split(' ');
    if (thisMessage.length > 5) {
      // event.target.setCustomValidity('Не более 5 хэштегов');
      hashtags.setCustomValidity('Не более 5 хэштегов');
      return false;
    } else {
      // event.target.setCustomValidity('');
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

  /* перемещение кнопки при moouse event */

  dragButton.addEventListener('mousedown', function () {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
    };
    function onMouseMove(moveEvent) {
      var cssLeftBtn = getComputedStyle(dragButton).left.replace('px', '');
      var cssLeftScale = getComputedStyle(dragScale).width.replace('px', '');

      moveEvent.preventDefault();
      var shift = {
        x: startCoords.x - moveEvent.clientX,
      };
      startCoords = {
        x: event.clientX,
      };
      var newCoord = (cssLeftBtn - shift.x);

      if (newCoord > max) {
        dragButton.style.left = max + 'px';
        dragScale.style.width = max + 'px';
      } else if (newCoord < min) {
        dragButton.style.left = min + 'px';
        dragScale.style.width = min + 'px';
      } else {
        dragButton.style.left = (cssLeftBtn - shift.x) + 'px';
        dragScale.style.width = (cssLeftScale - shift.x) + 'px';
        document.querySelector('.effect-image-preview').style.setProperty('--main-width', (cssLeftBtn - shift.x));
        // console.log();
      }

    }

    function onMouseUp(upEvent) {
      upEvent.preventDefault();
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseup', onMouseUp);
    }

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseup', onMouseUp);
  });
  /* /перемещение кнопки при moouse event */

  addAttributesForm();
  addEventEditImageForm();
  addEventHashtags();
  addEventDescriptionPicture();
  addTabIndex();

  window.initializeScale(scaleElement, function (scale) {
    effectImagePreview.style.transform = 'scale(' + scale + ')';
  });

  var filterElement = document.querySelector('[name=upload-filter]');
  // var pictureElement = document.querySelector('.filter-image-preview');

  window.initializeFilters(filterElement, function (newFilter) {
    effectImagePreview.className = effectImagePreview.classList[0] + ' ' + newFilter;
  });

  var onLoad = function () {
    window.resetPicture();
    uploadForm.reset();
    addAndRemoveClassHidden('add', editImageForm);
  };
  var onError = function (error) {
    // console.log(error);
  };

  btnSubmit.addEventListener('click', function (event) {
    // if (checkDescriptionPicture()) {
    event.preventDefault();
    if (checkDescriptionPicture() && checkHashtag()) {
      var formdata = new FormData(uploadForm);
      window.backend.save(formdata, onLoad, onError);
    }
  });

})();
