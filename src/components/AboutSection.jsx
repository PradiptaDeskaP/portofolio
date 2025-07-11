// src/components/AboutSection.jsx

import React from "react";
import "./AboutSection.css";
import myPhoto from "../images/foto1.jpg";
import frameImage from "../images/bingkaifoto.jpg";

const AboutSection = () => {
  return (
    <section className="about-container">
      {/* Judul di Tengah Atas */}
      <div className="about-title-wrapper">
        <div className="corner-accent-box">
          <h4>About Myself</h4>
        </div>
      </div>
      {/* Intro di Kiri Atas */}
      <div className="about-intro">
        <p>
          Hi, I’m Pradipta Deska – I’m someone who believes that great analysis
          is part creativity, part empathy, and part coffee-fueled hustle.
        </p>
      </div>
      <div className="about-image-wrapper">
        {/* Foto orang sekarang menjadi background-image dari div ini */}
        <div
          className="about-image-person"
          style={{ backgroundImage: `url(${myPhoto})` }}
        ></div>

        {/* Bingkai tetap sebagai img di atasnya */}
        <img
          src={frameImage}
          alt="Bingkai Foto"
          className="about-image-frame"
        />
      </div>
      {/* Konten Utama di Kiri Bawah */}
      <div className="about-main-content">
        <h2>Transforming Ideas into Digital Experiences</h2>
        <p>
          You bring the vision, I bring the process – together we build a
          website that works.
        </p>
        {/* Konten Utama di Kiri Bawah 
        <button className="btn-start-project">Start Your Project</button> */}
      </div>
      {/* Detail di Kanan */}
      <div className="about-details">
        <p>
          Hi! I’m Pradipta Deska – a passionate Data Analyst with a growing love
          for UI/UX design and front-end development. I enjoy turning complex
          data into simple, user-friendly insights.
        </p>
        <p>
          Alongside my analytical work, I’m proud to be a consistent learner,
          always pushing to do better in both tech and business strategy.
          Outside the screen, you’ll usually catch me exploring new datasets,
          playing guitar, or casually gaming to relax and recharge.
        </p>
        {/* Detail di Kanan 
        <a href="#readmore" className="read-more-link">
          Read More ↓
        </a> */}
      </div>
    </section>
  );
};

export default AboutSection;
