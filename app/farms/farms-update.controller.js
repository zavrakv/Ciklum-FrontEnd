(function () {
  'use strict';
  
  farmsUpdateController.$inject = ['$state', '$scope', '$rootScope', 'FarmsFactory'];
  
  function farmsUpdateController($state, $scope, $rootScope, FarmsFactory) {
    var vm = this;
    
    FarmsFactory.getAllFarms()
      .then(function (res) {
        vm.farms = res;
      })
  }
  
  angular
    .module('app.farms')
    .component('farmsComponent', {
      templateUrl: 'farms/farms-update.html',
      controller: farmsUpdateController,
      controllerAs: 'vm'
    })
})();
