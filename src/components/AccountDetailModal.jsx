import React from 'react';

const AccountDetailModal = ({ account, isOpen, isLoggedIn, onClose, onAddToCart, onBuyNow, onOpenAuth }) => {
  if (!isOpen || !account) return null;

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000, padding: '10px'
    }} onClick={onClose}>
      
      <div className="glass-panel animate-slide-up no-scrollbar" style={{
        width: '800px', maxWidth: '100%', maxHeight: '90vh', overflowY: 'auto',
        position: 'relative', display: 'flex', flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px', background: 'rgba(0,0,0,0.5)',
          border: 'none', color: 'white', fontSize: '1.5rem', width: '35px', height: '35px',
          borderRadius: '50%', cursor: 'pointer', zIndex: 10
        }}>×</button>

        <div className="detail-cover" style={{
          height: '250px', width: '100%', backgroundImage: `url(${account.image})`,
          backgroundSize: 'cover', backgroundPosition: 'top', position: 'relative', borderBottom: '2px solid var(--genshin-gold)'
        }}>
           <div style={{ position: 'absolute', bottom: 0, left: 0, right: 0, background: 'linear-gradient(to top, rgba(13,13,20,1), transparent)', height: '120px' }}></div>
          <div style={{ position: 'absolute', bottom: '15px', left: '20px' }}>
             <h2 style={{ fontSize: '1.8rem', color: 'white', textShadow: '0 2px 10px rgba(0,0,0,0.8)' }}>Mã: {account.code}</h2>
             <div style={{ display: 'flex', gap: '8px', marginTop: '5px' }}>
               <span style={{ background: 'var(--genshin-blue)', padding: '3px 12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8rem' }}>AR {account.ar}</span>
               <span style={{ background: 'var(--genshin-cyan)', padding: '3px 12px', borderRadius: '15px', fontWeight: 'bold', fontSize: '0.8rem' }}>Server {account.server}</span>
             </div>
          </div>
        </div>

        <div style={{ padding: '20px' }} className="no-scrollbar">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ flex: 1, minWidth: '280px' }}>
              <h3 className="text-gradient-gold" style={{ fontSize: '1.3rem', marginBottom: '10px' }}>Mô Tả Chi Tiết</h3>
              <p style={{ color: 'var(--text-main)', lineHeight: 1.6 }}>{account.description}</p>
              
              <div style={{ marginTop: '20px' }}>
                <h4 style={{ color: 'var(--text-muted)', marginBottom: '10px', fontSize: '0.9rem' }}>Nhân vật 5★ nổi bật:</h4>
                <div style={{ display: 'flex', gap: '8px', flexWrap: 'wrap' }}>
                  {account.characters.map((char, idx) => (
                    <span key={idx} style={{ background: 'rgba(139, 92, 246, 0.15)', border: '1px solid var(--genshin-purple)', padding: '5px 12px', borderRadius: '8px', color: 'white', fontSize: '0.85rem' }}>{char}</span>
                  ))}
                </div>
              </div>
            </div>

            <div style={{ 
              background: 'rgba(0,0,0,0.3)', padding: '20px', borderRadius: '15px', 
              border: '1px solid var(--glass-border)', minWidth: '100%', textAlign: 'center'
            }} className="mobile-price-card">
              <p style={{ color: 'var(--text-muted)', marginBottom: '5px', fontSize: '0.9rem' }}>Giá bán:</p>
              <h2 className="text-gradient-gold" style={{ fontSize: '2rem', marginBottom: '15px' }}>{account.price}đ</h2>
              
              {!isLoggedIn ? (
                <div style={{ padding: '10px', background: 'rgba(229, 192, 123, 0.1)', borderRadius: '8px', border: '1px dashed var(--genshin-gold)' }}>
                  <p style={{ color: 'var(--genshin-gold)', fontSize: '0.85rem', marginBottom: '10px' }}>Vui lòng đăng nhập để thực hiện mua hàng</p>
                  <button className="btn-primary" style={{ width: '100%' }} onClick={onOpenAuth}>Đăng Nhập Ngay</button>
                </div>
              ) : (
                <div style={{ display: 'flex', gap: '10px' }} className="mobile-stack">
                  <button className="btn-primary" style={{ flex: 1 }} onClick={() => onBuyNow(account)}>Mua Ngay</button>
                  <button className="btn-secondary" style={{ flex: 1 }} onClick={() => onAddToCart(account)}>Thêm Vào Giỏ</button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (min-width: 769px) { .mobile-price-card { min-width: 250px !important; flex: 0 0 250px; } .detail-cover { height: 300px !important; } }
        @media (max-width: 480px) { .mobile-stack { flex-direction: column; } .detail-cover { height: 200px !important; } }
      `}</style>
    </div>
  );
};

export default AccountDetailModal;
