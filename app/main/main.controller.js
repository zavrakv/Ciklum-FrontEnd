(function () {
	'use strict';

	mainController.$inject = ['FarmsFactory'];

	function mainController(FarmsFactory) {
		var vm = this;
    
    vm.toggleFarmAutorefresh = toggleFarmAutorefresh;
    vm.toggleServersGlobal = toggleServersGlobal;
    vm.toggleAutorefresh = toggleAutorefresh;
    
    FarmsFactory.getAllFarms()
      .then(function (res) {
        console.log(res);
        vm.farms = res;
        vm.farms.selected = null
      });
    
    function toggleFarmAutorefresh(state, index) {
      // console.log(!state, index)
      // console.log(index)
      toggleServersGlobal(!state, index)
    }
    
    function toggleServersGlobal(state, index) {
      angular.forEach(vm.farms[index].servers, function (server) {
        server.toggle = state;
      })
    }
    
    function countToggled(index) {
      var toggledCount = 0;
      angular.forEach(vm.farms[index].servers, function (server) {
        if(server.toggle) {
          toggledCount += 1
        }
      });
  
      return toggledCount;
    }
    
    function toggleAutorefresh(index) {
      var count = countToggled(index);
      var serversCount = vm.farms[index].servers.length;
      console.log(count)
      if (count === serversCount) {
        vm.farms[index].toggle = true;
      } else {
        vm.farms[index].toggle = false;
      }
    }
    
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
