import React, { useState } from 'react';
import Books from './Books';

const Dashboard = () => {
    const [books, setBooks] = useState([
        {
            id:1,
            title: 'Harry porter',
            author:'JK Rowlings',
            description: 'Harry Potter...'
        },
        {
            id:2,
            title: 'Tintin',
            author:'JK Rowlings',
            description: 'Tintin...'
        },
        {
            id:3,
            title: 'Node JS',
            author:'JK Rowlings',
            description: 'Node JS...'
        },
    ]);

    const [showModal, setShowModal] = useState(false);
    const [newBook, setNewBook] = useState({
        title: '',
        author: '',
        description: '',
    });

    const handleAddBook = () => {
        const updatedBooks = [
            ...books,
            {
                id: books.length + 1,
                ...newBook,
            },
        ];
    
        setBooks(updatedBooks);
        setNewBook({ title: '', author: '', description: '' });
        setShowModal(false);
    };
    

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setNewBook((prevBook) => ({ ...prevBook, [name]: value }));
    };

  return (
    <div className='container'>
       <div className="row mt-4">
            {books.map((book, index) => (
                <div className='col-md-4' key={index}>
                    <Books {...book}/>
                </div>
            ))}
       </div> 
       <div className="mt-4">
                <button className="btn btn-primary" onClick={() => setShowModal(true)}>
                    Ajouter
                </button>
            </div>
             {showModal && (
                <div className="modal">
                    <div className="modal-content">
                        <span className="close" onClick={() => setShowModal(false)}>
                            &times;
                        </span>
                        <h2>Ajouter un nouveau livre</h2>
                        <form>
                            <label htmlFor="title">Titre:</label>
                            <input
                                type="text"
                                id="title"
                                name="title"
                                value={newBook.title}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="author">Auteur:</label>
                            <input
                                type="text"
                                id="author"
                                name="author"
                                value={newBook.author}
                                onChange={handleInputChange}
                            />

                            <label htmlFor="description">Description:</label>
                            <textarea
                                id="description"
                                name="description"
                                value={newBook.description}
                                onChange={handleInputChange}
                            />

                            <button type="button" onClick={handleAddBook}>
                                Ajouter
                            </button>
                        </form>
                    </div>
                </div>
            )}
    </div>
  )
}

export default Dashboard