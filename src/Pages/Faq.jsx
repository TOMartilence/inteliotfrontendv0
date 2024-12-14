import React, { useState, useEffect, useRef } from "react";
import Faqform from "../Components/Faqform";
import axios from "axios";
import { Container, Card } from "react-bootstrap";
import { gsap } from "gsap";
import { FaTrash, FaPlus } from "react-icons/fa";
import "./Faq.css"; // Add your custom CSS

function Faq() {
  const [formVisibility, setFormVisibility] = useState("none");
  const [count, setCount] = useState(0);
  const [faq, setFaq] = useState([]);
  const accordionRefs = useRef([]);

  const deletefaq = async (id) => {
    try {
      const response = await axios.post(
        `https://inteliotbackendv0.onrender.com/api/deletefaq/${id}`
      );
      alert(response.data.message);
      getFaqData();
    } catch (error) {
      alert("Request couldn't be sent");
    }
  };

  useEffect(() => {
    getFaqData();
  }, []);

  const getFaqData = async () => {
    try {
      const response = await axios.get(
        "https://inteliotbackendv0.onrender.com/api/getFaq"
      );
      setFaq(response.data.faq);
    } catch (error) {
      console.log(error);
    }
  };

  const handleNewMember = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      setFormVisibility(newCount % 2 === 0 ? "none" : "block");
      return newCount;
    });
  };

  const toggleAccordion = (index) => {
    const content = accordionRefs.current[index];
    if (content.style.height === "0px" || !content.style.height) {
      gsap.to(content, { height: content.scrollHeight, opacity: 1, duration: 0.5, ease: "power2.out" });
    } else {
      gsap.to(content, { height: 0, opacity: 0, duration: 0.5, ease: "power2.in" });
    }
  };

  return (
    <div className="faq-background" style={{ backgroundColor: "#2A2850" }}>
      <Container className="faq-container">
        <h2 className="faq-title" style={{ color: "white" }}>
          Frequently Asked Questions
        </h2>

        <div className="accordion">
          {faq.map((data, index) => (
            <Card className="accordion-card" key={index}>
              <div
                className="accordion-header"
                onClick={() => toggleAccordion(index)}
              >
                <h5>
                  {index + 1}. {data.question}
                </h5>
              </div>
              <div
                className="accordion-content"
                ref={(el) => (accordionRefs.current[index] = el)}
                style={{ height: 0, overflow: "hidden", opacity: 0 }}
              >
                <p className="faq-answer">{data.answer}</p>
                {sessionStorage.getItem("token") && (
                  <FaTrash
                    className="delete-icon"
                    onClick={() => deletefaq(data._id)}
                    style={{ cursor: "pointer", color: "red" }}
                  />
                )}
              </div>
            </Card>
          ))}
        </div>

        <Faqform visibility={formVisibility} />

        {sessionStorage.getItem("token") && (
          <div className="add-faq-button-container">
            <button onClick={handleNewMember} className="add-faq-button">
              <FaPlus />
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Faq;
