import React, { useEffect, useState } from "react";

export default function AdminPanel() {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  const [sweets, setSweets] = useState([]);
  const [form, setForm] = useState({
    name: "",
    category: "",
    price: "",
    quantity: "",
  });

  // 🚫 Block non-admin users
  if (role !== "admin") {
    return <h2 style={{ marginTop: "80px" }}>Access denied (Admin only)</h2>;
  }

  // Fetch all sweets
  async function fetchSweets() {
    const res = await fetch("http://localhost:5000/api/sweets", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    const data = await res.json();
    setSweets(data);
  }

  // Add sweet
  async function addSweet(e) {
    e.preventDefault();

    const res = await fetch("http://localhost:5000/api/sweets", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        name: form.name,
        category: form.category,
        price: Number(form.price),
        quantity: Number(form.quantity),
      }),
    });

    if (!res.ok) {
      alert("Failed to add sweet");
      return;
    }

    setForm({ name: "", category: "", price: "", quantity: "" });
    fetchSweets();
  }

  // Delete sweet
  async function deleteSweet(id) {
    if (!window.confirm("Delete this sweet?")) return;

    await fetch(`http://localhost:5000/api/sweets/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchSweets();
  }

  // Restock sweet
  async function restockSweet(id) {
    const qty = prompt("Enter quantity to restock:");
    if (!qty) return;

    await fetch(`http://localhost:5000/api/sweets/${id}/restock`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ quantity: Number(qty) }),
    });

    fetchSweets();
  }

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div className="container" style={{ marginTop: "80px" }}>
      <h2>Admin Panel</h2>

      {/* ➕ ADD SWEET FORM */}
      <form onSubmit={addSweet} style={{ marginBottom: "30px" }}>
        <h3>Add New Sweet</h3>

        <input
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
          required
        />

        <input
          placeholder="Category"
          value={form.category}
          onChange={(e) => setForm({ ...form, category: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Price"
          value={form.price}
          onChange={(e) => setForm({ ...form, price: e.target.value })}
          required
        />

        <input
          type="number"
          placeholder="Quantity"
          value={form.quantity}
          onChange={(e) => setForm({ ...form, quantity: e.target.value })}
          required
        />

        <button type="submit">Add Sweet</button>
      </form>

      {/* 🍬 SWEETS LIST */}
      <h3>All Sweets</h3>

      {sweets.length === 0 && <p>No sweets found.</p>}

      {sweets.map((sweet) => (
        <div
          key={sweet.id}
          style={{
            border: "1px solid #ccc",
            padding: "10px",
            marginBottom: "10px",
          }}
        >
          <strong>{sweet.name}</strong> | {sweet.category} | ₹{sweet.price} | Qty:
          {sweet.quantity}

          <div style={{ marginTop: "5px" }}>
            <button onClick={() => restockSweet(sweet.id)}>Restock</button>
            <button
              onClick={() => deleteSweet(sweet.id)}
              style={{ marginLeft: "10px" }}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
