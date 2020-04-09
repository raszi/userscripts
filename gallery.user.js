// ==UserScript==
// @name         Gallery Zoom Viewer
// @namespace    http://raszi.hu/gallery-zoom-viewer/
// @description  First, previous, next, last links will open photos in the same size on Gallery (http://gallery.menalto.com/) pages
// @include      *displayimage*
// @include      *gal*
// @include      *album*
// @include      *main.php*
// @include      */v/*
// ==/UserScript==

(function () {
  var win = window,
    doc = document,
    locstr = String(win.location),
    ignoredFields = ['input', 'textarea', 'select'],
    found;

  if ((found = locstr.match(/(full=1|g2_imageViewsIndex=\d+)/))) {
    var urls = doc.getElementsByTagName('a');
    for (var i = 0; i < urls.length; i++) {
      var url = urls[i];
      var parent = url.parentNode;

      var clazz = String(parent.className);

      //
      // we can only match on classes
      //
      if (clazz.match(/(nav|first-and-previous|next-and-last)/)) {
        var link = String(url.href);

        if (link.match(/\?/)) {
          link += '&' + found[1];
        } else {
          link += '?' + found[1];
        }

        url.href = link;
      }
    }
  }

  var nextLinks = doc.getElementsByClassName('next');
  var nextLink = nextLinks.length > 0 ? nextLinks[0].href : null;

  var prevLinks = doc.getElementsByClassName('previous');
  var prevLink = prevLinks.length > 0 ? prevLinks[0].href : null;

  doc.body.addEventListener('keydown', function (e) {
    if (e.target && ignoredFields.indexOf(e.target.nodeName.toLowerCase()) != -1) {
      return true;
    }

    // right and j
    if (e.keyCode === 39 || e.keyCode === 74) {
      e.stopPropagation();
      if (nextLink) {
        win.location = nextLink;
      }
      return false;
    }

    // left and k
    if (e.keyCode == 37 || e.keyCode === 75) {
      e.stopPropagation();
      if (prevLink) {
        win.location = prevLink;
      }
      return false;
    }

    return true;
  });
})();
