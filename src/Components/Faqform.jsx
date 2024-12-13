import axios from "axios";
import React, { useState } from "react";

function Faqform(props) {
  // State variables to hold form data
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");

  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await axios.post(
      "https://inteliotbackendv0.onrender.com/api/addFaq",
      { question, answer }
    );
    alert(response.data.message);
    // You can process the form data here (e.g., send it to a backend server)
    console.log("Question:", question);
    console.log("Answer:", answer);
    // Reset form fields after submission (if needed)
    setQuestion("");
    setAnswer("");
  };

  return (
    <div
      className="faq-form-container"
      style={{
        display: props.visibility,
        position: "relative", // Adjust to relative if possible
        marginTop: "20px",
        padding: "20px",
        backgroundColor: "#fff",
        color: "black",
        borderRadius: "8px",
      }}
    >
      <h2>FAQ Form</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="question">Question:</label>
          <input
            type="text"
            id="question"
            name="question"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="answer">Answer:</label>
          <textarea
            id="answer"
            name="answer"
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
            rows={4}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          style={{
            backgroundColor: "yellow",
            color: "black",
            fontWeight: "bolder",
          }}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Faqform;
