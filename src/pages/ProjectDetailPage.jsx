// src/pages/ProjectDetailPage.jsx
import React from "react";
import { useParams, Link } from "react-router-dom";
import { projectsData } from "../data/projects";
import "./ProjectDetailPage.css";

const ProjectDetailPage = () => {
  const { projectId } = useParams();
  const project = projectsData.find((p) => p.id === projectId);

  if (!project) {
    return (
      <div className="project-not-found">
        Proyek tidak ditemukan! <Link to="/">Kembali</Link>
      </div>
    );
  }

  return (
    <main className="project-detail-container">
      <Link to="/" className="back-link">
        ← Back to Projects
      </Link>

      <h1 className="project-page-title">{project.title.split("–")[0]} App</h1>

      <div className="project-gallery">
        {project.gallery.map((img, index) => (
          // Wadah setiap item galeri menjadi pemicu hover
          <div key={index} className="gallery-item">
            <div className="gallery-popup-tag">Image {index + 1} ✨</div>
            {/* Gambar sekarang berada di dalam pembungkusnya sendiri */}
            <div className="gallery-image-wrapper">
              <img src={img} alt={`Gallery item ${index + 1}`} />
            </div>
          </div>
        ))}
      </div>

      <div className="project-main-layout">
        <aside className="project-meta">
          <div className="meta-item">
            <span>Category:</span>
            <p>{project.category}</p>
          </div>
          <div className="meta-item">
            <span>Client:</span>
            <p>{project.client}</p>
          </div>
          <div className="meta-item">
            <span>Duration:</span>
            <p>{project.duration}</p>
          </div>
          <div className="meta-item">
            <span>Tools:</span>
            <div className="tech-logos-container">
              {project.techLogos?.map((logo, index) => (
                <img
                  key={index}
                  src={logo}
                  alt={`Technology logo ${index + 1}`}
                  className="tech-logo-item"
                />
              ))}
            </div>
          </div>
          <div className="project-buttons-detail">
  <a 
    href={project.previewLink} 
    className="btn-preview" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    Preview
  </a>
  <a 
    href={project.liveLink} 
    className="btn-try-on" 
    target="_blank" 
    rel="noopener noreferrer"
  >
    Try On
  </a>
</div>
        </aside>

        <section className="project-description-content">
          <h2 className="project-detail-title">
            <span className="title-icon">💡</span> {project.title}
          </h2>
          <p className="project-overview">{project.overview}</p>

          <h3>Latar Belakang Masalah</h3>
          <p>{project.problem}</p>

          <h3>Tujuan Proyek</h3>
          <ul className="project-goals">
            {project.goals.map((goal, index) => (
              <li key={index}>✓ {goal}</li>
            ))}
          </ul>
        </section>
      </div>
    </main>
  );
};

export default ProjectDetailPage;
