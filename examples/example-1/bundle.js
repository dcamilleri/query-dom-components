(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
// Compiled with browserify
// $ browserify main.js -o bundle.js

'use strict';

var queryDom = require('../../index.js');
var formComponent = document.querySelector('.sign-up');
var dom = queryDom({el: formComponent});

dom.inputText.addEventListener('keydown', function() {
  console.log('Typing is great!');
});

dom.inputSubmit.addEventListener('click', function(event) {
  event.preventDefault();
  alert('The form was submitted. Congrats!');
});

var _radioClick = function(event) {
  console.log(event.currentTarget.value);
};

console.log("dom.radio",dom.radio);

for (var i = 0; i < dom.radio.length; i++) {
  var radio = dom.radio[i];
  console.log("radio",radio);
  radio.addEventListener('click', _radioClick);
}
},{"../../index.js":2}],2:[function(require,module,exports){
/* globals jQuery */

'use strict';

var camelCase = require('./lib/camelCase');

module.exports = function (options) {
  var _queryDom = {};
  var opts = options || {};
  var container = opts.el || document.body;
  var prefix = opts.prefix || 'js-';
  var hasJquery = typeof jQuery !== 'undefined';

  if(container.jquery) {
    container = container[0];
  }

  var targetElements = container.querySelectorAll('*[class*="' + prefix + '"]');

  for (var i = 0; i < targetElements.length; i++) {
    var element = targetElements[i];
    var splitKey = element.className.split(prefix)[1];
    var pureClass = splitKey.split(' ')[0];
    var key = camelCase(pureClass);
    // console.log("key",key);
    if(key) {
      var queryEl = _queryDom[key];
      if(queryEl && !queryEl._isAllSelected) {
        _queryDom[key] = hasJquery ?
          jQuery('.' + element.className) :
          container.querySelectorAll('.' + prefix + pureClass);

          console.log("prefix + pureClass",prefix + pureClass);
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
},{"./lib/camelCase":3}],3:[function(require,module,exports){
'use strict';

// Credits - http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
module.exports = function (input) {
  return input.toLowerCase().replace(/-(.)/g, function(match, group) {
    return group.toUpperCase();
  });
};
},{}]},{},[1]);
