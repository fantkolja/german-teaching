'use strict';

describe('common module', function() {

  //provide mock services
  beforeEach(function() {
    module(function($provide) {
      $provide.service('MockVerbListService', function() {
        var service = this;
        service.getAllVerbs = function() {
          return 'verbs';
        };
      })
    });

    //load module
    module('common');
  });

  describe('verb-list controller', function(){
    var $controller, verbListCtrl, VerbListService, verbs;

    beforeEach(inject(function(_$controller_) {
      $controller = _$controller_;
      verbListCtrl = $controller('VerbListController', {verbs: verbs});
    }));

    it('should be defined', function() {
      expect(verbListCtrl).toBeDefined();
    });

  });
});
