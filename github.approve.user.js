// ==UserScript==
// @name        GitHub Approve
// @namespace   http://userscripts.org/users/20715
// @description Adds a APPROVE button to the code-review sreen.
// @include     https://github*/*
// @version     1.0
// ==/UserScript==
const addButton = () => {
  const form = document.querySelector('form.js-new-comment-form');

  if (!form || form.querySelector('.btn-approve')) {
    return;
  }

  const textarea = form.querySelector('textarea'),
        button = form.querySelector('button.btn-primary'),
        approveButton = button.cloneNode(true);

  approveButton.textContent = 'Approve';
  approveButton.classList.add('btn-secondary', 'btn-approve');
  approveButton.classList.remove('btn-primary');
  approveButton.addEventListener('click', () => {
    textarea.value = '/approve';
    button.click();
  });

  button.parentNode.appendChild(approveButton);
};

addButton();

document.addEventListener('pjax:success', addButton);
