'use strict';

(function () {
  window.filterPictureMass = function (elem) {
    var pictures = elem.slice();
    var filterRecommend;
    var filterPopular;
    var filterDiscussed;
    var filterRandom;
    var filters = document.querySelectorAll('.filters-item');
    function deletePictures() {
      var containerPictures = document.querySelector('.pictures');
      var picture = containerPictures.querySelectorAll('.picture');
      for (var i = 0; i < picture.length; i++) {
        containerPictures.removeChild(containerPictures.children[0]);
      }
    }
    function sortPictures(massive) {
      deletePictures();
      window.loadPicture(massive);
    }
    for (var i = 0; i < filters.length; i++) {
      var filter = filters[i].getAttribute('for');
      if (filter === 'filter-recommend') {
        filterRecommend = filters[i];
      } else if (filter === 'filter-popular') {
        filterPopular = filters[i];
      } else if (filter === 'filter-discussed') {
        filterDiscussed = filters[i];
      } else if (filter === 'filter-random') {
        filterRandom = filters[i];
      }
    }

    filterDiscussed.addEventListener('click', function () {
      var copyPictures = pictures.slice();
      copyPictures.sort(function (first, second) {
        return second.comments.length - first.comments.length;
      });
      sortPictures(copyPictures);
    });

    filterRecommend.addEventListener('click', function () {
      sortPictures(pictures);
    });

    filterPopular.addEventListener('click', function () {
      var copyPictures = pictures.slice();
      copyPictures.sort(function (first, second) {
        return Number(second.likes) - Number(first.likes);
      });
      sortPictures(copyPictures);
    });

    filterRandom.addEventListener('click', function () {
      var copyPictures = pictures.slice();
      copyPictures.sort(function (first, second) {
        return Math.random() - 0.5;
      });
      sortPictures(copyPictures);
    });
  };
})();
