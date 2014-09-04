// ==UserScript==
// @name          Google Translate Shortcuts
// @namespace     http://userscripts.org/users/20715
// @description   Google Translate Shortcuts
// @include       https://translate.google.com/*
// @version       1.0
// ==/UserScript==
document.onkeypress = function (e) { 
  function emulateClick(element) {
    ['mousedown', 'mouseup', 'mouseout'].forEach(function (type) {
      var event = document.createEvent('MouseEvents');
      event.initEvent(type, true, false);
      element.dispatchEvent(event);
    });
  }

  var
    keyCode = parseInt(e.keyCode, 10),
    swapButton = document.getElementById('gt-swap');

  if (keyCode == 186) {
    emulateClick(swapButton);
    e.preventDefault();
  }
};
