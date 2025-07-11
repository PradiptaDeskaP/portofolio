import React, { useState, useEffect } from "react";
import { Link } from 'react-scroll';
import "./Navbar.css"; // Kita akan menggunakan CSS yang sama
import { MovingBorderButton } from "./MovingBorderButton";
import avatarImage from '../images/avatar.png';

const Navbar = () => {
  // 2. Buat state untuk melacak kondisi scroll
  const [isScrolled, setIsScrolled] = useState(false);

  // 3. Gunakan useEffect untuk menambahkan event listener saat komponen dimuat
  useEffect(() => {
    const handleScroll = () => {
      // Jika posisi scroll vertikal > 50px, set isScrolled menjadi true
      if (window.scrollY > 50) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    // Tambahkan event listener
    window.addEventListener("scroll", handleScroll);

    // Cleanup function untuk menghapus event listener saat komponen dibongkar
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []); // Array dependensi kosong agar efek ini hanya berjalan sekali
  return (
    <header className="navbar-container">
      {/* 4. Tambahkan kelas 'scrolled' secara kondisional */}
      <nav className={`navbar-content ${isScrolled ? "scrolled" : ""}`}>
        {/* Bagian Logo */}
        <div className="logo">
          {/* 2. Gunakan variabel hasil impor */}
          <img src={avatarImage} alt="User Avatar" className="logo-image" />
        </div>

        {/* Bagian Link Navigasi */}
        <ul className="nav-links">
          <li>
            <Link to="profil" spy={true} smooth={true} offset={-100} duration={500} activeClass="active">
              Home
            </Link>
          </li>
          <li>
            <Link to="about" spy={true} smooth={true} offset={-80} duration={500} activeClass="active">
              About
            </Link>
          </li>
          <li>
            <Link to="experiences" spy={true} smooth={true} offset={-80} duration={500} activeClass="active">
              Experiences
            </Link>
          </li>
          <li>
            <Link to="projects" spy={true} smooth={true} offset={-80} duration={500} activeClass="active">
              Project
            </Link>
          </li>
          <li>
            <Link to="certifications" spy={true} smooth={true} offset={-80} duration={500} activeClass="active">
              Certification
            </Link>
          </li>
        </ul>

        {/* 5. Ganti tombol secara kondisional */}

        <MovingBorderButton borderRadius="10px">Contact Me</MovingBorderButton>
      </nav>
    </header>
  );
};

export default Navbar;
