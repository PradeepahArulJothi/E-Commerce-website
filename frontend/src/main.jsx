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
  "Men's Wear",
  "Women's Wear",
  "Electronics",
  "Gift Items",
  "Kids Collections",
  "Cookery Items",
  "Bag Collections",
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
  return (
    <Layout>
      <section className="hero-section">
        <div className="hero-content">
          <span className="eyebrow">YOUR EVERYDAY SHOPPING DESTINATION</span>
          <h1>Discover products you <span>love.</span></h1>
          <p>Fashion, electronics, gifts and everyday essentials — all in one place.</p>
          <Link className="primary-button hero-button" to="/products">
            Shop Now <span>→</span>
          </Link>
          <div className="hero-highlights">
            <span>✓ Curated products</span>
            <span>✓ Easy shopping</span>
            <span>✓ Secure checkout</span>
          </div>
        </div>
        <div className="hero-image-wrapper">
          <img src="/images/hero-banner.png" alt="ShopSphere products" />
        </div>
      </section>

      <section className="category-section">
        <div className="section-heading">
          <span className="eyebrow">EXPLORE OUR COLLECTIONS</span>
          <h2>Shop by Category</h2>
          <p>Find something perfect for every style, need and occasion.</p>
        </div>

        <div className="category-grid">
          {cats.map((category, index) => (
            <Link
              key={category}
              to={`/products?category=${encodeURIComponent(category)}`}
              className={`category-card category-${index + 1}`}
            >
              <span className="category-number">0{index + 1}</span>
              <h3>{category}</h3>
              <span className="category-link">Explore →</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="home-bottom-banner">
        <div>
          <span className="eyebrow">READY TO EXPLORE?</span>
          <h2>Your next favorite find is waiting.</h2>
        </div>
        <Link className="secondary-button" to="/products">View All Products →</Link>
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
          {cats.map((item) => <option key={item} value={item}>{item}</option>)}
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
  const [product, setProduct] = useState(null);

  useEffect(() => {
    api.get(`/products/${id}`).then((response) => setProduct(response.data));
  }, [id]);

  if (!product) return <Layout><p>Loading product...</p></Layout>;

  const addToCart = () => {
    const cart = JSON.parse(localStorage.getItem("cart") || "[]");
    const existing = cart.find((item) => item.productId === product._id);

    if (existing) existing.quantity += 1;
    else {
      cart.push({
        productId: product._id,
        name: product.name,
        price: product.price,
        quantity: 1,
        image: product.image,
      });
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    notifyCartUpdated();
    alert("Product added to cart");
  };

  return (
    <Layout>
      <div className="detail-card">
        <img src={product.image} alt={product.name} />
        <div className="detail-content">
          <span className="product-category">{product.category}</span>
          <h1>{product.name}</h1>
          <p>{product.description}</p>
          <h2>₹{product.price}</h2>
          <button className="primary-button" onClick={addToCart}>Add to Cart</button>
        </div>
      </div>
    </Layout>
  );
}

function Cart() {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem("cart") || "[]"));

  const update = (index, quantity) => {
    const next = cart.map((item, itemIndex) =>
      itemIndex === index ? { ...item, quantity: Math.max(1, quantity) } : item
    );
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
    notifyCartUpdated();
  };

  const remove = (index) => {
    const next = cart.filter((_, itemIndex) => itemIndex !== index);
    setCart(next);
    localStorage.setItem("cart", JSON.stringify(next));
    notifyCartUpdated();
  };

  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <Layout>
      <section className="listing-header"><span className="eyebrow">YOUR SELECTION</span><h1>Shopping Cart</h1></section>
      <div className="cart-card">
        {cart.length === 0 ? <p className="empty-state">Your cart is empty.</p> : cart.map((item, index) => (
          <div className="cart-row" key={item.productId}>
            <div><strong>{item.name}</strong><p>₹{item.price} each</p></div>
            <input type="number" min="1" value={item.quantity} onChange={(e) => update(index, Number(e.target.value))} />
            <b>₹{item.price * item.quantity}</b>
            <button className="danger-button" onClick={() => remove(index)}>Remove</button>
          </div>
        ))}
        <div className="cart-summary"><h2>Total: ₹{total}</h2><Link className="primary-button" to="/checkout">Checkout</Link></div>
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
      alert("Order placed successfully");
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
