import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import { BrowserRouter, NavLink, Route, Routes, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Inbox from './components/Inbox';
import Email from './components/Email';
import SentEmail from './components/SentEmail';
import { useDispatch, useSelector } from 'react-redux';
import { authActions } from './store/AuthReducer';

function App() {

  const dispatch = useDispatch();
  const token = useSelector(state => state.auth.token);

  const handleLogout = () => {
    dispatch(authActions.logout());
  }

  return (
    <div className="App">
      <BrowserRouter>
        <NavLink to='/login'>
          {token && <button className='LogoutButton' onClick={handleLogout}>Logout</button>}
        </NavLink>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/signup' element={<Signup />} />
          <Route path='/' element={<Home />} />
          <Route path='/inbox' element={<Inbox />} />
          <Route path='/:id' element={<Email />} />
          <Route path='/sent' element={<SentEmail />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
