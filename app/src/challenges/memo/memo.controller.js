(function() {
'use strict';

angular.module('challenges')
.controller('MemoController', MemoController);

MemoController.$inject = ['verbs', 'VerbListRandomizer'];
function MemoController(verbs, VerbListRandomizer) {
  var memoCtrl = this;

  var settings = {
    formToFillIn: 'perfect',
    arrayLength: 6,
    restrictedVerbTypes: ''
  };

  var verbArray = VerbListRandomizer.getRandomVerbs(verbs, settings.arrayLength);

  var getNextVerb = VerbListRandomizer.setNewVerbGetter();

  memoCtrl.randomForms = VerbListRandomizer.mixVerbForms(verbArray);
}

})();
