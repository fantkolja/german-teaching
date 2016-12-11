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

  var verbArray = VerbListRandomizer.getRandomVerbs(verbs, settings.arrayLength);
  memoCtrl.randomForms = VerbListRandomizer.mixVerbForms(verbArray);

  //stores cards currently being chosen
  var chosenCards = [];
  //counter of found pairs
  var pairCounter = 0;
  $rootScope.$on('memoCard:chosen', function(event, data) {

    if (chosenCards.length) {

      if (chosenCards[0].item.id === data.item.id) {
        //console.log('success');
        pairCounter++;
        chosenCards = [];
        if (pairCounter === 6) console.log('End of the game');

      } else {
        $rootScope.$broadcast('memoCard:restrictEvent', true);
        chosenCards.push(data);
        $timeout(function () {

          chosenCards.forEach(function(item) {

            item.memoCard.addClass('chosen');
            $timeout(function() {
              item.memoCard.removeClass('chosen');
              item.memoCard.find('img').removeClass('hidden');
              item.memoCard.find('div.memo-form').addClass('hidden');
              $rootScope.$broadcast('memoCard:restrictEvent', false);
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
