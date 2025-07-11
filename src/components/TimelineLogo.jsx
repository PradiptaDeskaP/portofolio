// src/components/TimelineLogo.jsx

import React from 'react';
import { motion, useTransform } from 'framer-motion';

// PASTIKAN ADA KATA 'export' DI SINI
export const TimelineLogo = ({ scrollYProgress, totalItems, index, logoSrc, company }) => {
  // Menghitung rentang aktif untuk setiap logo berdasarkan posisinya
  const start = index / totalItems;
  const end = (index + 1) / totalItems;

  // Mengubah warna border saat scrollYProgress berada dalam rentang logo ini
  const borderColor = useTransform(
    scrollYProgress,
    [start, (start + end) / 2, end], // Input: Awal, Tengah, Akhir rentang
    ["#dee2e6", "#3b82f6", "#dee2e6"] // Output: Abu-abu -> Biru -> Abu-abu
  );

  return (
    <div className="timeline-logo-wrapper">
      <motion.div 
        className="timeline-logo-border"
        style={{ borderColor }} // Terapkan warna border yang dianimasikan
      />
      <img src={logoSrc} alt={`${company} logo`} className="timeline-logo-img" />
    </div>
  );
};