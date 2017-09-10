'use strict';

(function () {
  // filters
  window.filterPictureMass = function (elem) {
    var picturesMassive = elem.slice();
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

    // самые обсуждаемые (по кол-ву комментариев)
    filterDiscussed.addEventListener('click', function () {
      var newPictureMassive = picturesMassive.slice();
      newPictureMassive.sort(function (first, second) {
        return Number(second.comments.length) - Number(first.comments.length);
      });
      sortPictures(newPictureMassive);
    });

    // рекомендуемые
    filterRecommend.addEventListener('click', function () {
      sortPictures(picturesMassive);
    });

    // самые популярные (по кол-ву лайков)
    filterPopular.addEventListener('click', function () {
      var newPictureMassive = picturesMassive.slice();
      newPictureMassive.sort(function (first, second) {
        return Number(second.likes) - Number(first.likes);
      });
      sortPictures(newPictureMassive);
    });

    // рандомный порядок
    filterRandom.addEventListener('click', function () {
      var newPictureMassive = picturesMassive.slice();
      newPictureMassive.sort(function (first, second) {
        return Math.random() - 0.5;
      });
      sortPictures(newPictureMassive);
    });
  };
})();
