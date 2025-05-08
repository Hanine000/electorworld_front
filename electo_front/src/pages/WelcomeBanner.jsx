import React, { useState, useEffect } from 'react';
import '../styles/WelcomeBanner.css';

const WelcomeBanner = () => {
  const [isScrolled, setIsScrolled] = useState(false);

  // Effect to detect scroll event
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 100) {
        setIsScrolled(true); // Hide the banner once user scrolls down
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className={`welcome-banner ${isScrolled ? 'scrolled' : ''}`}>
      <div className="hero-section">
        <div className="hero-content">
          <h1>Hello, Welcome to Our Shop!</h1>
          <p>Browse through a wide range of amazing products!</p>
        </div>
      </div>
    </div>
  );
};

export default WelcomeBanner;



