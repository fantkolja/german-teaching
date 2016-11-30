(function() {
'use strict';

angular.module('common')
.controller('VerbListController', VerbListController);

VerbListController.$inject = ['VerbListService', 'verbs'];
function VerbListController(VerbListService, verbs) {
  var ctrl = this;
  ctrl.verbs = verbs;
}

})();
