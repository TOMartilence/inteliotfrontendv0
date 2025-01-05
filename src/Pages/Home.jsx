import React, { useState, useEffect } from "react";
import { Row, Container, Col } from "react-bootstrap";
import HomeCard from "../Components/HomeCard";
import MovingCard from "../Components/MovingCard";
import Homeeditbar from "../Components/Homeeditbar";
import Yt from "../Components/Yt";
import axios from "axios";
import Loader from "../Components/Loader";
import Typer from "../Components/Typer";

function Home() {
  var loader = "";
  const [display, setDisplay] = useState("none");
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [notif, setNotif] = useState([]);
  const [video, setVideo] = useState([]);

  const handlePopUp = async () => {
    try {
      setCount((prevCount) => prevCount + 1);
      setDisplay(count >= 0 && count % 2 === 0 ? "" : "none");
    } catch (error) {}
  };

  const onload = async () => {
    try {
      const response = await axios.get(`${process.env["REACT_APP_backendbaseurl"]}/api/`);
      setData(response.data.data);
      setNotif(response.data.notif);
      setVideo(response.data.video);
      console.log(data);
    } catch (error) {}
  };

  useEffect(() => {
    onload();
  }, []);

  return (
    <div style={{ backgroundColor: "#0f0c29" }}>
      <div className="firstPage">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
              <Typer sentence="Technology is best when it brings people together. - Matt Mullenweg" />
              <br />
              <h3 className="animate-charcter" style={{ fontSize: "2.5rem",
               }}>
                INTEL IoT CLUB      
              </h3>
              <br />
            </div>
          </div>
        </div>
      </div>

      {/* Notification Panel moved to right and down */}
      <div
        className="notificationPanel"
        style={{
          position: "absolute",  // Changed back from fixed to absolute
          top: "100px",
          right: "20px",
          width: "25%",
          backgroundColor: "#ffffff",
          padding: "15px",
          borderRadius: "8px",
          overflowY: "auto",
          maxHeight: "87vh",
          zIndex: "1000",
          boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
        }}
      >
        <h3
          style={{
            textAlign: "center",
            marginBottom: "20px",
            color: "black",
            fontSize: "1.25rem",
          }}
        >
          Notifications <span style={{ color: "red" }} className="fas fa-bell"></span>
        </h3>
        <Homeeditbar display={display} />
        {notif.length === 0 ? (
          <p style={{ position: "relative" }}>
            <Loader display={loader} />
          </p>
        ) : (
          notif.reverse().map((item, index) => (
            <HomeCard
              key={index}
              id={item.id}
              title={item.title}
              description={item.description}
              align={item.alignment}
              bgcol={item.bgColor}
              col={item.textColor}
              date={item.submissionDate}
              time={item.submissionTime}
            />
          ))
        )}
      </div>

      {/* Main Content Area */}
      <div style={{ padding: "20px" }}>
        <Container>
          <h3
            style={{
              textAlign: "center",
              marginBottom: "60px",
              backgroundColor: "white",
              color: "black",
              padding: "5px",
            }}
          >
            Upcoming Events <span className="fas fa-fire"></span>
          </h3>
          <Row>
            <MovingCard data={data} />
          </Row>
          <Row>
            <h3
              style={{
                textAlign: "center",
                marginBottom: "60px",
                backgroundColor: "white",
                color: "black",
                padding: "5px",
              }}
            >
              Trailers and Teasers <span className="fas fa-video"></span>
            </h3>
          </Row>
          <Row>
            {video.length === 0 ? (
              <p style={{ position: "relative" }}>
                <Loader display={loader} />
              </p>
            ) : (
              video.map((item, index) => (
                <Col key={index} md={6} lg={4}>
                  <Yt link={item.link} />
                </Col>
              ))
            )}
          </Row>
        </Container>
      </div>
    </div>
  );
}

export default Home;