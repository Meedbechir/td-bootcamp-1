import React, { useState, useEffect } from 'react';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import { signOut } from 'firebase/auth';
// import { auth } from '../config/firebase';

const UserPage = () => {
  const [books, setBooks] = useState([]);   
  const [emprunter, setEmprunter] = useState(false);

// Fonction pour emprunter un livre
  const handleEmprunterClick = (bookId, bookTitle) => {
    setEmprunter((prevStates) => ({
      ...prevStates,
      [bookId]: true,
    }));
    

    toast.success(`Vous avez emprunté le livre "${bookTitle}"`);
  };

// Fonction pour rendre un livre
  const handleRendreClick = (bookId, bookTitle) => {
    setEmprunter((prevStates) => ({
      ...prevStates,
      [bookId]: false,
    }));
    toast.info(`Vous avez rendu le livre "${bookTitle}"`);
  };

  // Fetch des livres depuis firestore
  useEffect(() => {
    const fetchBooks = async () => {
      try {
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
            imageUrl: bookData.imageUrl,
          });
        });

        setBooks(booksData);
        console.log('Recuperation reussie')
      } catch (error) {
        console.error('Erreur: ', error);
        console.log('Echec')
      }
    };

    fetchBooks();
  }, []);

// Fonction de déconnexion
  // const handleSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //     window.location.href='/login';
  //   } catch (error) {
  //     console.error('Erreur');
  //   }
  // };

  return (
    <div>
              <ToastContainer />

      <h2>User Page</h2>
      <div className="card-container">
        {/* Map des livres */}
        {books.map((book) => (
          <div key={book.id} className="card">
            {book.imageUrl && (
              <img src={book.imageUrl} alt='Img' style={{ maxWidth: '100%', maxHeight:'70vh' }} />
            )}
            <h3>{book.title}</h3>
            <p>Auteur: {book.author}</p>
            <p className='text-truncate'>Description: {book.description}</p>
            <div className="">
              {/* Bouttons pour emprunter et rendre */}
              
              <button className='btn btn-info p-1 me-2' onClick={() => handleEmprunterClick(book.id, book.title)} disabled={emprunter[book.id]}>
                Emprunter
              </button>
              <button className='btn btn-primary p-1 me-2' onClick={() => handleRendreClick(book.id, book.title)} disabled={!emprunter[book.id]}>
                Rendre
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserPage;
