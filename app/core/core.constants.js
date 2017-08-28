(function () {
  'use strict';
  
  angular
    .module('app.core')
    .constant('Config', (function () {
      
      var API_DOMAIN = 'http://localhost:3000' + '/api';
      return {
        
        //getAllPizzas
        getPizzas: API_DOMAIN + '/pizzas'
      }
    })());
})();
