import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../Images/favicon.jpg";
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
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="navbarNavDropdown">
            <ul className="navbar-nav mx-auto">
              <li className="nav-item">
                <NavLink exact className="nav-link mx-2" activeClassName="active" to="/">
                  Home
                </NavLink>
              </li>

              {/* Dropdown for About */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle mx-2"
                  href="#"
                  id="aboutDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  About
                </a>
                <ul className="dropdown-menu" aria-labelledby="aboutDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/about">
                      About Us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/events">
                      Events
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/timeline">
                      Timeline
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* Dropdown for Explore */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle mx-2"
                  href="#"
                  id="exploreDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Explore
                </a>
                <ul className="dropdown-menu" aria-labelledby="exploreDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/projects">
                      Projects
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/resources">
                      Resources
                    </NavLink>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/101">
                      Project 101
                    </NavLink>
                  </li>
                </ul>
              </li>

              <li className="nav-item d-none d-lg-block">
                <a className="nav-link mx-2" href="/">
                  <img src={logo} height="80" alt="logo" />
                </a>
              </li>

              {/* Dropdown for Community */}
              <li className="nav-item dropdown">
                <a
                  className="nav-link dropdown-toggle mx-2"
                  href="#"
                  id="communityDropdown"
                  role="button"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  Community
                </a>
                <ul className="dropdown-menu" aria-labelledby="communityDropdown">
                  <li>
                    <NavLink className="dropdown-item" to="/gallery">
                      Gallery
                    </NavLink>
                  </li>
                  <li>
                    <a className="dropdown-item" href="https://linktr.ee/inteliotclub">
                      Socials
                    </a>
                  </li>
                  <li>
                    <NavLink className="dropdown-item" to="/members">
                      Members
                    </NavLink>
                  </li>
                </ul>
              </li>

              {/* FAQs */}
              <li className="nav-item">
                <NavLink className="nav-link mx-2" activeClassName="active" to="/faq">
                  FAQs
                </NavLink>
              </li>

              {/* Login/Logout */}
              {isLoggedIn ? (
                <li className="nav-item">
                  <NavLink
                    className="nav-link mx-2"
                    activeClassName="active"
                    to="/admin"
                    onClick={handleLogout}
                  >
                    Logout
                  </NavLink>
                </li>
              ) : (
                <li className="nav-item">
                  <NavLink className="nav-link mx-2" activeClassName="active" to="/admin">
                    Login
                  </NavLink>
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
