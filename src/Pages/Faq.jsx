import React, { useState, useEffect } from 'react';
import Faqform from '../Components/Faqform';
import axios from "axios";
import { Container, Accordion, Card } from "react-bootstrap";

function Faq() {
  const [formVisibility, setFormVisibility] = useState("none");
  const [faq, setFaq] = useState([
    { _id: '1', question: "What is the purpose of this platform?", answer: "This platform is designed to help manage and organize events and FAQs." },
    { _id: '2', question: "How can I register for an event?", answer: "You can register for an event by clicking the 'Register' button on the event card." },
    { _id: '3', question: "Can I delete an event?", answer: "Yes, you can delete an event if you have the necessary permissions." },
    { _id: '4', question: "How do I add a new FAQ?", answer: "You can add a new FAQ by clicking the 'Add FAQ' button and filling in the required information." },
    { _id: '5', question: "What types of events can I create?", answer: "You can create various events like workshops, webinars, and conferences." },
    { _id: '6', question: "How do I contact support?", answer: "You can contact support via the contact page or by emailing support@example.com." },
    { _id: '7', question: "Is this platform free to use?", answer: "Yes, the platform is free to use with no hidden fees." }
  ]); 

  const getFaqData = async () => {
    try {
      const response = await axios.get("https://inteliotbackendv0.onrender.com/api/getFaq");
      setFaq(response.data.faq);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getFaqData(); 
  }, []);

  const deletefaq = async (id) => {
    try {
      const response = await axios.post(`https://inteliotbackendv0.onrender.com/api/deletefaq/${id}`);
      alert(response.data.message);
      getFaqData(); 
    } catch (error) {
      alert("Request couldn't be sent");
    }
  };

  const handleNewMember = () => {
    setFormVisibility((prevVisibility) => (prevVisibility === "none" ? "block" : "none"));
  };

  return (
    <div className="faq-background" style={{ backgroundColor: '#2A2850' }}>
      <Container className="faq-container">
        <h2 className="faq-title" style={{ color: 'white' }}>Frequently Asked Questions</h2>
        
        <Accordion>
          {faq.map((data) => (
            <Card key={data._id}>
              <Accordion.Item eventKey={data._id}>
                <Accordion.Header>{data.question}</Accordion.Header>
                <Accordion.Body>
                  <p className="faq-answer">{data.answer}</p>
                  {sessionStorage.getItem("token") && (
                    <i
                      className="fas fa-trash"
                      onClick={() => deletefaq(data._id)} // Ensure the correct ID is passed
                      style={{ cursor: "pointer", color: "red" }}
                    ></i>
                  )}
                </Accordion.Body>
              </Accordion.Item>
            </Card>
          ))}
        </Accordion>

        <Faqform visibility={formVisibility} />

        {sessionStorage.getItem("token") && (
          <div className="add-faq-button-container">
            <button onClick={handleNewMember} className="add-faq-button">
              <span className="fas fa-plus"></span>
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Faq;
