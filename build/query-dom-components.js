/* globals jQuery define */

(function() {

  'use strict';

  function camelCase(input) {
    return input.toLowerCase().replace(/-(.)/g, function(match, group) {
      return group.toUpperCase();
    });
  }

  function queryDom(options) {
    var _queryDom = {};
    var opts = options || {};
    var container = opts.el || document.body;
    var prefix = opts.prefix || 'js-';
    var hasJquery = typeof jQuery !== 'undefined';

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
      var splitKey = className.split(prefix)[1];
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
  }

  if (typeof define === 'function' && define.amd) {
    define([], function(){
      return queryDom;
    });
  } else if (typeof exports === 'object') {
    module.exports = queryDom;
  } else {
    window.queryDom = window.queryDom || queryDom;
  }
})();