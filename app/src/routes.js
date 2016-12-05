(function() {
'use strict';

angular.module('app')
.config(config);

config.$inject = ['$urlRouterProvider', '$stateProvider'];
function config($urlRouterProvider, $stateProvider) {
  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/home/home.template.html'
  })
  .state('challenges', {
    abstract: true,
    templateUrl: 'src/challenges/challenges.template.html'
  })
  .state('challenges.memo', {
    url: '/memo',
    templateUrl: 'src/challenges/memo/memo.template.html'
  })
  .state('challenges.chose', {
    url: '/chose',
    templateUrl: 'src/challenges/chose/chose.template.html'
  })

  //change to component, resolveonly array verbs
  .state('challenges.fill-in', {
    url: '/fill-in',
    templateUrl: 'src/challenges/fill-in/fill-in.template.html',
    controller: 'FillInController',
    controllerAs: 'fillInCtrl',
    resolve: {
      verbs: ['VerbListService', function(VerbListService) {
        return VerbListService.getAllVerbs();
      }]
    }
  })
  .state('challenges.settings', {
    url: '/settings',
    templateUrl: 'src/challenges/settings/settings.template.html'
  })
  .state('verb-list', {
    url: '/verb-list',
    templateUrl: 'src/common/verb-list/verb-list.template.html',
    controller: 'VerbListController',
    controllerAs: 'verbListCtrl',
    resolve: {
      verbs: ['VerbListService', function(VerbListService) {
        return VerbListService.getAllVerbs();
      }]
    }
  });
}

})();
