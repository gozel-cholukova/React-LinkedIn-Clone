import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { auth } from './firebase';
import { login } from './features/userSlice'
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const dispatch = useDispatch();

  const register = () => {
    if (!name) {
      return alert("Please enter a full name!");
    }

    auth
    .createUserWithEmailAndPassword(email, password)
    .then((userAuth) => {
      userAuth.user
        .updateProfile({
          displayName: name,
          photoURL: profilePic,
        })
        .then(() => {
          dispatch(
            login({
              email: userAuth.user.email,
              uid: userAuth.user.uid,
              displayName: name,
              photoUrl: profilePic,
            })
          );
        });
      }).catch(error => alert(error));
    };

  const loginToApp = (e) => {
    e.preventDefault();
  };

  return (
    <div className="login">
      <img 
        src="https://www.jobvite.com/wp-content/uploads/2020/09/linkedin-logo.png"
        alt=""
      />

      <form>
        <input
          value={name} 
          onChange={e => setName(e.target.value)}  
          placeholder="Full name (required if registering)" 
          type="text">
        </input>

        <input 
          value={profilePic} 
          onChange={e => setProfilePic(e.target.value)}  
          placeholder="Profile pic URL (optional)" 
          type="text">
        </input>

        <input 
          value={email} 
          onChange={e => setEmail(e.target.value)} 
          placeholder="Email" type="email">
        </input>

        <input 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password" 
          type="password">
        </input>

        <button type="submit" onClick={loginToApp}>Sign In</button>
      </form>

      <p>Not a member?{" "}
        <span className="login__register" onClick={register}>Register Now</span>
      </p>
    </div>
  )
}

export default Login
