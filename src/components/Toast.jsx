import React, { useState, useCallback } from 'react';

// Hook to use toast
export const useToast = () => {
  const [toasts, setToasts] = useState([]);

  const showToast = useCallback((message, type = 'success') => {
    const id = Date.now();
    setToasts(prev => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id));
    }, 3000);
  }, []);

  return { toasts, showToast };
};

// Toast Container component
const ToastContainer = ({ toasts }) => {
  return (
    <div style={{
      position: 'fixed',
      bottom: '30px',
      right: '30px',
      zIndex: 9999,
      display: 'flex',
      flexDirection: 'column',
      gap: '10px'
    }}>
      {toasts.map(toast => (
        <div key={toast.id} style={{
          padding: '14px 20px',
          borderRadius: '12px',
          background: toast.type === 'error' ? 'rgba(239, 68, 68, 0.15)' : 'rgba(26, 26, 36, 0.95)',
          border: `1px solid ${toast.type === 'error' ? '#ef4444' : 'var(--genshin-gold)'}`,
          color: 'white',
          backdropFilter: 'blur(10px)',
          boxShadow: `0 8px 30px rgba(0,0,0,0.4)`,
          fontSize: '0.95rem',
          fontWeight: 500,
          minWidth: '250px',
          animation: 'slideInToast 0.3s ease-out',
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <span style={{ fontSize: '1.2rem' }}>
            {toast.type === 'error' ? '❌' : '✅'}
          </span>
          {toast.message}
        </div>
      ))}
      <style>{`
        @keyframes slideInToast {
          from { opacity: 0; transform: translateX(50px); }
          to { opacity: 1; transform: translateX(0); }
        }
      `}</style>
    </div>
  );
};

export default ToastContainer;
