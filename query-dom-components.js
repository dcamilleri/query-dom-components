/* globals jQuery define */

(function() {

  'use strict';

  function camelCase(input) {
    return input.toLowerCase().replace(/-(.)/g, function(match, group) {
      return group.toUpperCase();
    });
  }

  function extractSuffix(string, prefix) {
    var a = 1;
    var res = [];
    while(a) {
      var subString = string.split(prefix)[a];
      if(subString) {
        res.push(subString.split(' ')[0]);
        ++a;
      } else {
        a = 0;
      }
    }
    return res;
  }

  function queryDom(options) {
    var _queryDom = {};
    var opts = options || {};
    var container = opts.el || document.body;
    var prefix = opts.prefix || 'js-';
    var wantJquery = opts.returnJquery;
    var hasJquery = typeof jQuery !== 'undefined';

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
              if(hasJquery) {
                if(wantJquery !== false) {
                  _queryDom[key] = jQuery('.' + prefix + pureClass);
                } else {
                  _queryDom[key] = container[0].querySelectorAll('.' + prefix + pureClass);
                }
              } else {
                _queryDom[key] = container.querySelectorAll('.' + prefix + pureClass);
              }
              _queryDom[key]._isAllSelected = true;
            }
            if(hasJquery) {
              if(wantJquery !== false) {
                element = jQuery(element);
              }
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