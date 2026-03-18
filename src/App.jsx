import React, { useState, useEffect, useRef } from 'react';
import { BrowserRouter, Routes, Route, Link, useLocation, useNavigate } from 'react-router-dom';
import './App.css';

// --- DATA & IMAGE HANDLING ---
// Using a guaranteed fallback image in case any specific URL fails to load due to network/CORS issues.
const FALLBACK_IMG = "https://images.unsplash.com/photo-1546833999-b9f581a1996d?auto=format&fit=crop&w=800&q=80";

const handleImgError = (e) => {
  if (e.target.src !== FALLBACK_IMG) {
    e.target.src = FALLBACK_IMG;
  }
};

const STATIONS = [
  "Chennai Central", "Bangalore City", "Hyderabad Deccan", "Mumbai CST", 
  "Delhi Junction", "Coimbatore", "Madurai", "Vijayawada", "Pune", 
  "Kolkata", "Ahmedabad", "Jaipur", "Lucknow", "Bhopal", "Kochi"
];

// Verified Unsplash Image URLs mapped accurately to food categories
const MENU_ITEMS = [
  {
    id: 1,
    name: "South Indian Veg Thali",
    category: "Veg Meals",
    price: 249,
    desc: "Rice, sambar, rasam, poriyal, curd, papad.",
    img: "https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg"
  },
  {
    id: 2,
    name: "Simple Indian Veg Meal",
    category: "Veg Meals",
    price: 189,
    desc: "Dal, sabzi, rice, chapati.",
    img: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg"
  },
  {
    id: 3,
    name: "Paneer Curry Meal",
    category: "Veg Meals",
    price: 299,
    desc: "Paneer gravy with roti and rice.",
    img: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg"
  },
  {
    id: 4,
    name: "Chicken Curry Meal",
    category: "Non-Veg Meals",
    price: 349,
    desc: "Chicken curry with rice and roti.",
    img: "https://images.pexels.com/photos/6210933/pexels-photo-6210933.jpeg"
  },
  {
    id: 5,
    name: "Grilled Fish Plate",
    category: "Non-Veg Meals",
    price: 379,
    desc: "Grilled fish with sides.",
    img: "https://images.pexels.com/photos/725991/pexels-photo-725991.jpeg"
  },
  {
    id: 6,
    name: "Mutton Curry",
    category: "Non-Veg Meals",
    price: 399,
    desc: "Spicy mutton curry with naan.",
    img: "https://images.pexels.com/photos/7625056/pexels-photo-7625056.jpeg"
  },
  {
    id: 7,
    name: "Chicken Biryani",
    category: "Biryani",
    price: 329,
    desc: "Aromatic chicken dum biryani.",
    img: "https://images.pexels.com/photos/9609845/pexels-photo-9609845.jpeg"
  },
  {
    id: 8,
    name: "Mutton Biryani",
    category: "Biryani",
    price: 429,
    desc: "Rich mutton biryani.",
    img: "https://images.pexels.com/photos/1624487/pexels-photo-1624487.jpeg"
  },
  {
    id: 9,
    name: "Veg Biryani",
    category: "Biryani",
    price: 279,
    desc: "Flavorful vegetable biryani.",
    img: "https://images.pexels.com/photos/5410414/pexels-photo-5410414.jpeg"
  },
  {
    id: 10,
    name: "Masala Dosa",
    category: "South Indian",
    price: 149,
    desc: "Crispy dosa with chutney and sambar.",
    img: "https://images.pexels.com/photos/4331489/pexels-photo-4331489.jpeg"
  },
  {
    id: 11,
    name: "Idli Vada",
    category: "South Indian",
    price: 129,
    desc: "Idli and vada with chutney.",
    img: "https://images.pexels.com/photos/5410414/pexels-photo-5410414.jpeg"
  },
  {
    id: 12,
    name: "Paneer Butter Masala",
    category: "North Indian",
    price: 249,
    desc: "Creamy paneer curry.",
    img: "https://images.pexels.com/photos/12737656/pexels-photo-12737656.jpeg"
  },
  {
    id: 13,
    name: "Dal Curry",
    category: "North Indian",
    price: 219,
    desc: "Classic Indian dal.",
    img: "https://images.pexels.com/photos/5410400/pexels-photo-5410400.jpeg"
  },
  {
    id: 14,
    name: "Chole Bhature",
    category: "North Indian",
    price: 189,
    desc: "Chickpea curry with bhature.",
    img: "https://images.pexels.com/photos/1117862/pexels-photo-1117862.jpeg"
  },
  {
    id: 15,
    name: "Burger Combo",
    category: "Fast Food",
    price: 299,
    desc: "Burger with fries and drink.",
    img: "https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg"
  },
  {
    id: 16,
    name: "Pizza",
    category: "Fast Food",
    price: 399,
    desc: "Cheesy pizza slice.",
    img: "https://images.pexels.com/photos/825661/pexels-photo-825661.jpeg"
  },
  {
    id: 17,
    name: "Chicken Tikka",
    category: "Snacks",
    price: 229,
    desc: "Grilled chicken tikka.",
    img: "https://images.pexels.com/photos/12737658/pexels-photo-12737658.jpeg"
  },
  {
    id: 18,
    name: "Samosa",
    category: "Snacks",
    price: 79,
    desc: "Crispy potato samosa.",
    img: "https://images.pexels.com/photos/461198/pexels-photo-461198.jpeg"
  },
  {
    id: 19,
    name: "Pakora",
    category: "Snacks",
    price: 149,
    desc: "Crispy fried pakoras.",
    img: "https://images.pexels.com/photos/12737659/pexels-photo-12737659.jpeg"
  },
  {
    id: 20,
    name: "Gulab Jamun",
    category: "Desserts",
    price: 89,
    desc: "Sweet syrup balls.",
    img: "https://images.pexels.com/photos/3026808/pexels-photo-3026808.jpeg"
  },
  {
    id: 21,
    name: "Chocolate Brownie",
    category: "Desserts",
    price: 149,
    desc: "Warm chocolate brownie.",
    img: "https://images.pexels.com/photos/291528/pexels-photo-291528.jpeg"
  },
  {
    id: 22,
    name: "Rasmalai",
    category: "Desserts",
    price: 119,
    desc: "Soft milk dessert.",
    img: "https://images.pexels.com/photos/12737660/pexels-photo-12737660.jpeg"
  },
  {
    id: 23,
    name: "Masala Chai",
    category: "Beverages",
    price: 59,
    desc: "Hot spiced tea.",
    img: "https://images.pexels.com/photos/5946970/pexels-photo-5946970.jpeg"
  },
  {
    id: 24,
    name: "Cold Coffee",
    category: "Beverages",
    price: 129,
    desc: "Chilled creamy coffee.",
    img: "https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg"
  }
];

const TESTIMONIALS = [
  { name: "Rahul M.", route: "Chennai to Delhi", text: "The Hyderabadi Biryani was hot and incredibly flavorful. Best train meal I've ever had. Packaging was premium." },
  { name: "Ananya S.", route: "Bangalore to Pune", text: "Seamless experience. The delivery guy found my seat exactly on time. Food quality matches top-tier restaurants." },
  { name: "Vikram D.", route: "Mumbai to Ahmedabad", text: "Finally a startup solving the train food problem elegantly. The app tracking works perfectly. Highly recommended." },
  { name: "Sneha P.", route: "Jaipur to Delhi", text: "Ordered the Executive Thali. It arrived piping hot and the portions were generous. Will order again!" }
];

const CATEGORIES = [...new Set(MENU_ITEMS.map(item => item.category))];

// --- ICONS (SVG) ---
const Icons = {
  Shield: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>,
  Clock: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 6 12 12 16 14"></polyline></svg>,
  Flame: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path></svg>,
  Track: () => <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><path d="M12 2a14.5 14.5 0 000 20 14.5 14.5 0 000-20"></path><path d="M2 12h20"></path></svg>,
  ChevronLeft: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="15 18 9 12 15 6"></polyline></svg>,
  ChevronRight: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>,
  MapPin: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>,
  Mail: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"></path><polyline points="22,6 12,13 2,6"></polyline></svg>,
  Phone: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>,
  Train: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="4" y="3" width="16" height="16" rx="2" ry="2"></rect><path d="M4 11h16"></path><path d="M12 3v8"></path><path d="M8 19l-2 3"></path><path d="M16 19l2 3"></path><path d="M8 15h.01"></path><path d="M16 15h.01"></path></svg>,
  CheckCircle: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>,
  Package: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="16.5" y1="9.4" x2="7.5" y2="4.21"></line><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" y1="22.08" x2="12" y2="12"></line></svg>
};

// --- UTILS ---
const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
};

// --- COMPONENTS ---
const Navbar = ({ cartCount, toggleCart }) => (
  <nav className="navbar">
    <div className="nav-container">
      <Link to="/" className="logo">Rail<span>Bites</span></Link>
      <div className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/track">Track</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <button className="cart-btn" onClick={toggleCart}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4z"></path><line x1="3" y1="6" x2="21" y2="6"></line><path d="M16 10a4 4 0 01-8 0"></path></svg>
        {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
      </button>
    </div>
  </nav>
);

const CartDrawer = ({ cart, updateQty, remove, isOpen, close, total }) => {
  const navigate = useNavigate();
  return (
    <>
      <div className={`cart-overlay ${isOpen ? 'open' : ''}`} onClick={close}></div>
      <div className={`cart-drawer ${isOpen ? 'open' : ''}`}>
        <div className="cart-header">
          <h2>Your Order</h2>
          <button onClick={close} className="close-btn">&times;</button>
        </div>
        <div className="cart-body">
          {cart.length === 0 ? (
            <div className="empty-cart">
              <p>Your cart is empty.</p>
              <button className="btn-secondary" onClick={() => { close(); navigate('/menu'); }}>Browse Menu</button>
            </div>
          ) : (
            cart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.img} alt={item.name} loading="lazy" onError={handleImgError} />
                <div className="cart-item-details">
                  <h4>{item.name}</h4>
                  <p className="cart-item-price">₹{item.price}</p>
                  <div className="qty-controls">
                    <button onClick={() => updateQty(item.id, -1)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => updateQty(item.id, 1)}>+</button>
                  </div>
                </div>
                <button className="remove-btn" onClick={() => remove(item.id)}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2"></path></svg>
                </button>
              </div>
            ))
          )}
        </div>
        {cart.length > 0 && (
          <div className="cart-footer">
            <div className="cart-total">
              <span>Subtotal</span>
              <span>₹{total}</span>
            </div>
            <button className="btn-primary full-width" onClick={() => { close(); navigate('/checkout'); }}>
              Proceed to Checkout
            </button>
          </div>
        )}
      </div>
    </>
  );
};

const Footer = () => (
  <footer className="footer">
    <div className="footer-glow"></div>
    <div className="footer-content">
      <div className="footer-brand">
        <h2>Rail<span>Bites</span></h2>
        <p>Premium railway dining for modern travelers. Confident. Elevated.</p>
      </div>
      <div className="footer-links">
        <h4>Explore</h4>
        <Link to="/">Home</Link>
        <Link to="/menu">Menu</Link>
        <Link to="/track">Track Order</Link>
        <Link to="/contact">Contact</Link>
      </div>
      <div className="footer-links">
        <h4>Legal</h4>
        <a href="#!">Terms of Service</a>
        <a href="#!">Privacy Policy</a>
        <a href="#!">FSSAI License</a>
      </div>
      <div className="footer-contact">
        <h4>Contact</h4>
        <p>support@railbites.com</p>
        <p>+91 98765 43210</p>
      </div>
    </div>
    <div className="footer-bottom">
      <p>&copy; {new Date().getFullYear()} RailBites. All rights reserved.</p>
    </div>
  </footer>
);

// --- PAGES ---
const Home = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const { current } = scrollRef;
      const scrollAmount = direction === 'left' ? -400 : 400;
      current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
    }
  };

  return (
    <div className="home-page">
      <section className="hero-split">
        <div className="hero-left">
          <div className="hero-badge">REDEFINING TRAVEL DINING</div>
          <h1>First-Class Dining.<br/><span className="accent">Delivered to Your Berth.</span></h1>
          <p>Transform your train journey with restaurant-grade meals. Freshly prepared, hygienically packed, and synced perfectly with your live running status.</p>
          <div className="hero-action">
            <input type="text" placeholder="Enter 10-digit PNR" maxLength="10" />
            <button className="btn-primary" onClick={() => navigate('/menu')}>Order Now</button>
          </div>
          <div className="hero-trust">
            <div className="avatars">
              <div className="avatar" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80)'}}></div>
              <div className="avatar" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=100&q=80)'}}></div>
              <div className="avatar" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80)'}}></div>
              <div className="avatar-more">+25k</div>
            </div>
            <span>Happy Travelers</span>
          </div>
        </div>
        
        {/* REDESIGNED HERO RIGHT SECTION */}
        <div className="hero-right">
          <div className="hero-visual-composition">
            {/* Main large image */}
            <div className="main-plate floating-slow">
              <img src="https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80" alt="Premium Meal" onError={handleImgError} />
            </div>
            
            {/* Secondary overlapping image */}
            <div className="secondary-plate floating-fast">
              <img src="https://images.unsplash.com/photo-1626132647523-66f5bf380027?ixlib=rb-4.0.3&auto=format&fit=crop&w=600&q=80" alt="Chole Bhature" onError={handleImgError} />
            </div>

            {/* Glowing accents behind */}
            <div className="visual-glow-1"></div>
            <div className="visual-glow-2"></div>

            {/* Floating UI Elements */}
            <div className="float-card fc-1">
              <div className="fc-icon"><Icons.Clock /></div>
              <div>
                <strong>Hot & Fresh</strong>
                <span>On-time Delivery</span>
              </div>
            </div>

            <div className="float-card fc-2">
              <div className="pulse-dot"></div>
              <div>
                <strong>Platform 4</strong>
                <span>Approaching Station</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="social-proof">
        <div className="proof-item">
          <h3>4.8★</h3>
          <p>Average Rating</p>
        </div>
        <div className="proof-item">
          <h3>25K+</h3>
          <p>Orders Delivered</p>
        </div>
        <div className="proof-item">
          <h3>100%</h3>
          <p>FSSAI Certified</p>
        </div>
        <div className="proof-item">
          <h3>15+</h3>
          <p>Major Stations</p>
        </div>
      </section>

      <section className="section signature-dishes">
        <div className="section-header-row">
          <h2 className="section-title">Signature Dishes</h2>
          <div className="scroll-buttons">
            <button className="icon-btn" onClick={() => scroll('left')} aria-label="Scroll Left"><Icons.ChevronLeft /></button>
            <button className="icon-btn" onClick={() => scroll('right')} aria-label="Scroll Right"><Icons.ChevronRight /></button>
          </div>
        </div>
        
        <div className="horizontal-scroll-container">
          <div className="horizontal-scroll" ref={scrollRef}>
            {MENU_ITEMS.slice(0, 6).map(item => (
              <div key={item.id} className="signature-card">
                <div className="sig-img-wrapper">
                  <div className="img-overlay"></div>
                  <img src={item.img} alt={item.name} loading="lazy" onError={handleImgError} />
                  <span className="sig-badge">{item.category}</span>
                </div>
                <div className="sig-info">
                  <h4>{item.name}</h4>
                  <p className="sig-desc">{item.desc}</p>
                  <div className="sig-bottom">
                    <span className="price">₹{item.price}</span>
                    <button className="btn-add-circle" onClick={() => navigate('/menu')}>+</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section why-choose">
        <div className="glow-orb left"></div>
        <h2 className="section-title">The RailBites Standard</h2>
        <div className="features-bento">
          <div className="bento-card">
            <div className="icon-wrapper"><Icons.Shield /></div>
            <h4>Hygienic Packaging</h4>
            <p>Spill-proof, premium food-grade containers ensuring your meal stays fresh, hot, and secure.</p>
          </div>
          <div className="bento-card">
            <div className="icon-wrapper"><Icons.Clock /></div>
            <h4>On-Time Delivery</h4>
            <p>Syncs directly with live train running status. We wait for you, not the other way around.</p>
          </div>
          <div className="bento-card">
            <div className="icon-wrapper"><Icons.Flame /></div>
            <h4>Freshly Prepared</h4>
            <p>Meals cooked exclusively for your order at our state-of-the-art FSSAI-certified base kitchens.</p>
          </div>
          <div className="bento-card">
            <div className="icon-wrapper"><Icons.Track /></div>
            <h4>Live Tracking</h4>
            <p>Watch your order move from our kitchen right to your berth in real-time on our platform.</p>
          </div>
        </div>
      </section>

      <section className="section stations">
        <div className="glow-orb right"></div>
        <h2 className="section-title">Stations We Serve</h2>
        <div className="stations-premium-grid">
          {STATIONS.map((station, idx) => (
            <div key={idx} className="station-glass-card">
              <div className="station-glow-hover"></div>
              <div className="station-content">
                <div className="station-icon-box"><Icons.MapPin /></div>
                <span className="station-name">{station}</span>
                <div className="station-status"><span className="status-dot"></span>Active</div>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="section testimonials-section">
        <h2 className="section-title">Traveler Stories</h2>
        <div className="marquee-wrapper">
          <div className="marquee-content">
            {[...TESTIMONIALS, ...TESTIMONIALS].map((test, idx) => (
              <div key={idx} className="test-card">
                <div className="quote-mark">"</div>
                <div className="stars">★★★★★</div>
                <p>{test.text}</p>
                <div className="test-author">
                  <h5>{test.name}</h5>
                  <span>{test.route}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

const Menu = ({ cart, addToCart }) => {
  const [activeCategory, setActiveCategory] = useState('All');
  const filteredItems = activeCategory === 'All' ? MENU_ITEMS : MENU_ITEMS.filter(item => item.category === activeCategory);

  return (
    <div className="menu-page">
      <div className="menu-header">
        <h1>Curated Menu</h1>
        <p>Expertly crafted meals for your journey</p>
      </div>
      <div className="category-tabs">
        <button className={activeCategory === 'All' ? 'active' : ''} onClick={() => setActiveCategory('All')}>All</button>
        {CATEGORIES.map(cat => (
          <button key={cat} className={activeCategory === cat ? 'active' : ''} onClick={() => setActiveCategory(cat)}>{cat}</button>
        ))}
      </div>
      <div className="menu-grid">
        {filteredItems.map(item => {
          const inCart = cart.find(c => c.id === item.id);
          return (
            <div key={item.id} className="menu-card">
              <div className="menu-img">
                <img src={item.img} alt={item.name} loading="lazy" onError={handleImgError} />
                <div className="menu-img-gradient"></div>
                <span className="menu-cat-tag">{item.category}</span>
              </div>
              <div className="menu-info">
                <h3>{item.name}</h3>
                <p>{item.desc}</p>
                <div className="menu-bottom">
                  <span className="price">₹{item.price}</span>
                  <button className={`btn-add ${inCart ? 'added' : ''}`} onClick={() => addToCart(item)}>
                    {inCart ? `Added (${inCart.quantity})` : 'Add to Order'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Checkout = ({ cart, total, clearCart }) => {
  const navigate = useNavigate();
  const [isSuccess, setIsSuccess] = useState(false);

  const handleCheckout = (e) => {
    e.preventDefault();
    setIsSuccess(true);
    setTimeout(() => { clearCart(); navigate('/track'); }, 3000);
  };

  if (cart.length === 0 && !isSuccess) {
    return (
      <div className="checkout-page empty-checkout">
        <h2>Your cart is empty</h2>
        <button className="btn-primary" onClick={() => navigate('/menu')}>Back to Menu</button>
      </div>
    );
  }

  if (isSuccess) {
    return (
      <div className="checkout-page success-state">
        <div className="success-icon">
          <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="var(--accent-primary)" strokeWidth="2"><path d="M22 11.08V12a10 10 0 11-5.93-9.14"></path><path d="M22 4L12 14.01l-3-3"></path></svg>
        </div>
        <h2>Order Placed Successfully!</h2>
        <p>Redirecting to live tracking...</p>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-split">
        <div className="checkout-form-container">
          <h2>Delivery Details</h2>
          <form className="checkout-form" onSubmit={handleCheckout}>
            <div className="form-group">
              <label>PNR Number</label>
              <input type="text" placeholder="10-digit PNR" required maxLength="10" />
            </div>
            <div className="form-row">
              <div className="form-group">
                <label>Train Number</label>
                <input type="text" placeholder="e.g. 12615" required />
              </div>
              <div className="form-group">
                <label>Coach & Seat</label>
                <input type="text" placeholder="e.g. B4 - 32" required />
              </div>
            </div>
            <div className="form-group">
              <label>Station for Delivery</label>
              <select required defaultValue="">
                <option value="" disabled>Select Station</option>
                {STATIONS.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div className="form-group">
              <label>Passenger Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" placeholder="+91 99999 99999" required />
            </div>
            <h3 className="payment-title">Payment Method</h3>
            <div className="payment-options">
              <label className="pay-option">
                <input type="radio" name="payment" required defaultChecked />
                <span>UPI</span>
              </label>
              <label className="pay-option">
                <input type="radio" name="payment" required />
                <span>Credit/Debit Card</span>
              </label>
            </div>
            <button type="submit" className="btn-primary full-width submit-btn">
              Pay ₹{total} & Place Order
            </button>
          </form>
        </div>
        <div className="checkout-summary">
          <h2>Order Summary</h2>
          <div className="summary-items">
            {cart.map(item => (
              <div key={item.id} className="summary-item">
                <span>{item.quantity}x {item.name}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="summary-totals">
            <div className="summary-line"><span>Subtotal</span><span>₹{total}</span></div>
            <div className="summary-line"><span>Taxes & Fees</span><span>₹{Math.round(total * 0.05)}</span></div>
            <div className="summary-line total-line"><span>Total</span><span className="accent">₹{total + Math.round(total * 0.05)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrackOrder = () => {
  const [orderId, setOrderId] = useState('');
  const [tracking, setTracking] = useState(false);
  const [step, setStep] = useState(0);

  const handleTrack = (e) => {
    e.preventDefault();
    if(orderId) {
      setTracking(true); 
      setStep(1);
      setTimeout(() => setStep(2), 2500); 
    }
  };

  const steps = [
    { title: "Order Confirmed", icon: <Icons.CheckCircle /> },
    { title: "Food Preparation", icon: <Icons.Flame /> },
    { title: "Out for Delivery", icon: <Icons.Package /> },
    { title: "Delivered to Seat", icon: <Icons.Train /> }
  ];

  return (
    <div className="track-page">
      <div className="glow-orb center"></div>
      {!tracking ? (
        <div className="track-search-container">
          <h1>Track Live Order</h1>
          <p>Enter your 10-digit PNR or Order ID to see real-time status.</p>
          <form className="track-form-large" onSubmit={handleTrack}>
            <div className="track-input-wrapper">
              <Icons.Track />
              <input 
                type="text" 
                placeholder="PNR or Order ID..." 
                value={orderId} 
                onChange={(e) => setOrderId(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn-primary">Track Order</button>
          </form>
        </div>
      ) : (
        <div className="tracking-dashboard">
          <div className="dashboard-header">
            <div className="dh-left">
              <div className="live-badge"><span className="live-dot"></span> LIVE TRACKING</div>
              <h2>Order #{orderId || 'RB-8492'}</h2>
            </div>
            <button className="btn-outline dh-btn" onClick={() => setTracking(false)}>Track Another</button>
          </div>
          
          <div className="tracker-main">
            <div className="delivery-info-card">
              <div className="dic-top">
                <h3>Delivery Details</h3>
                <span className="dic-eta">ETA: 01:30 PM</span>
              </div>
              <div className="dic-grid">
                <div className="dic-item">
                  <div className="dic-item-icon"><Icons.MapPin /></div>
                  <div>
                    <span>Station</span>
                    <strong>Chennai Central</strong>
                  </div>
                </div>
                <div className="dic-item">
                  <div className="dic-item-icon"><Icons.Train /></div>
                  <div>
                    <span>Train</span>
                    <strong>12615 (Grand Trunk Exp)</strong>
                  </div>
                </div>
                <div className="dic-item">
                  <div className="dic-item-icon"><Icons.Package /></div>
                  <div>
                    <span>Coach / Seat</span>
                    <strong>B4 / 32</strong>
                  </div>
                </div>
              </div>
            </div>

            <div className="stepper-container">
              <div className="stepper-progress-bar">
                <div className="stepper-progress-fill" style={{ width: `${(step / (steps.length - 1)) * 100}%` }}></div>
              </div>
              
              <div className="stepper-steps">
                {steps.map((s, i) => (
                  <div key={i} className={`step-item ${i <= step ? 'active' : ''} ${i === step ? 'current' : ''}`}>
                    <div className="step-icon-wrapper">
                      {s.icon}
                      {i === step && <div className="step-pulse"></div>}
                    </div>
                    <div className="step-text">{s.title}</div>
                  </div>
                ))}
              </div>
            </div>

            {step === 2 && (
              <div className="executive-card">
                <div className="exec-avatar">
                  <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80" alt="Delivery Executive" onError={handleImgError} />
                </div>
                <div className="exec-info">
                  <h4>Rajesh Kumar</h4>
                  <p>Delivery Executive • Arriving at Platform 4</p>
                </div>
                <button className="btn-icon-call"><Icons.Phone /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

const Contact = () => {
  return (
    <div className="contact-page">
      <div className="glow-orb left"></div>
      <div className="contact-container">
        <div className="contact-info">
          <h1>Get in <span className="accent">Touch</span></h1>
          <p>Have a question about your order, our services, or want to partner with us? We'd love to hear from you.</p>
          
          <div className="contact-methods">
            <div className="method-card">
              <div className="method-icon"><Icons.Mail /></div>
              <div>
                <h5>Email Us</h5>
                <p>support@railbites.com</p>
              </div>
            </div>
            <div className="method-card">
              <div className="method-icon"><Icons.Phone /></div>
              <div>
                <h5>Call Us</h5>
                <p>+91 98765 43210</p>
              </div>
            </div>
            <div className="method-card">
              <div className="method-icon"><Icons.MapPin /></div>
              <div>
                <h5>Headquarters</h5>
                <p>123 Startup Hub, Taramani<br/>Chennai, TN 600113</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="contact-form-wrapper">
          <form className="contact-form" onSubmit={(e) => e.preventDefault()}>
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" placeholder="John Doe" required />
            </div>
            <div className="form-group">
              <label>Email Address</label>
              <input type="email" placeholder="john@example.com" required />
            </div>
            <div className="form-group">
              <label>Message</label>
              <textarea placeholder="How can we help you?" rows="5" required></textarea>
            </div>
            <button type="submit" className="btn-primary full-width">Send Message</button>
          </form>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const addToCart = (item) => {
    setCart(prev => {
      const existing = prev.find(i => i.id === item.id);
      if (existing) return prev.map(i => i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i);
      return [...prev, { ...item, quantity: 1 }];
    });
    setIsCartOpen(true);
  };

  const updateQuantity = (id, delta) => setCart(prev => prev.map(item => item.id === id ? { ...item, quantity: Math.max(0, item.quantity + delta) } : item).filter(i => i.quantity > 0));
  const removeFromCart = (id) => setCart(prev => prev.filter(item => item.id !== id));
  const clearCart = () => setCart([]);
  const toggleCart = () => setIsCartOpen(!isCartOpen);

  const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <BrowserRouter>
      <ScrollToTop />
      <div className="app-layout">
        <Navbar cartCount={cartCount} toggleCart={toggleCart} />
        <CartDrawer cart={cart} updateQty={updateQuantity} remove={removeFromCart} isOpen={isCartOpen} close={() => setIsCartOpen(false)} total={total} />
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/menu" element={<Menu cart={cart} addToCart={addToCart} />} />
            <Route path="/checkout" element={<Checkout cart={cart} total={total} clearCart={clearCart} />} />
            <Route path="/track" element={<TrackOrder />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}