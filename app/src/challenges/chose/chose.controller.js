(function() {
'use strict';

angular.module('challenges')
.controller('ChoseController', ChoseController);

ChoseController.$inject = ['verbs', 'VerbListRandomizer', '$state'];
function ChoseController(verbs, VerbListRandomizer, $state) {
  var choseCtrl = this;

  var settings = {
    arrayLength: 2,
    restrictedVerbTypes: ''
  };

  var verbArray = VerbListRandomizer.getRandomVerbs(verbs, settings.arrayLength);
  var getNextVerb = VerbListRandomizer.setNewVerbGetter();

  //initial state
  choseCtrl.gameIsOn = true;
  choseCtrl.userWon = false;
  choseCtrl.userLost = false;
  choseCtrl.currentVerb = getNextVerb(verbArray);

  choseCtrl.checkAnswer = function(answer) {
    if (answer == choseCtrl.currentVerb.auxilliary_verb) {
    //  console.log('correct');
      choseCtrl.currentVerb = getNextVerb(verbArray);
      if (choseCtrl.currentVerb == 'end')
        choseCtrl.gameIsOn = false;
        choseCtrl.userWon = true;
    } else {
      choseCtrl.gameIsOn = false;
      choseCtrl.userLost = true;
    };

    choseCtrl.reloadState = function() {
      $state.reload();
    };
  };

}

})();
