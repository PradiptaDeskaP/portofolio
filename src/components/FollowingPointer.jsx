// src/components/FollowingPointer.jsx

import React, { useEffect, useState } from "react";
import { motion, useSpring } from "framer-motion";



const FollowingPointer = () => {
  // 1. Tambahkan state untuk mengontrol visibilitas (terlihat atau tidak)
  const [isVisible, setIsVisible] = useState(true);

  const x = useSpring(0, { stiffness: 500, damping: 100 });
  const y = useSpring(0, { stiffness: 500, damping: 100 });

  useEffect(() => {
    // 2. Modifikasi handleMouseMove untuk memeriksa elemen target
    const handleMouseMove = (event) => {
      const target = event.target;
      
      x.set(event.clientX);
      y.set(event.clientY);

      // Periksa tag elemen atau kelas parent-nya
      if (
        target.tagName.toLowerCase() === 'img' ||
        target.closest('button') || // <-- Cek apakah elemen atau induknya adalah tombol
        target.closest('a') ||      // <-- Cek apakah elemen atau induknya adalah link
        target.closest('.navbar-container')
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [x, y]); // Dependensi tetap sama

  return (
    <motion.div
      className="following-pointer"
      style={{
        left: x,
        top: y,
      }}
      // 3. Animasikan opacity dan scale berdasarkan state isVisible
      animate={{
        opacity: isVisible ? 1 : 0,
        scale: isVisible ? 1 : 0,
      }}
      transition={{
        duration: 0.2,
        ease: "easeInOut",
      }}
    >
      <div className="pointer-content">
    
        <p className="pointer-text">🥺Hire mee pleasee</p>
      </div>
    </motion.div>
  );
};

export default FollowingPointer;