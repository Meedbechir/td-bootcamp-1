import './App.css';
import Login from './components/Login';
import Register from './components/Register';
// import { signOut } from 'firebase/auth';
// import { auth } from './config/firebase';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Books';
import Users from './components/Users';
import { useState } from 'react';
import UserPage from './components/UserPage';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  // const handleSignOut = async () => {
  //   try {
  //     await signOut(auth);
  //     alert('Deconnexion réussie')
  //   } catch (error) {
  //     console.error('Erreur lors de la déconnexion :', error);
  //   }
  // };
  return (
    <Router>
      <div className="container mt-5">
        <Routes> 
          <Route path='/' element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path='/users' element={<Users setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path='/dashboard' element={isAuthenticated ? <UserPage /> : <Navigate to="/login" />} />
        </Routes>  
      {/* <button class="btn btn-outline-danger mt-5" onClick={handleSignOut}>Deconnexion</button>   */}
    </div>
    </Router>
    
  );
}

export default App;
