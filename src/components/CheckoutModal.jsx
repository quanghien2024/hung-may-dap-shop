import React from 'react';

const CheckoutModal = ({ isOpen, onClose, items, totalAmount }) => {
  if (!isOpen) return null;

  const formatMoney = (amount) => amount.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  
  // Fake Transfer Content
  const transferContent = `NAP ${items.map(i => i.code).join(', ')}`.substring(0, 30);
  // Fake QR Code generated via API
  const qrUrl = `https://api.qrserver.com/v1/create-qr-code/?size=200x200&data=Viettinbank|999999999|NguyenVanA|${totalAmount}|${encodeURIComponent(transferContent)}`;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.8)',
      backdropFilter: 'blur(10px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 3000
    }} onClick={onClose}>
      
      <div className="glass-panel animate-slide-up" style={{
        width: '500px',
        padding: '40px',
        position: 'relative',
        textAlign: 'center'
      }} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px',
          background: 'transparent', border: 'none',
          color: 'var(--text-muted)', fontSize: '1.5rem',
          cursor: 'pointer'
        }}>×</button>

        <h2 className="text-gradient-gold" style={{ marginBottom: '10px', fontSize: '2rem' }}>Thanh Toán</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '30px' }}>Quét mã QR dưới đây bằng ứng dụng ngân hàng hoặc Momo để thanh toán tự động.</p>

        {/* QR Code Container */}
        <div style={{ 
          background: 'white', padding: '15px', display: 'inline-block', 
          borderRadius: '12px', marginBottom: '25px', boxShadow: '0 0 20px rgba(229, 192, 123, 0.4)'
        }}>
          <img src={qrUrl} alt="QR Code" style={{ width: '200px', height: '200px', display: 'block' }} />
        </div>

        {/* Bank Info */}
        <div style={{ background: 'rgba(0,0,0,0.4)', borderRadius: '12px', padding: '20px', textAlign: 'left', border: '1px solid var(--glass-border)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Ngân hàng:</span>
            <span style={{ fontWeight: 'bold', color: 'var(--genshin-cyan)' }}>VietinBank</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Chủ tài khoản:</span>
            <span style={{ fontWeight: 'bold', color: 'white' }}>HUNG MAY DAP</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Số tài khoản:</span>
            <span style={{ fontWeight: 'bold', color: 'var(--genshin-gold)', fontSize: '1.1rem' }}>9999 9999 9999</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Số tiền:</span>
            <span style={{ fontWeight: 'bold', color: '#ef4444', fontSize: '1.1rem' }}>{formatMoney(totalAmount)}đ</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', paddingTop: '10px', borderTop: '1px dashed var(--text-muted)' }}>
            <span style={{ color: 'var(--text-muted)' }}>Nội dung chuyển:</span>
            <span style={{ fontWeight: 'bold', color: 'var(--genshin-purple)' }}>{transferContent}</span>
          </div>
        </div>

        <p style={{ marginTop: '25px', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          Hệ thống sẽ tự động gửi thông tin tài khoản vào email của bạn sau 1-3 phút kể từ khi nhận được thanh toán.
        </p>

      </div>
    </div>
  );
};

export default CheckoutModal;
