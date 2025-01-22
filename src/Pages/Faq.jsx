// Faq.jsx
import React, { useState, useRef } from "react";
import Faqform from "../Components/Faqform";
import { Container } from "react-bootstrap";
import { ChevronDown } from "lucide-react";
import { gsap } from "gsap";
import "../Styles/Faq.css";

function Faq() {
  const [formVisibility, setFormVisibility] = useState("none");
  const [count, setCount] = useState(0);
  const [faq, setFaq] = useState([
    {
      question: "What is the Intel IoT Club",
      answer: "The Intel IoT Club is a platform for students and tech enthusiasts to explore and innovate with Internet of Things (IoT) technologies. It provides resources, workshops, and a collaborative environment for IoT projects.",
    },
    {
      question: "Who can join the Intel IoT Club?",
      answer: "Anyone with an interest in IoT, including students, developers, and hobbyists, can join the club. No prior experience is required.",
    },
    {
      question: "What kind of events does the club organize?",
      answer: "The club organizes hands-on workshops, hackathons, webinars, and guest lectures to help members learn and build IoT projects.",
    },
    {
      question: "How can I become a member of the club?",
      answer: "You can become a member by signing up on our website and attending our orientation session. Membership is free and open to all.",
    },
    {
      question: "What resources are provided to members?",
      answer: "Members have access to development boards, sensors, software tools, mentorship, and project funding opportunities.",
    },
    {
      question: "Can I collaborate with others on IoT projects?",
      answer: "Yes, collaboration is a key focus of the club. Members can form teams to work on innovative projects and participate in competitions.",
    },
    {
      question: "Are there any prerequisites to join the workshops?",
      answer: "No prerequisites are required. Workshops are designed for both beginners and advanced learners. The club provides all the necessary materials.",
    },
  ]);
  
  const accordionRefs = useRef([]);
  const chevronRefs = useRef([]);

  const handleNewMember = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      setFormVisibility(newCount % 2 === 0 ? "none" : "block");
      return newCount;
    });
  };

  const handleAccordionToggle = (index) => {
    const element = accordionRefs.current[index];
    const chevron = chevronRefs.current[index];
    
    if (element) {
      const isOpen = element.dataset.open === "true";
      
      if (isOpen) {
        gsap.to(element, { 
          height: 0, 
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(chevron, { 
          rotation: 0, 
          duration: 0.3, 
          ease: "power2.out" 
        });
      } else {
        gsap.to(element, { 
          height: "auto", 
          duration: 0.3, 
          ease: "power2.out" 
        });
        gsap.to(chevron, { 
          rotation: 180, 
          duration: 0.3, 
          ease: "power2.out" 
        });
      }
      element.dataset.open = !isOpen;
    }
  };

  return (
    <div className="faq-background">
      <Container className="faq-container">
        <h2 className="faq-title">
          Frequently Asked Questions
        </h2>

        <div className="accordion-container">
          {faq.map((data, index) => (
            <div key={index} className="accordion-item">
              <div
                className="accordion-header"
                onClick={() => handleAccordionToggle(index)}
                role="button"
                tabIndex={0}
                aria-expanded={accordionRefs.current[index]?.dataset.open === "true"}
              >
                <span className="question-number">{index + 1}.</span>
                <span className="question-text">{data.question}</span>
                <ChevronDown 
                  className="chevron-icon"
                  ref={el => chevronRefs.current[index] = el}
                  size={20}
                />
              </div>
              <div
                className="accordion-content"
                ref={el => accordionRefs.current[index] = el}
                data-open="false"
              >
                <p className="answer-text">{data.answer}</p>
                {sessionStorage.getItem("token") && (
                  <button className="delete-button" aria-label="Delete FAQ">
                    <i className="fas fa-trash"></i>
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Faqform visibility={formVisibility} />

        {sessionStorage.getItem("token") && (
          <div className="add-faq-button-container">
            <button
              onClick={handleNewMember}
              className="add-faq-button"
              aria-label="Add new FAQ"
            >
              <i className="fas fa-plus"></i>
              Add FAQ
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Faq;