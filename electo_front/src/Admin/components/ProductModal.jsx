import React, { useState, useEffect } from "react";
import "../styles/Modal.css";

const ProductModal = ({ isOpen, onClose, onSave, initialData }) => {
    const [form, setForm] = useState({
      name: "",
      price: "",
      quantity: "",
      category: "",
      rating: "",
    });
  
    const [imageFile, setImageFile] = useState(null);
    const [imagePreview, setImagePreview] = useState("");
    const [loading, setLoading] = useState(false);
  
    useEffect(() => {
      if (initialData) {
        const { name, price, quantity, category, rating, image } = initialData;
        setForm({ name, price, quantity, category, rating });
        setImagePreview(image || "");
      } else {
        setForm({
          name: "",
          price: "",
          quantity: "",
          category: "",
          rating: "",
        });
        setImagePreview("");
      }
      setImageFile(null);
    }, [initialData]);
  
    const handleChange = (e) =>
      setForm({ ...form, [e.target.name]: e.target.value });
  
    const handleFileChange = (e) => {
      const file = e.target.files[0];
      setImageFile(file);
      if (file) {
        setImagePreview(URL.createObjectURL(file)); 
      }
    };
  
    
    const uploadToCloudinary = async (file) => {
      setLoading(true); 
      const formData = new FormData();
      formData.append("file", file);
      formData.append("upload_preset", "admin_page"); 
      formData.append("cloud_name", "dvu3bxyvg");     
  
      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dvu3bxyvg/image/upload", 
        {
          method: "POST",
          body: formData,
        }
      );
  
      const data = await res.json();
      setLoading(false); 
      return data.secure_url; 
    };
  
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        let imageUrl = initialData?.image || "";  
      
        if (imageFile) {
          try {
            
            imageUrl = await uploadToCloudinary(imageFile);
          } catch (err) {
            alert("ُError uploading image: " + err.message);
            return;
          }
        }
      
        onSave({ ...form, image: imageUrl });
        onClose();
      };
      
  
    if (!isOpen) return null;
  
    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>{initialData ? "Edit Product" : "Add Product"}</h2>
          <form onSubmit={handleSubmit}>
            {["name", "price", "quantity", "category", "rating"].map((field) => (
              <input
                key={field}
                name={field}
                placeholder={field}
                value={form[field]}
                onChange={handleChange}
                required
              />
            ))}
  
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              required={!initialData}
            />
  
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100px", marginTop: "10px" }}
              />
            )}
  
            {loading && <div className="loading">Loading...</div>} 
  
            <div className="modal-actions">
              <button type="submit" disabled={loading}>Save</button>
              <button className="cancel" type="button" onClick={onClose}>
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    );
  };
  
  export default ProductModal;
  