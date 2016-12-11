(function() {
'use strict';

angular.module('challenges')
.controller('ChooseController', ChooseController);

ChooseController.$inject = ['verbs', 'VerbListRandomizer', '$state'];
function ChooseController(verbs, VerbListRandomizer, $state) {
  var chooseCtrl = this;

  var settings = {
    arrayLength: 2,
    restrictedVerbTypes: ''
  };

  var verbArray = VerbListRandomizer.getRandomVerbs(verbs, settings.arrayLength);
  var getNextVerb = VerbListRandomizer.setNewVerbGetter();

  //initial state
  chooseCtrl.gameIsOn = true;
  chooseCtrl.userWon = false;
  chooseCtrl.userLost = false;
  chooseCtrl.currentVerb = getNextVerb(verbArray);

  chooseCtrl.checkAnswer = function(answer) {
    if (answer == chooseCtrl.currentVerb.auxilliary_verb) {
    //  console.log('correct');
      chooseCtrl.currentVerb = getNextVerb(verbArray);
      if (chooseCtrl.currentVerb == 'end')
        chooseCtrl.gameIsOn = false;
        chooseCtrl.userWon = true;
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
