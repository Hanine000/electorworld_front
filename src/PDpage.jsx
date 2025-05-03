import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import ProductDetails from "./ProductDetails.jsx";
import "./ProductDetails.css";
import Comment from "./Comment.jsx";
import { toast } from "react-toastify";

function PDpage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  useEffect(() => {
    const fetchProductAndRelated = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/products/${id}`);
        const currentProduct = res.data;
        setProduct(currentProduct);

        const relatedRes = await axios.get(`http://localhost:5000/api/products?limit=1000`);
        const allProducts = relatedRes.data.products || [];

        const sameCategoryProducts = allProducts.filter(
          (p) => p.category === currentProduct.category && p._id !== id
        );

        setRelatedProducts(sameCategoryProducts);
      } catch (err) {
        console.error("Error fetching product or related items:", err);
        toast.error("Failed to load product or related items");
      }
    };

    fetchProductAndRelated();
  }, [id]);

  if (!product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="product-page">
      <h1>Product Details</h1>

      <ProductDetails product={product} />

      <h2 className="title">Related Products</h2>
      <div className="related-products">
        {relatedProducts.length > 0 ? (
          relatedProducts.map((relatedProduct) => (
            <Link
              to={`/products/${relatedProduct._id}`}
              key={relatedProduct._id}
              className="related-product"
            >
              <img
                src={relatedProduct.images?.[0] || "https://via.placeholder.com/150"}
                alt={relatedProduct.name}
              />
              <h3>{relatedProduct.name}</h3>
              <p>${relatedProduct.price.toFixed(2)}</p>
            </Link>
          ))
        ) : (
          <p>No related products found.</p>
        )}
      </div>

      <Comment productId={id} />
    </div>
  );
}

export default PDpage;
