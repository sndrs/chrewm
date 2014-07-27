/* jshint strict: false */
/* global document: false */
/* global require: false */
/* global MutationObserver: false */

'use strict';

(function(){
  var transforms = require('../transforms');
  var dictionary = require('./_dictionary');

  function chrewmerise(s) {
    // generic transforms
    Object.keys(transforms).forEach(function(transform) {
      s = s.replace(new RegExp(transform, 'g'), transforms[transform]);
    });

    // swap all dictionary stuff after generic transforms
    var regEx = new RegExp("(\\W)(" + Object.keys(dictionary).join("|") + ")(s|ed|ing|)(\\W)", "g");
    return s.replace(regEx, function(match, p1, p2, p3, p4) {
      return p1 + dictionary[p2] + p3 + p4;
    });
  }

  var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
      if(mutation.addedNodes) {
        Array.prototype.forEach.call(mutation.addedNodes, function(node) {
          if(node.data && node.parentNode.nodeName !== 'STYLE' && node.parentNode.nodeName !== 'SCRIPT') {
            node.data = chrewmerise(node.data);
          }
        });
      }
    });
  });

  observer.observe(document, {
    characterData: true,
    subtree: true,
    childList: true
  });
})();
