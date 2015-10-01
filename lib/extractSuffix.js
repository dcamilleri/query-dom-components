'use strict';

module.exports = function extractSuffix(string, prefix) {
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
};