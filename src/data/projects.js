// src/data/projects.js

// gambar-gambar yang akan digunakan
import projectImage1 from '../images/foto1.jpg';
import projectImage2 from '../images/foto2.jpg';
import projectImage3 from '../images/kupon.jpg';
import frameImage from '../images/bingkaifoto.jpg';
import avatarImage from '../images/avatar.png';
import logoPython from '../images/logo_python2.png'; 
import logoPowerbi from '../images/powerbi.png'; 
import logoMysql from '../images/mysql.png'; 
import logoSheets from '../images/logo_sheets.png'; 
import logoExcel from '../images/logo_excel.png'; 
import logoR from '../images/logo_R.png';
import logoLooker from '../images/looker.png'; 
import logoColab from '../images/colab.png'; 
import clustering1 from '../images/clustering1.png'; 
import clustering2 from '../images/clustering2.png'; 
import clustering3 from '../images/clustering3.png'; 
export const projectsData = [
  {
    id: "halal-ingredients-checker", 
    title: "Optimalisasi Harga untuk Meningkatkan Penjualan: Analisis Produk Dress Wanita di Tokopedia menggunakan K-Nearest Neighbors",
    popupTitle: "Optimalisasi Harga ✨",
    category: "Classification",
    client: "Internal Project",
    duration: "1 Weeks",
    imageSrc: projectImage2,
    gallery: [projectImage2, frameImage, avatarImage], 
    techLogos: [logoPython, logoColab],
    previewLink: "https://bit.ly/3ScGz7u", // Ganti dengan link Anda
    liveLink: "https://colab.research.google.com/drive/1AqggFnGGhfKD4yczWQxGaw_n_fgzrq7b?usp=sharing",
    overview: "Tujuan projek untuk klasifikasi atau regresi. Model yang digunakan untuk memprediksi jumlah produk yang terjual berdasarkan harga khususnya klasifikasi atau regresi yaitu KNN (K-Nearest Neighbors). Dengan variabel yang digunakan diantaranya Jumlah Terjual Produk (Variabel Dependen) dan Harga, lokasi toko, Rating, Nama Produk (Variabel Dependen)",
    problem: "Penjual sering kali kesulitan dalam menentukan harga yang tepat untuk produk mereka agar menarik pembeli dan meningkatkan penjualan. Selanjutnya ingin membuktikan. Apakah harga benarbenar mempengaruhi jumlah produk yang terjual atau tidak",
    goals: [
      "Menganalisis pengaruh harga terhadap jumlah penjualan untuk memahami apakah harga lebih murah selalu lebih baik dalam menarik pembeli.",
      "Menyediakan rekomendasi harga yang lebih efektif, berdasarkan analisis data harga dan penjualan.",
      "Memberikan pemahaman yang lebih baik kepada penjual tentang bagaimana menetapkan harga produk mereka di pasar e-commerce berdasarkan pola penjualan yang teridentifikasi dari data",
      
    ],
    tech: [
        "Python", "TensorFlow & Keras", "Google Cloud Vision API", "Natural Language Processing (NLP)", "PostgreSQL", "Streamlit"
    ]
  },
  {
    id: "global-oil-gas-insight",
    title: "Analisis Sentimen dan Clustering Tweet Terkait Suku Bunga",
    popupTitle: "Clustering Tweet 📊",
    category: "Clustering",
    client: "Personal Project",
    duration: "2 Weeks",
    imageSrc: projectImage1,
    gallery: [clustering1, clustering2, clustering3],
    techLogos: [logoPython, logoSheets],
    previewLink: "https://bit.ly/3SeEGqV", // Ganti dengan link Anda
    liveLink: "https://colab.research.google.com/drive/1Kh9pnYXL-oo10Loo07-OuOG-0M2lAsPk?usp=sharing",  // Ganti dengan link Anda
    overview: "Memahami sentimen publik terhadap suku bunga melalui data media sosial, khususnya Twitter, sulit dilakukan karena volume data yang besar dan keberagaman pendapat. Oleh karena itu, diperlukan sistem otomatis untuk menganalisis sentimen dan mengelompokkan tweet berdasarkan topik terkait untuk mempercepat pemahaman dan pengambilan kebijakan yang lebih tepat. ",
    problem: "Ini adalah latar belakang masalah untuk proyek dashboard.",
    goals: [
      "Menganalisis sentimen publik terkait suku bunga (positif, negatif, netral).",
      "Mengelompokkan tweet berdasarkan topik terkait suku bunga.",
      "Memberikan wawasan berbasis data untuk pengambilan kebijakan moneter."
    ],
    tech: [
        "Power BI", "DAX", "SQL"
    ]
  },
  {
    id: "global-oil-gas-insight",
    title: "Analisis Sentimen dan Clustering Tweet Terkait Suku Bunga",
    popupTitle: "Clustering Tweet 📊",
    category: "Clustering",
    client: "Personal Project",
    duration: "2 Weeks",
    imageSrc: projectImage1,
    gallery: [projectImage1, projectImage1, projectImage1],
    techLogos: [logoPython, logoColab],
    previewLink: "https://drive.google.com/file/d/1lVJ66z35UsK6WsgpooxjfH0bwNt4Qv80/view?usp=sharing", // Ganti dengan link Anda
    liveLink: "https://hoaxdetector-production.up.railway.app/dashboard",  // Ganti dengan link Anda
    overview: "Memahami sentimen publik terhadap suku bunga melalui data media sosial, khususnya Twitter, sulit dilakukan karena volume data yang besar dan keberagaman pendapat. Oleh karena itu, diperlukan sistem otomatis untuk menganalisis sentimen dan mengelompokkan tweet berdasarkan topik terkait untuk mempercepat pemahaman dan pengambilan kebijakan yang lebih tepat. ",
    problem: "Ini adalah latar belakang masalah untuk proyek dashboard.",
    goals: [
      "Menganalisis sentimen publik terkait suku bunga (positif, negatif, netral).",
      "Mengelompokkan tweet berdasarkan topik terkait suku bunga.",
      "Memberikan wawasan berbasis data untuk pengambilan kebijakan moneter."
    ],
    tech: [
        "Power BI", "DAX", "SQL"
    ]
  },
];