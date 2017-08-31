(function () {
  
	angular.module('app.core', [
    /*
     * Angular modules
     */
    'ngAnimate', 'ngAria', 'ngMessages', 'ngMaterial',
    /*
     * Our reusable cross app code modules
     */
    'blocks.router',
    /*
     * 3rd Party modules
     */
    'ui.router'
	]);
  
})();
