function ProductCard({
  name,
  category,
  description,
  price,
  stock,
  image,
}) {
  const handleAddToCart = () => {
    alert(`${name} added to cart!`);
  };

  const handleBuyNow = () => {
    alert(`Buying ${name}`);
  };

  return (
    <div className="product-card">
      <div className="product-image">
        <img
          src={image}
          alt={name}
          loading="lazy"
        />

        <span className="stock-badge">
          {stock > 0 ? `${stock} left` : "Out of Stock"}
        </span>
      </div>

      <div className="product-info">
        <p className="category">{category}</p>

        <h2>{name}</h2>

        <p className="description">{description}</p>

        <div className="product-bottom">
          <div>
            <p className="price">
              ₹{price.toLocaleString("en-IN")}
            </p>

            <p className="stock">
              {stock > 0
                ? `Stock: ${stock}`
                : "Out of Stock"}
            </p>
          </div>
        </div>

        <div className="button-group">
          <button
            type="button"
            className="cart-btn"
            onClick={handleAddToCart}
            disabled={stock === 0}
          >
            Add to Cart
          </button>

          <button
            type="button"
            className="buy-btn"
            onClick={handleBuyNow}
            disabled={stock === 0}
          >
            Buy Now
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductCard;