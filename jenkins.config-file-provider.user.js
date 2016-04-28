// ==UserScript==
// @name        Jenkins Config File Provider Style
// @namespace   http://userscripts.org/users/20715
// @description Customize the appearance of the config editor
// @include     http://jenkins*/*
// @grant       GM_addStyle
// @version     1.0
// ==/UserScript==
GM_addStyle("body[data-model-type='org.jenkinsci.plugins.configfiles.ConfigFilesManagement'] textarea[id='config.content'] { \
	font-family: monaco, Consolas, 'Lucida Console', monospace; \
  font-size: 12px; \
}");
