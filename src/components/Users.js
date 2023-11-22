import React, { useState, useEffect } from 'react';
import {  FaEye, FaTrash } from 'react-icons/fa';
import { collection, getDocs } from 'firebase/firestore';
import { db } from '../config/firebase';

const Users = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, 'users');
      const usersSnapshot = await getDocs(usersCollection);
      const usersData = [];

      usersSnapshot.forEach((doc) => {
        const userData = doc.data();
        usersData.push({
          id: doc.id,
          nom: userData.nom,
          email: userData.email,
        });
      });

      setUsers(usersData);
    };

    fetchUsers();
  }, []);

  return (
    <div className='container'>
        <h1>Liste des eleves</h1>
      <div className="row">
        <div className="mt-4">
          <table className='table'>
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Nom</th>
                <th scope="col">Email</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user.id}>
                  <td>{user.id}</td>
                  <td>{user.nom}</td>
                  <td>{user.email}</td>
                  <td>
                    <FaEye color='blue' className='mx-1' size={25} /> 
                    <FaTrash color='red' size={25} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Users;
