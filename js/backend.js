'use strict';

(function () {
  var STATUS_OK = 200;
  function checkAndRun(func, param) {
    if (typeof func === 'function') {
      func(param);
    }
  }
  window.backend = {
    load: function (onLoad, onError) {
      var xhr = new XMLHttpRequest();
      var pictures;
      xhr.addEventListener('load', function (event) {
        if (xhr.status === STATUS_OK) {
          try {
            pictures = JSON.parse(xhr.responseText);
            if (typeof pictures !== 'undefined') {
              checkAndRun(onLoad, pictures);
            }
          } catch (err) {
            checkAndRun(onError, err.message);
          }
        } else {
          checkAndRun(onError, xhr.status);
        }
      });
      xhr.open('GET', 'https://1510.dump.academy/kekstagram/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      var xhr = new XMLHttpRequest();
      xhr.addEventListener('load', function (event) {
        if (xhr.status === STATUS_OK) {
          if (typeof onLoad === 'function') {
            onLoad();
          }
        } else {
          checkAndRun(onError, xhr.statusText);
        }
      });
      xhr.open('POST', 'https://1510.dump.academy/kekstagram');
      xhr.send(data);
    },
  };
})();
