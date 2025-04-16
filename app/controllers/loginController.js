angular.module('ebookApp')
.controller('LoginController', ['$scope', '$rootScope', '$location', 'AuthService',
function($scope, $rootScope, $location, AuthService) {
  $scope.credentials = {
    username: '',
    password: ''
  };
  
  $scope.login = function() {
    if (AuthService.login($scope.credentials.username, $scope.credentials.password)) {
      $rootScope.isLoggedIn = true;
      $location.path('/discover');
    } else {
      $scope.error = 'Invalid credentials! Use username: ebook, password: 123';
    }
  };
}]);