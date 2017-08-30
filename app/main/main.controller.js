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
    vm.refreshTime = 3000;
    /*TODO: create interval reset time (to change for other values)*/
    vm.infoFields = ['queues', 'thread', 'database'];
    
    function toggleFarmAutorefresh(state, index) {
      toggleServersGlobal(state, index)
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
      angular.forEach(vm.promises, function (object) {
        
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
      }, vm.refreshTime);
      
      vm.promises.push({ serverId: serverId, promise: promise })
    }
    
    function refreshFarm(index, farm) {
      
      angular.forEach(vm.farms[index].servers, function (server, ind) {
        if (farm.toggle) {
          refreshSingleServer(index, farm._id, ind, server._id)
        } else {
          clearInterval(server._id );
        }
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
        farms: '<'
      }
    })
})();
