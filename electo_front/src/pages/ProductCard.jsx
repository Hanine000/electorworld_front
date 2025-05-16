import { Link } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import "../styles/ProductCard.css";

function ProductCard({ id, name, image, price }) {
  return (
    <Link to={`/products/details/${id}`} className="product-card-link">
      <div className="product-card">
        <img src={image} alt={name} className="product-image" />
        <h3 className="product-name">{name}</h3>
        <div className="product-price">{price} DA</div>
        <div className="button-row">
          <button className="btn buy">
            <FiShoppingCart style={{ marginRight: "6px" }} />
            Buy Now
          </button>
        </div>
      </div>
    </Link>
  );
}

export default ProductCard;

