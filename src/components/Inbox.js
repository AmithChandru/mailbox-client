import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import './Inbox.css';

const Inbox = () => {

  const [emails, setEmails] = useState(null);
  const token = useSelector(state => state.auth.token);
  const navigate = useNavigate();

  useEffect(() => {
    !token && navigate('/login');
    getEmails();
  }, [])

  const handleComposeClick = () => {
    navigate('/');
  }

  const getEmails = async () => {
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
            setEmails(temp);
          })
        }
      })
  }

  return (
    <div>
      <button className="ComposeButton" onClick={handleComposeClick}>Compose</button>
      {!emails && <p>There are no emails</p>}
      {emails && emails.map((item) => {
        return (
          <div>
            <span>{item.senderEmail}</span>
            <span>{item.subject}</span>
          </div>
        )
      })}
    </div>
  )
}

export default Inbox;