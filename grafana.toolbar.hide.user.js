// ==UserScript==
// @name          Grafana Toolbar Hider
// @namespace     http://userscripts.org/users/20715
// @description   Hides the Grafana toolbar
// @include       https://grafana*
// @grant         GM_addStyle
// @version       1.2
// ==/UserScript==

GM_addStyle('.navbar { display: none; }');
GM_addStyle('.row-control-inner { display: none; }');
GM_addStyle('.add-row-panel-hint { display: none; }');
