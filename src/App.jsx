import React, { useState, useEffect } from 'react';
import './App.css';
import { restaurants, popularMeals } from './data';

// --- Icons (SVG) ---
const TrainIcon = () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="6" y="3" width="12" height="18" rx="2" /><path d="M9 3v18" /><path d="M15 3v18" /><path d="M6 8h12" /><path d="M6 13h12" /></svg>;
const SearchIcon = () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>;
const StarIcon = () => <svg width="16" height="16" viewBox="0 0 24 24" fill="#ffb703" stroke="none"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg>;

// --- Components ---

const Navbar = ({ cartCount, onNavigate, activePage }) => (
  <nav className="navbar glass-panel">
    <div className="container flex justify-between items-center">
      <div className="logo text-primary cursor-pointer" onClick={() => onNavigate('home')}>
        Rail<span className="text-main">Bites</span>
      </div>
      <div className="nav-links">
        <a href="#" onClick={() => onNavigate('home')} className={activePage === 'home' ? 'active' : ''}>Home</a>
        <a href="#" onClick={() => onNavigate('restaurants')} className={activePage === 'restaurants' ? 'active' : ''}>Restaurants</a>
        <a href="#" onClick={() => onNavigate('tracking')} className={activePage === 'tracking' ? 'active' : ''}>Track Order</a>
      </div>
      <button className="btn btn-outline" onClick={() => onNavigate('cart')}>
        Cart ({cartCount})
      </button>
    </div>
  </nav>
);

const LandingPage = ({ onNavigate, addToCart }) => (
  <>
    <section className="hero">
      <div className="container">
        <h1>Premium Food Delivered<br />to Your <span className="text-primary">Train Seat</span></h1>
        <p className="text-muted" style={{ fontSize: '1.2rem', marginBottom: '2rem' }}>
          Enter your PNR to explore restaurants delivering to upcoming stations.
        </p>
        
        <div className="pnr-search glass-panel">
          <input type="text" placeholder="Enter 10-digit PNR Number" className="pnr-input" maxLength="10" />
          <select className="pnr-input" style={{ borderLeft: '1px solid rgba(255,255,255,0.1)' }}>
             <option>Bangalore City (SBC)</option>
             <option>Chennai Central (MAS)</option>
             <option>Katpadi Jn (KPD)</option>
          </select>
          <button className="btn btn-primary" onClick={() => onNavigate('restaurants')}>
             Find Food
          </button>
        </div>
      </div>
    </section>

    <section className="container" style={{ padding: '60px 0' }}>
      <h2 className="section-title">Featured Restaurants</h2>
      <div className="grid grid-3">
        {restaurants.slice(0, 3).map(rest => (
          <div key={rest.id} className="glass-card">
            <img src={rest.image} alt={rest.name} className="card-image" />
            <div className="card-body">
              <div className="flex justify-between items-center mb-2">
                <h3>{rest.name}</h3>
                <span className="badge" style={{background: '#fff', color: '#000'}}>{rest.rating} <StarIcon/></span>
              </div>
              <p className="text-muted text-sm">{rest.cuisine}</p>
              <div className="flex justify-between items-center mt-3">
                 <span className="text-accent text-sm">⏱ {rest.time}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>

    <section className="container" style={{ padding: '60px 0' }}>
      <h2 className="section-title">Popular Quick Bites</h2>
      <div className="grid grid-4">
        {popularMeals.slice(0, 4).map(item => (
          <div key={item.id} className="glass-card card-body flex flex-col justify-between">
             <div>
                <div className="flex justify-between">
                  <span className={`badge ${item.veg ? 'veg' : 'non-veg'}`}>
                     {item.veg ? 'VEG' : 'NON-VEG'}
                  </span>
                </div>
                <h4 style={{ marginTop: '10px' }}>{item.name}</h4>
                <p className="text-muted">₹{item.price}</p>
             </div>
             <button className="btn btn-outline mt-3 w-full" onClick={() => addToCart(item)}>Add</button>
          </div>
        ))}
      </div>
    </section>

    <section className="container" style={{ padding: '80px 0', textAlign: 'center' }}>
       <h2 className="section-title" style={{ border: 'none' }}>How It Works</h2>
       <div className="grid grid-3">
          <div className="glass-panel" style={{ padding: '40px' }}>
             <div className="text-primary text-4xl mb-4">01</div>
             <h3>Enter PNR</h3>
             <p className="text-muted">We auto-detect your train and seat details.</p>
          </div>
          <div className="glass-panel" style={{ padding: '40px' }}>
             <div className="text-primary text-4xl mb-4">02</div>
             <h3>Order Food</h3>
             <p className="text-muted">Choose from top rated restaurants on your route.</p>
          </div>
          <div className="glass-panel" style={{ padding: '40px' }}>
             <div className="text-primary text-4xl mb-4">03</div>
             <h3>Delivery at Seat</h3>
             <p className="text-muted">Contactless delivery right to your berth.</p>
          </div>
       </div>
    </section>
  </>
);

const RestaurantPage = ({ addToCart }) => (
  <div className="container layout-split">
    <aside className="glass-panel" style={{ padding: '20px', height: 'fit-content', position: 'sticky', top: '100px' }}>
      <h3 className="mb-4">Filters</h3>
      <div className="filter-group">
         <label><input type="checkbox" /> Pure Veg</label>
         <label><input type="checkbox" /> 4+ Rating</label>
         <label><input type="checkbox" /> Under ₹300</label>
      </div>
      <h3 className="mb-4 mt-6">Cuisines</h3>
      <div className="filter-group">
         <label><input type="checkbox" /> North Indian</label>
         <label><input type="checkbox" /> South Indian</label>
         <label><input type="checkbox" /> Chinese</label>
         <label><input type="checkbox" /> Biryani</label>
      </div>
    </aside>
    
    <main>
      <div className="flex justify-between items-center mb-6">
        <h2>All Restaurants (Bangalore City)</h2>
        <select className="glass-panel" style={{ padding: '8px', color: 'white', border: '1px solid var(--border)' }}>
          <option>Sort by: Popularity</option>
          <option>Delivery Time</option>
          <option>Rating</option>
        </select>
      </div>
      
      <div className="grid grid-1" style={{ gap: '20px' }}>
        {restaurants.map(rest => (
           <div key={rest.id} className="glass-card flex" style={{ flexDirection: 'row', overflow: 'hidden' }}>
              <img src={rest.image} style={{ width: '200px', objectFit: 'cover' }} alt={rest.name}/>
              <div className="card-body flex-1">
                 <div className="flex justify-between">
                    <h3>{rest.name}</h3>
                    <span className="badge" style={{background: '#fff', color: '#000'}}>{rest.rating} <StarIcon/></span>
                 </div>
                 <p className="text-muted">{rest.cuisine}</p>
                 <hr style={{ borderColor: 'var(--border)', margin: '15px 0' }} />
                 <p className="text-sm mb-4">Popular Items:</p>
                 <div className="grid grid-3" style={{ gap: '10px' }}>
                    {popularMeals.filter(m => m.restId === rest.id || m.restId === 4).slice(0,2).map(meal => (
                       <div key={meal.id} className="flex justify-between items-center" style={{ background: 'rgba(255,255,255,0.05)', padding: '8px', borderRadius: '8px' }}>
                          <div className="text-sm">
                             <div>{meal.name}</div>
                             <div className="text-muted">₹{meal.price}</div>
                          </div>
                          <button className="btn-primary" style={{ padding: '4px 10px', fontSize: '0.8rem' }} onClick={() => addToCart(meal)}>+</button>
                       </div>
                    ))}
                 </div>
              </div>
           </div>
        ))}
      </div>
    </main>
  </div>
);

const CartPage = ({ cart, onNavigate, setCart }) => {
  const subtotal = cart.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const gst = subtotal * 0.05;
  const delivery = 40;
  const total = subtotal + gst + delivery;

  return (
    <div className="container layout-split">
      <div className="cart-list">
        <h2 className="mb-6">Your Order</h2>
        {cart.length === 0 ? (
          <div className="glass-panel p-6 text-center text-muted" style={{ padding: '40px' }}>
            Cart is empty. Go add some food!
          </div>
        ) : (
          <div className="glass-panel" style={{ padding: '20px' }}>
            {cart.map(item => (
              <div key={item.id} className="cart-item items-center">
                 <div>
                    <span className={`badge ${item.veg ? 'veg' : 'non-veg'}`}>{item.veg ? 'V' : 'N'}</span>
                    <span style={{ marginLeft: '10px', fontWeight: '500' }}>{item.name}</span>
                 </div>
                 <div className="flex items-center">
                    <span className="text-muted mr-4">₹{item.price * item.qty}</span>
                    <div className="flex items-center glass-panel" style={{ padding: '0', borderRadius: '4px' }}>
                       <button className="btn text-white" style={{ padding: '4px 10px' }} onClick={() => {
                         const newCart = cart.map(i => i.id === item.id ? {...i, qty: i.qty - 1} : i).filter(i => i.qty > 0);
                         setCart(newCart);
                       }}>-</button>
                       <span style={{ padding: '0 8px' }}>{item.qty}</span>
                       <button className="btn text-white" style={{ padding: '4px 10px' }} onClick={() => {
                         const newCart = cart.map(i => i.id === item.id ? {...i, qty: i.qty + 1} : i);
                         setCart(newCart);
                       }}>+</button>
                    </div>
                 </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <div className="checkout-summary">
        <div className="glass-card" style={{ padding: '24px' }}>
           <h3 className="mb-4">Train Details</h3>
           <div className="text-sm text-muted mb-4 p-3" style={{ background: 'rgba(255,255,255,0.03)', borderRadius: '8px' }}>
              <div className="flex justify-between mb-2"><span>Train:</span> <span className="text-white">Chennai Express (12610)</span></div>
              <div className="flex justify-between mb-2"><span>Coach/Seat:</span> <span className="text-white">B2 / 36</span></div>
              <div className="flex justify-between"><span>Station:</span> <span className="text-primary">Bangalore City</span></div>
           </div>

           <h3 className="mb-4">Bill Details</h3>
           <div className="summary-row"><span>Item Total</span> <span>₹{subtotal}</span></div>
           <div className="summary-row"><span>GST (5%)</span> <span>₹{gst.toFixed(2)}</span></div>
           <div className="summary-row"><span>Delivery Fee</span> <span>₹{delivery}</span></div>
           <div className="total-row"><span>To Pay</span> <span>₹{total.toFixed(2)}</span></div>

           <button className="btn btn-primary w-full mt-6" style={{ width: '100%' }} onClick={() => onNavigate('tracking')}>
              PROCEED TO PAY
           </button>
        </div>
      </div>
    </div>
  );
};

const TrackingPage = () => (
  <div className="container">
     <div className="tracker-container glass-card">
        <div className="text-center mb-8">
           <h2 className="mb-2">Order #RB9921 Confirmed</h2>
           <p className="text-muted">Arriving at <span className="text-white">Bangalore City</span> in <span className="text-primary">32 mins</span></p>
        </div>

        <div className="step-indicator">
           <div className="step completed">
              <div className="step-circle">✓</div>
              <div className="text-sm">Confirmed</div>
           </div>
           <div className="step active">
              <div className="step-circle"><div className="live-status"></div></div>
              <div className="text-sm">Preparing</div>
           </div>
           <div className="step">
              <div className="step-circle">3</div>
              <div className="text-sm">On Train</div>
           </div>
           <div className="step">
              <div className="step-circle">4</div>
              <div className="text-sm">Delivered</div>
           </div>
        </div>

        <div className="glass-panel flex items-center p-4 mt-8" style={{ padding: '20px' }}>
           <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: '#333', marginRight: '15px' }}>
               {/* Avatar Placeholder */}
               <img src="https://randomuser.me/api/portraits/men/32.jpg" style={{ width: '100%', borderRadius: '50%' }} alt="Rider"/>
           </div>
           <div>
              <h4>Ramesh Kumar</h4>
              <p className="text-muted text-sm">Delivery Partner • +91 98765 43210</p>
           </div>
           <button className="btn btn-outline" style={{ marginLeft: 'auto' }}>Call</button>
        </div>
     </div>
  </div>
);

const Footer = () => (
  <footer style={{ background: 'var(--bg-surface)', padding: '60px 0 20px', marginTop: 'auto', borderTop: '1px solid var(--border)' }}>
     <div className="container grid grid-4 mb-8">
        <div>
           <div className="logo text-primary mb-4">Rail<span className="text-main">Bites</span></div>
           <p className="text-muted text-sm">Premium food delivery for premium travelers. Experience the taste of luxury on wheels.</p>
        </div>
        <div>
           <h4 className="mb-4">Company</h4>
           <p className="text-muted text-sm mb-2">About Us</p>
           <p className="text-muted text-sm mb-2">Careers</p>
           <p className="text-muted text-sm">Team</p>
        </div>
        <div>
           <h4 className="mb-4">Support</h4>
           <p className="text-muted text-sm mb-2">Help & Support</p>
           <p className="text-muted text-sm mb-2">Partner with us</p>
           <p className="text-muted text-sm">Ride with us</p>
        </div>
        <div>
           <h4 className="mb-4">Legal</h4>
           <p className="text-muted text-sm mb-2">Terms & Conditions</p>
           <p className="text-muted text-sm mb-2">Privacy Policy</p>
        </div>
     </div>
     <div className="container text-center text-muted text-sm">
        © 2024 RailBites Technologies Pvt Ltd. All rights reserved.
     </div>
  </footer>
);

// --- Main App ---

function App() {
  const [page, setPage] = useState('home');
  const [cart, setCart] = useState([]);

  // Scroll to top on page change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [page]);

  const addToCart = (item) => {
    const existing = cart.find(x => x.id === item.id);
    if (existing) {
      setCart(cart.map(x => x.id === item.id ? {...existing, qty: existing.qty + 1} : x));
    } else {
      setCart([...cart, {...item, qty: 1}]);
    }
  };

  const cartCount = cart.reduce((acc, item) => acc + item.qty, 0);

  return (
    <div className="app-wrapper" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar cartCount={cartCount} onNavigate={setPage} activePage={page} />
      
      <div style={{ flex: 1 }}>
        {page === 'home' && <LandingPage onNavigate={setPage} addToCart={addToCart} />}
        {page === 'restaurants' && <RestaurantPage addToCart={addToCart} />}
        {page === 'cart' && <CartPage cart={cart} onNavigate={setPage} setCart={setCart} />}
        {page === 'tracking' && <TrackingPage />}
      </div>

      <Footer />
    </div>
  );
}

export default App;