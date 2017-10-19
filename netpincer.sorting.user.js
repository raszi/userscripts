// ==UserScript==
// @name          Netpincer Sorting
// @namespace     http://userscripts.org/users/20715
// @description   Adds option to sort by various informations.
// @include       https://www.netpincer.hu/*hazhozszallitas*
// @version       2.3
// ==/UserScript==

$(function () {
  var doc = document,
      options = {
        'percent':  'Százalék',
        'feedback': 'Vélemény',
        'time':     'Kiszállítási idő',
        'min':      'Minimális rendelés',
        'delivery': 'Szállítási költség',
        'rating':   'Értékelés'
      },
      orders = { '↑': false, '↓': true },
      $container = $('div.shop-list-content'),
      $caterers = $('div.shop-list-row', $container);

  function parseInteger(text) {
    return parseInt(text, 10);
  }

  function parseTime(timeText) {
    var timeValues = timeText.split('-');
    return (parseInteger(timeValues[0]) + parseInteger(timeValues[1])) / 2;
  }

  function parseCurrency(currencyText) {
    var currencyValue = currencyText.replace(/\D/g, '');
    return parseFloat(currencyValue);
  }

  function safeCompare(a, b) {
    if (!isNaN(a) && !isNaN(b)) {
      return a - b;
    } else if (isNaN(b.value)) {
      return -1;
    } else if (isNaN(a.value)) {
      return 1;
    }

    return 0;
  }

  /*
   * this method sorts the caterers in the selected order
   */
  function changeOrder(sortType, sortOrder) {

    /* this is needed because the double causes errors */
    $('script', $caterers).remove();

    var caterers = $caterers.map(function () {
      var node = this,
          name = $('h2[itemprop="name"]', node).text().toLowerCase(),
          value = 0;

      switch(sortType) {
      case 'percent':
        value = parseInteger($('.show-reviews span.percent', node).text());
        break;

      case 'rating':
      case 'feedback':
        var values = $('.show-reviews', node).text().split(','),
            percentage = parseInteger(values[0]) / 100,
            feedbacks = parseInteger(values[1]);

        value = sortType == 'rating' ? percentage * feedbacks : feedbacks;
        break;

      case 'time':
        value = parseTime($('div.shop-delivery-time', node).text());
        break;

      case 'min':
        value = parseCurrency($('div.shop-minimum-order', node).text());
        break;

      case 'delivery':
        value = parseCurrency($('div.shop-delivery-cost', node).text());
        break;
      }

      return { node: node, name: name, value: value };
    });

    /* sort it */
    var sorted = caterers.sort(function (a, b) {
      var sortValue = safeCompare(a.value, b.value);
      if (!sortOrder) sortValue = sortValue * -1;

      return (sortValue !== 0) ? sortValue : a.name.localeCompare(b.name);
    });

    $caterers.detach();

    /* add items in the sorted order */
    $.each(sorted, function (_i, object) {
      $(object.node).appendTo($container);
    });

    return false;
  }

  if ($caterers.length === 0) {
    return;
  }

  /*
   * Add options to the header
   */
  var $header = $('div.general-title'),
      $ul = $(doc.createElement('ul')).css({
        clear:      'both',
        padding:    '0.5em 0'
      }).appendTo($header);

  $.each(options, function (sortType, sortDescription) {
    var $li = $(doc.createElement('li'));

    $li.css({
      display:   'inline',
      fontSize:  '0.7em',
      padding:   '0 0.5em'
    }).appendTo($ul);

    $(doc.createTextNode(' ')).appendTo($ul);

    $.each(orders, function (sortSign, sortOrder) {
      var sortText = sortDescription.concat(' ', sortSign, ' ');

      $(doc.createElement('a')).css('cursor', 'pointer').text(sortText).bind('click', function (e) {
        e.stopPropagation();
        return changeOrder.apply(this, [sortType, sortOrder]);
      }).appendTo($li);
    });
  });
});

// vim: ai ts=2 sw=2 et:
