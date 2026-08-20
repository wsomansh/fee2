import { useState } from "react";
import ProductCard from "./ProductCard";
import "./App.css";

function App() {
  const products = [
    {
      id: 1,
      name: "Flagship Smartphone Pro",
      category: "Smartphone",
      description:
        "Powerful smartphone with a premium design and advanced camera.",
      price: 129999,
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 2,
      name: "Galaxy Ultra Smartphone",
      category: "Smartphone",
      description: "Premium Android smartphone with a stunning display.",
      price: 139999,
      stock: 7,
      image:
        "https://images.unsplash.com/photo-1580910051074-3eb694886505?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 3,
      name: "Studio Wireless Headphones",
      category: "Headphones",
      description:
        "Wireless headphones with immersive sound and comfort.",
      price: 34999,
      stock: 4,
      image:
        "https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 4,
      name: "Ultraslim Laptop",
      category: "Laptop",
      description:
        "Lightweight laptop designed for work, study and entertainment.",
      price: 99999,
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1517336714731-489689fd1ca4?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 5,
      name: "Everyday Sport Sneakers",
      category: "Footwear",
      description:
        "Comfortable everyday sneakers with a sporty design.",
      price: 12999,
      stock: 8,
      image:
        "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 6,
      name: "Mirrorless Camera",
      category: "Camera",
      description:
        "Versatile camera for capturing detailed photographs.",
      price: 74999,
      stock: 3,
      image:
        "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 7,
      name: "Fitness Smartwatch",
      category: "Smartwatch",
      description:
        "Smartwatch with fitness tracking and everyday features.",
      price: 45999,
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1546868871-7041f2a55e12?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 8,
      name: "Everyday Comfort Hoodie",
      category: "Clothing",
      description:
        "Soft and comfortable hoodie for casual everyday wear.",
      price: 3999,
      stock: 10,
      image:
        "https://images.unsplash.com/photo-1551488831-00ddcb6c6bd3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 9,
      name: "Portable Bluetooth Speaker",
      category: "Audio",
      description:
        "Portable speaker delivering powerful sound anywhere.",
      price: 5999,
      stock: 9,
      image:
        "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 10,
      name: "Classic Sunglasses",
      category: "Accessories",
      description:
        "Classic sunglasses with a timeless and stylish design.",
      price: 8999,
      stock: 5,
      image:
        "https://images.unsplash.com/photo-1511499767150-a48a237f0083?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 11,
      name: "Wireless Keyboard",
      category: "Accessories",
      description:
        "Comfortable keyboard perfect for work, coding and study.",
      price: 4999,
      stock: 12,
      image:
        "https://images.unsplash.com/photo-1587829741301-dc798b83add3?auto=format&fit=crop&w=600&q=80",
    },
    {
      id: 12,
      name: "Classic Denim Jacket",
      category: "Clothing",
      description:
        "Classic denim jacket designed for casual everyday outfits.",
      price: 6999,
      stock: 6,
      image:
        "https://images.unsplash.com/photo-1551028719-00167b16eac5?auto=format&fit=crop&w=600&q=80",
    },
  ];

  const categories = ["All", ...new Set(products.map((p) => p.category))];
  const [activeCategory, setActiveCategory] = useState("All");

  const visibleProducts =
    activeCategory === "All"
      ? products
      : products.filter((p) => p.category === activeCategory);

  return (
    <div className="app">
      <header className="navbar">
        <div className="logo">
          Nova<span>Cart</span>
        </div>

        <div className="cart">
          🛒 <span>Cart</span>
        </div>
      </header>

      <section className="hero">
        <p className="small-title">WELCOME TO NOVACART</p>

        <h1>
          Everything you need,
          <br />
          all in one place.
        </h1>

        <p className="hero-text">
          Explore our collection of electronics, fashion and everyday
          essentials, curated for a faster, simpler way to shop.
        </p>
      </section>

      <main className="products-section">
        <div className="section-heading">
          <div>
            <p className="small-title">OUR COLLECTION</p>
            <h2>Featured Products</h2>
          </div>

          <p className="product-count">
            {visibleProducts.length} Products
          </p>
        </div>

        <div className="category-filters">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              className={`filter-chip ${
                activeCategory === category ? "active" : ""
              }`}
              onClick={() => setActiveCategory(category)}
            >
              {category}
            </button>
          ))}
        </div>

        <div className="product-grid">
          {visibleProducts.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              category={product.category}
              description={product.description}
              price={product.price}
              stock={product.stock}
              image={product.image}
            />
          ))}
        </div>
      </main>

      <footer>
        <p>© 2026 NovaCart | Built by Walia</p>
      </footer>
    </div>
  );
}

export default App;
