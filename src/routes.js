const {
    tambahBukuHandler,
    ambilSeluruhBukuHandler,
    ambilBukuByIdHandler,
    ubahBukuByIdHandler,
    hapusBukuByIdHandler,
  } = require('./handler');
  
  const routes = [
    {
      method: 'POST',
      path: '/books',
      handler: tambahBukuHandler,
    },
    {
      method: 'GET',
      path: '/books',
      handler: ambilSeluruhBukuHandler,
    },
    {
      method: 'GET',
      path: '/books/{bookId}',
      handler: ambilBukuByIdHandler,
    },
    {
      method: 'PUT',
      path: '/books/{bookId}',
      handler: ubahBukuByIdHandler,
    },
    {
      method: 'DELETE',
      path: '/books/{bookId}',
      handler: hapusBukuByIdHandler,
    },
  ];
  
  module.exports = routes;
  