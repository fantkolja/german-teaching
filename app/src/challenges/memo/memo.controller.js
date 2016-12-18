(function() {
'use strict';

angular.module('challenges')
.controller('MemoController', MemoController);

MemoController.$inject = ['verbs', 'VerbListRandomizer', '$rootScope', '$timeout'];
function MemoController(verbs, VerbListRandomizer, $rootScope, $timeout) {
  var memoCtrl = this;

  var settings = {
    formToFillIn: 'perfect',
    arrayLength: 6,
    restrictedVerbTypes: ''
  };

  //variables for controller init
  var verbArray, chosenCards, pairCounter;

  memoCtrl.init = function() {
    verbArray = VerbListRandomizer.getRandomVerbs(verbs, settings.arrayLength);
    memoCtrl.randomForms = VerbListRandomizer.mixVerbForms(verbArray);

    memoCtrl.gameIsOn = true;
    //stores cards currently being chosen
    chosenCards = [];
    //counter of found pairs
    pairCounter = 0;
  };

  memoCtrl.init();

  //destroy previous listener if present
  if ($rootScope.listener)
    $rootScope.listener();

  $rootScope.listener = $rootScope.$on('memoCard:chosen', function(event, data) {

    if (chosenCards.length) {

      if (chosenCards[0].item.id === data.item.id) {
        //2 cards stay open
        pairCounter++;
        chosenCards = [];
        
        //all cards are open
        if (pairCounter === 6) {
          memoCtrl.gameIsOn = false;
        }

      } else {
        $rootScope.$broadcast('memoCard:restrictEvent', true);
        //push both cards for siplicity in animation
        chosenCards.push(data);
        $timeout(function () {

          chosenCards.forEach(function(item) {
            item.memoCard.addClass('chosen');
            $timeout(function() {
              //animation
              item.memoCard.removeClass('chosen');
              item.memoCard.find('img').removeClass('hidden');
              item.memoCard.find('div.memo-form').addClass('hidden');

              //restrict double animation
              $rootScope.$broadcast('memoCard:restrictEvent', false);

              //enable open the card
              item.memoCard.isOpen = false;
            }, 500);
            chosenCards = [];
          });
        }, 1000);
      }
    } else {
      chosenCards.push(data);
    }
  });

}

})();
