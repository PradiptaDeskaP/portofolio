// src/components/CertificationsSection.jsx

import React from 'react';
import { Link } from 'react-router-dom';
import './CertificationsSection.css'; // Kita akan buat file CSS ini
import { certificationsData } from '../data/certifications';

const CertificationsSection = () => {
  return (
    <section className="certifications-section">
      <h2 className="section-title">Certifications</h2>
      <div className="certifications-grid">
        {certificationsData.map((cert, index) => (
          <Link to={`/certification/${cert.id}`} key={cert.id || index} className="certification-card">
            
            <div className="cert-image-container">
              <img src={cert.imageSrc} alt={cert.title} className="cert-image" />
              <div className="cert-card-overlay">
                  <div className="verify-button">
                    <span>Verify</span>
                    <span className="arrow-icon">→</span>
                  </div>
              </div>
            </div>

            <div className="cert-info">
              <span className="cert-issuer">{cert.issuer}</span>
              <h3 className="cert-title">{cert.title}</h3>
            </div>
            
            </Link>
        ))}
      </div>
    </section>
  );
};

export default CertificationsSection;