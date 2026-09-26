import React, { useEffect, useState } from "react";
import { createRoot } from "react-dom/client";
import {
  BrowserRouter,
  useNavigate,
  Routes,
  Route,
  Link,
  useParams,
  useSearchParams,
} from "react-router-dom";
import axios from "axios";
import "./styles.css";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
});

const cats = [
  {
    name: "Men's Wear",
    icon: "👔",
    subtitle: "Style for every occasion"
  },
  {
    name: "Women's Wear",
    icon: "👗",
    subtitle: "Discover your style"
  },
  {
    name: "Electronics",
    icon: "🎧",
    subtitle: "Smart tech essentials"
  },
  {
    name: "Gift Items",
    icon: "🎁",
    subtitle: "Gifts for every moment"
  },
  {
    name: "Kids Collections",
    icon: "🧸",
    subtitle: "Fun for little ones"
  },
  {
    name: "Cookery Items",
    icon: "🍳",
    subtitle: "Everything for your kitchen"
  },
  {
    name: "Bag Collections",
    icon: "👜",
    subtitle: "Carry your style"
  }
];

function getCartCount() {
  const cart = JSON.parse(localStorage.getItem("cart") || "[]");
  return cart.reduce((sum, item) => sum + Number(item.quantity || 0), 0);
}

function notifyCartUpdated() {
  window.dispatchEvent(new Event("cartUpdated"));
}

function Layout({ children }) {
  const [cartCount, setCartCount] = useState(getCartCount());
  const navigate = useNavigate();

  useEffect(() => {
    const updateCartCount = () => setCartCount(getCartCount());
    window.addEventListener("cartUpdated", updateCartCount);
    updateCartCount();
    return () => window.removeEventListener("cartUpdated", updateCartCount);
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <div className="app-shell">
      <header className="site-header">
        <Link to="/home" className="brand">
          <span className="brand-icon">🛍️</span>
          <span>ShopSphere</span>
        </Link>

        <nav className="main-nav">
          <Link to="/home">Home</Link>
          <Link to="/products">Products</Link>
          <Link to="/cart">Cart ({cartCount})</Link>
          <Link to="/orders">Orders</Link>
          <button className="nav-logout" onClick={logout}>Logout</button>
        </nav>
      </header>

      <main className="page-content">{children}</main>

      <footer className="site-footer">
        <p>© 2026 ShopSphere · MERN E-Commerce</p>
        <p>Discover products you love.</p>
      </footer>
    </div>
  );
}

function Login() {
  const [form, setForm] = useState({ email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/login", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      nav("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Login failed");
    }
  };

  return (
    <Auth
      title="Welcome Back"
      subtitle="Login to continue shopping with ShopSphere."
      submit={submit}
      form={form}
      setForm={setForm}
      link="/register"
      text="Create an account"
    />
  );
}

function Register() {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post("/auth/register", form);
      localStorage.setItem("token", response.data.token);
      localStorage.setItem("user", JSON.stringify(response.data.user));
      nav("/home");
    } catch (error) {
      alert(error.response?.data?.message || "Registration failed");
    }
  };

  return (
    <Auth
      title="Create Your Account"
      subtitle="Join ShopSphere and discover something special."
      submit={submit}
      form={form}
      setForm={setForm}
      link="/login"
      text="Already have an account? Login"
    />
  );
}

function Auth({ title, subtitle, submit, form, setForm, link, text }) {
  return (
    <div className="auth-page">
      <div className="auth-card">
        <div className="auth-logo">🛍️ ShopSphere</div>
        <h1>{title}</h1>
        <p>{subtitle}</p>
        <form onSubmit={submit} className="auth-form">
          {form.name !== undefined && (
            <input
              placeholder="Full name"
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
          )}
          <input
            type="email"
            placeholder="Email address"
            required
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
          />
          <input
            type="password"
            placeholder="Password"
            required
            minLength="6"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />
          <button className="primary-button" type="submit">Continue</button>
        </form>
        <Link to={link} className="auth-link">{text}</Link>
      </div>
    </div>
  );
}

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([]);

  useEffect(() => {
    const loadFeaturedProducts = async () => {
      try {
        const response = await api.get("/products");

        const productNames = [
          "Classic Cotton Casual Shirt",
          "Elegant Designer Saree",
          "Smartphone Pro X",
          "Cute Teddy Bear",
          "Kids School Backpack",
          "Non Stick Frying Pan",
          "Premium Laptop Backpack",
          "Wireless Bluetooth Headphones",
        ];

        const selectedProducts = productNames
          .map((name) =>
            response.data.find((product) => product.name === name)
          )
          .filter(Boolean);

        setFeaturedProducts(selectedProducts);
      } catch (error) {
        console.error(
          "Failed to load featured products:",
          error
        );
      }
    };

    loadFeaturedProducts();
  }, []);

  return (
    <Layout>

      {/* =========================================
          HERO SECTION
      ========================================= */}

      <section className="hero">

        <div className="hero-image-wrapper">
          <img
            src="/images/hero-banner.png"
            alt="ShopSphere products"
          />
        </div>

      </section>

      {/* =========================================
    SHOPSPHERE BENEFITS
========================================= */}

<section className="shopping-benefits">

  <div className="benefits-container">

    <div className="benefit-card">

      <div className="benefit-icon secure-icon">
        🔒
      </div>

      <div className="benefit-content">
        <h3>Secure Shopping</h3>

        <p>
          Shop with confidence with a safe and secure
          shopping experience.
        </p>
      </div>

    </div>


    <div className="benefit-card">

      <div className="benefit-icon delivery-icon">
        🚚
      </div>

      <div className="benefit-content">
        <h3>Fast Delivery</h3>

        <p>
          Get your favorite products delivered quickly
          and reliably.
        </p>
      </div>

    </div>


    <div className="benefit-card">

      <div className="benefit-icon payment-icon">
        💳
      </div>

      <div className="benefit-content">
        <h3>Easy Payments</h3>

        <p>
          Enjoy a simple and convenient checkout
          experience.
        </p>
      </div>

    </div>


    <div className="benefit-card">

      <div className="benefit-icon quality-icon">
        ⭐
      </div>

      <div className="benefit-content">
        <h3>Quality Products</h3>

        <p>
          Discover carefully selected products for
          everyday needs.
        </p>
      </div>

    </div>

  </div>

</section>


      {/* =========================================
          CATEGORIES
      ========================================= */}

      <section className="categories-section">

        <div className="section-heading">

          <span className="section-label">
            EXPLORE OUR COLLECTION
          </span>

          <h2>Shop by Category</h2>

          <p>
            Find everything you need in one place.
          </p>

        </div>


        <div className="category-grid">

          {cats.map((category) => (

            <Link
              key={category.name}
              to={`/products?category=${encodeURIComponent(
                category.name
              )}`}
              className="category-card"
            >

              <div className="category-icon">
                {category.icon}
              </div>

              <h3>
                {category.name}
              </h3>

              <p>
                {category.subtitle}
              </p>

              <span className="category-link">
                Explore →
              </span>

            </Link>

          ))}

        </div>

      </section>


      {/* =========================================
          TOP SELLING PRODUCTS
      ========================================= */}

      <section className="top-products-section">

        <div className="section-heading">

          <span className="section-label">
            CUSTOMER FAVORITES
          </span>

          <h2>Top Selling Products</h2>

          <p>
            Explore some of our most popular products.
          </p>

        </div>


        <div className="top-products-grid">

          {featuredProducts.map((product) => (

            <article
              className="top-product-card"
              key={product._id}
            >

              <div className="top-product-image">

                <img
                  src={product.image}
                  alt={product.name}
                />

                <span className="popular-badge">
                  Popular
                </span>

              </div>


              <div className="top-product-info">

                <span className="product-category">
                  {product.category}
                </span>

                <h3>
                  {product.name}
                </h3>

                <p>
                  {product.description}
                </p>


                <div className="top-product-bottom">

                  <strong>
                    ₹{product.price}
                  </strong>

                  <Link
                    to={`/products/${product._id}`}
                    className="view-product-button"
                  >
                    View →
                  </Link>

                </div>

              </div>

            </article>

          ))}

        </div>


        {/* View all products */}

        <div className="view-all-products">

          <Link
            to="/products"
            className="secondary-button"
          >
            View All Products →
          </Link>

        </div>

      </section>

    </Layout>
  );
}

function Products() {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const categoryFromUrl = searchParams.get("category") || "";
  const [category, setCategory] = useState(categoryFromUrl);

  useEffect(() => {
    setCategory(categoryFromUrl);
  }, [categoryFromUrl]);

  useEffect(() => {
    api.get("/products", { params: { search, category } })
      .then((response) => setProducts(response.data))
      .catch((error) => {
        console.error("Failed to load products:", error);
        setProducts([]);
      });
  }, [search, category]);

  const handleCategoryChange = (e) => {
    const selectedCategory = e.target.value;
    setCategory(selectedCategory);
    setSearchParams(selectedCategory ? { category: selectedCategory } : {});
  };

  return (
    <Layout>
      <section className="listing-header">
        <span className="eyebrow">OUR COLLECTION</span>
        <h1>All Products</h1>
        <p>Explore our latest products and everyday essentials.</p>
      </section>

      <div className="filters">
        <input
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={category} onChange={handleCategoryChange}>
          <option value="">All categories</option>
    {cats.map((c) => (
  <option key={c.name} value={c.name}>
    {c.name}
  </option>
))}
        </select>
      </div>

      <div className="product-grid">
        {products.length === 0 ? (
          <p className="empty-state">No products found.</p>
        ) : (
          products.map((product) => (
            <article className="product-card" key={product._id}>
              <img src={product.image} alt={product.name} />
              <div className="product-card-body">
                <span className="product-category">{product.category}</span>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="product-card-footer">
                  <strong>₹{product.price}</strong>
                  <Link className="small-button" to={`/products/${product._id}`}>View</Link>
                </div>
              </div>
            </article>
          ))
        )}
      </div>
    </Layout>
  );
}

function Detail() {
  const { id } = useParams();
  const [p, setP] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    api
      .get("/products/" + id)
      .then((r) => setP(r.data))
      .catch((e) => {
        console.error("Failed to load product:", e);
      });
  }, [id]);

  if (!p) {
    return <Layout>Loading...</Layout>;
  }

  const add = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");

    const old = cart.find((x) => x.productId === p._id);

    if (old) {
      old.quantity++;
    } else {
      cart.push({
        productId: p._id,
        name: p.name,
        price: p.price,
        quantity: 1,
        image: p.image,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));

    // Update cart count in navbar
    window.dispatchEvent(new Event("cartUpdated"));

    // Show success message
    setMessage("Added to cart ✓");

    // Hide message after 2 seconds
    setTimeout(() => {
      setMessage("");
    }, 2000);
  };

  return (
    <Layout>
      <div className="detail-card">
        <img src={p.image} alt={p.name} />

        <div className="detail-content">
          <span className="product-category">
            {p.category}
          </span>

          <h1>{p.name}</h1>

          <p>{p.description}</p>

          <h2>₹{p.price}</h2>

          <button
            className="primary-button"
            onClick={add}
          >
            Add to Cart
          </button>

          {/* Success message */}
          {message && (
            <div className="cart-success-message">
              ✓ {message}
            </div>
          )}
        </div>
      </div>
    </Layout>
  );
}

function Cart() {
  const [cart, setCart] = useState(
    JSON.parse(localStorage.getItem("cart") || "[]")
  );

  const update = (index, quantity) => {
    const next = cart.map((item, i) =>
      i === index
        ? {
            ...item,
            quantity: Math.max(1, quantity),
          }
        : item
    );

    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));

    // Update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const removeItem = (index) => {
    const next = cart.filter((_, i) => i !== index);

    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));

    // Update navbar cart count
    window.dispatchEvent(new Event("cartUpdated"));
  };

  const total = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  /* =========================================
     EMPTY CART
  ========================================= */

  if (cart.length === 0) {
    return (
      <Layout>
        <div className="empty-cart-page">
          <div className="empty-cart-card">

            <div className="empty-cart-icon">
              <span>🛒</span>
            </div>

            <h1>Your Cart is Empty</h1>

            <p>
              Looks like you haven't added anything to your cart yet.
              Start shopping and discover something you love!
            </p>

            <Link
              to="/products"
              className="primary-button empty-cart-button"
            >
              Continue Shopping →
            </Link>
          </div>
        </div>
      </Layout>
    );
  }

  /* =========================================
     CART WITH PRODUCTS
  ========================================= */

  return (
    <Layout>
      <div className="listing-header">
        <span className="eyebrow">YOUR SHOPPING BAG</span>

        <h1>Shopping Cart</h1>

        <p>
          Review your items before proceeding to checkout.
        </p>
      </div>

      <div className="cart-card">

        {cart.map((item, index) => (
          <div className="cart-row" key={item.productId}>

            <div>
              <strong>{item.name}</strong>

              <p>
                ₹{item.price} × {item.quantity}
              </p>
            </div>

            <input
              type="number"
              min="1"
              value={item.quantity}
              onChange={(e) =>
                update(index, Number(e.target.value))
              }
            />

            <b>
              ₹{item.price * item.quantity}
            </b>

            <button
              className="danger-button"
              onClick={() => removeItem(index)}
            >
              Remove
            </button>

          </div>
        ))}

        <div className="cart-summary">

          <div>
            <span>Total Amount</span>

            <h2>₹{total}</h2>
          </div>

          <Link
            className="primary-button"
            to="/checkout"
          >
            Proceed to Checkout →
          </Link>

        </div>

      </div>
    </Layout>
  );
}

function Checkout() {
  const [shipping, setShipping] = useState({ name: "", address: "", city: "", pincode: "", phone: "" });
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    try {
      await api.post("/orders", { items: cart, total, shipping }, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      localStorage.removeItem("cart");
      notifyCartUpdated();
      nav("/orders");
    } catch (error) {
      alert(error.response?.data?.message || "Please login before checkout");
    }
  };

  return (
    <Layout>
      <section className="listing-header"><span className="eyebrow">ALMOST THERE</span><h1>Checkout</h1></section>
      <form className="checkout-card" onSubmit={submit}>
        {Object.keys(shipping).map((key) => (
          <input key={key} placeholder={key.charAt(0).toUpperCase() + key.slice(1)} required value={shipping[key]} onChange={(e) => setShipping({ ...shipping, [key]: e.target.value })} />
        ))}
        <p>Payment method: Dummy Payment</p>
        <button className="primary-button" type="submit">Place Order</button>
      </form>
    </Layout>
  );
}

function Orders() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    api.get("/orders/mine", { headers: { Authorization: `Bearer ${localStorage.getItem("token")}` } })
      .then((response) => setOrders(response.data))
      .catch(() => setOrders([]));
  }, []);

  return (
    <Layout>
      <section className="listing-header"><span className="eyebrow">YOUR SHOPPING HISTORY</span><h1>My Orders</h1></section>
      {orders.length === 0 ? <p className="empty-state">No orders found.</p> : orders.map((order) => (
        <div className="order-card" key={order._id}><strong>Order: {order._id}</strong><p>Total: ₹{order.total} · Status: {order.status}</p></div>
      ))}
    </Layout>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/home" element={<Home />} />
      <Route path="/products" element={<Products />} />
      <Route path="/products/:id" element={<Detail />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/checkout" element={<Checkout />} />
      <Route path="/orders" element={<Orders />} />
    </Routes>
  );
}

createRoot(document.getElementById("root")).render(
  <BrowserRouter><App /></BrowserRouter>
);
