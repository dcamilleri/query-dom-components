/* globals expect describe it queryDom afterEach before after */
'use strict';

var _jQuery;

describe('API Testing with pure JavaScript', function () {

  // Remove jQuery for testing pure JS
  before(function() {
    _jQuery = window.jQuery;
    window.jQuery = undefined;
  });

  // jQuery's back
  after(function() {
    window.jQuery = _jQuery;
  });

  afterEach(function() {
    document.body.removeChild(document.querySelector('.container'));
  });

  it('should return all the prefixed elements if the container is not specified', function () {
    var DOM =
      '<div class="container">\
        <div class="js-foo">\
          <span class="js-bar"></span>\
        </div>\
        <a href="#" class="js-foo-bar"></a>\
      </div>';

    document.body.innerHTML = DOM;

    var foo = document.querySelector('.js-foo');
    var bar = document.querySelector('.js-bar');
    var fooBar = document.querySelector('.js-foo-bar');
    var dom = queryDom({el: document.body});
    var domLength = Object.keys(dom).length;

    expect(domLength).to.equal(3);
    expect(dom.foo).to.equal(foo);
    expect(dom.bar).to.equal(bar);
    expect(dom.fooBar).to.equal(fooBar);
  });

  it('should return all the prefixed elements if the prefix is set', function () {
    var DOM =
      '<div class="container">\
        <span class="comp-foo-bar"></span>\
      </div>';
    document.body.innerHTML = DOM;

    var container = document.querySelector('.container');
    var fooBar = document.querySelector('.comp-foo-bar');
    var dom = queryDom({el: container, prefix: 'comp-'});

    expect(dom.fooBar).to.equal(fooBar);
  });

  it('should not take other prefixed elements if they don\'t match', function () {
    var DOM =
      '<div class="container">\
        <div class="comp-foo-bar"></div>\
        <div class="js-stuff-bar">\
          <span class="js-bar-stuff"></span>\
        </div>\
      </div>';
    document.body.innerHTML = DOM;

    var container = document.querySelector('.container');
    var fooBar = document.querySelector('.comp-foo-bar');
    var dom = queryDom({el: container, prefix: 'comp-'});

    expect(dom.fooBar).to.equal(fooBar);
    expect(dom.stuffBar).to.equal(undefined);
    expect(dom.barStuff).to.equal(undefined);
  });

  it('should ignore a dom element with nothing after its prefix.', function () {
    var DOM =
      '<div class="container">\
        <div class="js-"></div>\
      </div>';
    document.body.innerHTML = DOM;

    var container = document.querySelector('.container');
    var dom = queryDom({el: container});
    var domLength = Object.keys(dom).length;

    expect(domLength).to.equal(0);
  });

  it('should return an valid object when an element is matching the query', function () {
    var DOM =
      '<div class="container">\
        <div class="paragraph js-paragraph-long-like-hell lonlong">Hey you</div>\
      </div>';
    document.body.innerHTML = DOM;

    var container = document.querySelector('.container');
    var divChild = document.querySelector('.js-paragraph-long-like-hell');
    var dom = queryDom({el: container});

    expect(dom.paragraphLongLikeHell).to.equal(divChild);
  });

  it('should return an good object when multiple elements are matching the query', function () {
    var DOM =
      '<div class="container">\
        <div class="paragraph js-foo-bar">\
          Hey you\
          <p class="foofoo js-foo"></p>\
        </div>\
        <p class="js-bar barbar"></p>\
      </div>';
    document.body.innerHTML = DOM;

    var container = document.querySelector('.container');
    var fooBar = document.querySelector('.js-foo-bar');
    var foo = document.querySelector('.js-foo');
    var bar = document.querySelector('.js-bar');

    var dom = queryDom({el: container});

    expect(dom.fooBar).to.equal(fooBar);
    expect(dom.foo).to.equal(foo);
    expect(dom.bar).to.equal(bar);

  });

  it('should return a good object when multiple elements have the same prefixed class', function () {
    var DOM =
      '<div class="container">\
        <div class="js-arrow"></div>\
        <div class="js-arrow"></div>\
        <div class="js-arrow"></div>\
      </div>';
    document.body.innerHTML = DOM;

    var container = document.querySelector('.container');
    var arrows = document.querySelectorAll('.js-arrow');

    var dom = queryDom({el: container});

    expect(dom.arrow.length).to.equal(arrows.length);
    expect(typeof dom.arrow).to.equal('object');
  });

  it('should return a good object when inner elements multiple prefixed classes', function () {
    var DOM =
      '<div class="container">\
        <div class="js-arrow js-arrow-left"></div>\
        <div class="js-arrow js-arrow-right"></div>\
      </div>';
    document.body.innerHTML = DOM;

    var container = document.querySelector('.container');
    var arrows = document.querySelectorAll('.js-arrow');

    var dom = queryDom({el: container});

    expect(dom.arrow.length).to.equal(arrows.length);
    expect(typeof dom.arrow).to.equal('object');

    expect(dom.arrowLeft).to.not.equal(undefined);
    expect(typeof dom.arrowLeft).to.equal('object');
    expect(dom.arrowLeft.className).to.equal('js-arrow js-arrow-left');

    expect(dom.arrowRight).to.not.equal(undefined);
    expect(typeof dom.arrowRight).to.equal('object');
    expect(dom.arrowRight.className).to.equal('js-arrow js-arrow-right');
  });
});