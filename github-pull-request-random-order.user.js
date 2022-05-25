// ==UserScript==
// @name         GitHub Code Review Random Order
// @namespace    https://github.com/raszi/userscripts
// @version      0.2
// @description  Randomizes the order of the files in a code review
// @author       István Karaszi
// @match        https://github.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=github.com
// @grant        none
// ==/UserScript==

(() => {
  'use strict';

  const $x = (xp, node = document) => {
    const snapshot = document.evaluate(xp, node, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE, null);

    return [...Array(snapshot.snapshotLength)].map((_, i) => snapshot.snapshotItem(i));
  };

  const randomizeFileOrder = () => {
    console.log('Randomize');

    $x('//*[contains(@class, "js-diff-progressive-container")]').forEach((container) => {
      if (container.classList.contains('randomized')) {
        console.log('Already randomized');
        return;
      }

      $x('*[contains(@class, "js-file")]', container).forEach((_node, i) => {
        container.appendChild(container.children[(Math.random() * i) | 0]);
      });

      container.classList.add('randomized');
    })
  };

  randomizeFileOrder();

  console.log('Run');
  document.addEventListener('pjax:end', randomizeFileOrder);
})();
