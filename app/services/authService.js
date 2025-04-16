angular.module('ebookApp')
.factory('AuthService', ['StorageService', function(StorageService) {
  return {
    login: function(username, password) {
      if (username === 'ebook' && password === '123') {
        StorageService.set('isLoggedIn', 'true');
        return true;
      }
      return false;
    },
    logout: function() {
      StorageService.remove('isLoggedIn');
    },
    isLoggedIn: function() {
      return StorageService.get('isLoggedIn') === 'true';
    }
  };
}]);