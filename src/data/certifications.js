// src/data/certifications.js

// Impor gambar/logo untuk sertifikasi Anda
import linearAplikasi1 from '../images/linearAplikasi1.png';
import linearAplikasi2 from '../images/linearAplikasi2.png';
import linearFundamental1 from '../images/linearFundamental1.png';
import linearFundamental2 from '../images/linearFundamental2.png';
import adse from '../images/adse.png';
import digistar from '../images/digistar.png';

export const certificationsData = [
  {
    id: "meta-data-analyst",
    title: "Meta Database Engineer",
    issuer: "Coursera", // Penerbit sertifikat
    date: "Oktober 2023",
    credentialId: "XYZ-123-ABC", // Ganti dengan ID asli
    imageSrc: linearAplikasi1,
    skills: [
      "Database Management (MySQL, PostgreSQL)",
      "Data Modeling & ERD",
      "Advanced SQL Queries",
      "Python for Database Interaction",
    ],
  },
  {
    id: "dicoding-ml-developer",
    title: "Machine Learning Developer",
    issuer: "Dicoding",
    imageSrc: adse,
    skills: [
      "Database Management (MySQL, PostgreSQL)",
      "Data Modeling & ERD",
      "Advanced SQL Queries",
      "Python for Database Interaction",
    ],
  },
  {
    id: "dicoding-ml-developer",
    title: "Machine Learning Developer",
    issuer: "Dicoding",
    imageSrc: digistar,
    skills: [
      "Database Management (MySQL, PostgreSQL)",
      "Data Modeling & ERD",
      "Advanced SQL Queries",
      "Python for Database Interaction",
    ],

  },
  
];