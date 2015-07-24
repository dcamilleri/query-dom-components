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