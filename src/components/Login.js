import React, { useState } from 'react';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth, db } from '../config/firebase';
import { collection } from 'firebase/firestore';
import { Link, useNavigate } from 'react-router-dom';




const Login = ({setIsAuthenticated}) => {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    
    const navigate = useNavigate();

    
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  }

    const handleLogin = async (e) => {
        e.preventDefault();

        try {
            await signInWithEmailAndPassword(auth, email, password);
            const usersCollection = collection(db, 'users');

            setEmail('');
            setPassword('');
            setIsAuthenticated(true)
            navigate('/dashboard');
           
    }catch (error) {
        alert('Échec de la connexion. Veuillez vérifier vos informations.');
        console.error(error);
      }
};

  return (
    <div className='mt-5'>
            <form onSubmit={handleLogin}>
                <h1>Login Form</h1>
    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1" onChange={handleEmailChange}
                    value={email} autoComplete='off'/>
    </div>
    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1"  onChange={handlePasswordChange}
                    value={password} autoComplete='off' />
    </div>
    <button type="submit" class="btn btn-primary">Se connecter</button>
    <p className="text-center fs-5">
                  Vous n'avez pas de compte ? <Link to="/">Inscrivez-vous</Link>
      </p>
    </form>
    </div>
  )
}

export default Login;