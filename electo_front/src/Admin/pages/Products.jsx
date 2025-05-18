// src/pages/Products.jsx
import React, { useEffect, useState } from "react";
import "../styles/Products.css";
import { db } from "../firebase";
import {
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import ProductModal from "../components/ProductModal";


const Products = () => {
  const [products, setProducts] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "products"), (snapshot) => {
      const items = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
      setProducts(items);
    });

    return () => unsub();
  }, []);

  const handleSave = async (data) => {
    try {
      if (editingProduct) {
        const docRef = doc(db, "products", editingProduct.id);
        await updateDoc(docRef, data);
      } else {
        await addDoc(collection(db, "products"), data);
      }
    } catch (err) {
      alert("Failed to save product: " + err.message);
    }
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      await deleteDoc(doc(db, "products", id));
    }
  };
  const [search, setSearch] = useState("");
  const [filterCategory, setFilterCategory] = useState("");

  // Extract unique categories
  const categories = [...new Set(products.map((p) => p.category))];

  // Filtered Products
  const filtered = products.filter((product) => {
    return (
      product.name.toLowerCase().includes(search.toLowerCase()) &&
      (filterCategory ? product.category === filterCategory : true)
    );
  });

  return (
    <div className="products-container">
      <h1 className="page-title">Products</h1>
      <button
        onClick={() => {
          setModalOpen(true);
          setEditingProduct(null);
        }}
      >
        + Add Product
      </button>
      <div style={{ display: "flex", gap: "10px", marginBottom: "15px" }}>
  <input
    type="text"
    placeholder="Search by name"
    value={search}
    onChange={(e) => setSearch(e.target.value)}
  />

  <select value={filterCategory} onChange={(e) => setFilterCategory(e.target.value)}>
    <option value="">All Categories</option>
    {categories.map((cat) => (
      <option key={cat} value={cat}>
        {cat}
      </option>
    ))}
  </select>
</div>


      <table className="product-table">
        <thead>
          <tr>
            <th>Image</th>
            <th>Name</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Category</th>
            <th>Rating</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
  {products.length === 0 ? (
    <tr>
      <td colSpan="7">No products found.</td>
    </tr>
  ) : (
    filtered.map((product) => (
      <tr key={product.id}>
        <td>
          <img src={product.image}  width="50" />
        </td>
        <td>{product.name}</td>
        <td>${product.price}</td>
        <td>{product.quantity}</td>
        <td>{product.category}</td>
        <td>{product.rating}</td>
        <td className="actions">

          <button
            onClick={() => {
              setEditingProduct(product);
              setModalOpen(true);
            }}
          >
            Edit
          </button>
          <button
            className="delete"
            onClick={() => handleDelete(product.id)}
          >
            Delete
          </button>
        </td>
      </tr>
    ))
  )}
</tbody>

      </table>

      <ProductModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        initialData={editingProduct}
      />
    </div>
  );
};

export default Products;
