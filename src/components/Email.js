import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import './Email.css';

const Email = () => {

  const [senderEmail, setSenderEmail] = useState(null);
  const [receiverEmail, setReceiverEmail] = useState(null);
  const [subject, setSubject] = useState(null);
  const [content, setContent] = useState(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    let temp = location.pathname;
    temp = temp.split('/');
    getDetails(temp[1]);
  }, [])

  const getDetails = async (item) => {
    await fetch('https://react-movies-8029a-default-rtdb.asia-southeast1.firebasedatabase.app/email.json')
      .then((res) => {
        if (res.ok) {
          res.json().then((data) => {
            for (const key in data) {
              if (key === item) {
                setReceiverEmail(data[key].receiverEmail);
                setSenderEmail(data[key].senderEmail);
                setSubject(data[key].subject);
                setContent(data[key].content);
              }
            }
          })
        } else {
          console.log(res, 'error');
        }
      })
  }

  const handleBackClick = () => {
    navigate('/inbox');
  }

  return (
    <div>
      <button className="ComposeButton" onClick={handleBackClick}>Back</button>
      <div className="MailSection">
        <span style={{fontSize: '18px', fontWeight: '700'}}>{senderEmail}</span>
        <span>To: {receiverEmail}</span>
        <span style={{margin: '10px 0px', fontWeight: '500'}}>{subject}</span>
        <span>{content}</span>
      </div>
    </div>
  )
}

export default Email;