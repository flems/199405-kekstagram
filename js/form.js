'use strict';

(function () {
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
  var SPACE_KEY_CODE = 32;
  var STEP_SCALE = 25;
  var DEFAULT_SIZE_LOAD_PICTURE = 50;
  var MAX_PICTURE_SIZE = 100;
  var MIN_PICTURE_SIZE = 25;
  var MAX_LENGTH_DECRIPTION_PICTURE = 100;
  var MIN_LENGTH_DECRIPTION_PICTURE = 30;
  var ENTER_KEY_CODE = 13;
  var ESC_KEY_CODE = 27;
  var editImageForm = document.querySelector('.upload-overlay');
  var closeEditFormBtn = document.querySelector('.gallery-overlay-close');
  var effectScale = document.querySelector('.upload-effect-level');
  var max = 455;
  var min = 0;


/* вспомогательные функции */

  function resetPicture() {
    valueScale.setAttribute('value', DEFAULT_SIZE_LOAD_PICTURE + '%');
    effectImagePreview.style.transform = 'scale(0.' + DEFAULT_SIZE_LOAD_PICTURE + ')';
    effectImagePreview.className = effectImagePreview.classList[0];
    uploadForm.reset();
  }
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
      resetPicture();
    });
    uploadFormCancel.addEventListener('keydown', function (event) {
      if (event.keyCode === ENTER_KEY_CODE) {
        addAndRemoveClassHidden('add', editImageForm);
        resetPicture();
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
    if (event.currentTarget.getAttribute('for') !== 'upload-effect-none') {
      effectScale.classList.remove('hidden');
    } else {
      effectScale.classList.add('hidden');
    }
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

  function addEventHashtags() {
    hashtags.addEventListener('input', saveValueHashtags);
    hashtags.addEventListener('focus', addFirstHashtag);
    hashtags.addEventListener('keydown', addHashtag);
    hashtags.addEventListener('blur', checkHashtag);
  }

  addAttributesForm();
  addEventEditImageForm();
  changeSizePicture();
  addEventEffects();
  addEventHashtags();
  addEventDescriptionPicture();
  addTabIndex();


/* перемещение кнопки при moouse event */


  var dragButton = document.querySelector('.upload-effect-level-pin');
  dragButton.addEventListener('mousedown', function () {
    event.preventDefault();
    var startCoords = {
      x: event.clientX,
    };
    function onMouseMove(moveEvent) {
      var dragScale = document.querySelector('.upload-effect-level-val');
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


})();
