import React, { useState } from 'react';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { addDoc, collection } from 'firebase/firestore';
import { auth, db} from '../config/firebase';
import { Link, useNavigate } from 'react-router-dom';


const Register = ({setIsAuthenticated}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [nom, setNom] = useState('');


    const navigate = useNavigate();

    const handleNomChange = (e) => {
      setNom(e.target.value);
    };
    

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
      };
    
      const handlePasswordChange = (e) => { 
        setPassword(e.target.value);
      };

      const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
      };

   

      const handleRegistration = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            alert("Les mots de passe ne correspondent pas.");
            return;
          }

      try {
        const userCredential = await createUserWithEmailAndPassword(auth, email, password);
        const user = userCredential.user;

        
      await addDoc(collection(db, 'users'), {
        email: email,
        userId: user.uid,
        nom: nom
      });

      setIsAuthenticated(true);
      navigate('/login')
        
        setNom("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");
        
    } catch (err) {
      alert(err.message);
    } 
};
  return (
    <div>
            <form onSubmit={handleRegistration}>

                <h1>Regiter form</h1>
      <div class="mb-3">
            <label for="exampleInputNom" class="form-label">Nom</label>
            <input type="text" class="form-control" id="exampleInputNom" onChange={handleNomChange} autoComplete='off' />
      </div>

    <div class="mb-3">
        <label for="exampleInputEmail1" class="form-label">Email address</label>
        <input type="email" class="form-control" id="exampleInputEmail1"  onChange={handleEmailChange} autoComplete='off'/>
    </div>
    <div class="mb-3">
        <label for="exampleInputPassword1" class="form-label">Password</label>
        <input type="password" class="form-control" id="exampleInputPassword1" onChange={handlePasswordChange} autoComplete='off' />
    </div>
    <div class="mb-3">
        <label for="cfexampleInputPassword1" class="form-label">Confirm Password</label>
        <input type="password" class="form-control" id="cfexampleInputPassword1"   onChange={handleConfirmPasswordChange} autoComplete='off' />
    </div>
    <button type="submit" class="btn btn-primary">Submit</button>
    <p className="text-center fs-5">Vous avez un compte ? <Link to="/login">Connectez-vous</Link></p>
    </form>
    </div>
  )
}

export default Register;