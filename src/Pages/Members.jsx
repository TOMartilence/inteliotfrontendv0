import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import axios from "axios";
import MemberForm from "../Components/Memberform";
import TeamCard from "../Components/Teamcard";
import Loader from "../Components/Loader";

function Members() {
  const [members, setMembers] = useState([]);
  const [formDisplay, setFormDisplay] = useState("none");
  const [count, setCount] = useState(0);
  const [loader, setLoader] = useState("none");
  const [search, setSearch] = useState("");

  const handleNewMember = async () => {
    setCount((prevCount) => prevCount + 1);
    if (count % 2 === 0) {
      setFormDisplay("");
    } else {
      setFormDisplay("none");
    }
  };

  useEffect(() => {
    const fetchMembers = async () => {
      try {
        setLoader("");
        const response = await axios.get(
          `${process.env.REACT_APP_backendbaseurl}/api/members`
        );
        if (response.data.success) {
          setMembers(response.data.data);
        }
        setLoader("none");
      } catch (error) {
        console.error("Error fetching members:", error);
        setLoader("none");
      }
    };
    fetchMembers();
  }, []);

  const groupedMembers = members.reduce((acc, member) => {
    acc[member.category] = acc[member.category] || [];
    acc[member.category].push(member);
    return acc;
  }, {});

  return (
    <div
      style={{
        backgroundImage: "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        position: "absolute",
        top: "0",
        left: "0",
        width: "100%",
        overflow: "hidden",
        minHeight: "130vh",
      }}
    >
      <MemberForm formDisplay={formDisplay} />

      <Container fluid style={{marginTop : "100px"}}>
       
        <Row className="justify-content-center" style={{ marginBottom: "190px" }}>
          <Loader display={loader} />
          {Object.keys(groupedMembers).map((category, index) => (
            <React.Fragment key={index}>
              {category && (
                <>
                  <h2
                    style={{
                      color: "#4260f5",
                      marginTop: "140px",
                      textAlign: "center",
                      fontFamily: "Georgia, serif",
                      fontSize: "28px",
                      fontWeight: "bold",
                      textTransform: "uppercase",
                      boxShadow : "2px 2px 40px",
                      margin: "auto",
                      padding: "10px",
                      width: "100%"
                    }}
                  >
                    {category.toUpperCase()}
                  </h2>
                  <Row
                    className={`${
                      groupedMembers[category].length === 1
                        ? "justify-content-center"
                        : ""
                    }`}
                  >
                    {groupedMembers[category]
                      .filter(
                        (member) =>
                          member.name.toLowerCase().includes(search.toLowerCase()) ||
                          member.desc.toLowerCase().includes(search.toLowerCase())
                      )
                      .map((member, index) => (
                        <Col xs={12} sm={6} md={4} lg={4} key={index}>
                          <TeamCard
                            id={member.id}
                            imagelink={member.imagelink}
                            githublink={member.githublink}
                            instagramlink={member.instagramlink}
                            linkedinlink={member.linkedinlink}
                            name={member.name}
                            rollNumber = {member.rollNumber}
                            desc={member.desc}
                          />
                        </Col>
                      ))}
                  </Row>
                </>
              )}
            </React.Fragment>
          ))}
        </Row>

        {sessionStorage.getItem("token") && (
          <div style={{ position: "fixed", top: "650px", right: "30px" }}>
            <button
              onClick={handleNewMember}
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
