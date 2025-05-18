import React, { useEffect, useState } from "react";
import { collection, getDocs, getDoc } from "firebase/firestore";
import { db } from "../firebase";
import "../styles/Orders.css";

const Orders = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchOrdersWithDetails = async () => {
      try {
        const snapshot = await getDocs(collection(db, "orders"));
        const ordersData = await Promise.all(
          snapshot.docs.map(async (doc) => {
            const data = doc.data();

            if (!data.user_id) return null;
            const userSnap = await getDoc(data.user_id);
            if (!userSnap.exists()) return null;
            const userData = userSnap.data();
            const userName = userData.name || "Unnamed";

            const productDetails = await Promise.all(
              (data.products || []).map(async (p) => {
                const { productRef, quantity, price } = p;
                let productData = {
                  name: "Unknown Product",
                  image: "",
                  category: "",
                  rating: 0,
                };
                if (productRef) {
                  const productSnap = await getDoc(productRef);
                  if (productSnap.exists()) {
                    const data = productSnap.data();
                    productData = {
                      name: data.name || "Unnamed",
                      image: data.image || "",
                      category: data.category || "",
                      rating: data.rating || 0,
                    };
                  }
                }
                return { ...productData, quantity, price };
              })
            );

            return {
              id: doc.id,
              order_id: data.order_id,
              userName,
              products: productDetails,
              total_price: data.total_price,
              status: data.status,
            };
          })
        );

        setOrders(ordersData.filter(order => order !== null));
      } catch (error) {
        console.error("Error fetching orders with details:", error);
      }
    };

    fetchOrdersWithDetails();
  }, []);

  return (
    <div className="orders-page">
      <h2>Orders</h2>
      <table className="orders-table">
        <thead>
          <tr>
            <th>Order ID</th>
            <th>User</th>
            <th>Products</th>
            <th>Total Price</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>{order.order_id}</td>
              <td>{order.userName}</td>
              <td>
                <ul>
                  {order.products.map((p, idx) => (
                    <li key={idx} style={{ marginBottom: "1em" }}>
                      <img
                        src={p.image}
                        alt={p.name}
                        width={50}
                        style={{ verticalAlign: "middle", marginRight: "10px" }}
                      />
                      <strong>{p.name}</strong> ({p.category})<br />
                      ⭐ {p.rating} — Quantity: {p.quantity} — Price: {p.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>{order.total_price}</td>
              <td>{order.status}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Orders;
