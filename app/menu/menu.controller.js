(function () {
  'use strict';
  
  menuController.$inject = ['$state', '$scope', '$rootScope'];
  
  function menuController($state, $scope, $rootScope) {
    var vm = this;
    
    $rootScope.$on('$viewContentLoading', function () {
      vm.currentPage = $state.current.name;
    });
    
    vm.menuItems = [{
      menuName: 'List',
      href: '/list',
      uiSref: 'list'
    }, {
      menuName: 'Modify Farms',
      href: '/modify-farms',
      uiSref: 'cart'
    }]
    
  }
  
  angular
    .module('app.menu')
    .component('menuComponent', {
      templateUrl: 'menu/menu.html',
      controller: menuController,
      controllerAs: 'vm'
    })
})();
