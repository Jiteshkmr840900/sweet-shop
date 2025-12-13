import React from "react";

export default function SweetCard({ sweet, token, onPurchase }) {
  async function handlePurchase() {
    try {
      const res = await fetch(
        `http://localhost:5000/api/sweets/${sweet.id}/purchase`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        const err = await res.json();
        alert(err.message || "Purchase failed");
        return;
      }

      onPurchase(); // refresh sweets list
    } catch (err) {
      alert("Server error");
    }
  }

  return (
    <div className="sweet-card">
      <h3>{sweet.name}</h3>
      <p>Category: {sweet.category}</p>
      <p>Price: ₹{sweet.price}</p>
      <p>Available: {sweet.quantity}</p>

      <button
        onClick={handlePurchase}
        disabled={sweet.quantity === 0}
        className={sweet.quantity === 0 ? "disabled" : ""}
      >
        {sweet.quantity === 0 ? "Out of Stock" : "Purchase"}
      </button>
    </div>
  );
}
