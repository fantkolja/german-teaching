(function() {
'use strict';

angular.module('common')
.service('VerbListService', VerbListService);

VerbListService.$inject = ['$http'];
function VerbListService($http) {
  var service = this;

  service.getAllVerbs = function() {
    return $http.get('data/verbs.json').then(function(res) {
      return res.data;
    }).catch(function(err) {
      console.log('VerbListService.getAllVerbs doesn\'t work, returned:', err);
    });
  };

}

})();
