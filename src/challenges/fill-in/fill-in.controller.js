(function() {
'use strict';

angular.module('challenges')
.controller('FillInController', FillInController);

FillInController.$inject = ['verbs', 'VerbListRandomizer', '$state'];
function FillInController(verbs, VerbListRandomizer, $state) {
  var fillInCtrl = this;

  var settings = {
    formToFillIn: 'Präteritum',
    arrayLength: 20,
    restrictedVerbTypes: ''
  };

  fillInCtrl.formToFillIn = settings.formToFillIn;

  var verbArray, getNextVerb;

  function init() {
    fillInCtrl.counter = {index: 0};
    fillInCtrl.totalItemsNumber = settings.arrayLength;
    verbArray = VerbListRandomizer.getRandomVerbs(verbs, settings.arrayLength);
    getNextVerb = VerbListRandomizer.setNewVerbGetter(fillInCtrl.counter);
    fillInCtrl.currentVerb = getNextVerb(verbArray);
    fillInCtrl.userInput = '';
  }

  init();

  fillInCtrl.checkUserInput = function() {
    if(fillInCtrl.userInput.toLowerCase() === fillInCtrl.currentVerb.praeteritum) {
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
  fillInCtrl.placeholder = 'Schreibe die ' + settings.formToFillIn + 'form...';

  fillInCtrl.addPlaceholder = function() {
    fillInCtrl.placeholder = 'Schreibe die ' + settings.formToFillIn + 'form...';
  };

  fillInCtrl.removePlaceholder = function() {
    fillInCtrl.placeholder = '';
  };

}

})();
