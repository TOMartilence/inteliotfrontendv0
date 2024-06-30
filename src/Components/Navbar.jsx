import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/favicon.jpg"
import "../Styles/Nav.css";

function Navbar() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!sessionStorage.getItem("token"));

  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.getElementById("headerNav");
      const scrollPosition = window.scrollY;
      if (navbar) {
        if (scrollPosition > 0) {
          navbar.classList.add("scrolled");
        } else {
          navbar.classList.remove("scrolled");
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleLogout = () => {
    sessionStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark p-0 n" id="headerNav">
        <div className="container-fluid">
          <a className="navbar-brand d-block d-lg-none" href="/">
            <img src={logo} height="80" alt="logo" />
          </a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink exact className="nav-link mx-2" activeClassName="active" to="/">Home</NavLink>
              </li>
              <li className="nav-item">
                <NavLink exact className="nav-link mx-2" activeClassName="active" to="/about">About</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" activeClassName="active" to="/events">Events</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" activeClassName="active" to="/projects">Projects</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" activeClassName="active" to="/gallery">Gallery</NavLink>
              </li>

              <li className="nav-item">
                <NavLink className="nav-link mx-2" activeClassName="active" to="/resources">Resources</NavLink>
              </li>
              
              
              
              <li className="nav-item d-none d-lg-block">
                <a className="nav-link mx-2" href="/">
                  <img src={logo} height="80" alt="logo" />
                </a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" activeClassName="active" to="/101">Project 101</NavLink>
              </li>
             
              
              
              <li className="nav-item">
                <a className="nav-link mx-2" href="https://linktr.ee/inteliotclub">Socials</a>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" activeClassName="active" to="/timeline">Timeline</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2" activeClassName="active" to="/members">Members</NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link mx-2"  activeClassName="active" to="/faq">FAQs</NavLink>
              </li>
             
             
              {isLoggedIn ? (
                <li className="nav-item">
                  <NavLink className="nav-link mx-2" activeClassName="active" to="/admin" onClick={handleLogout}>Logout</NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link mx-2" activeClassName="active" to="/admin">Login</NavLink>
                </li>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default Navbar;
