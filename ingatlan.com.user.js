// ==UserScript==
// @name        ingatlan.com image revealer
// @namespace   http://userscripts.org/users/20715
// @description Adds a link to the images
// @include     http://ingatlan.com/*
// @exclude     http://ingatlan.com/
// @exclude     http://ingatlan.com/listasz/*
// @grant       GM_addStyle
// @version     1.1
// ==/UserScript==
GM_addStyle("a.image-link { \
  display: block; \
  position: absolute; \
  bottom: 4px; \
  right: 4px; \
  padding: 3px; \
  color: #fff; \
  background: #222; \
  border-radius: 2px; \
  border: solid 1px #555; \
  z-index: 10; \
  font: 700 12px monaco, Consolas, 'Lucida Console', monospace; \
}");

(function ($) {
  function filterURL(cssURL) {
    return cssURL ? cssURL.replace(/^url\("(.*?)"\)/, '$1') : null;
  }

  function searchByImage(url) {
    var params = { hl: 'en', image_url: url };
    return 'https://images.google.com/searchbyimage?'.concat($.param(params));
  }

  function findImageURL($c) {
    return filterURL($('.image', $c).css('background-image')) || $('.helper img', $c).attr('src')
  }

  function createLink(url, text) {
    return $(document.createElement('a'))
      .attr({
        href: url,
        target: '_blank'
      })
      .text(text)
      .addClass('image-link');
  }

  function addLink() {
    $('.image-holder').each(function () {
      var $holder = $(this),
          imageURL = findImageURL($holder);

      createLink(searchByImage(imageURL), 'Google').appendTo($holder);
    });
  }

  addLink();

  $('.photo-paginate').on('click', function () {
    setTimeout(addLink, 250);
  });
}(jQuery));
