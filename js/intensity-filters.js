'use strict';

(function () {
  var MAX_FILTER = 455;
  var MIN_FILTER = 0;
  var dragButton = document.querySelector('.upload-effect-level-pin');
  var dragScale = document.querySelector('.upload-effect-level-val');

  dragButton.addEventListener('mousedown', function (evt) {
    evt.preventDefault();
    var startCoords = evt.clientX;

    function onMouseMove(moveEvent) {

      var cssLeftBtn = getComputedStyle(dragButton).left.replace('px', '');
      var cssLeftScale = getComputedStyle(dragScale).width.replace('px', '');
      moveEvent.preventDefault();
      var shift = startCoords - moveEvent.clientX;
      startCoords = moveEvent.clientX;
      var newCoord = (cssLeftBtn - shift);

      if (newCoord > MAX_FILTER) {
        dragButton.style.left = MAX_FILTER + 'px';
        dragScale.style.width = MAX_FILTER + 'px';
      } else if (newCoord < MIN_FILTER) {
        dragButton.style.left = MIN_FILTER + 'px';
        dragScale.style.width = MIN_FILTER + 'px';
      } else {
        dragButton.style.left = (cssLeftBtn - shift) + 'px';
        dragScale.style.width = (cssLeftScale - shift) + 'px';
        var intensityEffectPercent = ((cssLeftBtn - shift) / MAX_FILTER).toFixed(1);
        window.chooseEffect(window.filterEffect, intensityEffectPercent);
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

})();
