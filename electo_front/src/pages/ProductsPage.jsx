import { useParams } from "react-router-dom";
import ProductCard from "../pages/ProductCard";
import "../styles/ProductsPage.css";
import { useState, useEffect } from "react";
import axios from "axios";

function ProductsPage() {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products?limit=1000`);
        setProducts(res.data.products);
        setLoading(false);
      } catch (err) {
        console.error("Error fetching data", err);
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const normalizedCategory = category.toLowerCase().replace(/-/g, " ");

  const filteredProducts = products.filter((product) => {
    if (!product.category) return false;
    const productCategory = product.category.toString().toLowerCase().replace(/\s+/g, " ");
    return productCategory === normalizedCategory;
  });

  console.log("Category from URL:", normalizedCategory);
  console.log("Filtered:", filteredProducts.length, "out of", products.length);
  console.log("Product categories:", products.map(p => p.category));

  return (
    <div className="products-page">
      <h2 style={{ color: "white" }}>{category}</h2>
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
  );
}

export default ProductsPage;
