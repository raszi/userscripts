// ==UserScript==
// @name        GitHub Approve
// @namespace   http://userscripts.org/users/20715
// @description Adds an Approve button to the code-review sreen.
// @include     https://github*/*
// @version     1.2
// ==/UserScript==
const addButton = () => {
  const form = document.querySelector('form.js-new-comment-form');

  if (!form || form.querySelector('.btn-approve')) {
    return;
  }

  const button = form.querySelector('button.btn-primary'),
        approveButton = button.cloneNode(true);

  approveButton.textContent = 'Approve';
  approveButton.classList.add('btn-secondary', 'btn-approve');
  approveButton.classList.remove('btn-primary', 'disabled');
  approveButton.addEventListener('click', () => {
    form.querySelector('textarea').value = '/approve';
    button.click();
  });

  button.parentNode.appendChild(approveButton);
};

addButton();

document.addEventListener('pjax:success', addButton);
