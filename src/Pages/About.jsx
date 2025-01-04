import React, { useEffect } from "react";

function About() {
  useEffect(() => {
    const aboutContent = document.querySelector(".about-content");
    setTimeout(() => {
      aboutContent.classList.add("scrolled");
    }, 100);
  }, []);

  return (
    <div className="about-container">
      <div className="about-content">
        <h1 className="about-title">
          Intel IoT Club At Amrita Vishwa Vidyapeetham
        </h1>
        <p className="about-description">
          The Intel IoT Club at Amrita Vishwa Vidyapeetham is a hub for students
          passionate about the Internet of Things (IoT) and Artificial
          Intelligence (AI). It's an AI/ML and IoT-based club started way back
          in Feb 2022 by Deepak Sai Pendyala, who was an Ex-applied scientist
          intern at Amazon and also a Pi and AI Ambassador.
        </p>
        <p className="about-description">
          He started this club to identify and support students who are
          passionate about working with developer communities. We believe that
          innovation is at the forefront of academia and forming effective and
          creative solutions for real-world problems lies in collaboration and
          knowledge-sharing through an interdisciplinary approach.
        </p>
        <p className="about-description">
          We have different wings under our club like AIoT, IoRT, IoT and
          Technical Support. We also have Dr. Anbazhagan Mahadevan and Dr.
          Anantha Narayanan V, who constantly support us and provide us with
          necessary assistance in conducting various events.
        </p>
        <p className="about-description">
          That's why we're offering a variety of Events, workshops, industrial
          training and resources that enable students to deepen their skills and
          get familiarised with the latest hardware and software solutions
          provided by Intel.
        </p>
        <p className="about-description">
          Our IoT track in particular is designed to provide students with
          hands-on experience and help them to develop impactful projects. Small
          examples of impactful sessions conducted by the Intel IoT club include
          the Wokwi Simulator Webinar, building an entire game server with
          RasPi, IoT competitions using Raspberry Pi, building a smart home with
          Raspberry Pi, Intel oneAPI workshop etc.
        </p>
        <p className="about-description">
          We not only have hands-on sessions but also various quizzes to promote
          competitive spirit and collaborative learning. We've conducted major
          events like the Intel AI Hackathon, as a part of Anokha 2024 in
          Partnership with Intel Corporation.
        </p>
        <p className="about-description">
          We are also conducting a project development and research initiative
          named “Partner in Project 101”. This event allows for brainstorming
          innovative ideas to be heard and perfected by members of the Intel IoT
          Club. You'll also learn to develop solutions that can solve real-life
          issues. Whether it's your semester projects or a personal project - we
          will always have your back. And if it can make the best out of other
          projects - you will also get to present it in Amrita Coimbatore
          Campus' Tech Fest: Anokha.
        </p>
      </div>
    </div>
  );
}

export default About;
