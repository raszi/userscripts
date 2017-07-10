// ==UserScript==
// @name         NodePing Style Fixes
// @namespace    http://userscripts.org/users/20715
// @version      0.1
// @description  Various NodePing style fixes.
// @match        https://nodeping.com/
// @grant        GM_addStyle
// ==/UserScript==

(function() {
  'use strict';
  GM_addStyle('.ui-dialog { box-shadow: 0px 0px 20px -2px rgba(0,0,0,0.75); }');
})();