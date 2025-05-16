import { Link } from "react-router-dom";
import "../styles/CategoryCard.css"; 

function CategoryCard({ category, logo }) {
  return (
    <div className="category-card">
      <img src={logo} alt={category} />
      <p>{category}</p>
    </div>
  );
}

export default CategoryCard;