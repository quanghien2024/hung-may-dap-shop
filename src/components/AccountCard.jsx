import React from 'react';

const AccountCard = ({ account, onClick }) => {
  return (
    <div className="glass-panel" style={{
      overflow: 'hidden',
      transition: 'all 0.3s ease',
      cursor: 'pointer',
      position: 'relative',
      height: '100%',
      display: 'flex',
      flexDirection: 'column'
    }}
    onClick={onClick}
    onMouseOver={e => {
      e.currentTarget.style.transform = 'translateY(-10px)';
      e.currentTarget.style.boxShadow = '0 15px 40px rgba(139, 92, 246, 0.3)';
      e.currentTarget.style.borderColor = 'var(--genshin-purple)';
    }}
    onMouseOut={e => {
      e.currentTarget.style.transform = 'translateY(0)';
      e.currentTarget.style.boxShadow = '0 8px 32px 0 rgba(0, 0, 0, 0.37)';
      e.currentTarget.style.borderColor = 'var(--glass-border)';
    }}>
      {/* Account Thumbnail */}
      <div style={{
        height: '200px',
        width: '100%',
        backgroundImage: `url(${account.image})`,
        backgroundSize: 'cover',
        backgroundPosition: 'top',
        position: 'relative',
        borderBottom: '1px solid rgba(255,255,255,0.1)'
      }}>
        {/* Level/Rank Badge */}
        {(account.ar || account.rank) && (
          <div style={{
            position: 'absolute',
            top: '10px',
            right: '10px',
            background: 'rgba(13, 13, 20, 0.8)',
            padding: '5px 12px',
            borderRadius: '20px',
            border: '1px solid var(--genshin-gold)',
            fontWeight: 'bold',
            color: 'var(--genshin-gold)',
            backdropFilter: 'blur(4px)'
          }}>
            {account.game === 'genshin' ? `AR ${account.ar}` : `${account.rank}`}
          </div>
        )}
        
        {/* Server Badge */}
        <div style={{
          position: 'absolute',
          top: '10px',
          left: '10px',
          background: 'rgba(6, 182, 212, 0.8)',
          padding: '5px 12px',
          borderRadius: '20px',
          fontWeight: 'bold',
          color: 'white',
          fontSize: '0.8rem',
          backdropFilter: 'blur(4px)'
        }}>
          {account.server}
        </div>
      </div>

      <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1 }}>
        <h3 style={{ marginBottom: '10px', fontSize: '1.2rem', display: 'flex', justifyContent: 'space-between' }}>
          <span>{account.code}</span>
          <span className="text-gradient-gold">{account.price}đ</span>
        </h3>
        
        <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '15px', height: '40px', overflow: 'hidden' }}>
          {account.description}
        </p>

        {/* Highlighted items showcase */}
        <div style={{ marginBottom: '20px' }}>
          <div style={{ fontSize: '0.85rem', color: 'var(--genshin-gold)', marginBottom: '8px' }}>
            {account.game === 'genshin' ? 'Nhân vật 5★ nổi bật:' : (account.game === 'lienquan' ? 'Tướng/Trang phục VIP:' : 'Súng/Vật phẩm VIP:')}
          </div>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {account.characters.map((char, index) => (
              <div key={index} style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'linear-gradient(45deg, var(--genshin-blue), var(--genshin-purple))',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.7rem',
                fontWeight: 'bold',
                color: 'white',
                border: '2px solid rgba(255,255,255,0.2)',
                boxShadow: '0 0 10px rgba(139, 92, 246, 0.3)'
              }} title={char}>
                {char.substring(0, 2).toUpperCase()}
              </div>
            ))}
            {account.moreChars > 0 && (
              <div style={{
                width: '40px',
                height: '40px',
                borderRadius: '50%',
                background: 'var(--genshin-dark)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '0.8rem',
                color: 'var(--text-muted)',
                border: '1px solid var(--text-muted)'
              }}>
                +{account.moreChars}
              </div>
            )}
          </div>
        </div>

        <div style={{ marginTop: 'auto' }}>
          <button className="btn-primary" style={{ width: '100%' }}>
            Xem Chi Tiết
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccountCard;
