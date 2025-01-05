import React, { useState, useRef } from "react";
import Faqform from "../Components/Faqform";
import { Container } from "react-bootstrap";
import { gsap } from "gsap";

function Faq() {
  const [formVisibility, setFormVisibility] = useState("none");
  const [count, setCount] = useState(0);
  const [faq, setFaq] = useState([
    {
      question: "What is the Intel IoT Club",
      answer:
        "The Intel IoT Club is a platform for students and tech enthusiasts to explore and innovate with Internet of Things (IoT) technologies. It provides resources, workshops, and a collaborative environment for IoT projects.",
    },
    {
      question: "Who can join the Intel IoT Club?",
      answer:
        "Anyone with an interest in IoT, including students, developers, and hobbyists, can join the club. No prior experience is required.",
    },
    {
      question: "What kind of events does the club organize?",
      answer:
        "The club organizes hands-on workshops, hackathons, webinars, and guest lectures to help members learn and build IoT projects.",
    },
    {
      question: "How can I become a member of the club?",
      answer:
        "You can become a member by signing up on our website and attending our orientation session. Membership is free and open to all.",
    },
    {
      question: "What resources are provided to members?",
      answer:
        "Members have access to development boards, sensors, software tools, mentorship, and project funding opportunities.",
    },
    {
      question: "Can I collaborate with others on IoT projects?",
      answer:
        "Yes, collaboration is a key focus of the club. Members can form teams to work on innovative projects and participate in competitions.",
    },
    {
      question: "Are there any prerequisites to join the workshops?",
      answer:
        "No prerequisites are required. Workshops are designed for both beginners and advanced learners. The club provides all the necessary materials.",
    },
  ]);
  const accordionRefs = useRef([]);

  // const deletefaq = async (id) => {
  //   try {
  //     const response = await axios.post(
  //       `https://inteliotbackendv0.onrender.com/api/deletefaq/${id}`
  //     );
  //     alert(response.data.message);
  //     getFaqData();
  //   } catch (error) {
  //     alert("Request couldn't be sent");
  //   }
  // };

  // useEffect(() => {
  //   getFaqData();
  // }, []);

  // const getFaqData = async () => {
  //   try {
  //     const response = await axios.get(
  //       "https://inteliotbackendv0.onrender.com/api/getFaq"
  //     );
  //     setFaq(response.data.faq);
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };

  const handleNewMember = () => {
    setCount((prevCount) => {
      const newCount = prevCount + 1;
      setFormVisibility(newCount % 2 === 0 ? "none" : "block");
      return newCount;
    });
  };

  const handleAccordionToggle = (index) => {
    const element = accordionRefs.current[index];
    if (element) {
      const isOpen = element.dataset.open === "true";
      if (isOpen) {
        gsap.to(element, { height: 0, duration: 0.5 });
      } else {
        gsap.to(element, { height: "auto", duration: 0.5 });
      }
      element.dataset.open = !isOpen;
    }
  };

  return (
    <div className="faq-background" style={{ backgroundColor: "#2A2850" }}>
      <Container className="faq-container" style={{ padding: "20px" }}>
        <h2
          className="faq-title"
          style={{ color: "white", textAlign: "center", marginBottom: "20px" }}
        >
          Frequently Asked Questions
        </h2>

        <div className="accordion-container">
          {faq.map((data, index) => (
            <div
              key={index}
              className="accordion-item"
              style={{
                marginBottom: "15px",
                backgroundColor: "white",
                borderRadius: "5px",
                overflow: "hidden",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.2)",
              }}
            >
              <div
                className="accordion-header"
                onClick={() => handleAccordionToggle(index)}
                style={{
                  cursor: "pointer",
                  padding: "15px",
                  fontSize: "16px",
                  fontWeight: "bold",
                  backgroundColor: "#4CAF50",
                  color: "white",
                }}
              >
                {index + 1}. {data.question}
              </div>
              <div
                className="accordion-content"
                ref={(el) => (accordionRefs.current[index] = el)}
                data-open="false"
                style={{
                  height: 0,
                  overflow: "hidden",
                  padding: "0 15px",
                  backgroundColor: "#f9f9f9",
                }}
              >
                <p style={{ color: "black", padding: "10px 0" }}>
                  {data.answer}
                </p>
                {sessionStorage.getItem("token") && (
                  <i
                    className="fas fa-trash"
                    // onClick={() => deletefaq(data._id)}
                    style={{ cursor: "pointer", color: "red" }}
                  ></i>
                )}
              </div>
            </div>
          ))}
        </div>

        <Faqform visibility={formVisibility} />

        {sessionStorage.getItem("token") && (
          <div
            className="add-faq-button-container"
            style={{ textAlign: "center", marginTop: "20px" }}
          >
            <button
              onClick={handleNewMember}
              className="add-faq-button"
              style={{
                padding: "10px 20px",
                fontSize: "16px",
                backgroundColor: "#4CAF50",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              <span
                className="fas fa-plus"
                style={{ marginRight: "5px" }}
              ></span>
              Add FAQ
            </button>
          </div>
        )}
      </Container>
    </div>
  );
}

export default Faq;
