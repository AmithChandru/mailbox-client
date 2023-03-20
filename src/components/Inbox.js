import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { emailActions } from "../store/EmailReducer";
import './Inbox.css';

const Inbox = (props) => {

  const [emails, setEmails] = useState(null);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const readEmails = useSelector(state => state.email.readEmail);
  const [readEmails, setReadEmails] = useState([]);

  useEffect(() => {
    !token && navigate('/login');
    getEmails();
    setInterval(() => {
      getEmails();
    }, 2000)
  }, [])

  const handleComposeClick = () => {
    navigate('/');
  }

  const getEmails = async () => {
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/email/readEmail.json')
      .then((res) => {
        res.json().then((data) => {
          for (const key in data) {
            setReadEmails((state) => [
              ...state,
              data[key].id
            ])
          }
        })
      })
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/email.json')
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            let temp = [];
            for (const key in data) {
              if (data[key].receiverEmail === token.email) {
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

  const handleMailClick = async (item) => {
    dispatch(emailActions.readEmail(item));
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/email/readEmail.json', {
      method: 'POST',
      body: JSON.stringify({
        id: item
      }),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then((res) => {
      console.log(res);
    })
    navigate(`/${item}`);
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
              {!(readEmails.indexOf(item.id) >= 0) && <div className="BlueCircle" />}
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

export default Inbox;