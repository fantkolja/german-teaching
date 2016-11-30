(function() {
'use strict';

angular.module('app')
.config(config);

config.$inject = ['$urlRouterProvider', '$stateProvider'];
function config($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('tasks', {
    abstract: true,
    templateUrl: 'tasks/tasks.template.html'
  })
  .state('tasks.fill-in', {
    url: '/tasks',
    templateUrl: 'tasks/fill-in/fill-in.template.html'
  })
  .state('tasks.chose', {
    url: '/tasks',
    templateUrl: 'tasks/chose/chose.template.html'
  })
}

})();
