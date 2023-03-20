import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import './Inbox.css';

const SentEmail = () => {

  const [emails, setEmails] = useState(null);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    !token && navigate('/login');
    getEmails();
  }, [])

  const getEmails = async () => {
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/email.json')
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            let temp = [];
            for (const key in data) {
              if (data[key].senderEmail === token.email) {
                temp.push({
                  id: key,
                  receiverEmail: data[key].receiverEmail,
                  senderEmail: data[key].senderEmail,
                  content: data[key].content,
                  subject: data[key].subject
                })
              }
            }
            if (temp.length !== 0) {
              setEmails(temp);
            }
          })
        }
      })
  }

  const handleMailClick = (item) => {
    navigate(`/${item}`);
  }

  const handleComposeClick = () => {
    navigate('/');
  }

  const handleDelete = async (item) => {
    await fetch(`https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/email/${item}.json`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'Application/json'
      }
    }).then((res) => {
      console.log(res);
      getEmails();
    })
  }

  return (
    <div style={{width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '100px'}}>
      <button className="ComposeButton" onClick={handleComposeClick}>Compose</button>
      {!emails && <p>There are no emails</p>}
      {emails && emails.map((item) => {
        return (
          <div className="InboxCard">
            <section style={{display: 'flex', flexDirection: 'row', alignItems: 'center'}} onClick={() => handleMailClick(item.id)}>
              <span style={{fontWeight: '700'}}>{item.senderEmail}</span>
              <span style={{marginRight: '20px', margin: '10px 20px', fontWeight: '700'}}>{item.subject}</span>
              <span>{item.content}</span>
            </section>
            <button className="DeleteButton" onClick={() => handleDelete(item.id)}>Delete</button>
          </div>
        )
      })}
    </div>
  )
}

export default SentEmail;