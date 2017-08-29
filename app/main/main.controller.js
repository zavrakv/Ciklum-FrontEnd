(function () {
	'use strict';

	mainController.$inject = ['FarmsFactory'];

	function mainController(FarmsFactory) {
		var vm = this;
  
		
    
    FarmsFactory.getAllFarms()
      .then(function (res) {
        console.log(res);
        vm.farms = res;
        vm.farms.selected = null
      });
    
  }
  
  angular
    .module('app.main')
    .component('mainComponent', {
      templateUrl: 'main/main-page.html',
			controller: mainController,
			controllerAs: 'vm',
      bindings: {
      
      }
    })
})();
