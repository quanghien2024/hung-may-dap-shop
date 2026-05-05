import React, { useState, useEffect } from 'react';

const FlashSaleModal = ({ isOpen, onClose, onSelectAccount }) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: 5,
    minutes: 42,
    seconds: 15
  });

  // Mock Flash Sale Data
  const hotDeals = [
    {
      id: 999,
      code: "HOT-01",
      game: "genshin",
      originalPrice: "5.000.000",
      salePrice: "3.500.000",
      description: "Raiden C2 + Trấn. Deal độc quyền duy nhất hôm nay!",
      image: "https://enka.network/ui/UI_Gacha_AvatarImg_Shougun.png",
      tag: "CỰC HIẾM"
    },
    {
      id: 998,
      code: "HOT-02",
      game: "lienquan",
      originalPrice: "2.500.000",
      salePrice: "1.200.000",
      description: "Full Skin SSS Violet + Nakroth Lôi Quang.",
      image: "https://enka.network/ui/UI_Gacha_AvatarImg_Yelan.png",
      tag: "-50%"
    },
    {
      id: 997,
      code: "HOT-03",
      game: "freefire",
      originalPrice: "1.800.000",
      salePrice: "900.000",
      description: "AK Rồng Xanh Lv Max + Set đồ Hip Hop cũ.",
      image: "https://enka.network/ui/UI_Gacha_AvatarImg_Alhaitham.png",
      tag: "HÀNG CỔ"
    }
  ];

  useEffect(() => {
    if (!isOpen) return;
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, width: '100%', height: '100%',
      background: 'rgba(0,0,0,0.85)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      backdropFilter: 'blur(10px)',
      padding: '20px'
    }} onClick={onClose}>
      <div 
        className="glass-panel animate-slide-up" 
        style={{
          width: '100%',
          maxWidth: '900px',
          background: 'linear-gradient(135deg, rgba(26, 26, 36, 0.95), rgba(45, 20, 60, 0.95))',
          padding: '40px',
          position: 'relative',
          overflowY: 'auto',
          maxHeight: '90vh'
        }}
        onClick={e => e.stopPropagation()}
      >
        <button onClick={onClose} style={{
          position: 'absolute', top: '20px', right: '20px',
          background: 'none', border: 'none', color: 'white',
          fontSize: '1.5rem', cursor: 'pointer', opacity: 0.7
        }}>&times;</button>

        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 className="text-gradient-gold" style={{ fontSize: '2.5rem', marginBottom: '10px' }}>🔥 SIÊU DEAL GIỜ VÀNG 🔥</h2>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '15px' }}>
            {[timeLeft.hours, timeLeft.minutes, timeLeft.seconds].map((val, i) => (
              <div key={i} style={{
                background: 'rgba(229, 192, 123, 0.1)',
                border: '1px solid var(--genshin-gold)',
                borderRadius: '8px',
                padding: '10px 15px',
                minWidth: '60px'
              }}>
                <span style={{ fontSize: '1.5rem', color: 'var(--genshin-gold)', fontWeight: 'bold' }}>
                  {val.toString().padStart(2, '0')}
                </span>
                <p style={{ fontSize: '0.7rem', color: 'rgba(255,255,255,0.5)', marginTop: '2px' }}>
                  {i === 0 ? 'GIỜ' : i === 1 ? 'PHÚT' : 'GIÂY'}
                </p>
              </div>
            ))}
          </div>
        </div>

        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px' 
        }}>
          {hotDeals.map((deal) => (
            <div key={deal.id} className="glass-panel" style={{
              overflow: 'hidden',
              background: 'rgba(255, 255, 255, 0.03)',
              border: '1px solid rgba(255,255,255,0.1)',
              transition: 'transform 0.3s ease'
            }}>
              <div style={{ height: '180px', position: 'relative' }}>
                <img src={deal.image} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                <div style={{
                  position: 'absolute', top: '10px', left: '10px',
                  background: '#ff4d4f', color: 'white', padding: '4px 10px',
                  borderRadius: '4px', fontSize: '0.8rem', fontWeight: 'bold'
                }}>{deal.tag}</div>
              </div>
              <div style={{ padding: '20px' }}>
                <p style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginBottom: '5px' }}>Mã: {deal.code}</p>
                <p style={{ fontSize: '0.9rem', marginBottom: '15px', height: '40px', overflow: 'hidden' }}>{deal.description}</p>
                <div style={{ marginBottom: '20px' }}>
                  <span style={{ 
                    textDecoration: 'line-through', 
                    color: 'rgba(255,255,255,0.3)', 
                    fontSize: '0.9rem',
                    marginRight: '10px'
                  }}>{deal.originalPrice}đ</span>
                  <span style={{ 
                    color: '#ff4d4f', 
                    fontSize: '1.4rem', 
                    fontWeight: 'bold' 
                  }}>{deal.salePrice}đ</span>
                </div>
                <button 
                  className="btn-primary" 
                  style={{ width: '100%', background: 'linear-gradient(135deg, #ff4d4f, #ff7875)' }}
                  onClick={() => onSelectAccount(deal)}
                >
                  Săn Ngay
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FlashSaleModal;
