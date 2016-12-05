(function() {
'use strict';

angular.module('challenges')
.controller('FillInController', FillInController);

FillInController.$inject = ['VerbListService', 'verbs'];
function FillInController(VerbListService, verbs) {
  var fillInCtrl = this;

  var settings = {
    formToFillIn: 'perfect',
    arrayLength: 2,
    restrictedVerbTypes: ''
  };
  fillInCtrl.gameOver = false;

    //gets a random verb array of a set langth
  function getRandomVerbs() {
    var indexArr = [], index, verbArr = [];
    for (var i = 0; i < settings.arrayLength; i++) {
      do {
        index = Math.floor(Math.random() * verbs.length);
      } while (indexArr.indexOf(index) != -1);
      indexArr.push(index);
      verbArr.push(verbs[index]);
    }
    //console.log(verbArr);
    return verbArr;
  }

  var verbArray = getRandomVerbs();

  //function factory that creates a function, that
  //alternates verbs to fill in
  function setNewVerbGetter() {
    var index = 0;
    return function(arr) {
      var nextItem = arr[index];
      index++;
      return nextItem || 'end';
    };
  }

  var getNextVerb = setNewVerbGetter();

  fillInCtrl.currentVerb = getNextVerb(verbArray);

  fillInCtrl.userInput = '';

  fillInCtrl.checkUserInput = function() {
    if(fillInCtrl.userInput === fillInCtrl.currentVerb.perfect) {
      fillInCtrl.currentVerb = getNextVerb(verbArray);
      if (fillInCtrl.currentVerb == 'end') {
        fillInCtrl.gameOver = true;
        return;
      }
      fillInCtrl.userInput = '';
    }
  };

  //placeholder shit. Is it still MVVC???
  fillInCtrl.placeholder = '';

  fillInCtrl.addPlaceholder = function() {
    fillInCtrl.placeholder = 'Type in the ' + settings.formToFillIn + ' form...';
  };

  fillInCtrl.removePlaceholder = function() {
    fillInCtrl.placeholder = '';
  };

}

})();
