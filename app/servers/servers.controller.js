(function () {
  'use strict';
  
  serversController.$inject = [];
  
  function serversController() {
    var vm = this;
    
  }
  
  angular
    .module('app.servers')
    .component('serversComponent', {
      templateUrl: 'servers/servers.html',
      controller: serversController,
      controllerAs: 'vm',
      bindings: {
        server: '<'
      }
    })
})();
