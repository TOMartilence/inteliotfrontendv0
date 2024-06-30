import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import ProjectCards from "../Components/ProjectCards";
import ProjectForm from "../Components/ProjectForm";
import axios from "axios";

function Projects() {
  const [count, setCount] = useState(0);
  const [formdisplay, setFormdisplay] = useState("none");
  const [projects, setProjects] = useState([]);
  const [search, setSearch] = useState("");

  const handleAddNewProject = async () => {
    try {
      setCount((prevCount) => prevCount + 1);
      if (count % 2 === 0) {
        setFormdisplay("");
      } else {
        setFormdisplay("none");
      }
    } catch (error) {
      console.error(error);
    }
  };

  const loadProjects = async () => {
    try {
      const response = await axios.get(`${process.env["REACT_APP_backendbaseurl"]}/api/projects`);
      setProjects(response.data.projects);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadProjects();
  }, []);

  return (
    <div
      style={{
        backgroundImage:
          "linear-gradient(to right, #0f0c29, #302b63, #24243e)",
        width: "100%",
        overflow: "hidden",

        minHeight:"100vh"
      }}
    >
      <ProjectForm display={formdisplay} />
      <Container style={{ marginTop: "120px", padding: "40px" }}>
        <Row>
          <input
            type="text"
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "70%",
              margin: "auto",
              backgroundColor: "transparent",
              border: "0.02px solid white ",
              color: "white",
            }}
            placeholder="Search"
          />
        </Row>
        <Row>
          {projects
            .filter((project) =>
              project.title.toLowerCase().includes(search.toLowerCase()) ||
              project.person.toLowerCase().includes(search.toLowerCase()) ||
              project.rollnumber.toLowerCase().includes(search.toLowerCase())
            )
            .map((project) => (
              <Col key={project.id} xs={12} sm={6} md={4} lg={3} className="my-4 d-flex justify-content-centers">
                <ProjectCards
                  id={project.id}
                  title={project.title}
                  person={project.person}
                  rollnumber={project.rollnumber}
                  imagelink={project.imagelink}
                  morelink={project.morelink}
                  auth={sessionStorage.getItem("token") ? "true" : "false"}
                />
              </Col>
            ))}
        </Row>
        {sessionStorage.getItem("token") && (
          <div style={{ position: "fixed", top: "650px", right: "30px" }}>
            <button
              onClick={handleAddNewProject}
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

export default Projects;
