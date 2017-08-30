(function () {
	'use strict';

	mainController.$inject = ['FarmsFactory', '$interval'];

	function mainController(FarmsFactory, $interval) {
		var vm = this;
    
    vm.toggleFarmAutorefresh = toggleFarmAutorefresh;
    vm.toggleServersGlobal = toggleServersGlobal;
    vm.toggleAutorefresh = toggleAutorefresh;
    vm.refreshFarm = refreshFarm;
    
    vm.promises = [];
    
    FarmsFactory.getAllFarms()
      .then(function (res) {
        vm.farms = res;
        vm.farms.selected = null
      });
    
    FarmsFactory.getAllServersStatus()
      .then(function (res) {
        var count = 0;
        
        for (var i = 0; i < vm.farms.length; i++) {
          for (var j = 0; j < vm.farms[i].servers.length; j++) {
            vm.farms[i].servers[j].status = res[count];
            count += 1;
          }
        }
      });
    
    function toggleFarmAutorefresh(state, index) {
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
          toggledCount += 1;
        }
      });
  
      return toggledCount;
    }
    
    function clearInterval(id) {
      angular.forEach(vm.promises, function (object, index) {
        
        if (object.serverId === id) {
          $interval.cancel(object.promise);
        }
      })
    }
    
    function toggleAutorefresh(index, $index, farm, server) {
      var count = countToggled(index);
      var serversCount = vm.farms[index].servers.length;
      
      server.toggle ?
        refreshSingleServer(index, farm._id, $index, server._id):
        clearInterval(server._id );
  
      vm.farms[index].toggle = count === serversCount;
    }
    
    function refreshSingleServer(index, id, $index, serverId) {
      var promise = $interval(function interval() {
        
        FarmsFactory.getServerStatus(id, serverId)
          .then(function (res) {
            vm.farms[index].servers[$index].status = res;
          });
      }, 3000);
      
      vm.promises.push({ serverId: serverId, promise: promise })
    }
    
    function refreshFarm(index, id) {
      angular.forEach(vm.farms[index].servers, function (server, ind) {
        refreshSingleServer(index, id, ind, server._id)
      })
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
