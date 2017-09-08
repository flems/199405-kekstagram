'use strict';

(function () {

  var xhr = new XMLHttpRequest();
  function checkType(func, param) {
    if (typeof func === 'function') {
      func(param);
    }
  }
  window.backend = {
    load: function (onLoad, onError) {
      var pictures;
      xhr.addEventListener('load', function (event) {
        if (xhr.status === 200) {
          try {
            pictures = JSON.parse(xhr.responseText);
            // console.log('yes');
            if (typeof pictures !== 'undefined') {
              checkType(onLoad, pictures);
            }
          } catch (err) {
            // onError(err.message);
            checkType(onError, err.message);
          }
        } else {
          checkType(onError, xhr.statusText);
        }
      });
      xhr.open('GET', 'https://1510.dump.academy/kekstagram/data');
      xhr.send();
    },
    save: function (data, onLoad, onError) {
      xhr.addEventListener('load', function (event) {
        if (xhr.status === 200) {
          if (typeof onLoad === 'function') {
            onLoad();
          }
        } else {
          checkType(onError, xhr.statusText);
        }
      });
      xhr.open('POST', 'https://1510.dump.academy/kekstagram');
      xhr.send(data);
    },
  };


})();
