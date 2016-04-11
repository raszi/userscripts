// ==UserScript==
// @name          TINYpulse transparent
// @namespace     http://userscripts.org/users/20715
// @description   Makes the TINYpulse cheer box transparent
// @include       https://app.tinypulse.com/api/cheers*
// @grant         GM_addStyle
// @version       1.10
// ==/UserScript==

GM_addStyle('body { background: none transparent; }');
GM_addStyle('#mini-header { display: none; }');
GM_addStyle('#cheers-wall-upgrade .cheer-top-content { background-color: rgba(255, 255, 255, 0.6) !important; }');
GM_addStyle('.cheer-top-content:after { display: none; }');
GM_addStyle('#cheers-wall-upgrade .cheer-bottom-content .info-sent-by { color: #fff; }');
