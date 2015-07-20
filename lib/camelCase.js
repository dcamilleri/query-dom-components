'use strict';

module.exports = function (input) {
  return input.toLowerCase().replace(/-(.)/g, function(match, group) {
    return group.toUpperCase();
  });
};