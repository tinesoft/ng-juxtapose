angular.module('ngJuxtaposeDemo', ['ngJuxtapose', 'ui.bootstrap','prettifyDirective', 'plunker' ])
	.controller('MyCtrl', ['$scope',function ($scope) {
		$scope.options = {};

		$scope.options.beforeImageUrl = 'assets/LIONDOORA.jpg';
		$scope.options.beforeImageLabel = '2009';
		$scope.options.beforeImageCredit = 'WSJ';
		$scope.options.beforeImageAlt = '2009 Alternate text';

		$scope.options.afterImageUrl = 'assets/LIONDOOR_2A.jpg';
		$scope.options.afterImageLabel = '2014';
		$scope.options.afterImageCredit = 'TKO';
		$scope.options.afterImageAlt = '2014 Alternate text';
	}])
	.controller('HolyGrailCtrl', ['$scope',function ($scope) {
		$scope.options = {};

		$scope.options.startingPosition = '30%';
		$scope.options.showLabels = true;
		$scope.options.showCredits = true;
		$scope.options.animate = true;
		$scope.options.vertical = false;

		$scope.options.beforeImageUrl = 'assets/Sochi_11April2005.jpg';
		$scope.options.beforeImageLabel = 'April 2005';
		$scope.options.beforeImageCredit = '';
		$scope.options.beforeImageAlt = '';

		$scope.options.afterImageUrl = 'assets/Sochi_22Nov2013.jpg';
		$scope.options.afterImageLabel = 'Nov 2013';
		$scope.options.afterImageCredit = '';
		$scope.options.afterImageAlt = '';

	}]);