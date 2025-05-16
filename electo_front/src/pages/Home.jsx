import  { useState, useEffect } from "react";
import axios from "axios";
import Slider from "react-slick"; 
import CategoryCard from "../compoents/CategoryCard.jsx";
import ProductCard from "../pages/ProductCard.jsx";
import Phone from "../assets/iphone.png";
import tablet from "../assets/ipadd.webp";
import laptop from "../assets/lap.webp";
import headphone from "../assets/headphone.jpg";
import manette from "../assets/manette.webp";
import camera from "../assets/camera.jpg";
import fastDeliveryIcon from "../assets/fast.png";
import supportIcon from "../assets/support.png";
import qualityIcon from "../assets/quality.png";
import brand1 from "../assets/hp.png"; 
import brand2 from "../assets/dell-.png";
import brand3 from "../assets/apple.png";
import brand4 from "../assets/samsung.png";
import img1 from "../assets/ps5.jpeg";
import img2 from "../assets/app.webp";
import img3 from "../assets/ss.jpg";


import "../styles/Home.css";
import { toast } from "react-toastify";

function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [page, setPage] = useState(1);

 const getProductsPerPage = () => {
  if (window.innerWidth <= 768) return 6;
  return 8;
};

const [PRODUCTS_PER_PAGE, setProductsPerPage] = useState(getProductsPerPage());

useEffect(() => {
  const handleResize = () => {
    setProductsPerPage(getProductsPerPage());
  };

  window.addEventListener("resize", handleResize);
  return () => window.removeEventListener("resize", handleResize);
}, []);


  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?limit=1000`);
        const allProducts = response.data.products;
        setProducts(allProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const filtered = products.filter((product) =>
      product.name?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setFilteredProducts(filtered);
    setPage(1);
  }, [searchTerm, products]);

  
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * PRODUCTS_PER_PAGE,
    page * PRODUCTS_PER_PAGE
  );

  
  const carouselSettings = {
    dots: true,
    infinite: true,
    speed: 800,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
  };

 const carouselImages = [img1, img2, img3];


  
  const features = [
    { icon: fastDeliveryIcon, text: "توصيل سريع" },
    { icon: supportIcon, text: "خدمة 24 ساعة" },
    { icon: qualityIcon, text: "ضمان وجودة" },
  ];

  
  const brands = [brand1, brand2, brand3, brand4];

  return (
    <>
      
    <div className="carousel-container">
  <Slider {...carouselSettings}>
    {carouselImages.map((img, index) => (
      <div key={index}>
        <img src={img} alt={`Slide ${index + 1}`} className="carousel-image" />
      </div>
    ))}
  </Slider>
</div>


      
      <div className="features-container">
        {features.map(({ icon, text }, index) => (
          <div key={index} className="feature-item">
            <img src={icon} alt={text} className="feature-icon" />
            <p>{text}</p>
          </div>
        ))}
      </div>

      
      <h1>Categories</h1>
      <div className="categories">
        <CategoryCard category="Mobile Phones" logo={Phone} />
        <CategoryCard category="Tablets & iPads" logo={tablet} />
        <CategoryCard category="Laptops & Computers" logo={laptop} />
        <CategoryCard category="Gaming" logo={manette} />
        <CategoryCard category="Audio & Headphones" logo={headphone} />
        <CategoryCard category="Cameras & Photography" logo={camera} />
      </div>

      
      <h1>{searchTerm ? `Search Results for "${searchTerm}"` : "All Items"}</h1>
      <div className="AllItems">
        <div className="item-list">
          {paginatedProducts.length > 0 ? (
            paginatedProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                image={product.images[0]}
                price={product.price}
              />
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>

        
        <div className="pagination-controls">
          <button
            onClick={() => setPage((p) => (p > 1 ? p - 1 : p))}
            disabled={page === 1}
          >
            &#8592; السابق
          </button>
          <span>
            {page} / {Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
          </span>
          <button
            onClick={() =>
              setPage((p) =>
                p < Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE) ? p + 1 : p
              )
            }
            disabled={page === Math.ceil(filteredProducts.length / PRODUCTS_PER_PAGE)}
          >
            التالي &#8594;
          </button>
        </div>
      </div>

      
      <h2>Brands</h2>
      <div className="brands-container">
        {brands.map((brand, idx) => (
          <img key={idx} src={brand} alt={`Brand ${idx + 1}`} className="brand-logo" />
        ))}
      </div>
    </>
  );
}

export default Home;


