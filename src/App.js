import './App.css';
import Login from './components/Login';
import Register from './components/Register';

import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from './components/Books';
import Users from './components/Users';
import { useState } from 'react';
import UserPage from './components/UserPage';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  return (
    <Router>
      <div className="container mt-5">
        <Routes> 
          <Route path='/' element={<Register setIsAuthenticated={setIsAuthenticated} />} />
          <Route path='/login' element={<Login setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path='/users' element={<Users setIsAuthenticated={setIsAuthenticated}/>} />
          <Route path='/dashboard' element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" />} />
          <Route path='/userpage' element={isAuthenticated ? <UserPage  /> : <Navigate to="/login" />} />
        </Routes>
    </div>
    </Router>
    
  );
}

export default App;
