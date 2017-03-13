(function() {
'use strict';

angular.module('common')
.directive('tooltip', tooltip);

function tooltip() {
  return {
    restrict: 'A',
    link: function(scope, elem, attrs) {
      $(elem).tooltip();
    }
  };
}

})();
