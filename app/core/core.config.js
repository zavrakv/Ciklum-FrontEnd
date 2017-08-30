(function () {
  angular
    .module('app.core')
    .config(config);
  
  config.$inject = ['$mdThemingProvider'];
  
  function config ($mdThemingProvider) {
   
    var farmGreenMap = $mdThemingProvider.extendPalette('green', {
      '500': '#27ae61'
    });
    
    $mdThemingProvider.definePalette('farmGreen', farmGreenMap);
    
    $mdThemingProvider.theme('default')
      .accentPalette('farmGreen', {
        'default': '500'
      });
  
  }
})();
