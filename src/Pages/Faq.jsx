import React, { useState, useEffect } from 'react';
import Faqform from '../Components/Faqform';
import axios from "axios";
import { Container } from "react-bootstrap";

function Faq() {
  const [formVisibility, setFormVisibility] = useState("none");
  const [count, setCount] = useState(0);
  const [faq, setFaq] = useState([]);
  const deletefaq = async(id)=>{
    try {
      const response = await axios.post(`https://inteliotbackendv0.onrender.com/api/deletefaq/${id}`);
      alert(response.data.message)
    } catch (error) {
      alert("Request couldn't be send")
    }
  }
  useEffect(() => {
    getFaqData();
  }, []); 

  const getFaqData = async () => {
    try {
      const response = await axios.get("https://inteliotbackendv0.onrender.com/api/getFaq");
      setFaq(response.data.faq);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewMember = () => {
    setCount(prevCount => prevCount + 1);
    setFormVisibility(count % 2 === 0 ? "block" : "none");
  };

  return (
    <div className="faq-background">
      <Container className="faq-container">
        <h2 className="faq-title">Frequently Asked Questions</h2>
        <div className="faq-list">
          {faq.map((data, index) => (
            <div key={index} className="faq-item">
              <h4 className="faq-question">{index + 1 + ". " + data.question}</h4>
              <p className="faq-answer">{data.answer}</p>
              {sessionStorage.getItem("token") ? (<><i className='fas fa-trash' onClick={()=>{deletefaq(index)}}></i></>) : ("")}
            </div>
          ))}
        </div>
      </Container>

      <Faqform visibility={formVisibility} />

      {sessionStorage.getItem("token") && (
        <div className="add-faq-button-container">
          <button onClick={handleNewMember} className="add-faq-button">
            <span className="fas fa-plus"></span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Faq;
