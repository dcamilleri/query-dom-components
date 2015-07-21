/* globals jQuery */

'use strict';

var camelCase = require('./lib/camelCase');

module.exports = function (options) {
  var _queryDom = {};
  var opts = options || {};
  var container = opts.el || document.body;
  var prefix = opts.prefix || 'js-';

  if(container.jquery) {
    container = container[0];
  }

  var targetElements = container.querySelectorAll('*[class*="' + prefix + '"]');

  for (var i = 0; i < targetElements.length; i++) {
    var element = targetElements[i];
    var splitKey = element.className.split(prefix)[1];
    var key = camelCase(splitKey.split(' ')[0]);
    if(key) {
      if(typeof jQuery !== 'undefined') {
        element = jQuery(element);
      }
      _queryDom[key] = element;
    } else {
      console.warn('queryDom warning: Watch out, one of your prefix is empty');
    }
  }

  return _queryDom;
};