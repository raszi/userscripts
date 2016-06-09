// ==UserScript==
// @name        GitHub LGTM
// @namespace   http://userscripts.org/users/20715
// @description Adds a LGTM button to the code-review sreen.
// @include     https://github*/*
// @version     1.3
// ==/UserScript==
function addButton() {
  var form = document.querySelector('form.js-new-comment-form');

  if (!form || form.querySelector('.btn-lgtm')) {
    return;
  }

  var textarea = form.querySelector('textarea'),
      button = form.querySelector('button.btn-primary'),
      lgtmButton = button.cloneNode(true);

  lgtmButton.textContent = 'LGTM';
  lgtmButton.classList.add('btn-secondary', 'btn-lgtm');
  lgtmButton.classList.remove('btn-primary');
  lgtmButton.addEventListener('click', function () {
    textarea.value = 'LGTM';
    button.click();
  });

  button.parentNode.appendChild(lgtmButton);
}

addButton();

document.addEventListener('pjax:success', addButton);
