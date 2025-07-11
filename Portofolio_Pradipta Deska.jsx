import React, { useState, useEffect } from "react";
import { motion } from "framer-motion"; // Menggunakan Framer Motion untuk animasi

// Component Navbar
const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full bg-black/75 text-white px-6 py-4 z-50">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-xl font-bold">YourBrand</h1>
        <ul className="flex space-x-4">
          <li><a href="#home" className="hover:underline">Home</a></li>
          <li><a href="#about" className="hover:underline">About</a></li>
          <li><a href="#services" className="hover:underline">Services</a></li>
          <li><a href="#contact" className="hover:underline">Contact</a></li>
        </ul>
      </div>
    </nav>
  );
};

// Component Main Content
const MainContent = () => {
  return (
    <div id="home" className="container mx-auto pt-20 pb-10">
      <h1 className="text-4xl font-bold mb-4">Welcome to Your Brand</h1>
      <p className="text-lg mb-8">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <button className="bg-pink-500 hover:bg-pink-700 text-white font-bold py-2 px-4 rounded">
        Get Started
      </button>
    </div>
  );
};

// App Component
function App() {
  // State untuk animasi shrink-to-grow
  const [isMounted, setIsMounted] = useState(false);

  // Efek untuk menambahkan animasi setelah komponen dimuat
  useEffect(() => {
    setTimeout(() => {
      setIsMounted(true);
    }, 100); // Delay sebentar agar animasi mulus
  }, []);

  return (
    <motion.div
      initial={{ scale: 0.95 }} // Awalnya mencekik
      animate={isMounted ? { scale: 1 } : { scale: 0.95 }} // Saat dimuat, tumbuh menjadi ukuran normal
      transition={{ duration: 0.5, ease: "easeOut" }} // Durasi transisi
      className="min-h-screen bg-gray-100"
    >
      {/* Navbar Sticky */}
      <Navbar />

      {/* Main Content */}
      <MainContent />
    </motion.div>
  );
}

export default App;