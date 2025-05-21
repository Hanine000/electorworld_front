import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import  { useState } from "react";
import "./styles/App.css";
import Footer from "./compoents/Footer.jsx";
import Signin from "./pages/SignIn.jsx";
import Signup from "./pages/SignUp.jsx";
import Home from "./pages/Home.jsx";
import ProductsPage from "./pages/ProductsPage.jsx";
import Header from "./compoents/Header.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import PDpage from "./pages/PDpage.jsx";
import ScrollToTop from "./compoents/ScrollToTop.jsx";
import WelcomePage from "./pages/WelcomePage.jsx";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


function AppWrapper() {
  const location = useLocation();
  const hideUIOnPaths = ['/'];

  const [searchTerm, setSearchTerm] = useState("");

  return (
    <>
      {!hideUIOnPaths.includes(location.pathname) && (
        <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      )}

      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/homepage" element={<Home searchTerm={searchTerm} />} />
        <Route path="/Signin" element={<Signin />} />
        <Route path="/Signup" element={<Signup />} />
        <Route
          path="/products/category/:category"
          element={<ProductsPage searchTerm={searchTerm} />}
        />
        <Route path="/products/details/:id" element={<PDpage />} />
      </Routes>

      {!hideUIOnPaths.includes(location.pathname) && <Footer />}

      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar={true}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </>
  );
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppWrapper />
    </Router>
  );
}

export default App;
