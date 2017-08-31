(function () {
  'use strict';
  
  menuController.$inject = [];
  
  function menuController() {
    var vm = this;
    
  }
  
  angular
    .module('app.menu')
    .component('menuComponent', {
      templateUrl: 'menu/menu.html',
      controller: menuController,
      controllerAs: 'vm'
    })
})();
