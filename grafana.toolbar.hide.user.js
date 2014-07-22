// ==UserScript==
// @name          Grafana Toolbar Hider
// @namespace     http://userscripts.org/users/20715
// @description   Hides the Grafana toolbar
// @include       http://grafana*
// @version       1.0
// ==/UserScript==

GM_addStyle('.navbar { display: none; }');
