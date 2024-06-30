import React from 'react';
import { Card } from 'react-bootstrap';
import axios from "axios"
function GalleryCard2(props) {
    const handleDeleteGalleryCard = async (id) => {
        try {
          console.log(id);
          const response = await axios.post(
            `https://inteliotbackendv0.onrender.com/api/deletePicture/${id}`
          );
          alert(response.data.message);
        } catch (error) {}
      };
  const date = props.date.substring(0, 10);
  return (
    <Card className="custom-card" style={{ backgroundColor: 'rgba(255, 255, 255, 0.1)', color: 'white' }}>
      <div className="custom-card-img-container">
        <Card.Img className="custom-card-img" variant="top" src={props.image} alt={props.title} />
      </div>
      <Card.Body>
        <Card.Title>{props.title}</Card.Title>
        <Card.Text>{props.desc}</Card.Text>
      </Card.Body>
      <Card.Footer style={{ backgroundColor: "white" }}>
        <small className="text-muted">{date}</small>
        {sessionStorage.getItem("token") ? (
            <div
              style={{
                display: "flex",
                height: "10%",
                marginTop: "20px",
                flexAlign: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{ marginLeft: "3px", cursor: "pointer", zIndex: 100000,color : "black" }}
                className="fas fa-trash"
                onClick={()=>{handleDeleteGalleryCard(props.id)}}
              ></span>

             
            </div>
          ) : null}      </Card.Footer>
    </Card>
  );
}

export default GalleryCard2;
