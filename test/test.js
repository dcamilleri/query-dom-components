/* globals describe it */
'use strict';

var QueryDom = require('../index.js');
var camelCase = require('../lib/camelCase');
var jsdom = require('jsdom');
var expect = require('chai').expect;

describe('CamelCase testing', function () {

  it('should return a normal string where there is no dash in the string', function () {
    var className = 'long';
    expect(camelCase(className)).to.equal(className);
  });

  it('should return a camelCased string', function () {
    var className = 'long-text-is-long';
    var camelCasedClass = 'longTextIsLong';
    expect(camelCase(className)).to.equal(camelCasedClass);
  });
});

describe('DOM Testing', function () {
  it('should return an valid object when an element is matching the query', function (done) {
    jsdom.env(
      '<div class="container"><div class="paragraph js-paragraph-long lonlong">Hey you</div></div>',
      [],
      function (errors, window) {
        var doc = window.document;
        var container = doc.querySelector('.container');
        var divChild = doc.querySelector('.js-paragraph-long');
        var dom = QueryDom({el: container});

        expect(dom.paragraphLong).to.equal(divChild);

        done();
      }
    );
  });

  it('should return an good object when multiple elements are matching the query', function (done) {
    jsdom.env(
      '<div class="container"><div class="paragraph js-foo-bar">Hey you<p class="foofoo js-foo"></p></div><p class="js-bar barbar"></p>',
      [],
      function (errors, window) {
        var doc = window.document;
        var container = doc.querySelector('.container');

        var fooBar = doc.querySelector('.js-foo-bar');
        var foo = doc.querySelector('.js-foo');
        var bar = doc.querySelector('.js-bar');

        var dom = QueryDom({el: container});

        expect(dom.fooBar).to.equal(fooBar);
        expect(dom.foo).to.equal(foo);
        expect(dom.bar).to.equal(bar);

        done();
      }
    );
  });
});