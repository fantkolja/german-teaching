(function() {
'use strict';

angular.module('common')
.service('VerbListRandomizer', VerbListRandomizer);

function VerbListRandomizer() {
  var service = this;

  //gets a random verb array of a set langth
  service.getRandomVerbs = function(verbs, arrayLength) {
    var indexArr = [], index, verbArr = [];
    for (var i = 0; i < arrayLength; i++) {
      do {
        index = Math.floor(Math.random() * verbs.length);
      } while (indexArr.indexOf(index) != -1);
      indexArr.push(index);
      verbArr.push(verbs[index]);
    }
    //console.log(verbArr);
    return verbArr;
  };

  //function factory that creates a function, that
  //alternates verbs to fill in
  service.setNewVerbGetter = function() {
    var index = 0;
    return function(arr) {
      var nextItem = arr[index];
      index++;
      return nextItem || 'end';
    };
  }

}

})();
