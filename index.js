'use strict';

var camelCase = require('./lib/camelCase');

module.exports = function (opts) {

  var _queryDom = {};

  var container = opts.el || document.body;
  var prefix = opts.prefix || 'js-';
  var targetElements = container.querySelectorAll('*[class*="' + prefix + '"]');

  for (var i = 0; i < targetElements.length; i++) {
    var element = targetElements[i];
    var splitKey = element.className.split('js-')[1];
    var key = camelCase(splitKey.split(' ')[0]);

    _queryDom[key] = element;
  }

  return _queryDom;
};