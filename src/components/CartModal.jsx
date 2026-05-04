import React from 'react';

const CartModal = ({ isOpen, onClose, cartItems, onRemoveItem, onCheckout }) => {
  if (!isOpen) return null;

  const totalAmount = cartItems.reduce((sum, item) => sum + (item.numericPrice || 0), 0);
  const formatMoney = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000
    }} onClick={onClose}>
      
      <div className="glass-panel animate-slide-up" style={{
        width: '600px',
        maxHeight: '80vh',
        padding: '30px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column'
      }} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px',
          background: 'transparent', border: 'none',
          color: 'var(--text-muted)', fontSize: '1.5rem',
          cursor: 'pointer'
        }}>×</button>

        <h2 className="text-gradient-gold" style={{ marginBottom: '20px', textAlign: 'center', fontSize: '2rem' }}>
          Giỏ Hàng Của Bạn
        </h2>

        {cartItems.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text-muted)' }}>
            <p>Giỏ hàng đang trống.</p>
          </div>
        ) : (
          <>
            <div style={{ overflowY: 'auto', flex: 1, marginBottom: '20px', paddingRight: '10px' }} className="no-scrollbar">
              {cartItems.map((item, index) => (
                <div key={index} style={{
                  display: 'flex', alignItems: 'center', gap: '15px',
                  background: 'rgba(0,0,0,0.3)', padding: '15px', borderRadius: '12px',
                  border: '1px solid var(--glass-border)', marginBottom: '10px'
                }}>
                  <div style={{
                    width: '80px', height: '60px', borderRadius: '8px',
                    backgroundImage: `url(${item.image})`, backgroundSize: 'cover', backgroundPosition: 'top'
                  }}></div>
                  <div style={{ flex: 1 }}>
                    <h4 style={{ color: 'white', marginBottom: '5px' }}>Tài khoản: {item.code}</h4>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>Server {item.server} | AR {item.ar}</p>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <h4 className="text-gradient-gold">{item.price}đ</h4>
                    <button onClick={() => onRemoveItem(index)} style={{
                      background: 'none', border: 'none', color: '#ef4444', 
                      fontSize: '0.8rem', cursor: 'pointer', marginTop: '5px', textDecoration: 'underline'
                    }}>Xóa</button>
                  </div>
                </div>
              ))}
            </div>

            <div style={{ borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <span style={{ fontSize: '1.2rem', color: 'var(--text-main)' }}>Tổng thanh toán:</span>
                <span className="text-gradient-gold" style={{ fontSize: '1.8rem', fontWeight: 'bold' }}>{formatMoney(totalAmount)}đ</span>
              </div>
              <button className="btn-primary" style={{ width: '100%', padding: '15px', fontSize: '1.2rem' }} onClick={onCheckout}>
                Tiến Hành Thanh Toán
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default CartModal;
