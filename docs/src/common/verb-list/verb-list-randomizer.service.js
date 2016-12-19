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
  //takes counter and changes it, so the side effect is
  service.setNewVerbGetter = function(counter) {
    counter.index = 0;
    return function(arr) {
      var nextItem = arr[counter.index];
      counter.index++;
      return nextItem || 'end';
    };
  };

   // returns an array of objects with paired values
  //of each item in an input array
  service.mixVerbForms = function(verbArray) {
    var mixedFormes = [], indexArray = [];

    //get random indexes
    for (var i = 0; i < verbArray.length * 2; i++) {
      indexArray.push(i);
    }
    indexArray = indexArray.sort(function() {
      return Math.random() - 0.5;
    });
    //console.log(indexArray);

    indexArray.forEach(function(val) {
      var nextItem = {};

      nextItem.id = Math.floor(val / 2);
      //console.log(nextItem.id);
      if (!(val / 2 - Math.floor(val / 2))) {
        nextItem.form = verbArray[nextItem.id].infinitiv;
      } else {
        nextItem.form = verbArray[nextItem.id].perfect;
      }
      mixedFormes.push(nextItem);
    });
    //console.log(mixedFormes);
    return mixedFormes;
  };

}

})();
