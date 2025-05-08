import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "../compoents/CategoryCard.jsx";
import ProductCard from "../pages/ProductCard.jsx";
import Phone from "../assets/iphone.png";
import Laptop from "../assets/ipadd.webp";
import Desktop from "../assets/lap.webp";
import Monitors from "../assets/headphone.jpg";
import Accessories from "../assets/manette.webp";
import Tablets from "../assets/camera.jpg";
import "../styles/Home.css";
import { toast } from "react-toastify";

function Home() {
  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState({});
  const [page, setPage] = useState(1);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/api/products?page=${page}&limit=12`);
        setProducts(response.data.products);
        setPagination(response.data.pagination);
      } catch (error) {
        console.error("Error fetching products:", error);
        toast.error("Failed to fetch products. Please try again later.");
      }
    };

    fetchProducts();
    window.scrollTo(0, 0); // Reset scroll position on page change
  }, [page]);

  return (
    <>
      <h1>Categories</h1>
      <div className="categories">
        <CategoryCard category="Mobile Phones" logo={Phone} />
        <CategoryCard category="Tablets & iPads" logo={Laptop} />
        <CategoryCard category="Laptops & Computers" logo={Desktop} />
        <CategoryCard category="Gaming" logo={Monitors} />
        <CategoryCard category="Audio & Headphones" logo={Accessories} />
        <CategoryCard category="Cameras & Photography" logo={Tablets} />
      </div>

      <h1>All Items</h1>
      <div className="AllItems">
        <div className="item-list">
          {products.map((product) => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.name}
              image={product.images[0]}
              price={product.price}
            />
          ))}
        </div>
      </div>

      {pagination.pages > 1 && (
        <div className="pagination-controls">
          {[...Array(pagination.pages)].map((_, index) => (
            <button
              key={index}
              onClick={() => setPage(index + 1)} 
              className={page === index + 1 ? "active" : ""} 
            >
              {index + 1}
            </button>
          ))}
        </div>
      )}
    </>
  );
}

export default Home;


