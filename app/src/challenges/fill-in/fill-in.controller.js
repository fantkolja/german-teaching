(function() {
'use strict';

angular.module('challenges')
.controller('FillInController', FillInController);

FillInController.$inject = ['VerbListService', 'verbs'];
function FillInController(VerbListService, verbs) {
  var fillInCtrl = this;

  fillInCtrl.verbs = verbs;

  fillInCtrl.currentVerb = fillInCtrl.verbs[0];
  fillInCtrl.userInput = '';
  fillInCtrl.formToFillIn = 'perfect';
  
  fillInCtrl.checkUserInput = function() {
    console.log(fillInCtrl.userInput === fillInCtrl.currentVerb.perfect);
    if(fillInCtrl.userInput === fillInCtrl.currentVerb.perfect)
      fillInCtrl.currentVerb = fillInCtrl.verbs[1];
  };

}

})();
