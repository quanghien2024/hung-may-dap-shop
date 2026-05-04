import React, { useState } from 'react';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    const users = JSON.parse(localStorage.getItem('users') || '[]');

    if (tab === 'register') {
      if (users.find(u => u.email === formData.email)) {
        setError('Email đã được đăng ký!');
        return;
      }
      const newUser = { ...formData, id: Date.now() };
      users.push(newUser);
      localStorage.setItem('users', JSON.stringify(users));
      onLoginSuccess(newUser);
      onClose();
    } else {
      const user = users.find(u => u.email === formData.email && u.password === formData.password);
      if (user) {
        onLoginSuccess(user);
        onClose();
      } else {
        setError('Email hoặc mật khẩu không chính xác!');
      }
    }
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0, 0, 0, 0.7)', backdropFilter: 'blur(8px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2000
    }} onClick={onClose}>
      
      <div className="glass-panel animate-slide-up" style={{
        width: '400px', padding: '40px', position: 'relative'
      }} onClick={e => e.stopPropagation()}>
        
        <button onClick={onClose} style={{
          position: 'absolute', top: '15px', right: '15px', background: 'transparent',
          border: 'none', color: 'var(--text-muted)', fontSize: '1.5rem', cursor: 'pointer'
        }}>×</button>

        <div style={{ display: 'flex', marginBottom: '30px', borderBottom: '1px solid var(--glass-border)' }}>
          <button onClick={() => setTab('login')} style={{
            flex: 1, padding: '10px', background: 'none', border: 'none',
            color: tab === 'login' ? 'var(--genshin-gold)' : 'var(--text-muted)',
            borderBottom: tab === 'login' ? '2px solid var(--genshin-gold)' : 'none',
            cursor: 'pointer', fontWeight: 600
          }}>Đăng Nhập</button>
          <button onClick={() => setTab('register')} style={{
            flex: 1, padding: '10px', background: 'none', border: 'none',
            color: tab === 'register' ? 'var(--genshin-gold)' : 'var(--text-muted)',
            borderBottom: tab === 'register' ? '2px solid var(--genshin-gold)' : 'none',
            cursor: 'pointer', fontWeight: 600
          }}>Đăng Ký</button>
        </div>

        {error && <p style={{ color: '#ef4444', fontSize: '0.85rem', marginBottom: '15px', textAlign: 'center' }}>{error}</p>}

        <form onSubmit={handleSubmit}>
          {tab === 'register' && (
            <div style={{ marginBottom: '15px' }}>
              <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Tên hiển thị</label>
              <input type="text" required value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} style={{
                width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)',
                borderRadius: '8px', color: 'white', outline: 'none'
              }} />
            </div>
          )}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email</label>
            <input type="email" required value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{
              width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)',
              borderRadius: '8px', color: 'white', outline: 'none'
            }} />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mật khẩu</label>
            <input type="password" required value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={{
              width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)',
              borderRadius: '8px', color: 'white', outline: 'none'
            }} />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%' }}>
            {tab === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
