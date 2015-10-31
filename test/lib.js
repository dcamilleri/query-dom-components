/* globals describe it expect camelCase extractSuffix */
'use strict';

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

describe('extractSuffix testing', function () {
  it('should return an empty array when the suffix doesn\'t match', function () {
    var className = 'hey';
    var prefix = 'js-';
    var result = extractSuffix(className, prefix);
    expect(result).to.be.an.instanceof(Object);
    expect(result.length).to.equal(0);
  });

  it('should return a correct array with one suffix matching', function () {
    var className = 'js-arrow';
    var prefix = 'js-';
    var result = extractSuffix(className, prefix);
    expect(result.length).to.equal(1);
    expect(result[0]).to.equal('arrow');
  });

  it('should return a correct array with multiple suffix matching', function () {
    var className = 'js-arrow js-arrow-right';
    var prefix = 'js-';
    var result = extractSuffix(className, prefix);
    expect(result.length).to.equal(2);
    expect(result[0]).to.equal('arrow');
    expect(result[1]).to.equal('arrow-right');
  });

  it('should return a correct array when normal classes present', function () {
    var className = 'the-class js-arrow something js-arrow-right something-else';
    var prefix = 'js-';
    var result = extractSuffix(className, prefix);
    expect(result.length).to.equal(2);
    expect(result[0]).to.equal('arrow');
    expect(result[1]).to.equal('arrow-right');
  });
});