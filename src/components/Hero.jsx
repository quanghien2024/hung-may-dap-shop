import React from 'react';

const Hero = ({ onOpenFlashSale }) => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '100px',
      paddingBottom: '100px',
      position: 'relative',
      overflow: 'hidden',
      background: 'url(/hero-bg.png) no-repeat center center',
      backgroundSize: 'cover',
    }}>
      {/* Dark Overlay - Multi-layered for maximum readability */}
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: 'linear-gradient(to bottom, rgba(13, 13, 20, 0.7) 0%, rgba(13, 13, 20, 0.4) 50%, rgba(13, 13, 20, 0.9) 100%)',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute',
        top: 0, left: 0, width: '100%', height: '100%',
        background: 'radial-gradient(circle at center, transparent 0%, rgba(13, 13, 20, 0.6) 100%)',
        zIndex: 1
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div className="animate-slide-up">
          <h1 className="hero-title" style={{ 
            fontSize: '4.5rem', 
            marginBottom: '20px',
            lineHeight: '1.1',
            fontWeight: '800',
            textShadow: '0 10px 30px rgba(0,0,0,0.8)'
          }}>
            Khám Phá Hành Trình <br/>
            Mới Tại <span className="text-gradient-gold" style={{ filter: 'drop-shadow(0 0 10px rgba(229, 192, 123, 0.3))' }}>Hưng Máy Dập</span>
          </h1>
          <p className="hero-subtitle" style={{ 
            fontSize: '1.3rem', 
            color: 'rgba(255, 255, 255, 0.8)', 
            maxWidth: '800px', 
            margin: '0 auto 40px',
            lineHeight: 1.6,
            fontWeight: '400',
            textShadow: '0 2px 10px rgba(0,0,0,0.5)'
          }}>
            Nền tảng cung cấp tài khoản gaming cao cấp nhất. Sở hữu ngay đội hình trong mơ với mức giá cực kỳ ưu đãi và bảo hành trọn đời.
          </p>
          <div style={{ display: 'flex', gap: '20px', justifyContent: 'center' }} className="hero-buttons">
            <a href="#shop" className="btn-primary" style={{ 
              textDecoration: 'none', 
              display: 'inline-block',
              padding: '15px 40px',
              fontSize: '1.1rem',
              borderRadius: '12px'
            }}>
              Xem Kho Acc
            </a>
            <button className="btn-secondary pulse-button" onClick={onOpenFlashSale} style={{ 
              padding: '15px 40px',
              fontSize: '1.1rem',
              borderRadius: '12px',
              background: 'rgba(255, 255, 255, 0.05)',
              backdropFilter: 'blur(5px)',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ fontSize: '1.2rem' }}>🔥</span> Săn Deal Hot
            </button>
          </div>
        </div>

        {/* Stats Section with Glassmorphism */}
        <div className="hero-stats" style={{ 
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '30px',
          marginTop: '100px',
          maxWidth: '1000px',
          marginRight: 'auto',
          marginLeft: 'auto'
        }}>
          {[
            { label: 'Tài khoản đã bán', val: '5,000+', icon: '🚀' },
            { label: 'Khách hàng hài lòng', val: '10,000+', icon: '💎' },
            { label: 'Giao dịch an toàn', val: '100%', icon: '🛡️' }
          ].map((stat, i) => (
            <div key={i} className="glass-panel" style={{ 
              padding: '30px',
              animation: `float 4s ease-in-out infinite`, 
              animationDelay: `${i*0.3}s`,
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              transition: 'all 0.3s ease'
            }}>
              <div style={{ fontSize: '2rem', marginBottom: '10px' }}>{stat.icon}</div>
              <h3 style={{ fontSize: '2.2rem', marginBottom: '5px', color: 'var(--genshin-gold)' }}>{stat.val}</h3>
              <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '1rem', textTransform: 'uppercase', letterSpacing: '1px' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        .hero-title span {
          display: inline-block;
        }
        @media (max-width: 768px) {
          .hero-title { font-size: 2.8rem !important; }
          .hero-subtitle { font-size: 1.1rem !important; margin-bottom: 40px !important; }
          .hero-stats { grid-template-columns: 1fr !important; gap: 20px !important; }
          .hero-buttons { flex-direction: column; width: 100%; max-width: 280px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
