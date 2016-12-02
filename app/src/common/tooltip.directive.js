(function() {
'use strict';

angular.module('common')
.directive('tooltip', tooltip);

function tooltip() {
  return {
    restrict: 'A',
    scope: {
      message: '=msg'
    },
    link: 
  };
}

})();
