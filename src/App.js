import logo from './logo.svg';
import './App.css';
import Signup from './components/Signup';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Login from './components/Login';
import Home from './components/Home';
import Inbox from './components/Inbox';
import Email from './components/Email';
import SentEmail from './components/SentEmail';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
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
