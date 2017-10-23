// ==UserScript==
// @name        ingatlan.com JS listing remover
// @namespace   http://userscripts.org/users/20715
// @version     1.0
// @description Removes the annoying JS listing shower
// @author      KARASZI István <github@spam.raszi.hu>
// @match       https://ingatlan.com/lista/*
// @grant       none
// ==/UserScript==

(function ($) {
  'use strict';

  $('.js-listing-active-area').off('click');
}(jQuery));
