/* globals jQuery */

'use strict';

var camelCase = require('./lib/camelCase');

module.exports = function (options) {
  var _queryDom = {};
  var opts = options || {};
  var container = opts.el || document.body;
  var prefix = opts.prefix || 'js-';
  var hasJquery = typeof jQuery !== 'undefined';

  if(!container) {
    return console.warn('queryDom warning: the container specified in empty');
  }

  if(container.jquery) {
    container = container[0];
  }

  var targetElements = container.querySelectorAll('*[class*="' + prefix + '"]');

  for (var i = 0; i < targetElements.length; i++) {
    var element = targetElements[i];
    var splitKey = element.className.split(prefix)[1];
    var pureClass = splitKey.split(' ')[0];
    var key = camelCase(pureClass);
    if(key) {
      var queryEl = _queryDom[key];
      if(queryEl && !queryEl._isAllSelected) {
        _queryDom[key] = hasJquery ?
          jQuery('.' + prefix + pureClass) :
          container.querySelectorAll('.' + prefix + pureClass);
        _queryDom[key]._isAllSelected = true;
      }
      if(hasJquery) {
        element = jQuery(element);
      }
      if(!queryEl) {
        _queryDom[key] = element;
      }
    } else {
      console.warn('queryDom warning: one of your prefix is empty');
    }
  }

  return _queryDom;
};