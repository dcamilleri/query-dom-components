/* globals describe it */
'use strict';

var camelCase = require('../lib/camelCase');
var expect = require('chai').expect;

describe('CamelCase testing', function () {
  it('should return a normal string where there is no dash in the string', function () {
    var className = 'long';
    expect(camelCase(className)).to.equal(className);
  });

  it('should return a camelCased string', function () {
    var className = 'js-long-text-is-long';
    var camelCasedClass = 'jsLongTextIsLong';
    expect(camelCase(className)).to.equal(camelCasedClass);
  });
});