import { Link } from "react-router-dom";
import { FiShoppingCart, FiHeart } from "react-icons/fi"; 
import "../styles/ProductCard.css";

function ProductCard({ id, name, image, price }) {
  return (
    <div className="product-card">
      <Link to={`/products/details/${id}`} className="product-link">
        <img src={image} alt={name} className="product-image" />
        <h3 className="product-name">{name}</h3>
      </Link>
      <div className="product-price">{price} DA</div>
      <div className="button-row">
        <button className="btn buy">Buy Now</button>

        <button className="btn cart">
          <FiHeart />
        </button>

        <button className="btn cart">
          <FiShoppingCart />
        </button>
      </div>
    </div>
  );
}

export default ProductCard;


