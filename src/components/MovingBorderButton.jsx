// src/components/MovingBorderButton.jsx

"use client";
import React from "react";
import {
  motion,
  useMotionTemplate,
  useMotionValue,
  useSpring,
} from "framer-motion";

export const MovingBorderButton = ({
  children,
  borderRadius = "1.75rem",
  duration = 5000,
  className,
  ...otherProps
}) => {
  const mouseX = useSpring(0, { stiffness: 500, damping: 100 });
  const mouseY = useSpring(0, { stiffness: 500, damping: 100 });

  function onMouseMove({ currentTarget, clientX, clientY }) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  const maskImage = useMotionTemplate`radial-gradient(250px at ${mouseX}px ${mouseY}px, white, transparent)`;
  const style = {
    maskImage: maskImage,
    WebkitMaskImage: maskImage,
  };

  return (
    <button
      onMouseMove={onMouseMove}
      style={{
        ...otherProps.style,
        position: "relative",
        display: "inline-block",
        padding: "2px",
        borderRadius: borderRadius,
        background: "transparent",
        overflow: "hidden",
        border: "none",
        cursor: "pointer",
      }}
      className={className}
      {...otherProps}
    >
      <div
        style={{
          content: '""',
          position: "absolute",
          left: 0,
          top: 0,
          width: "100%",
          height: "100%",
          borderRadius: `calc(${borderRadius} - 2px)`,
          background: "rgb(15 23 42)", // Latar belakang gelap (slate-900)
          zIndex: 1,
        }}
      />
      <motion.div
        style={{
          ...style,
          content: '""',
          position: "absolute",
          left: "0",
          top: "0",
          width: "100%",
          height: "100%",
          zIndex: 3,
          background: "linear-gradient(90deg, #ff7eb9, #f3ec78, #af4261, #ff7eb9)",
          backgroundSize: "400% 100%",
        }}
        animate={{
          backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
        }}
        transition={{
          duration: duration / 1000, // Durasi dari props
          repeat: Infinity,
          ease: "linear",
        }}
      />
      <div style={{ position: "relative", zIndex: 10, padding: "0.7rem 1.5rem", color: "white" }}>
        {children}
      </div>
    </button>
  );
};