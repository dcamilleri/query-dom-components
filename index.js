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
      if(_queryDom[key] && !_queryDom[key]._isAllSelected) {
        if(typeof jQuery !== 'undefined') {
          _queryDom[key] = jQuery('.' + element.className);
        } else {
          _queryDom[key] = container.querySelectorAll('.' + element.className);
        }
        _queryDom[key]._isAllSelected = true;
      }
      if(typeof jQuery !== 'undefined') {
        element = jQuery(element);
      }
      if(!_queryDom[key]) {
        _queryDom[key] = element;
      }
    } else {
      console.warn('queryDom warning: Watch out, one of your prefix is empty');
    }
  }

  return _queryDom;
};