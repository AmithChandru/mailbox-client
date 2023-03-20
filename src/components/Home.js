import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Home.css';

const Home = () => {

  const [content, setContent] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const readEmail = useSelector(state => state.email.readEmail);
  const [unreadEmail, setUnreadEmail] = useState(0);

  useEffect(() => {
    !token && navigate('/login');
    getTotalEmail();
  }, [])

  const getTotalEmail = async () => {
    let temp = [], count = 0;
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/email/readEmail.json')
      .then((res) => {
        res.json().then((data) => {
          for (const key in data) {
            temp.push(data[key].id);
          }
        })
      })
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/email.json')
      .then((res) => {
        res.json().then((data) => {
          for (const key in data) {
            if (data[key].receiverEmail === token.email) {
              if (temp.indexOf(key) < 0) {
                count++;
              }
            }
          }
          setUnreadEmail(count);
        })
      })
  }

  const handleChange = (value) => {
    setContent(value);
  }

  const handleInboxClick = () => {
    navigate('/inbox');
  }

  const handleSendClick = async (e) => {
    e.preventDefault();

    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/email.json', {
      method: 'POST',
      body: JSON.stringify({
        receiverEmail: email,
        subject: subject,
        content: content,
        senderEmail: token.email
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          console.log(data);
          setEmail('');
          setSubject('');
          setContent('');
        })
      } else {
        res.json().then((data) => {
          console.log(data, 'error');
        })
      }
    })
  }

  const handleSentClick = () => {
    navigate('/sent');
  }

  return (
    <div className="HomeContainer">
      <button className='ComposeButton' onClick={handleInboxClick}>Inbox ({unreadEmail})</button>
      <button className='SecondNavButton' onClick={handleSentClick}>Sent Email</button>
      <form className='MailForm' onSubmit={handleSendClick}>
        <div className='InputEmail'>
          <label style={{marginRight: '10px'}}>To :</label>
          <input type='email' style={{width: '100%'}} onChange={(e) => setEmail(e.target.value)} value={email} />
        </div>
        <input type='text' placeholder='Subject' style={{padding: '10px', margin: '10px 10px'}} value={subject} onChange={(e) => setSubject(e.target.value)} />
        <ReactQuill theme='snow' value={content} onChange={handleChange} className='WrapperClass' />
        <button className='SendButton' type='submit'>Send</button>
      </form>
    </div>
  )
}

export default Home;