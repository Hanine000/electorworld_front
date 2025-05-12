import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import "../styles/Header.css";
import image from "../assets/logo1.jpg";
import like from "../assets/heart-.png";
import cart from "../assets/shopping-cart.png";
import profile from "../assets/man.png";
import Search from "./Search.jsx";
import bars from "../assets/bars.jpg";

function Header() {
  const navigate = useNavigate();
  const location = useLocation();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const dropdownRef = useRef(null);

  const isWelcomePage = location.pathname === "/";

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.value;
    if (selectedCategory) {
      navigate(`/products/${selectedCategory}`);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const categories = [
    "Mobile Phones",
    "Tablets & iPads",
    "Laptops & Computers",
    "Gaming",
    "Audio & Headphones",
    "Cameras & Photography",
    "Smart Home Devices",
    "Home Appliances",
    "Networking & Storage",
    "Office Electronics",
    "Chargers & Power",
  ];

  return (
    <>
      {/* Sidebar */}
      {!isWelcomePage && (
        <>
          <div className={`sidebar ${isSidebarOpen ? "open" : ""}`}>
            <h3>Categories</h3>
            <ul>
              {categories.map((category) => (
                <li key={category}>
                  <Link to={`/products/category/${category.toLowerCase().replace(/\s+/g, "-")}`}>
                    {category}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {isSidebarOpen && (
            <div className="sidebar-overlay" onClick={() => setSidebarOpen(false)} />
          )}
        </>
      )}

      {/* Navbar */}
      <div className="navbar">
        {!isWelcomePage && (
          <img
            src={bars}
            className="img"
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            alt="Menu"
          />
        )}
        <Link to="/">
          <div className="logo_container">
            <img src={image} className="logo_style" alt="ElectroWorld Logo" />
            <h2 className="logo_text">ElectroWorld</h2>
          </div>
        </Link>
        <Search />
        <div className="icons">
          <img src={like} className="img" alt="Wishlist" />
          <img src={cart} className="img" alt="Cart" />
          <div className="profile-container" ref={dropdownRef}>
            <img
              src={profile}
              className="img profile-icon"
              alt="Profile"
              onClick={() => setDropdownOpen(!isDropdownOpen)}
            />
            {isDropdownOpen && (
              <div className="profile-dropdown">
                <Link to="/signin">Sign In</Link>
                <Link to="/signup">Sign Up</Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
