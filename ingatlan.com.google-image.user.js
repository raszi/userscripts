// ==UserScript==
// @name        ingatlan.com image revealer
// @namespace   http://userscripts.org/users/20715
// @description Adds a link to the images
// @include     https://ingatlan.com/*
// @exclude     https://ingatlan.com/
// @exclude     https://ingatlan.com/listasz/*
// @require     https://cdnjs.cloudflare.com/ajax/libs/blueimp-load-image/2.6.1/load-image.all.min.js
// @grant       GM_addStyle
// @version     1.3
// ==/UserScript==
GM_addStyle("div.image-links { \
  position: absolute; \
  bottom: 4px; \
  right: 4px; \
  z-index: 10; \
}");

GM_addStyle("div.image-links a { \
  display: inline-block; \
  padding: 3px; \
  margin-left: 3px; \
  color: #fff; \
  background: #222; \
  border-radius: 2px; \
  border: solid 1px #555; \
  font: 700 12px monaco, Consolas, 'Lucida Console', monospace; \
}");

(function ($) {
  function filterURL(cssURL) {
    return cssURL ? cssURL.replace(/^url\("(.*?)"\)/, '$1') : null;
  }

  function genLink(prefix, params) {
    return prefix.concat($.param(params));
  }

  function searchByImage(url) {
    return genLink('https://images.google.com/searchbyimage?', { hl: 'en', image_url: url });
  }

  function searchByLocation(lat, lon) {
    return genLink('https://maps.google.com/maps?', { hl: 'en', ll: [lat, lon].join(',') });
  }

  function findImageURL($c) {
    return filterURL($('.image', $c).css('background-image')) || $('.helper img', $c).attr('src');
  }

  function createLink(url, text) {
    return $(document.createElement('a'))
      .attr({ href: url, target: '_blank' })
      .text(text)
      .addClass('image-link');
  }

  function findOrCreateContainer($holder) {
    var $container = $('div.image-links', $holder);

    if ($container.length !== 0) {
      return $container;
    }

    return $(document.createElement('div'))
      .addClass('image-links')
      .appendTo($holder);
  }

  function addLinks() {
    $('.image-holder').each(function () {
      var $holder = $(this),
          $container = findOrCreateContainer($holder).empty(),
          imageURL = findImageURL($holder);

      loadImage.parseMetaData(imageURL, function (data) {
        if (data.exif) {
          var lat = data.exif.get('GPSLatitude'),
              lon = data.exif.get('GPSLongitude');

          createLink(searchByLocation(lat, lon), 'Map')
            .appendTo($container);
        }
      });

      createLink(searchByImage(imageURL), 'Google')
        .appendTo($container);
    });
  }

  addLinks();

  $('.photo-paginate').on('click', function () {
    setTimeout(addLinks, 250);
  });
}(jQuery));
