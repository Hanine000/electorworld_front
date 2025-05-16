import React, { useState, useEffect } from "react";
import axios from "axios";
import CategoryCard from "../compoents/CategoryCard.jsx";
import ProductCard from "../pages/ProductCard.jsx";
import Phone from "../assets/iphone.png";
import tablet from "../assets/ipadd.webp";
import laptop from "../assets/lap.webp";
import headphone from "../assets/headphone.jpg";
import manette from "../assets/manette.webp";
import camera from "../assets/camera.jpg";
import "../styles/Home.css";
import { toast } from "react-toastify";

function Home({ searchTerm }) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [pagination, setPagination] = useState({ pages: 1, perPage: 12 });
  const [page, setPage] = useState(1);

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

    setPagination({
      pages: Math.ceil(filtered.length / pagination.perPage),
      perPage: pagination.perPage,
    });

    setPage(1); // reset to first page when searchTerm changes
  }, [searchTerm, products]);

  // Slice for pagination
  const paginatedProducts = filteredProducts.slice(
    (page - 1) * pagination.perPage,
    page * pagination.perPage
  );

  return (
    <>
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

