import React from 'react';

const Hero = () => {
  return (
    <section style={{
      minHeight: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      paddingTop: '80px',
      position: 'relative',
      overflow: 'hidden',
      background: 'transparent'
    }}>
      {/* Decorative Blur Orbs */}
      <div style={{
        position: 'absolute', top: '10%', left: '5%',
        width: '300px', height: '300px',
        background: 'rgba(229, 192, 123, 0.1)',
        filter: 'blur(100px)', borderRadius: '50%',
        zIndex: 1
      }}></div>
      <div style={{
        position: 'absolute', bottom: '10%', right: '5%',
        width: '400px', height: '400px',
        background: 'rgba(139, 92, 246, 0.1)',
        filter: 'blur(120px)', borderRadius: '50%',
        zIndex: 1
      }}></div>

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center' }}>
        <div className="animate-slide-up">
          <h1 className="hero-title" style={{ 
            fontSize: '4rem', 
            marginBottom: '20px',
            textShadow: '0 4px 20px rgba(0,0,0,0.5)'
          }}>
            Khám Phá Hành Trình Mới Tại <br/>
            <span className="text-gradient-gold">Hưng Máy Dập</span>
          </h1>
          <p className="hero-subtitle" style={{ 
            fontSize: '1.2rem', 
            color: 'var(--text-muted)', 
            maxWidth: '700px', 
            margin: '0 auto 40px',
            lineHeight: 1.6
          }}>
            Nơi cung cấp các tài khoản Genshin Impact chất lượng cao, an toàn và uy tín nhất Việt Nam. Sẵn sàng đồng hành cùng bạn chinh phục Teyvat.
          </p>
          <div style={{ display: 'flex', gap: '15px', justifyContent: 'center' }} className="hero-buttons">
            <a href="#shop" className="btn-primary" style={{ textDecoration: 'none', display: 'inline-block' }}>Xem Kho Acc</a>
            <button className="btn-secondary">Săn Deal Hot</button>
          </div>
        </div>

        {/* Stats */}
        <div className="hero-stats" style={{ 
          display: 'flex', 
          justifyContent: 'center', 
          gap: '50px', 
          marginTop: '80px',
          flexWrap: 'wrap'
        }}>
          {[
            { label: 'Tài khoản đã bán', val: '5,000+' },
            { label: 'Khách hàng hài lòng', val: '10,000+' },
            { label: 'Giao dịch an toàn', val: '100%' }
          ].map((stat, i) => (
            <div key={i} style={{ animation: `float 3s ease-in-out infinite`, animationDelay: `${i*0.2}s` }}>
              <h3 style={{ fontSize: '2rem', color: 'var(--genshin-gold)' }}>{stat.val}</h3>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .hero-title { font-size: 2.5rem !important; }
          .hero-subtitle { font-size: 1rem !important; margin-bottom: 30px !important; }
          .hero-stats { gap: 30px !important; margin-top: 50px !important; }
          .hero-buttons { flex-direction: column; width: 100%; max-width: 250px; margin: 0 auto; }
        }
      `}</style>
    </section>
  );
};

export default Hero;
