'use strict';
describe('common module', function() {

  describe('VerbListService should', function functionName() {
    var VerbListService, $httpBackend;

    beforeEach(function() {
      module('common');

      inject(function($injector) {
        VerbListService = $injector.get('VerbListService');
        $httpBackend = $injector.get('$httpBackend');
      });
    });

    it('return verb list', function() {
      $httpBackend.whenGET('data/verbs.json')
        .respond([
          {
            "type": "stark",
            "infinitiv": "abbiegen",
            "third_person": "biegt ab",
            "praeteritum": "bog ab",
            "perfekt": "abgebogen",
            "hilfsverb": "sein",
            "separable_prefix": "true",
            "adding_ge": "true",
            "ukr": "повертати"
          }]);


      VerbListService.getAllVerbs().then(function(res) {
          expect(res).toEqual([
            {
              "type": "stark",
              "infinitiv": "abbiegen",
              "third_person": "biegt ab",
              "praeteritum": "bog ab",
              "perfekt": "abgebogen",
              "hilfsverb": "sein",
              "separable_prefix": "true",
              "adding_ge": "true",
              "ukr": "повертати"
            }]);
        });
      $httpBackend.flush();
    });
  });
});
