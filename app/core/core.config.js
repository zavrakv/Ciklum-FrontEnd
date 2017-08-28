(function () {
  angular
    .module('app.core')
    .config(config);
  
  config.$inject = ['$mdToastProvider', '$mdThemingProvider'];
  
  function config ($mdToastProvider, $mdThemingProvider) {
    
    $mdThemingProvider
      .theme("add-toast");
    
    $mdThemingProvider
      .theme("remove-toast");
  
    // This removes md-theme-style tags from head section
    $mdThemingProvider.generateThemesOnDemand(true);
  }
})();
