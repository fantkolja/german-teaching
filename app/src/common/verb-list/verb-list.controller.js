(function() {
'use strict';

angular.module('common')
.controller('VerbListController', VerbListController);

VerbListController.$inject = ['verbs'];
function VerbListController(verbs) {
  var verbListCtrl = this;

  verbListCtrl.settings = {
    kindOn: false,
    infinitivOn: true,
    thirdPersonOn: true,
    praeteritumOn: false,
    auxilliaryVerbOn: true,
    ukrOn: true
  };

  verbListCtrl.verbs = verbs;
}

})();
