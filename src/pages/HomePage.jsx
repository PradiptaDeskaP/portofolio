// src/pages/HomePage.jsx
import React from 'react';
import HeroSection from '../components/HeroSection';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import ExperiencesSection from '../components/ExperiencesSection'; //
import CertificationsSection from '../components/CertificationsSection';

const HomePage = () => {
  return (
    <main>
      {/* Bungkus setiap section dengan div yang memiliki id */}
      <div id="profil">
        <HeroSection />
      </div>
      <div id="about">
        <AboutSection />
      </div>
      <div id="experiences">
        <ExperiencesSection />
      </div>
      <div id="projects">
        <ProjectsSection />
      </div>
      <div id="certifications">
        <CertificationsSection />
      </div>
      
    </main>
  );
};


export default HomePage;