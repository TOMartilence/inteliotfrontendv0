import React, { useState } from "react";
import { Row, Container } from "react-bootstrap";
import HomeCard from "../Components/HomeCard";
import MovingCard from "../Components/MovingCard";
import {Link} from "react-router-dom"
import Homeeditbar from "../Components/Homeeditbar";
import {Col} from "react-bootstrap"
import Yt from "../Components/Yt"
import Typer from "../Components/Typer"
import { useEffect } from "react";
import axios from "axios";
import Loader from "../Components/Loader"
function Home() {
  var loader = "";
  const [display, setDisplay] = useState("none");
  const [count, setCount] = useState(0);
  const [data, setData] = useState([]);
  const [notif, setNotif] = useState([]);
  const [video,setVideo] = useState([]);
  
  const handlePopUp = async () => {
    try {
      setCount((prevCount) => prevCount + 1);
      if (count >= 0 && count % 2 === 0) {
        setDisplay("");
      } else {
        setDisplay("none");
      }
    } catch (error) {}
  };
  const onload = async (e) => {
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
    <>
      <div className="firstPage">
        <div className="container">
          <div className="row">
            <div className="col-md-12 text-center">
            <Typer sentence="Technology is best when it brings people together. - Matt Mullenweg"/> <br />
              <h3 className="animate-charcter" > INTEL I o T CLUB </h3> <br />
              
            </div>
            <div>
  <Link to="/register"><button className="glitter-button">
    Join IoRT : Xperiance Robots!
    <span></span>
    <span></span>
    <span></span>
    <span></span>
    <span></span>
  </button></Link>
</div>

          </div>
        </div>
      </div>
      <div
        className="secondPage"
        style={{
          backgroundImage:
            "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
            minHeight:"20vh"
        }}
      >
        <Container>
          <h3 style={{ textAlign: "center", marginBottom: "60px",marginTop:"30px" ,backgroundColor:"white",color:"black",padding:"5px"}}>
            Notifications
            <span style={{color:"red",fontSize:"25px",marginLeft:"20px"}} className="fas fa-bell"></span>
          </h3>
          <Homeeditbar display={display} />
          {notif.length === 0 ? (
            <>
            <p style={{position:"relative"}}><Loader display={loader}/></p>
            

            </>
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
                date = {item.submissionDate}
                time = {item.submissionTime}
              />
            ))
          )}
        </Container>
      </div>
      <div className="thirdPage" style={{
        backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        minHeight: "200vh"
      }}>
        <Container>
        <Row>
            <h3 style={{
              textAlign: "center",
              marginBottom: "60px",
              backgroundColor: "white",
              color: "black",
              padding: "5px"
            }}>
              Upcoming Events <span className="fas fa-fire"></span>
            </h3>

            <Row>
            <MovingCard data= {data}/>
            </Row>
          </Row>
          <Row>
            <h3 style={{
              textAlign: "center",
              marginBottom: "60px",
              backgroundColor: "white",
              color: "black",
              padding: "5px"
            }}>
              Trailers and Teasers <span className="fas fa-video"></span>
            </h3>
          </Row>
          <Row>
            {video.length === 0 ? (
              <p style={{ position: "relative" }}><Loader display={loader} /></p>
            ) : (
              video.map((item, index) => (
                
                <Col key={index} md={6} lg={4}>
                  <Yt link={item.link} />
                </Col>
              ))
            )}
          </Row>
        </Container>
        {sessionStorage.getItem("token") && (
          <div style={{ position: "fixed", top: "650px", right: "30px" }}>
            <button onClick={handlePopUp} className="addprojectbutton" style={{
              height: "40px",
              width: "40px",
              borderRadius: "50%",
              border: "none",
              backgroundColor: "white",
            }}>
              <span className="fas fa-pen"></span>
            </button>
          </div>
        )}
      </div>
    </>
  );
}

export default Home;
