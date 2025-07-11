// src/components/ProjectsSection.jsx

import React from "react";
import { Link } from "react-router-dom"; // <-- 1. Impor Link
import "./ProjectsSection.css";
import { projectsData } from "../data/projects";

const ProjectsSection = () => {
  return (
    <section className="projects-section">
      <h2 className="projects-title">Projects</h2>
      <div className="projects-grid">
        {projectsData.map((project, index) => (
          // 3. Ganti <a> menjadi <Link> dan perbarui tujuannya
          <Link
            to={`/project/${project.id}`}
            key={index}
            className="project-card"
          >

            <div className="image-container">
              <img
                src={project.imageSrc}
                alt={project.title}
                className="card-image"
              />
              <div className="card-overlay">
                <div className="card-content">
                  <div className="view-project-button">
                    <span>View Project</span>
                    <span className="arrow-icon">→</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="project-info">
              <span className="project-category">{project.category}</span>
              <h3 className="project-title">{project.title.split("–")[0]}</h3>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
