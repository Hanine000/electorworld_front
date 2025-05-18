import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="admin-footer">
      <p>© {new Date().getFullYear()} Admin Dashboard. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
