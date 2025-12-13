import { Link } from "react-router-dom";
import React, { useEffect, useState } from "react";
import SweetCard from "../components/SweetCard";
import SearchBar from "../components/SearchBar";

export default function Dashboard() {
  const [sweets, setSweets] = useState([]);
  const token = localStorage.getItem("token");

  // Fetch all sweets
  async function fetchSweets() {
    try {
      const res = await fetch("http://localhost:5000/api/sweets", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Failed to fetch sweets");
      }

      const data = await res.json();
      setSweets(data);
    } catch (err) {
      alert(err.message);
    }
  }

  // Search sweets
  async function handleSearch(filters) {
    const params = new URLSearchParams(filters);

    try {
      const res = await fetch(
        `http://localhost:5000/api/sweets/search?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      const data = await res.json();
      setSweets(data);
    } catch (err) {
      alert("Search failed");
    }
  }

  useEffect(() => {
    fetchSweets();
  }, []);

  return (
    <div
      className="container"
      style={{ marginTop: "80px", position: "relative" }}
    >
      {/* ✅ ADMIN PANEL LINK (TOP-LEFT) */}
      {localStorage.getItem("role") === "admin" && (
        <Link
          to="/admin"
          style={{
            position: "absolute",
            top: "10px",
            left: "10px",
            fontWeight: "bold",
          }}
        >
          Admin Panel
        </Link>
      )}

      <h2>Available Sweets</h2>

      <SearchBar onSearch={handleSearch} />

      <div
        style={{
          display: "flex",
          gap: "20px",
          flexWrap: "wrap",
        }}
      >
        {sweets.length === 0 && <p>No sweets found.</p>}

        {sweets.map((sweet) => (
          <SweetCard
            key={sweet.id}
            sweet={sweet}
            token={token}
            onPurchase={fetchSweets}
          />
        ))}
      </div>
    </div>
  );
}
