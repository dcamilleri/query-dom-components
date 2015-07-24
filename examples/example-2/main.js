/* globals $ */
// Compiled with browserify
// $ browserify main.js -o bundle.js

'use strict';

var queryDom = require('../../index.js');
var formComponent = $('.sign-up');
var dom = queryDom({el: formComponent});

dom.inputText.on('keydown', function() {
  console.log('Typing is great!');
});

dom.inputSubmit.on('click', function(event) {
  event.preventDefault();
  alert('The form was submitted. Congrats!');
});

dom.radio.on('click', function(event) {
  console.log(event.currentTarget.value);
});