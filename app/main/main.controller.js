(function () {
	'use strict';

	mainController.$inject = [];

	function mainController() {
		var vm = this;
    
  
    
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
