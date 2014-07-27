/* jshint strict: false */
/* global document: false */
/* global require: false */

'use strict';

var dictionary = require('./_dictionary');

var terms = Object.keys(dictionary).join("|");
var regEx = new RegExp("(\\W)(" + terms + ")(s|ed|ing|)(\\W)","g");

var chrewmerise = function(s) {
  return s.replace(regEx, function(match, p1, p2, p3, p4) {
    return p1 + dictionary[p2] + p3 + p4;
  })
  .replace(/ing\b/g, 'un') // *ing > *un
  .replace(/(\w)(one)\b/g, '$1ewn') // *one > *ewn - dodgy?
  .replace(/own\b/g, 'ewn') // *own > *ewn
  .replace(/ose\b/g, 'ews') // *ose > *ews
  .replace(/iew\b/g, 'ew'); // *iew > *ew
};

var observer = new MutationObserver(function(mutations) {
  mutations.forEach(function(mutation) {
    if(mutation.addedNodes) {
      Array.prototype.forEach.call(mutation.addedNodes, function(node) {
        if(node.data && node.parentNode.nodeName !== 'STYLE' && node.parentNode.nodeName !== 'SCRIPT') {
          node.data = chrewmerise(node.data);
        }
      })
    }
  });
});

observer.observe(document, {
  characterData: true,
  subtree: true,
  childList: true
});