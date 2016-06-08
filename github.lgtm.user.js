// ==UserScript==
// @name        GitHub LGTM
// @namespace   http://userscripts.org/users/20715
// @description Adds a LGTM button to the code-review sreen.
// @include     https://github*/*/pull/*
// @version     1.0
// ==/UserScript==
$(function () {
  var $form = $('form.js-new-comment-form');

  if ($('btn-lgtm', $form).length !== 0) {
    return;
  }

  var
    $textarea = $('textarea', $form),
    $button = $('button.btn-primary', $form);

  $button
    .clone()
    .text('LGTM')
    .removeClass('btn-primary')
    .addClass('btn-secondary btn-lgtm')
    .appendTo($button.parent())
    .on('click', function (e) {
      e.preventDefault();
      $textarea.val('LGTM');
      $button.click();
    });
});
