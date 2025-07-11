// src/components/HoverBorderGradient.jsx

"use client";
import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import "./HoverBorderGradient.css";

export const HoverBorderGradient = ({
  children,
  containerClassName,
  className,
  as: Tag = "button",
  duration = 1,
  clockwise = true,
  ...props
}) => {
  const [hovered, setHovered] = useState(false);
  const [direction, setDirection] = useState("TOP");

  

  const movingMap = {
    TOP: "radial-gradient(20.7% 50% at 50% 0%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    LEFT: "radial-gradient(16.6% 43.1% at 0% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    BOTTOM: "radial-gradient(20.7% 50% at 50% 100%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
    RIGHT: "radial-gradient(16.2% 41.19% at 100% 50%, hsl(0, 0%, 100%) 0%, rgba(255, 255, 255, 0) 100%)",
  };

  const highlight = "radial-gradient(95% 181.15% at 50% 50%, #3275F8 0%, rgba(255, 255, 255, 0) 100%)";

  useEffect(() => {
    // Pindahkan fungsi ke dalam useEffect
    const rotateDirection = (currentDirection) => {
      const directions = ["TOP", "LEFT", "BOTTOM", "RIGHT"];
      const currentIndex = directions.indexOf(currentDirection);
      const nextIndex = clockwise
        ? (currentIndex - 1 + directions.length) % directions.length
        : (currentIndex + 1) % directions.length;
      return directions[nextIndex];
    };
  
    if (!hovered) {
      const interval = setInterval(() => {
        setDirection((prevState) => rotateDirection(prevState));
      }, duration * 1000);
      return () => clearInterval(interval);
    }
  }, [hovered, duration, clockwise]); // <-- Dependency array sudah benar

  return (
    <Tag
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className={`hbg-container ${containerClassName || ""}`}
      {...props}
    >
      <div className={`hbg-content ${className || ""}`}>
        {children}
      </div>
      <motion.div
        className="hbg-glow"
        style={{
          filter: "blur(2px)",
          position: "absolute",
          width: "100%",
          height: "100%",
        }}
        initial={{ background: movingMap[direction] }}
        animate={{
          background: hovered
            ? [movingMap[direction], highlight]
            : movingMap[direction],
        }}
        transition={{ ease: "linear", duration: duration ?? 1 }}
      />
      <div className="hbg-backdrop" />
    </Tag>
  );
};