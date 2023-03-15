import { useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import './Signup.css';

const Signup = () => {

  const [email, setEmail] = useState(null);
  const [password, setPassword] = useState(null);
  const [confirmPassword, setConfirmPassword] = useState(null);
  // const navigate = useNavigate();

  // const handleNav = () => {
  //   navigate('/Login');
  // }

  const handleSignup = async (e) => {
    e.preventDefault();

    if (!password && !confirmPassword && !email) {
      alert('Please enter all the fields');
    } else {
      if (password === confirmPassword) {
        await fetch('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCszasJf5BQUdZzWYKXbjjvKo5BlnvW79Q', {
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
              console.log(data, 'success');
            })
          } else {
            res.json().then((data) => {
              console.log(data, 'fail');
            })
          }
        })
      } else {
        alert('Check if password is correct');
      }
    }


  }

  return (
    <div style={{ position: 'absolute', top: '30%', left: '40%' }}>
      <div className='SignupModal'>
        <span style={{ fontSize: '30px', fontWeight: '600', marginTop: '10px' }}>SignUp</span>
        <form className='SignupForm' onSubmit={handleSignup}>
          <input className='SignupInput' type='email' placeholder='Email' onChange={(e) => setEmail(e.target.value)} />
          <input className='SignupInput' type='password' placeholder='Password' onChange={(e) => setPassword(e.target.value)} />
          <input className='SignupInput' type='text' placeholder='Confirm Password' onChange={(e) => setConfirmPassword(e.target.value)} />
          <button className='SignupButton' type='submit'>Sign up</button>
        </form>
      </div>
      <button className='LoginButton' /* onClick={handleNav} */>
        Have an account? Login
      </button>
    </div>
  )
}

export default Signup;