import React, { useState } from 'react';
import "./login.css";
import logo from "../../assets/icons/logo.png";
import { signup, login } from '../../firebase.js';
import loadingicon from '../../assets/icons/loadingicon.png';

const Login = () => {

  const [signState, setSignState] = useState("Sign In");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const user_auth = async (event) => {
    event.preventDefault();
    setLoading(true);
    if (signState === "Sign In") {
      await login(email, password);
    } else {
      await signup(name, email, password);
    }
    setLoading(false);
  };

  return (
    loading ? (
      <div className='loading'>
        <img src={loadingicon} alt="Loading..." />
      </div>
    ) : (
      <div className='login'>
        <img src={logo} alt="icon" className='login-icon' />
        <div className='login-form'>
          <h1>{signState}</h1>
          <form onSubmit={user_auth}>
            {signState === "Sign Up" && (
              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                type='text'
                placeholder='Your Name'
                required
              />
            )}

            <input
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              type='email'
              placeholder='Email'
              required
            />

            <input
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              type='password'
              placeholder='Password (min 6 characters)'
              required
            />

            <button type='submit'>{signState}</button>

            <div className='form-help'>
              <div className='remember'>
                <input type='checkbox' id='rememberMe' />
                <label htmlFor='rememberMe'>Remember Me</label>
              </div>
              <p>Need Help?</p>
            </div>
          </form>

          <div className='form-switch'>
            {signState === "Sign In" ? (
              <p>
                New to My App?
                <span onClick={() => setSignState("Sign Up")}> Sign Up Now</span>
              </p>
            ) : (
              <p>
                Already have an account?
                <span onClick={() => setSignState("Sign In")}> Sign In</span>
              </p>
            )}
          </div>
        </div>
      </div>
    )
  );
};

export default Login;