(function() {
'use strict';

angular.module('common')
.factory('loadingHttpInterceptor', LoadingHttpInterceptor);

LoadingHttpInterceptor.$inject = ['$rootScope', '$q'];
function LoadingHttpInterceptor($rootScope, $q) {
  var loadingCount = 0, loadingEventName = 'spinner:activate';

  return {
    request: function(config) {
      if (++loadingCount === 1)
        $rootScope.$broadcast(loadingEventName, {on: true});

      return config;
    },

    response: function(res) {
      if (--loadingCount === 0)
        $rootScope.$broadcast(loadingEventName, {on: false});

      return res;
    },

    responseError: function(res) {
      console.log(res);
      if (--loadingCount === 0)
        $rootScope.$broadcast(loadingEventName, {on: false});
      return $q.reject(res);
    }
  };
}

})();
