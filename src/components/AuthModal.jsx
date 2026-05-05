import React, { useState } from 'react';
import { auth, db } from '../firebase';
import { createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';

const AuthModal = ({ isOpen, onClose, onLoginSuccess }) => {
  const [tab, setTab] = useState('login');
  const [formData, setFormData] = useState({ email: '', password: '', username: '' });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Clear form when modal is opened/closed
  React.useEffect(() => {
    if (!isOpen) {
      setFormData({ email: '', password: '', username: '' });
      setError('');
    }
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (tab === 'register' && formData.password.length < 6) {
      setError('Mật khẩu phải có ít nhất 6 ký tự!');
      setLoading(false);
      return;
    }

    try {
      if (tab === 'register') {
        const userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        
        await updateProfile(user, { displayName: formData.username });
        
        // Save additional user info to Firestore
        await setDoc(doc(db, "users", user.uid), {
          username: formData.username,
          email: formData.email,
          createdAt: new Date().toISOString(),
          cart: []
        });

        onLoginSuccess({
          uid: user.uid,
          email: user.email,
          username: formData.username
        });
        onClose();
      } else {
        const userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;
        onLoginSuccess({
          uid: user.uid,
          email: user.email,
          username: user.displayName
        });
        onClose();
      }
    } catch (err) {
      console.error(err);
      if (err.code === 'auth/email-already-in-use') {
        setError('Email này đã được sử dụng!');
      } else if (err.code === 'auth/wrong-password' || err.code === 'auth/user-not-found' || err.code === 'auth/invalid-credential') {
        setError('Email hoặc mật khẩu không chính xác!');
      } else if (err.code === 'auth/weak-password') {
        setError('Mật khẩu quá yếu! Vui lòng dùng ít nhất 6 ký tự.');
      } else if (err.code === 'auth/network-request-failed') {
        setError('Lỗi kết nối mạng. Vui lòng kiểm tra lại!');
      } else {
        setError('Đã có lỗi xảy ra. Vui lòng thử lại!');
      }
    } finally {
      setLoading(false);
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
              <input type="text" required autoComplete="off" value={formData.username} onChange={e => setFormData({...formData, username: e.target.value})} style={{
                width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)',
                borderRadius: '8px', color: 'white', outline: 'none'
              }} />
            </div>
          )}
          <div style={{ marginBottom: '15px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Email</label>
            <input type="email" required autoComplete="off" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} style={{
              width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)',
              borderRadius: '8px', color: 'white', outline: 'none'
            }} />
          </div>
          <div style={{ marginBottom: '25px' }}>
            <label style={{ display: 'block', marginBottom: '5px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Mật khẩu</label>
            <input type="password" required autoComplete="new-password" value={formData.password} onChange={e => setFormData({...formData, password: e.target.value})} style={{
              width: '100%', padding: '12px', background: 'rgba(0,0,0,0.3)', border: '1px solid var(--glass-border)',
              borderRadius: '8px', color: 'white', outline: 'none'
            }} />
          </div>

          <button type="submit" className="btn-primary" style={{ width: '100%', opacity: loading ? 0.7 : 1 }} disabled={loading}>
            {loading ? 'Đang xử lý...' : (tab === 'login' ? 'Đăng Nhập' : 'Tạo Tài Khoản')}
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthModal;
