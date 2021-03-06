// ==UserScript==
// @name          Grafana Toolbar Hider
// @namespace     https://github.com/raszi/userscripts
// @description   Hides the Grafana toolbar
// @include       https://grafana*
// @grant         GM_addStyle
// @version       1.3
// ==/UserScript==

GM_addStyle('.navbar { display: none; }');
GM_addStyle('.row-control-inner { display: none; }');
GM_addStyle('.add-row-panel-hint { display: none; }');
GM_addStyle('dashboard-submenu { display: none; }');
