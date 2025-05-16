import { useParams } from "react-router-dom";
import ProductCard from "../pages/ProductCard";
import "../styles/ProductsPage.css";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductsPage({ searchTerm }) {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [selectedBrands, setSelectedBrands] = useState([]);
  const [selectedRating, setSelectedRating] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/products?limit=1000");
        setProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  useEffect(() => {
    document.title = `Category: ${category}`;
  }, [category]);

  if (loading) return <div>Loading...</div>;

  const normalizedCategory = category.toLowerCase().replace(/-/g, " ");

  const filteredProducts = products.filter((product) => {
    if (!product.category) return false;
    const productCategory = product.category.toString().toLowerCase().replace(/\s+/g, " ");
    const matchesCategory =
      normalizedCategory === "all" || productCategory === normalizedCategory;

    const price = parseFloat(product.price);
    const matchesPrice =
      (!minPrice || price >= parseFloat(minPrice)) &&
      (!maxPrice || price <= parseFloat(maxPrice));

    const matchesBrand =
      selectedBrands.length === 0 || selectedBrands.includes(product.brand);

    const matchesRating =
      !selectedRating || product.rating >= parseInt(selectedRating);

    const matchesSearch =
      !searchTerm || product.name.toLowerCase().includes(searchTerm.toLowerCase());

    return (
      matchesCategory &&
      matchesPrice &&
      matchesBrand &&
      matchesRating &&
      matchesSearch
    );
  });

  const uniqueBrands = Array.from(new Set(products.map((p) => p.brand).filter(Boolean)));

  return (
    <div className="products-page-container">
      {/* Filters Sidebar */}
      <div className="filters-sidebar">
        {/* Price Filter */}
        <div className="filter-group">
          <h4>Price</h4>
          <div>
            <div>
              <input
                type="radio"
                name="price"
                onChange={() => {
                  setMinPrice("");
                  setMaxPrice("200");
                }}
              />
              <label>Less than 200$ </label>
            </div>
            <div>
              <input
                type="radio"
                name="price"
                onChange={() => {
                  setMinPrice("200");
                  setMaxPrice("800");
                }}
              />
              <label>200$  - 800$ </label>
            </div>
            <div>
              <input
                type="radio"
                name="price"
                onChange={() => {
                  setMinPrice("800");
                  setMaxPrice("3400");
                }}
              />
              <label>800$ - 3400$ </label>
            </div>
            <div>
              <input
                type="radio"
                name="price"
                onChange={() => {
                  setMinPrice("3400");
                  setMaxPrice("");
                }}
              />
              <label>More than 3400$ </label>
            </div>
          </div>

          {/* Manual Price Input */}
          <div style={{ marginTop: "10px" }}>
            <input
              type="number"
              placeholder="Min SAR"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              style={{ width: "45%", marginRight: "5%" }}
            />
            <input
              type="number"
              placeholder="Max SAR"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              style={{ width: "45%" }}
            />
          </div>
        </div>

        {/* Brand Filter */}
        <div className="filter-group">
          <h4>Brands</h4>
          {uniqueBrands.map((brand) => (
            <div key={brand}>
              <input
                type="checkbox"
                value={brand}
                checked={selectedBrands.includes(brand)}
                onChange={(e) => {
                  const checked = e.target.checked;
                  setSelectedBrands((prev) =>
                    checked ? [...prev, brand] : prev.filter((b) => b !== brand)
                  );
                }}
              />
              <label>{brand}</label>
            </div>
          ))}
        </div>

        {/* Rating Filter */}
        <div className="filter-group">
          <h4>Rating</h4>
          {[5, 4, 3, 2, 1].map((stars) => (
            <div key={stars}>
              <input
                type="radio"
                name="rating"
                value={stars}
                checked={selectedRating === stars.toString()}
                onChange={(e) => setSelectedRating(e.target.value)}
              />
              <label>
                {Array.from({ length: 5 }, (_, i) => (
                  <span key={i} style={{ color: i < stars ? "#ffc107" : "#ddd" }}>★</span>
                ))} &nbsp;& Up
              </label>
            </div>
          ))}
        </div>
      </div>

      {/* Product Display */}
      <div className="product-content">
        <h2>{category}</h2>
        <div className="product-list">
          {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
              <ProductCard
                key={product._id}
                id={product._id}
                name={product.name}
                image={product.images?.[0]}
                price={product.price}
              />
            ))
          ) : (
            <p>No products found in this category</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsPage;
