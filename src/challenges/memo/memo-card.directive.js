(function() {
'use strict';

angular.module('challenges')
.directive('memoCard', memoCard);

memoCard.$inject = ['$timeout'];
function memoCard($timeout) {
  return {
    templateUrl: 'src/challenges/memo/memo-card.template.html',
    restrict: 'E',
    scope: {
      item: '='
    },
    link: link
  };

  function link(scope, elem, attrs) {
    var memoCard = elem.find('.memo-card');
    //to prevent multiple events at the same time
    var isEventRestricted = false;
    memoCard.isOpen = false;
    //listener
    var listener;

    listener = scope.$on('memoCard:restrictEvent', function(event, isRestricted) {
      isEventRestricted = isRestricted;
    });

    memoCard.on('click', function() {
      if (isEventRestricted || memoCard.isOpen) return;
      memoCard.isOpen = true;

      //emit event
      scope.$emit('memoCard:chosen', {
        'item': scope.item,
        'memoCard': memoCard
      });

      //animation
      memoCard.addClass('chosen');

      $timeout(function() {
        memoCard.removeClass('chosen');
        memoCard.find('img').addClass('hidden');
        memoCard.find('div.memo-form').removeClass('hidden');
      }, 500);
    });

    scope.$onDestroy = function() {
      listener();
    }
  }
}

})();
