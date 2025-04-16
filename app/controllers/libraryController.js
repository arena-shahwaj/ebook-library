angular.module('ebookApp')
  .controller('LibraryController', ['$scope', 'StorageService', 'BookService',
  function($scope, StorageService, BookService) {
    $scope.libraryBooks = [];
    
    // Load library books with error handling
    const loadLibrary = function() {
      try {
        const libraryIds = JSON.parse(StorageService.get('library')) || [];
        BookService.getBooks().then(function(books) {
          $scope.$applyAsync(function() {
            $scope.libraryBooks = books.filter(book => libraryIds.includes(book.id));
          });
        }).catch(error => {
          console.error("Error loading books:", error);
          $scope.libraryBooks = [];
        });
      } catch (e) {
        console.error("Error parsing library data:", e);
        StorageService.set('library', JSON.stringify([]));
        $scope.libraryBooks = [];
      }
    };
    
    $scope.clearLibrary = function() {
      StorageService.set('library', JSON.stringify([]));
      loadLibrary();
    };
    
    $scope.openReader = function(bookId) {
      BookService.getBookById(bookId).then(function(book) {
        const readerWindow = window.open('', '_blank');
        readerWindow.document.write(`
          <!DOCTYPE html>
          <html>
          <head>
            <title>${book.title}</title>
            <link href="https://fonts.googleapis.com/css2?family=Poppins&display=swap" rel="stylesheet">
            <style>/* ... (same styles as above) ... */</style>
          </head>
          <body>
            <!-- ... (same HTML as above) ... -->
          </body>
          </html>
        `);
        readerWindow.document.close();
      });
    };
    
    // Initial load
    loadLibrary();
  }]);