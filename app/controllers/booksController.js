angular.module('ebookApp')
.controller('BooksController', ['$scope', 'BookService', 'StorageService',
function($scope, BookService, StorageService) {
  $scope.books = [];
  $scope.searchQuery = '';
  
  function loadBooks() {
    BookService.searchBooks($scope.searchQuery, $scope.selectedCategory)
      .then(function(books) {
        $scope.books = books;
      });
  }
  
  $scope.filterByCategory = function(category) {
    $scope.selectedCategory = category;
    loadBooks();
  };
  
  $scope.addToLibrary = function(bookId) {
    var library = JSON.parse(StorageService.get('library') || '[]');
    if (!library.includes(bookId)) {
      library.push(bookId);
      StorageService.set('library', JSON.stringify(library));
    }
  };
  
  $scope.openReader = function(bookId) {
    BookService.getBookById(bookId).then(function(book) {
      var readerWindow = window.open('', '_blank');
      readerWindow.document.write(`
        <!DOCTYPE html>
        <html>
        <head>
          <title>${book.title}</title>
          <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
          <style>
            body { font-family: 'Poppins', sans-serif; padding: 20px; max-width: 800px; margin: 0 auto; }
            .close-btn { position: fixed; top: 20px; right: 20px; background: #000; color: white; border: none; border-radius: 50%; width: 40px; height: 40px; font-size: 20px; cursor: pointer; }
          </style>
        </head>
        <body>
          <button class="close-btn" onclick="window.close()">×</button>
          <h1>${book.title}</h1>
          <p><em>by ${book.author}</em></p>
          <hr>
          <div>${book.content}</div>
        </body>
        </html>
      `);
      readerWindow.document.close();
    });
  };
  
  // Initialize
  loadBooks();
  
  // Watch for search changes
  $scope.$watch('searchQuery', function() {
    loadBooks();
  });
}]);