/* globals describe it */
'use strict';

var queryDom = require('../query-dom-components.js');
var jsdom = require('jsdom');
var expect = require('chai').expect;

describe('API Testing with jQuery', function () {
  it('[jQuery] should return all the prefixed elements if the container is not specified', function (done) {
    jsdom.env(
      '<div class="js-container">\
				<div class="js-foo">\
					<span class="js-bar"></span>\
				</div>\
				<a href="#" class="js-foo-bar"></a>\
      </div>',
      [],
      function (errors, window) {
        var $ = global.jQuery = require('jquery')(window);
        var container = $('.js-container');
        var foo = $('.js-foo');
        var bar = $('.js-bar');
        var fooBar = $('.js-foo-bar');
        var dom = queryDom({el: $('body')});
        var domLength = Object.keys(dom).length;

        expect(domLength).to.equal(4);
        expect(dom.container[0]).to.equal(container[0]);
        expect(dom.container.jquery).not.to.equal(undefined);

        expect(dom.foo[0]).to.equal(foo[0]);
        expect(dom.foo.jquery).not.to.equal(undefined);

        expect(dom.bar[0]).to.equal(bar[0]);
        expect(dom.bar.jquery).not.to.equal(undefined);

        expect(dom.fooBar[0]).to.equal(fooBar[0]);
        expect(dom.fooBar.jquery).not.to.equal(undefined);

        done();
      }
    );
  });

  it('[jQuery] should return all the prefixed elements if the prefix is set', function (done) {
    jsdom.env(
      '<div class="container">\
					<span class="comp-foo-bar"></span>\
      </div>',
      [],
      function (errors, window) {
        var $ = global.jQuery = require('jquery')(window);
        var container = $('.container');
        var fooBar = $('.comp-foo-bar');
        var dom = queryDom({el: container, prefix: 'comp-'});

        expect(dom.fooBar[0]).to.equal(fooBar[0]);
        expect(dom.fooBar.jquery).not.to.equal(undefined);

        done();
      }
    );
  });

  it('[jQuery] should not take other prefixed elements if they don\'t match', function (done) {
    jsdom.env(
      '<div class="container">\
				<div class="comp-foo-bar"></div>\
				<div class="js-stuff-bar">\
					<span class="js-bar-stuff"></span>\
				</div>\
      </div>',
      [],
      function (errors, window) {
        var $ = global.jQuery = require('jquery')(window);
        var container = $('.container');
        var fooBar = $('.comp-foo-bar');
        var dom = queryDom({el: container, prefix: 'comp-'});

        expect(dom.fooBar[0]).to.equal(fooBar[0]);
        expect(dom.fooBar.jquery).not.to.equal(undefined);
        expect(dom.stuffBar).to.equal(undefined);
        expect(dom.barStuff).to.equal(undefined);

        done();
      }
    );
  });

  it('[jQuery] should ignore a dom element with nothing after its prefix.', function (done) {
    jsdom.env(
      '<div class="container">\
					<div class="js-"></div>\
      </div>',
      [],
      function (errors, window) {
        var $ = global.jQuery = require('jquery')(window);
        var container = $('.container');
        var dom = queryDom({el: container});
        var domLength = Object.keys(dom).length;

        expect(domLength).to.equal(0);

        done();
      }
    );
  });

  it('[jQuery] should return an valid object when an element is matching the query', function (done) {
    jsdom.env(
      '<div class="container">\
				<div class="paragraph js-paragraph-long lonlong">Hey you</div>\
      </div>',
      [],
      function (errors, window) {
        var $ = global.jQuery = require('jquery')(window);
        var container = $('.container');
        var divChild = $('.js-paragraph-long');
        var dom = queryDom({el: container});

        expect(dom.paragraphLong[0]).to.equal(divChild[0]);
        expect(dom.paragraphLong.jquery).not.to.equal(undefined);

        done();
      }
    );
  });

  it('[jQuery] should return an good object when multiple elements are matching the query', function (done) {
    jsdom.env(
      '<div class="container">\
				<div class="paragraph js-foo-bar">\
					Hey you\
					<p class="foofoo js-foo"></p>\
				</div>\
				<p class="js-bar barbar"></p>\
      </div>',
      [],
      function (errors, window) {
        var $ = global.jQuery = require('jquery')(window);
        var container = $('.container');

        var fooBar = $('.js-foo-bar');
        var foo = $('.js-foo');
        var bar = $('.js-bar');

        var dom = queryDom({el: container});

        // Check if fooBar is stored and a jQuery object
        expect(dom.fooBar[0]).to.equal(fooBar[0]);
        expect(dom.fooBar.jquery).not.to.equal(undefined);

        // Check if foo is stored and a jQuery object
        expect(dom.foo[0]).to.equal(foo[0]);
        expect(dom.foo.jquery).not.to.equal(undefined);

        // Check if bar is stored and a jQuery object
        expect(dom.bar[0]).to.equal(bar[0]);
        expect(dom.bar.jquery).not.to.equal(undefined);

        done();
      }
    );
  });

  it('[jQuery] should return an good object when multiple elements have the same prefixed class', function (done) {
    jsdom.env(
      '<div class="container">\
				<div class="js-arrow"></div>\
				<div class="js-arrow"></div>\
				<div class="js-arrow"></div>\
      </div>',
      [],
      function (errors, window) {
        var $ = global.jQuery = require('jquery')(window);
        var container = $('.container');
        var arrows = $('.js-arrow');

        var dom = queryDom({el: container});

        // Check if the NodeList exists
        expect(dom.arrow.length).to.equal(arrows.length);

        // Check if the NodeList is a Jquery NodeList
        expect(dom.arrow.jquery).not.to.equal(undefined);

        // Check if it's a Object (NodeList)
        expect(typeof dom.arrow).to.equal('object');

        done();
      }
    );
  });
  it('[jQuery] should return a good object when inner elements multiple prefixed classes', function (done) {
    jsdom.env(
      '<div class="container">\
        <div class="js-arrow js-arrow-left"></div>\
        <div class="js-arrow js-arrow-right"></div>\
      </div>',
      [],
      function (errors, window) {
        var $ = global.jQuery = require('jquery')(window);
        var container = $('.container');
        var arrows = $('.js-arrow');

        var dom = queryDom({el: container});

        expect(dom.arrow.length).to.equal(arrows.length);
        expect(typeof dom.arrow).to.equal('object');

        expect(dom.arrowLeft).to.not.equal(undefined);
        expect(typeof dom.arrowLeft).to.equal('object');
        expect(dom.arrowLeft.attr('class')).to.equal('js-arrow js-arrow-left');

        expect(dom.arrowRight).to.not.equal(undefined);
        expect(typeof dom.arrowRight).to.equal('object');
        expect(dom.arrowRight.attr('class')).to.equal('js-arrow js-arrow-right');

        done();
      }
    );
  });
});