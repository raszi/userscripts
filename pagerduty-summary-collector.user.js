// ==UserScript==
// @name        PagerDuty Summary Collector
// @namespace   http://userscripts.org/users/20715
// @description Collects the summary to the LocalStorage
// @include     https://*.pagerduty.com/incidents/*
// @version     1.0
// ==/UserScript==
(($) => $(() => {
  const incidentMatches = window.location.href.match(/incidents\/(.+)\/?$/);

  if (!incidentMatches) return;

  const wait = (selector, options = {}) => new Promise((resolve, reject) => {
    let { interval = 100, maxCount = 10 } = options;
    const poller = setInterval(() => {
      let $object = $(selector);

      if (maxCount-- <= 0) {
        clearInterval(poller);
        reject();
        return;
      }

      if ($object.length < 1) return;

      clearInterval(poller);
      resolve($object);
    }, interval);
  });

  wait('.incident-details-container', { interval: 250, maxCount: 100 }).then(($object) => {
    const text = $object.text().trim(),
          match = text.match(/- summary = (.+)$/m),
          summary = (match) ? match[1] : text.split(/\n/)[0];

    window.localStorage.setItem(incidentMatches[1], summary);
  }).catch((error) => console.error(error));
}))(unsafeWindow.jQuery);
