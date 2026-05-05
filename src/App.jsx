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
import FlashSaleModal from './components/FlashSaleModal';
import { auth } from './firebase';
import { onAuthStateChanged, signOut } from 'firebase/auth';

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
  const [isMuted, setIsMuted] = useState(false);
  const [hasEntered, setHasEntered] = useState(false);
  const [isFlashSaleOpen, setIsFlashSaleOpen] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Listen for Firebase Auth state changes
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser({
          uid: user.uid,
          email: user.email,
          username: user.displayName || 'Khách'
        });
      } else {
        setCurrentUser(null);
      }
    });

    // Smart interaction unlock for Mobile/Desktop
    const unlockAudio = () => {
      if (audioRef.current && !isMuted) {
        audioRef.current.volume = 1.0;
        audioRef.current.play()
          .then(() => {
            console.log("Audio unlocked and playing");
            removeListeners();
          })
          .catch(err => {
            // If failed, we just wait for the next interaction
            console.log("Autoplay blocked, waiting for interaction...");
          });
      }
    };

    const removeListeners = () => {
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('mousemove', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      window.removeEventListener('scroll', unlockAudio);
      window.removeEventListener('keydown', unlockAudio);
    };

    // Attempt to play on mount (only works if already interacted or PWA)
    if (hasEntered) {
      unlockAudio();
    }

    // Lock body scroll when splash is active
    if (!hasEntered) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    // Fallback listeners
    window.addEventListener('click', unlockAudio);
    window.addEventListener('touchstart', unlockAudio);

    return () => {
      unsubscribe();
      window.removeEventListener('click', unlockAudio);
      window.removeEventListener('touchstart', unlockAudio);
      document.body.style.overflow = 'unset';
    };
  }, [isMuted, hasEntered]);

  const toggleMusic = () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (audio.paused) {
      audio.volume = 1.0;
      audio.play().catch(e => console.error("Toggle play error:", e));
      setIsMuted(false);
    } else {
      audio.pause();
      setIsMuted(true);
    }
  };

  const handleEnter = () => {
    setHasEntered(true);
    if (audioRef.current) {
      audioRef.current.volume = 1.0;
      audioRef.current.play()
        .then(() => setIsMuted(false))
        .catch(e => console.log("Play error on enter:", e));
    }
  };

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setCurrentUser(null);
      setCartItems([]);
    } catch (error) {
      console.error("Logout error:", error);
    }
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
      {/* Splash Screen */}
      <div className={`splash-overlay ${hasEntered ? 'fade-out' : ''}`}>
        <video autoPlay muted loop playsInline className="splash-bg-video">
          <source src="https://assets.mixkit.co/videos/preview/mixkit-night-sky-with-stars-and-a-bright-moon-40400-large.mp4" type="video/mp4" />
        </video>
        <div className="splash-content animate-fade-in">
          <div className="splash-logo-container">
            <img src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa294ZzQ1bTZqZjVoOW9ka29rZGx6Z3k4aTRpYm40cTdjYWZ2aWdmeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/s8VqauGTto4K3o3ODg/giphy.gif" alt="Paimon" className="splash-logo-img" />
          </div>
          <h1 className="splash-title text-gradient-gold">Hưng Máy Dập</h1>
          <p className="splash-subtitle">GIAN HÀNG TÀI KHOẢN GAME UY TÍN</p>
          <button className="btn-enter" onClick={handleEnter}>Khám Phá Ngay</button>
        </div>
      </div>

      {/* Dynamic Background */}
      {/* Dynamic Background */}
      <video autoPlay muted loop playsInline className="video-bg">
        <source src="https://assets.mixkit.co/videos/preview/mixkit-night-sky-with-stars-and-a-bright-moon-40400-large.mp4" type="video/mp4" />
      </video>
      <div className="bg-overlay" style={{ background: 'rgba(13, 13, 20, 0.6)' }}></div>

      {/* Background Music - Đoạn Tuyệt Nàng Đi Remix */}
      <audio
        ref={audioRef}
        loop
        autoPlay
        preload="auto"
        src="/backgroundmusic.mp3"
      ></audio>



      {/* Snowfall Effect */}
      <div className="snow-container">
        {[...Array(50)].map((_, i) => (
          <div
            key={i}
            className="snowflake"
            style={{
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 6 + 2}px`,
              height: `${Math.random() * 6 + 2}px`,
              animationDuration: `${Math.random() * 10 + 5}s`,
              animationDelay: `${Math.random() * 5}s`,
              opacity: Math.random() * 0.5 + 0.3
            }}
          ></div>
        ))}
      </div>

      <Navbar
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthOpen(true)}
        onLogout={handleLogout}
        onOpenSupport={() => setIsSupportOpen(true)}
        onOpenCart={() => setIsCartOpen(true)}
        cartCount={cartItems.length}
        isMuted={isMuted}
        onToggleMusic={toggleMusic}
      />
      <Hero onOpenFlashSale={() => setIsFlashSaleOpen(true)} />
      <ShopList onSelectAccount={setSelectedAccount} />
      <AuthModal isOpen={isAuthOpen} onClose={() => setIsAuthOpen(false)} onLoginSuccess={handleLogin} />
      <SupportModal isOpen={isSupportOpen} onClose={() => setIsSupportOpen(false)} />
      <AccountDetailModal isOpen={!!selectedAccount} account={selectedAccount} isLoggedIn={!!currentUser} onClose={() => setSelectedAccount(null)} onAddToCart={handleAddToCart} onBuyNow={handleBuyNow} onOpenAuth={() => { setIsAuthOpen(true); setSelectedAccount(null); }} />
      <CartModal isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} cartItems={cartItems} onRemoveItem={handleRemoveFromCart} onCheckout={handleCheckoutCart} />
      <CheckoutModal isOpen={isCheckoutOpen} onClose={() => setIsCheckoutOpen(false)} items={checkoutItems} totalAmount={checkoutTotal} />
      <PolicyModal isOpen={!!policyType} onClose={() => setPolicyType(null)} type={policyType} />
      <FlashSaleModal 
        isOpen={isFlashSaleOpen} 
        onClose={() => setIsFlashSaleOpen(false)} 
        onSelectAccount={(acc) => {
          if (!currentUser) {
            setIsFlashSaleOpen(false);
            setIsAuthOpen(true);
          } else {
            setCheckoutItems([acc]);
            setIsFlashSaleOpen(false);
            setIsCheckoutOpen(true);
          }
        }} 
      />

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
