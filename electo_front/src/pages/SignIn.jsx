import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "../styles/SignIn.css";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = ({ target: { name, value } }) => {
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    console.log("Submitting login:", formData); 

    try {
      const response = await axios.post("http://localhost:5000/api/users/login", {
        email: formData.email,
        password: formData.password 
      });
      
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("user", JSON.stringify(response.data.user));
      }

      toast.success("Login successful!");
      navigate("/homepage");
      
    } catch (err) {
      console.error(err);
      if (err.response) {
        toast.error(err.response.data.message || "Invalid email or password");
      } else if (err.request) {
        toast.error("Server not responding. Please try again later.");
      } else {
        toast.error("An unexpected error occurred");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="main-container">
      <h2>Glad to see you again</h2>
      <p>Sign in to access your account</p>
      
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="details"
          value={formData.email}
          onChange={handleChange}
          required
        />
        
        <div className="password-wrapper">
          <input
            type={passwordVisible ? "text" : "password"}
            name="password"
            placeholder="Password"
            className="details"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <span
            className="icon"
            onClick={() => setPasswordVisible(!passwordVisible)}
          >
            {passwordVisible ? <FaEyeSlash /> : <FaEye />}
          </span>
        </div>

        <button 
          className="submit-btn" 
          type="submit"
          disabled={loading}
        >
          {loading ? "Signing In..." : "Sign In"}
        </button>
      </form>

      <div className="signup">
        <p>Don't have an account?</p>
        <Link to="/Signup">Sign up</Link>
      </div>
    </div>
  );
}

export default Signin;
