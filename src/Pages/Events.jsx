import React, { useState, useEffect } from "react";
import axios from "axios";
import { Container, Row } from "react-bootstrap";
import EventCards from "../Components/EventCards";
import EventForm from "../Components/EventForms";

function Events() {
  const [count, setCount] = useState(0);
  const [formdisplay, setFormdisplay] = useState("none");
  const [data, setData] = useState([]);
  const [brightness, setBrightness] = useState(100); // Initial brightness value
  const [search, setSearch] = useState("");

  const handleNewEvent = () => {
    setCount((prevCount) => prevCount + 1);
    if (count >= 0 && count % 2 === 0) {
      setFormdisplay("");
      setBrightness(60);
    } else {
      setFormdisplay("none");
      setBrightness(100);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${process.env["REACT_APP_backendbaseurl"]}/api/events`);
      setData(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        overflow: "hidden",
        minHeight: "100vh",
      }}
    >
      <EventForm formdisplay={formdisplay} />
      <Container
        style={{ marginTop: "150px", filter: `brightness(${brightness}%)` }}
      >
        <Row>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "70%",
              margin: "auto",
              backgroundColor: "transparent",
              border: "0.02px solid white",
              color: "white",
            }}
            placeholder="Search"
          />
        </Row>

        {data
          .filter(
            (event) =>
              event.eventTitle.toLowerCase().includes(search.toLowerCase()) ||
              event.description.toLowerCase().includes(search.toLowerCase()) ||
              event.eventType.toLowerCase().includes(search.toLowerCase())
          ).reverse()
          .map((event) => (
            <EventCards
              id={event.id}
              key={event._id}
              eventTitle={event.eventTitle}
              poster={event.poster}
              eventDate={event.eventDate}
              description={event.description}
              time={event.time}
              eventType={event.eventType}
              registerLink={event.registerLink}
            />
          ))}
      </Container>

      {sessionStorage.getItem("token") && (
        <div style={{ position: "fixed", top: "650px", right: "30px" }}>
          <button
            onClick={handleNewEvent}
            className="addprojectbutton"
            style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "white",
            }}
          >
            <span className="fas fa-plus"></span>
          </button>
        </div>
      )}
    </div>
  );
}

export default Events;
