(function () {
  angular
    .module('app.core')
    .config(config);
  
  config.$inject = [];
  
  function config () {
    
    // // This removes md-theme-style tags from head section
    // $mdThemingProvider.generateThemesOnDemand(true);
  }
})();
