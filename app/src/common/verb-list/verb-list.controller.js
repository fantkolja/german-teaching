(function() {
'use strict';

angular.module('common')
.controller('VerbListController', VerbListController);

VerbListController.$inject = ['verbs'];
function VerbListController(verbs) {
  var verbListCtrl = this;

  verbListCtrl.settings = {
    kind: false,
    infinitiv: true,
    third_person: true,
    praeteritum: false,
    perfect: true,
    auxilliary_verb: true,
    ukr: true
  };

  verbListCtrl.verbs = verbs;

  verbListCtrl.dislocateRandomItems = function() {
    function getRandomTrueProp(trueProps) {
      var randomIndex = Math.floor(Math.random() * trueProps.length);
      return trueProps[randomIndex];
    }

    function getTrueProps(settings) {
      var trueProps = [];
      for (var prop in settings)
        if (settings.hasOwnProperty(prop) && settings[prop])
          trueProps.push(prop);
      return trueProps;
    }

    function restoreValues() {
      for (var i = 0, n = verbListCtrl.verbs.length; i < n; i++) {
        var verb = verbListCtrl.verbs[i];
        verbListCtrl.restoreValue(verb);
      }
    }

    verbListCtrl.restoreValue = function(verb) {
      verb[verb.dislocatedProp] = verb.dislocatedValue;
      verb.dislocatedProp = null;
      verb.dislocatedValue = null;
    };

    // clear previous test
    restoreValues();

    var trueProps = getTrueProps(verbListCtrl.settings);
    for (var i = 0, n = verbListCtrl.verbs.length; i < n; i++) {
      var prop = getRandomTrueProp(trueProps);
      var verb = verbListCtrl.verbs[i];
      verb.dislocatedProp = prop;
      verb.dislocatedValue = verb[prop];
      verb[prop] = null;
    }
  };
}

})();
