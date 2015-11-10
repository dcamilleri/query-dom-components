/* globals jQuery */

'use strict';

var camelCase = require('./lib/camelCase');
var extractSuffix = require('./lib/extractSuffix');

module.exports = function (options) {
  var _queryDom = {};
  var opts = options || {};
  var container = opts.el || document.body;
  var prefix = opts.prefix || 'js-';
  var wantJquery = opts.usejQuery || false;
  var hasJquery = wantJquery && typeof jQuery !== 'undefined';

  if(!container) {
    return console.warn('queryDom warning: the container specified in empty');
  }

  var targetElements;
  if(hasJquery) {
    targetElements = jQuery(container).find('*[class*="' + prefix + '"]');
  } else {
    targetElements = container.querySelectorAll('*[class*="' + prefix + '"]');
  }

  for (var i = 0; i < targetElements.length; i++) {
    var element = targetElements[i];
    var className = element.className;
    // Getting className on SVGs
    if(typeof className !== 'string') {
      className = element.getAttribute('class');
    }
    var splitKeys = extractSuffix(className, prefix);
    if(splitKeys) {
      for (var j = 0; j < splitKeys.length; j++) {
        var pureClass = splitKeys[j];
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
        }
      }
    } else {
      console.warn('queryDom warning: one of your prefix is empty');
    }
  }

  return _queryDom;
};
