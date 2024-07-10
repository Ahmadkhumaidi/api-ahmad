const {nanoid} = require('nanoid');
const books = require('./books');

const tambahBukuHandler = (request, a) =>{
    const{
        name, year, author, summary, publisher, pageCount, readPage, reading,
    } = request.payload;

    if (name === undefined){
        const response = a.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
    }

    if (pageCount < readPage){
        const response = a.response({
            status: 'fail',
            message: 'Gagal menambahkan buku. readPage tidak boleh lebih besar dari pageCount',
        });

        response.code(400);

        return response;
    }

    const id = nanoid(16);
    const insertedAt = new Date().toISOString();
    const updatedAt = insertedAt;
    const finished = (pageCount === readPage ? true : false);
    const newBook = {
        id,
        name,
        year,
        author,
        summary,
        publisher,
        pageCount,
        readPage,
        finished,
        reading,
        insertedAt,
        updatedAt,
    };

    books.push(newBook);

    const isSuccess = books.filter((book) => book.id===id).length > 0;

    if (isSuccess){
        const response = a.response({
            status: 'success',
            message: 'Buku berhasil ditambahkan',
            data: {
                bookId: id,
            },
        });
        response.code(201);

        return response;
    }
    const response = a.response({
        status: 'fail',
        message: 'Buku gagal ditambahkan',
    });
    response.code(500);

    return response;
};

const ambilSeluruhBukuHandler = (request, a) =>{
    const{name, reading, finished} = request.query;

    let filteredBooks = books;
    if(name !== undefined){
        filteredBooks = filteredBooks.filter((book)=>book.name.toLowerCase().includes(name.toLowerCase()));
    }

    if(reading !==undefined){
        filteredBooks = filteredBooks.filter((book)=>book.reading=== !!Number(reading));
    }

    if(finished !==undefined){
        filteredBooks = filteredBooks.filter((book)=>book.finished=== !!Number(finished));
    }

    const response = a.response({
        status: 'success',
        data:{
            books: filteredBooks.map((book)=>({
                id: book.id,
                name: book.name,
                publisher: book.publisher,
            })),
        },
    });
    response.code(200);

    return response;
};

const ambilBukuByIdHandler = (request, a) => {
    const {bookId} = request.params;
    const book = books.filter((bk)=>bk.id===bookId)[0];

    if (book!== undefined){
        return{
            status: 'success',
            data:{
                book,
            },
        };
    }
    const response = a.response({
        status: 'fail',
        message: 'Buku tidak ditemukan',
    });
    response.code(404);

    return response;
};

const ubahBukuByIdHandler = (request, a) => {
    const {bookId} = request.params;
    const{
        name, 
        year, 
        author, 
        summary, 
        publisher, 
        pageCount, 
        readPage, 
        reading
    } = request.payload;
    
    if(!name){
        const response = a.response({
            status: 'fail',
            message: 'Gagal memperbarui buku. Mohon isi nama buku',
        });
        response.code(400);

        return response;
    }

    if (readPage > pageCount){
        const response = a.response({
            status: "fail",
            message: "Gagal memperbarui buku. readPage tidak boleh lebih besar dari pageCount"        
        });
        response.code(400);

        return response;
    }
    const finished = pageCount === readPage;
    const updatedAt = new Date().toISOString();
    const index = books.findIndex((note)=>note.id === bookId);

    
    if (index !== -1){
        books[index]={
            ...books[index],
            name,
            year,
            author,
            summary,
            publisher,
            pageCount,
            readPage,
            finished,
            reading,
            updatedAt,
        };

        const response = a.response({
            status: 'success',
            message: 'Buku berhasil diperbarui',
        });

        response.code(200);

        return response;
    }
    const response = a.response({
        status: 'fail',
        message: 'Gagal memperbarui buku. Id tidak ditemukan',
    });
    response.code(404);

    return response;
};

const hapusBukuByIdHandler = (request, a) => {
    const {bookId} = request.params;

    const index = books.findIndex((notes)=> notes.id ===bookId);

    if (index !== -1){
        books.splice(index, 1);
        const response = a.response({
            status: 'success',
            message: 'Buku berhasil dihapus',
        });
        response.code(200);

        return response;
    }

    const response = a.response({
        status: 'fail',
        message: 'Buku gagal dihapus. Id tidak ditemukan',
    });
    response.code(404);

    return response;
};

module.exports={
    tambahBukuHandler,
    ambilSeluruhBukuHandler,
    ambilBukuByIdHandler,
    ubahBukuByIdHandler,
    hapusBukuByIdHandler,
};
