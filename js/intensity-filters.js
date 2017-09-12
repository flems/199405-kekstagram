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

  // var dragCont = document.querySelector('.upload-effect-level-line');
  // var dragBtn = document.querySelector('.upload-effect-level-pin');
  // var dragLine = document.querySelector('.upload-effect-level-val');
  //
  // dragBtn.onmousedown = function (evt) {
  //   var dragBtnCoord = getCoords(dragBtn);
  //   var shiftX = evt.clinetX - dragBtnCoord.left;
  //   // shiftY здесь не нужен, слайдер двигается только по горизонтали
  //
  //   var contCoords = getCoords(dragCont);
  //   document.onmousemove = function (evt) {
  //     //  вычесть координату родителя, т.к. position: relative
  //     var newLeft = evt.clinetX - shiftX - contCoords.left;
  //     console.log(contCoords);
  //
  //     // курсор ушёл вне слайдера
  //     if (newLeft < 0) {
  //       newLeft = 0;
  //     }
  //     var rightEdge = dragCont.offsetWidth - dragBtn.offsetWidth;
  //     if (newLeft > rightEdge) {
  //       newLeft = rightEdge;
  //     }
  //
  //     dragBtn.style.left = newLeft + 'px';
  //   }
  //
  //   document.onmouseup = function () {
  //     document.onmousemove = document.onmouseup = null;
  //   };
  //
  //   return false; // disable selection start (cursor change)
  // };
  //
  // dragBtn.ondragstart = function () {
  //   return false;
  // };
  //
  // function getCoords(elem) { // кроме IE8-
  //   var box = elem.getBoundingClientRect();
  //   return {
  //     left: box.left
  //   };
  //
  // }
})();
