import React, { useEffect, useState } from "react";
import { Container, Col, Row } from "react-bootstrap";
import Galleryform from "../Components/GalleryForm";
import axios from "axios";
import GalleryCard2 from "../Components/GalleryCard2";
import ComingSoon from "../Components/Comingsoon";
import Timeline from "../Components/Timeline";

function Members() {
  
  const [formDisplay, setFormDisplay] = useState("none");
  const [count, setCount] = useState(0);
  const [galleryData, setGalleryData] = useState([]);
  const [search, setSearch] = useState("");

  const handleNewPhoto = async (e) => {
    try {
      setCount((prevCount) => prevCount + 1);
      setFormDisplay(count >= 0 && count % 2 === 0 ? "" : "none");
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_backendbaseurl }/api/gallery`);
        setGalleryData(response.data.galleryData.reverse());
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, []);

  const groupedGalleryData = galleryData.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        top: "0",
        minHeight: "100vh",
        left: "0",
        width: "100%",
        overflow: "hidden",
        padding: "30px",
      }}
    >
      {galleryData.length === 0 && <ComingSoon />}
      <Galleryform display={formDisplay} />
      <Container style={{ marginTop: "150px", height: "100%" }}>

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
            placeholder="Search by category"
          />
        </Row>

        {Object.keys(groupedGalleryData).map((category) => (
          <div key={category} style={{textAlign:"center",marginTop:"40px",marginBottom:"40px"}}>
            <h2 style={{ color: "white",marginBottom:"30px" }}>{category}</h2>
            <Row>
              {groupedGalleryData[category]
                .filter((item) =>
                  item.category.toLowerCase().includes(search.toLowerCase())
                )
                .map((item) => (
                  <Col key={item.id}>
                    <GalleryCard2
                      id={item.id}
                      title={item.title}
                      morelink={item.morelink}
                      date={item.date}
                      image={item.imagelink}
                      desc={item.description}
                    />
                  </Col>
                ))}
            </Row>
          </div>
        ))}
        
        {sessionStorage.getItem("token") && (
          <div style={{ position: "fixed", top: "650px", right: "30px" }}>
            <button
              onClick={handleNewPhoto}
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
      </Container>
    </div>
  );
}

export default Members;
