angular.module('ebookApp')
.factory('BookService', ['BOOK_DATA', '$filter', '$q', 
function(BOOK_DATA, $filter, $q) {
  return {
    getBooks: function() {
      return $q.when(BOOK_DATA);
    },
    getBookById: function(id) {
      return $q.when($filter('filter')(BOOK_DATA, {id: id})[0]);
    },
    searchBooks: function(query, category) {
      var filtered = BOOK_DATA;
      
      if (category && category !== 'all') {
        filtered = $filter('filter')(filtered, {category: category});
      }
      
      if (query) {
        filtered = $filter('filter')(filtered, query);
      }
      
      return $q.when(filtered);
    }
  };
}]);