(function() {
'use strict';

angular.module('challenges')
.controller('ChooseController', ChooseController);

ChooseController.$inject = ['verbs', 'VerbListRandomizer', '$state'];
function ChooseController(verbs, VerbListRandomizer, $state) {
  var chooseCtrl = this;

  var settings = {
    arrayLength: 20,
    restrictedVerbTypes: ''
  };

  var verbArray, getNextVerb;

  chooseCtrl.init = function() {
    chooseCtrl.totalItemsNumber = settings.arrayLength;
    chooseCtrl.counter = {index:0};
    chooseCtrl.gameIsOn = true;
    chooseCtrl.userWon = false;
    chooseCtrl.userLost = false;
    verbArray = VerbListRandomizer.getRandomVerbs(verbs, settings.arrayLength);
    getNextVerb = VerbListRandomizer.setNewVerbGetter(chooseCtrl.counter);
    chooseCtrl.currentVerb = getNextVerb(verbArray);
  };

  //init state
  chooseCtrl.init();

  chooseCtrl.checkAnswer = function(answer) {
    if (answer == chooseCtrl.currentVerb.auxilliary_verb) {
    //  console.log('correct');
      chooseCtrl.currentVerb = getNextVerb(verbArray);

      if (chooseCtrl.currentVerb == 'end') {
        chooseCtrl.gameIsOn = false;
        chooseCtrl.userWon = true;
      }

    } else {
      chooseCtrl.gameIsOn = false;
      chooseCtrl.userLost = true;
    };

    chooseCtrl.reloadState = function() {
      $state.reload();
    };
  };

}

})();
