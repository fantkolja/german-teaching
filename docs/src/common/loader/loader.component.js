(function() {
'use strict';

angular.module('common')
.component('loader', {
  template: '<img src="images/loader.gif" alt="loader"/>',
  controller: LoaderController
});

LoaderController.$inject = ["$rootScope"];
function LoaderController($rootScope) {
  var $ctrl = this;
  $ctrl.$onInit = function() {
    $ctrl.show = false;
    var listener = $rootScope.$on('spinner:activate', onSpinnerActivate);
  };

  $ctrl.$onDestroy = function() {
    listener();
  };

  function onSpinnerActivate(event, data) {
    $ctrl.show = data.on;
  }
};

})();
