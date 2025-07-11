// src/components/AnimatedImageStack.jsx

import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import './AnimatedImageStack.css'; // Kita akan buat file CSS ini

export const AnimatedImageStack = ({ items }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % items.length);
    }, 5000); // Ganti gambar setiap 5 detik

    return () => clearInterval(interval);
  }, [items.length]);

  return (
    <div className="image-stack-container">
      {items.map((item, index) => (
        <motion.div
          key={item.id || index}
          className="image-card"
          style={{
            transformOrigin: "top center",
          }}
          initial={{
            opacity: 0,
            y: 30,
            rotateX: -40,
            scale: 0.9,
          }}
          animate={{
            opacity: index === currentIndex ? 1 : 0.4,
            y: index === currentIndex ? 0 : -30,
            scale: index === currentIndex ? 1 : 0.9,
            rotateX: index === currentIndex ? 0 : 40,
            zIndex: index === currentIndex ? items.length : items.length - index - 1,
            transition: {
              duration: 0.7,
              ease: [0.4, 0.0, 0.2, 1],
            },
          }}
        >
          <img src={item.src} alt={`Image ${index + 1}`} className="card-image" />
        </motion.div>
      ))}
    </div>
  );
};