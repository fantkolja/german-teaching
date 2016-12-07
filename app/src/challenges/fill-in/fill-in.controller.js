(function() {
'use strict';

angular.module('challenges')
.controller('FillInController', FillInController);

FillInController.$inject = ['verbs', 'VerbListRandomizer', '$state'];
function FillInController(verbs, VerbListRandomizer, $state) {
  var fillInCtrl = this;

  var settings = {
    formToFillIn: 'perfect',
    arrayLength: 2,
    restrictedVerbTypes: ''
  };

  var verbArray = VerbListRandomizer.getRandomVerbs(verbs, settings.arrayLength);

  var getNextVerb = VerbListRandomizer.setNewVerbGetter();

  fillInCtrl.currentVerb = getNextVerb(verbArray);

  fillInCtrl.userInput = '';

  fillInCtrl.checkUserInput = function() {
    if(fillInCtrl.userInput === fillInCtrl.currentVerb.perfect) {
      fillInCtrl.currentVerb = getNextVerb(verbArray);
      if (fillInCtrl.currentVerb == 'end') {
        fillInCtrl.gameOver = true;
      }
      fillInCtrl.userInput = '';
    }
  };

  fillInCtrl.reloadState = function() {
    $state.reload();
  };

  //placeholder shit. Is it still MVVC???
  fillInCtrl.placeholder = 'Type in the ' + settings.formToFillIn + ' form...';

  fillInCtrl.addPlaceholder = function() {
    fillInCtrl.placeholder = 'Type in the ' + settings.formToFillIn + ' form...';
  };

  fillInCtrl.removePlaceholder = function() {
    fillInCtrl.placeholder = '';
  };

}

})();
