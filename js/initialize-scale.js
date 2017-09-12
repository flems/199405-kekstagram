'use strict';

(function () {
  var STEP_SCALE = 25;
  var MAX_PICTURE_SIZE = 100;
  var MIN_PICTURE_SIZE = 25;

  function zoomPicture(elem, valueScale, callback) {
    var scale = 1;
    var valueScaleAttribute = valueScale.getAttribute('value');
    var valueScaleNumb = Number(valueScaleAttribute.substring(0, valueScaleAttribute.length - 1));

    if (elem === 'buttonZoomIn') {
      if (valueScaleNumb !== MAX_PICTURE_SIZE) {
        valueScaleNumb += STEP_SCALE;
        valueScaleAttribute = valueScaleNumb + '%';
        valueScale.setAttribute('value', valueScaleAttribute);
      }
    } else if (elem === 'buttonZoomOut') {
      if (Number(valueScaleNumb) !== MIN_PICTURE_SIZE) {
        valueScaleNumb -= STEP_SCALE;
        valueScaleAttribute = valueScaleNumb + '%';
        valueScale.setAttribute('value', valueScaleAttribute);
      }
    }
    if (valueScaleNumb !== MAX_PICTURE_SIZE) {
      scale = '0.' + valueScaleNumb;
    }
    if (typeof callback === 'function') {
      callback(scale);
    }
  }

  window.initializeScale = function (contrls, callback) {
    var buttonZoomOut = contrls.querySelector('.upload-resize-controls-button-dec');
    var buttonZoomIn = contrls.querySelector('.upload-resize-controls-button-inc');
    var valueScale = contrls.querySelector('.upload-resize-controls-value');
    buttonZoomOut.addEventListener('click', function () {
      zoomPicture('buttonZoomOut', valueScale, callback);
    });
    buttonZoomIn.addEventListener('click', function () {
      zoomPicture('buttonZoomIn', valueScale, callback);
    });
  };
})();
