/* Help configure the state-base ui.router */
(function() {
	'use strict';
	
	angular
		.module('blocks.router')
		.provider('routerHelper', routerHelperProvider);
  
	routerHelperProvider.$inject = ['$locationProvider', '$stateProvider', '$urlRouterProvider'];

	function routerHelperProvider($locationProvider, $stateProvider, $urlRouterProvider) {

		var config = {
			resolveAlways: {}
		};
		
		$locationProvider.html5Mode(true);
    
		this.configure = function(cfg) {
			angular.extend(config, cfg);
		};
    
		this.$get = RouterHelper;
		RouterHelper.$inject = ['$state'];

		function RouterHelper($state) {
			var hasOtherwise = false;
			
			return {
				configureStates: configureStates,
				getStates: getStates
			};
      
			function configureStates(states, otherwisePath) {
				states.forEach(function(state) {
					state.config.resolve =
												angular.extend(state.config.resolve || {}, config.resolveAlways);
					$stateProvider.state(state.state, state.config);
				});
				if (otherwisePath && !hasOtherwise) {
					hasOtherwise = true;
					$urlRouterProvider.otherwise(otherwisePath);
				}
			}
      
			function getStates() {
				return $state.get();
			}
		}
	}
})();
