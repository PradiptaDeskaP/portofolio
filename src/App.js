// src/App.js

import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import FollowingPointer from './components/FollowingPointer';
import HomePage from './pages/HomePage'; // Kita akan buat halaman ini
import ProjectDetailPage from './pages/ProjectDetailPage'; // dan ini
import CertificationDetailPage from './pages/CertificationDetailPage';
import './App.css'; // CSS untuk styling halaman


function App() {
  return (
    <Router>
      <div className="App">
        <FollowingPointer />
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/project/:projectId" element={<ProjectDetailPage />} />
          <Route path="/certification/:certId" element={<CertificationDetailPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;