import React, { useState, useEffect } from 'react';
import { FaEye, FaTrash } from 'react-icons/fa';
import { FaBoxArchive } from 'react-icons/fa6';
import { addDoc, collection, deleteDoc, doc, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Link } from 'react-router-dom';
import { Drawer, ButtonToolbar, Button } from 'rsuite';
import { IoNotificationsOutline } from "react-icons/io5";



const Dashboard = () => {
  const [books, setBooks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showDetailsModal, setShowDetailsModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [newBook, setNewBook] = useState({
    title: '',
    author: '',
    description: '',
    imageUrl: '',
    archived: false,
  });

  const [open, setOpen] = React.useState(false);

  useEffect(() => {
    const fetchBooks = async () => {
      const booksCollection = collection(db, 'books');
      const booksSnapshot = await getDocs(booksCollection);
      const booksData = [];

      booksSnapshot.forEach((doc) => {
        const bookData = doc.data();
        booksData.push({
          id: doc.id,
          title: bookData.title,
          author: bookData.author,
          description: bookData.description,
        });
      });

      setBooks(booksData);
    };

    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewBook({ ...newBook, [name]: value });
  };

  const handleCloseModal = () => {
    setShowModal(false);
    setNewBook({
      title: '',
      author: '',
      description: '',
    });
  };

  const handleShowModal = () => {
    setShowModal(true);
  };

  const handleShowDetailsModal = (book) => {
    setSelectedBook(book);
    setShowDetailsModal(true);
  };

  const handleCloseDetailsModal = () => {
    setSelectedBook(null);
    setShowDetailsModal(false);
  };

  const handleAddBook = async () => {

    if (!newBook.title || !newBook.author || !newBook.description || !newBook.imageUrl) {
      toast.warning("Veuillez remplir tous les champs.");
      return;
    }

    try {
      const docRef = await addDoc(collection(db, 'books'), newBook);

      setNewBook({
        id: docRef.id,
        title: '',
        author: '',
        description: '',
        imageUrl: ''
      });

      setBooks([...books, { id: docRef.id, ...newBook }]);
      setShowModal(false);
    } catch (error) {
      console.error('Erreur: ', error);
    }
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteDoc(doc(db, 'books', bookId));
    } catch (error) {
      console.error('Error', error);
    }

    const updatedBooks = books.filter((book) => book.id !== bookId);
    setBooks(updatedBooks);
  };

 

  return (
    <div className='container'>

      <ToastContainer />
      <h1>Liste des Livres</h1>
      <p><Link to="/users">
      Voir les utilisateurs
      </Link></p>
      <ButtonToolbar>
        <Button onClick={() => setOpen(true)}><IoNotificationsOutline size={30} /></Button>
      </ButtonToolbar>

      <Drawer size='xs'  open={open} onClose={() => setOpen(false)}>
        <Drawer.Body>
        <h2>Historique</h2>
        <ul>
          <li> <strong> MERN</strong></li>
          <li> <strong>Laravel</strong> </li>
          <li> <strong>Bootstrap</strong> </li>
        </ul>
        </Drawer.Body>
      </Drawer>

      <div className="mt-3 text-end">
        <button className="btn btn-primary" onClick={handleShowModal}>
          Ajouter
        </button>
      </div>
      <div
        className={`modal fade ${showModal ? 'show' : ''}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: showModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Ajouter un Livre
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseModal}
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Titre
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="title"
                    value={newBook.title}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="author" className="form-label">
                    Auteur
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="author"
                    name="author"
                    value={newBook.author}
                    onChange={handleInputChange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="description" className="form-label">
                    Description
                  </label>
                  <textarea
                    className="form-control"
                    id="description"
                    rows="3"
                    name="description"
                    value={newBook.description}
                    onChange={handleInputChange}
                  ></textarea>
                </div>
                <div className="mb-3">
                  <label htmlFor="imageUrl" className="form-label">
                    URL de l'image
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="imageUrl"
                    name="imageUrl"
                    value={newBook.imageUrl}
                    onChange={handleInputChange}  
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                onClick={handleCloseModal}
              >
                Annuler
              </button>
              <button type="button" className="btn btn-primary" onClick={handleAddBook}>
                Ajouter
              </button>
            </div>
          </div>
        </div>
      </div>

      <div
        className={`modal fade ${showDetailsModal ? 'show' : ''}`}
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
        style={{ display: showDetailsModal ? 'block' : 'none' }}
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Détails du Livre
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                onClick={handleCloseDetailsModal}
              ></button>
            </div>
            <div className="modal-body">
              {selectedBook && (
                <div>
                  <h5>{selectedBook.title}</h5>
                  <p>Auteur: {selectedBook.author}</p>
                  <p>Description: {selectedBook.description}</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="row mt-4">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Titre</th>
              <th scope="col">Auteur</th>
              <th scope="col">Description</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map((book) => (
              <tr key={book.id} className={book.archivé ? 'archived-row' : ''}>
                <td>{book.id}</td>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.description}</td>
                <td>
                  <FaEye
                    color='blue'
                    size={25}
                    onClick={() => handleShowDetailsModal(book)}
                    style={{ cursor: 'pointer' }}
                  />
                </td>
                <td>
                  <FaTrash
                    color='red'
                    size={25}
                    onClick={() => handleDeleteBook(book.id)}
                    style={{ cursor: 'pointer' }}
                  />
                  </td> 
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dashboard;
