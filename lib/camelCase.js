'use strict';

// Credits - http://stackoverflow.com/questions/10425287/convert-dash-separated-string-to-camelcase
module.exports = function (input) {
  return input.toLowerCase().replace(/-(.)/g, function(match, group) {
    return group.toUpperCase();
  });
};