import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Login = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [changePassword, setChangePassword] = useState(false);
  const [changeEmail, setChangeEmail] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate('/signup');
  }

  const handleLogin = async (e) => {
    e.preventDefault();

    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
      method: 'POST',
      body: JSON.stringify({
        email: email,
        password: password,
        returnSecureToken: true
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          navigate('/');
        })
      } else {
        res.json().then((data) => {
          alert(data.error.message);
        })
      }
    })
  }

  const handleForgotPassword = async () => {
    setLoading(true);
    await fetch('https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
      method: 'POST',
      body: JSON.stringify({
        requestType: 'PASSWORD_RESET',
        email: changeEmail
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setLoading(false);
          changePassword(false);
        })
      } else {
        res.json().then((data) => {
          console.log(data);
        })
      }
    })
  }

  return (
    <div style={{ position: 'absolute', top: '30%', left: '40%' }}>
      {!changePassword && <div className='SignupModal'>
        <span style={{ fontSize: '30px', fontWeight: '600', marginTop: '10px' }}>Login</span>
        <form className='SignupForm' onSubmit={handleLogin}>
          <input className='SigninInput' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          <input className='SigninInput' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          <button className='SignupButton' type='submit'>Login</button>
          <span className='ForgotPassword' onClick={() => setChangePassword(true)}>Forgot Password?</span>
        </form>
      </div>}
      {changePassword && <div className='SignupModal'>
        <span style={{ fontSize: '30px', fontWeight: '600', marginTop: '10px' }}>Forgot Password</span>
        <form className='SignupForm' onSubmit={handleForgotPassword}>
          <label style={{margin: '20px 0px'}}>Enter the email with which you have registered.</label>
          <input className='SigninInput' type='email' placeholder='Email' onChange={(e) => setChangeEmail(e.target.value)} />
          {!loading && <button className='SignupButton' type='submit'>Send Link</button>}
          {loading && <p>Loading....</p>}
        </form>
      </div>}
      <button className='LoginButton' onClick={handleNavigate}>
        Don't have an account? Sign up
      </button>
    </div>
  )
}

export default Login;