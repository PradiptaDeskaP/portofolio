// src/components/ImageModal.jsx

import React from 'react';
import './ImageModal.css'; // Kita akan buat file CSS ini

export const ImageModal = ({ isOpen, onClose, imageSrc }) => {
  if (!isOpen) {
    return null; // Jika tidak terbuka, jangan render apa-apa
  }

  return (
    // Lapisan luar yang menutupi seluruh layar
    <div className="modal-overlay" onClick={onClose}>
      {/* Konten modal, klik di sini tidak akan menutup modal */}
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        {/* Tombol close di pojok kanan atas */}
        <button className="modal-close-btn" onClick={onClose}>
          &times;
        </button>
        <img src={imageSrc} alt="Sertifikat" className="modal-image" />
      </div>
    </div>
  );
};