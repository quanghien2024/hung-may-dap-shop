import React, { useState, useEffect, useRef } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ShopList from './components/ShopList';
import AuthModal from './components/AuthModal';
import SupportModal from './components/SupportModal';
import AccountDetailModal from './components/AccountDetailModal';
import CartModal from './components/CartModal';
import CheckoutModal from './components/CheckoutModal';
import PolicyModal from './components/PolicyModal';

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [isSupportOpen, setIsSupportOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [selectedAccount, setSelectedAccount] = useState(null);
  const [policyType, setPolicyType] = useState(null);
  const [cartItems, setCartItems] = useState([]);
  const [checkoutItems, setCheckoutItems] = useState([]);
  const [isMuted, setIsMuted] = useState(true);
  const audioRef = useRef(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('currentUser');
    if (savedUser) {
      setCurrentUser(JSON.parse(savedUser));
    }

    // Try to play music on any interaction
    const initAudio = () => {
      if (audioRef.current && audioRef.current.paused) {
        audioRef.current.play()
          .then(() => {
            setIsMuted(false);
            console.log("Music started successfully");
          })
          .catch(err => console.log("Playback failed:", err));
      }
    };

    window.addEventListener('mousedown', initAudio);
    window.addEventListener('touchstart', initAudio);
    window.addEventListener('keydown', initAudio);
    window.addEventListener('scroll', initAudio);

    return () => {
      window.removeEventListener('mousedown', initAudio);
      window.removeEventListener('touchstart', initAudio);
      window.removeEventListener('keydown', initAudio);
      window.removeEventListener('scroll', initAudio);
    };
  }, []);

  const toggleMusic = () => {
    if (audioRef.current) {
      if (audioRef.current.paused) {
        audioRef.current.play();
        setIsMuted(false);
      } else {
        audioRef.current.pause();
        setIsMuted(true);
      }
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
    localStorage.setItem('currentUser', JSON.stringify(user));
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem('currentUser');
    setCartItems([]);
  };

  const handleAddToCart = (account) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    if (!cartItems.find(item => item.id === account.id)) {
      setCartItems([...cartItems, account]);
    }
    setSelectedAccount(null);
  };

  const handleRemoveFromCart = (index) => {
    const newCart = [...cartItems];
    newCart.splice(index, 1);
    setCartItems(newCart);
  };

  const handleBuyNow = (account) => {
    if (!currentUser) {
      setIsAuthOpen(true);
      return;
    }
    setCheckoutItems([account]);
    setSelectedAccount(null);
    setIsCheckoutOpen(true);
  };

  const handleCheckoutCart = () => {
    if (cartItems.length === 0) return;
    setCheckoutItems(cartItems);
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const checkoutTotal = checkoutItems.reduce((sum, item) => sum + (item.numericPrice || 0), 0);

  return (
    <div className="App" style={{ position: 'relative' }}>
      {/* Dynamic Background */}
      <video autoPlay muted loop className="video-bg" poster="https://images8.alphacoders.com/109/1097405.jpg">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-starry-night-sky-over-a-mountain-range-153-large.mp4" type="video/mp4" />
      </video>
      <div className="bg-overlay"></div>

      {/* Background Music - High Energy / Phonk */}
      <audio 
        ref={audioRef} 
        loop 
        preload="auto"
        src="https://www.soundhelix.com/examples/mp3/SoundHelix-Song-8.mp3" 
      ></audio>

      {/* Music Toggle Floating Button */}
      <button 
        className={`music-toggle ${!isMuted ? 'playing' : ''}`} 
        onClick={toggleMusic}
        style={{ opacity: 0.8 }}
      >
        {isMuted ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <line x1="23" y1="9" x2="17" y2="15"></line><line x1="17" y1="9" x2="23" y2="15"></line>
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5"></polygon>
            <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path><path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
          </svg>
        )}
      </button>

      <Navbar 
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)} 
        onLogout={handleLogout}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
      />
      <Hero />
      <ShopList onSelectAccount={setSelectedAccount} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={handleLogin} />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      <AccountDetailModal isOpen={!!selectedAccount} account={selectedAccount} isLoggedIn={!!currentUser} onClose={() => setSelectedAccount(null)} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onOpenAuth={() => { setIsAuthOpen(true); setSelectedAccount(null); }} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onRemoveItem={handleRemoveFromCart} onCheckout={handleCheckoutCart} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={checkoutItems} totalAmount={checkoutTotal} />
      <PolicyModal isOpen={!!policyType} onClose={() => setPolicyType(null)} type={policyType} />
      
      <footer style={{ background: 'rgba(13, 13, 20, 0.8)', padding: '40px 0', textAlign: 'center', borderTop: '1px solid var(--glass-border)', marginTop: 'auto', backdropFilter: 'blur(10px)' }}>
        <div className="container">
          <h2 className="text-gradient-gold" style={{ marginBottom: '15px' }}>Hưng Máy Dập</h2>
          <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>Nền tảng giao dịch tài khoản Genshin Impact uy tín hàng đầu.</p>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', fontSize: '0.9rem' }}>
            <a href="#" onClick={(e) => { e.preventDefault(); setPolicyType('terms'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Điều khoản</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setPolicyType('privacy'); }} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Bảo mật</a>
            <a href="#" onClick={(e) => { e.preventDefault(); setIsSupportOpen(true); }} style={{ color: 'var(--text-muted)', textDecoration: 'none' }}>Liên hệ</a>
          </div>
          <p style={{ color: 'var(--text-muted)', marginTop: '30px', fontSize: '0.8rem', opacity: 0.5 }}>© 2026 Hưng Máy Dập. Không liên kết với HoYoverse.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
