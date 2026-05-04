import React from 'react';

const SupportModal = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)',
      backdropFilter: 'blur(8px)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 2000,
      padding: '10px'
    }} onClick={onClose}>
      
      <div className="glass-panel animate-slide-up" style={{
        width: '650px',
        maxWidth: '100%',
        maxHeight: '90vh',
        padding: '30px',
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
      }} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px',
          background: 'transparent', border: 'none',
          color: 'var(--text-muted)', fontSize: '1.5rem',
          cursor: 'pointer'
        }}>×</button>

        <h2 className="text-gradient-gold" style={{ marginBottom: '20px', fontSize: '1.8rem' }}>Trung Tâm Hỗ Trợ</h2>
        <p style={{ color: 'var(--text-muted)', marginBottom: '25px', lineHeight: 1.5, fontSize: '0.95rem' }}>Hưng Máy Dập luôn sẵn sàng lắng nghe và giải đáp mọi thắc mắc của bạn.</p>

        <div style={{ overflowY: 'auto', paddingRight: '5px' }} className="no-scrollbar">
          <div className="support-grid" style={{ 
            display: 'grid', 
            gridTemplateColumns: '1fr 1fr', 
            gap: '15px', 
            marginBottom: '25px' 
          }}>
            <div className="support-card">
              <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📱</div>
              <h4 style={{ color: 'var(--genshin-gold)', marginBottom: '5px', fontSize: '1rem' }}>Zalo</h4>
              <p style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>0987.xxx.xxx</p>
            </div>
            <div className="support-card">
              <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>💬</div>
              <h4 style={{ color: 'var(--genshin-gold)', marginBottom: '5px', fontSize: '1rem' }}>Messenger</h4>
              <p style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>fb.com/hungmaydap</p>
            </div>
            <div className="support-card">
              <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>✈️</div>
              <h4 style={{ color: 'var(--genshin-gold)', marginBottom: '5px', fontSize: '1rem' }}>Telegram</h4>
              <p style={{ color: 'white', fontWeight: 'bold', fontSize: '0.9rem' }}>@hungmaydap_admin</p>
            </div>
            <div className="support-card">
              <div style={{ fontSize: '1.8rem', marginBottom: '8px' }}>📧</div>
              <h4 style={{ color: 'var(--genshin-gold)', marginBottom: '5px', fontSize: '1rem' }}>Email</h4>
              <p style={{ color: 'white', fontWeight: 'bold', fontSize: '0.8rem', wordBreak: 'break-all' }}>support@hungmaydap.vn</p>
            </div>
          </div>

          <div style={{ textAlign: 'left', borderTop: '1px solid var(--glass-border)', paddingTop: '20px' }}>
            <h3 style={{ color: 'var(--genshin-gold)', marginBottom: '10px', fontSize: '1.1rem' }}>Thời gian làm việc</h3>
            <p style={{ color: 'var(--text-main)', marginBottom: '8px', fontSize: '0.9rem' }}>⏰ **Thứ 2 - Chủ Nhật:** 08:00 - 00:00</p>
            <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem', lineHeight: 1.5 }}>Lưu ý: Giao dịch sau 12h đêm sẽ được hỗ trợ vào sáng hôm sau.</p>
          </div>
        </div>

      </div>
      <style>{`
        .support-card {
          background: rgba(255,255,255,0.05);
          padding: 15px;
          border-radius: 12px;
          border: 1px solid var(--glass-border);
        }
        @media (max-width: 550px) {
          .support-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default SupportModal;
