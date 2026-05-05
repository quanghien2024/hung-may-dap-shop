import React, { useState, useEffect } from 'react';

const Navbar = ({ currentUser, onOpenAuth, onLogout, onOpenSupport, onOpenCart, cartCount, isMuted, onToggleMusic }) => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 50) setScrolled(true);
      else setScrolled(false);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav style={{
      position: 'fixed', top: 0, width: '100%', zIndex: 1000, transition: 'all 0.3s ease',
      padding: scrolled ? '10px 0' : '20px 0',
      background: scrolled || isMenuOpen ? 'rgba(13, 13, 20, 0.95)' : 'transparent',
      backdropFilter: scrolled || isMenuOpen ? 'blur(10px)' : 'none',
      borderBottom: scrolled || isMenuOpen ? '1px solid var(--glass-border)' : 'none'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer' }}>
          <img 
            src="https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExa294ZzQ1bTZqZjVoOW9ka29rZGx6Z3k4aTRpYm40cTdjYWZ2aWdmeiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9cw/s8VqauGTto4K3o3ODg/giphy.gif" 
            alt="Logo" 
            style={{ width: '40px', height: '40px', objectFit: 'contain', filter: 'drop-shadow(0 0 5px rgba(255,255,255,0.3))' }} 
          />
          <h2 className="text-gradient-gold" style={{ margin: 0, fontSize: '1.2rem' }}>Hưng Máy Dập</h2>
        </div>
        
        <div className="desktop-menu" style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Trang Chủ</a>
          <a href="#shop" style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Cửa Hàng</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onOpenSupport(); }} style={{ color: 'var(--text-main)', textDecoration: 'none' }}>Hỗ Trợ</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onToggleMusic(); }} style={{ color: 'var(--genshin-gold)', display: 'flex', alignItems: 'center' }}>
            {isMuted ? (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" title="Bật Nhạc">
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <line x1="23" y1="9" x2="17" y2="15"></line>
                <line x1="17" y1="9" x2="23" y2="15"></line>
              </svg>
            ) : (
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" title="Tắt Nhạc">
                <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
              </svg>
            )}
          </a>
          
          {currentUser && (
            <div onClick={onOpenCart} style={{ position: 'relative', cursor: 'pointer', marginLeft: '10px' }}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--genshin-gold)' }}>
                <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && (
                <span style={{
                  position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', 
                  fontSize: '0.6rem', width: '16px', height: '16px', borderRadius: '50%',
                  display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold'
                }}>{cartCount}</span>
              )}
            </div>
          )}

          {currentUser ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
              <span style={{ color: 'var(--genshin-gold)', fontSize: '0.9rem' }}>Chào, {currentUser.username}</span>
              <button className="btn-secondary" style={{ padding: '5px 15px', fontSize: '0.8rem' }} onClick={onLogout}>Đăng Xuất</button>
            </div>
          ) : (
            <button className="btn-primary" style={{ padding: '8px 20px', fontSize: '0.9rem' }} onClick={onOpenAuth}>Đăng Nhập</button>
          )}
        </div>

        <div className="mobile-only" style={{ display: 'none', gap: '15px', alignItems: 'center' }}>
          {currentUser && (
            <div onClick={onOpenCart} style={{ position: 'relative', cursor: 'pointer' }}>
               <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ color: 'var(--genshin-gold)' }}>
                <circle cx="9" cy="21" r="1"></circle><circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              {cartCount > 0 && <span style={{ position: 'absolute', top: '-8px', right: '-8px', background: '#ef4444', color: 'white', fontSize: '0.6rem', width: '16px', height: '16px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{cartCount}</span>}
            </div>
          )}
          <div onClick={() => setIsMenuOpen(!isMenuOpen)} style={{ cursor: 'pointer', color: 'var(--genshin-gold)' }}>
            <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </div>
        </div>
      </div>

      {isMenuOpen && (
        <div className="animate-fade-in" style={{
          position: 'absolute', top: '100%', left: 0, right: 0, background: 'var(--genshin-dark)', padding: '20px',
          borderBottom: '1px solid var(--glass-border)', display: 'flex', flexDirection: 'column', gap: '15px', textAlign: 'center'
        }}>
          <a href="#" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Trang Chủ</a>
          <a href="#shop" onClick={() => setIsMenuOpen(false)} style={{ color: 'white', textDecoration: 'none' }}>Cửa Hàng</a>
          <a href="#" onClick={(e) => { e.preventDefault(); onToggleMusic(); setIsMenuOpen(false); }} style={{ color: 'var(--genshin-gold)', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', textDecoration: 'none' }}>
            {isMuted ? (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <line x1="23" y1="9" x2="17" y2="15"></line>
                  <line x1="17" y1="9" x2="23" y2="15"></line>
                </svg>
                <span>Bật Nhạc</span>
              </>
            ) : (
              <>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z"></path>
                  <path d="M19.07 4.93a10 10 0 0 1 0 14.14"></path>
                  <path d="M15.54 8.46a5 5 0 0 1 0 7.07"></path>
                </svg>
                <span>Tắt Nhạc</span>
              </>
            )}
          </a>
          {currentUser ? (
            <>
              <span style={{ color: 'var(--genshin-gold)' }}>{currentUser.username}</span>
              <button className="btn-secondary" onClick={() => { onLogout(); setIsMenuOpen(false); }}>Đăng Xuất</button>
            </>
          ) : (
            <button className="btn-primary" onClick={() => { onOpenAuth(); setIsMenuOpen(false); }}>Đăng Nhập</button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) { .desktop-menu { display: none !important; } .mobile-only { display: flex !important; } }
      `}</style>
    </nav>
  );
};

export default Navbar;
