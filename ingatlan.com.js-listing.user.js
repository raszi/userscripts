// ==UserScript==
// @name          ingatlan.com JS listing remover
// @namespace     https://github.com/raszi/userscripts
// @version       1.1
// @description   Removes the annoying JS listing shower
// @author        KARASZI István <github@spam.raszi.hu>
// @match         https://ingatlan.com/lista/*
// @match         https://ingatlan.com/szukites/*
// @grant         none
// ==/UserScript==

/*eslint-env jquery*/
(function ($) {
  'use strict';

  const removeListingHandler = () => $('.js-listing-active-area').off('click');
  removeListingHandler();

  window.onpopstate = removeListingHandler;
})(jQuery);
