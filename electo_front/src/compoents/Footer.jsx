import "../styles/Footer.css";
import {
  FaFacebookF,
  FaInstagram,
  FaTiktok,
  FaXTwitter
} from "react-icons/fa6"; // استخدم Fa6 لأيقونة X الحديثة

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Contact Us</h3>
          <p>Phone: +213 675 50 68 89</p>
          <p>
            Email:{" "}
            <a href="mailto:boukhennoufa.nihan@gmail.com">
              boukhennoufa.nihan@gmail.com
            </a>
          </p>
          <div className="social-icons">
            <a
              href="https://www.facebook.com/?locale=fr_FR"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-wrapper"
            >
              <FaFacebookF size={24} />
            </a>
            <a
              href="https://www.instagram.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-wrapper"
            >
              <FaInstagram size={24} />
            </a>
            <a
              href="https://www.tiktok.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-wrapper"
            >
              <FaTiktok size={24} />
            </a>
            <a
              href="https://twitter.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="icon-wrapper"
            >
              <FaXTwitter size={24} />
            </a>
          </div>
        </div>

        <div className="footer-section">
          <h3>Quick Links</h3>
          <ul>
            <li>
              <a href="/privacy-policy">Privacy Policy</a>
            </li>
            <li>
              <a href="/terms-of-service">Terms of Service</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-divider"></div>

      <div className="footer-bottom">
        <p>&copy; 2025 ElectroWorld. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;

