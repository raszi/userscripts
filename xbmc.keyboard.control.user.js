// ==UserScript==
// @name          XBMC keyboard control
// @namespace     http://userscripts.org/users/20715
// @description   Remote control your XBMC mediabox with your keyboard
// @include       http://mediabox:8080/
// @version       1.0
// ==/UserScript==

$(function () {
  // http://wiki.xbmc.org/index.php?title=JSON-RPC_API/v6#Methods
  var
    baseURL = window.location.toString() + 'jsonrpc',
    keyMappings = {
      13: 'Input.Select',
      27: 'Input.Back',
      37: 'Input.Left',
      38: 'Input.Up',
      39: 'Input.Right',
      40: 'Input.Down',
      67: 'Input.ContextMenu',
      79: 'Input.ShowOSD'
    };

  $(document).keydown(function (event) {
    var
      keyCode = parseInt(event.keyCode, 10),
      mappedAction = keyMappings[keyCode];

    if (typeof mappedAction === 'undefined') {
      return;
    }

    var data = {
      jsonrpc: '2.0',
      method: mappedAction,
      id: 1
    };

    $.ajax(baseURL, {
      type: 'POST',
      contentType: 'application/json',
      dataType: 'json',
      data: JSON.stringify(data)
    });

    event.stopPropagation();
  });
});
