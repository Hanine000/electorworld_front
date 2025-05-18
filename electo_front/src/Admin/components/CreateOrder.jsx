import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, addDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/CreateOrder.css";

const CreateOrder = () => {
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [selectedUser, setSelectedUser] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchUsers = async () => {
      const snapshot = await getDocs(collection(db, "users"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setUsers(data);
    };

    const fetchProducts = async () => {
      const snapshot = await getDocs(collection(db, "products"));
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(data);
    };

    fetchUsers();
    fetchProducts();
  }, []);

  const isFormValid = selectedUser && selectedProduct && quantity > 0;

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;

    const userRef = doc(db, "users", selectedUser);
    const productRef = doc(db, "products", selectedProduct);

    const productData = products.find((p) => p.id === selectedProduct);
    const unitPrice = parseFloat(productData?.price) || 0;
    const totalPrice = unitPrice * quantity;

    try {
      const ordersSnapshot = await getDocs(collection(db, "orders"));
      let maxOrderId = 0;
      ordersSnapshot.forEach((doc) => {
        const data = doc.data();
        if (data.order_id && data.order_id > maxOrderId) {
          maxOrderId = data.order_id;
        }
      });
      const newOrderId = maxOrderId + 1;

      const order = {
        order_id: newOrderId,
        user_id: userRef,
        products: [{ productRef: productRef, quantity, price: unitPrice }],
        total_price: totalPrice,
        status: "pending",
      };

      await addDoc(collection(db, "orders"), order);
      alert("Order created successfully!");
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Error creating order. Please try again.");
    }
  };

  return (
    <div className="container">
      <h2>Create Order</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label>User:</label>
          <select
            value={selectedUser}
            onChange={(e) => setSelectedUser(e.target.value)}
          >
            <option value="">Select user</option>
            {users.map((user) => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Product:</label>
          <select
            value={selectedProduct}
            onChange={(e) => setSelectedProduct(e.target.value)}
          >
            <option value="">Select product</option>
            {products.map((p) => (
              <option key={p.id} value={p.id}>
                {p.name} — {p.price}$
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Quantity:</label>
          <input
            type="number"
            value={quantity}
            min="1"
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <button type="submit" disabled={!isFormValid}>
          Create Order
        </button>
      </form>
    </div>
  );
};

export default CreateOrder;
