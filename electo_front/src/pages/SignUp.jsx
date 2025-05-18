import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../styles/SignUp.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: "", 
    email: "",
    name: "",
    password: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting registration:", formData); 
    try {
     
      const response = await axios.post("http://localhost:5000/api/users/createUser", {
        password: formData.password,
        email: formData.email,
        username: formData.username
      });

  
      if (response.data.token) {
        localStorage.setItem("token", response.data.token);
      }

      toast.success("Account created successfully!");
      navigate("/");
    } catch (err) {
      console.error(err);
      if (err.response) {
        
        toast.error(err.response.data.error || "Registration failed");
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
      <h1>Welcome</h1>
      <p>Create an account</p>

      <form className="sign-up-form" onSubmit={handleSubmit}>
        <input
          type="text"
          name="username" 
          placeholder="Username"
          className="details"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Full Name"
          className="details"
          value={formData.name}
          onChange={handleChange}
          required
        />
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
        <button className="submit-btn" type="submit" disabled={loading}>
          {loading ? "Creating Account..." : "Sign Up"}
        </button>
      </form>

      <div className="signup">
        <p>Already have an account?</p>
        <Link to="/Signin">Sign in</Link>
      </div>
    </div>
  );
}

export default Signup;