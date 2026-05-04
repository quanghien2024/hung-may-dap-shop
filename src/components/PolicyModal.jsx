import React from 'react';

const PolicyModal = ({ isOpen, onClose, type }) => {
  if (!isOpen) return null;

  const content = type === 'terms' ? (
    <>
      <h2 className="text-gradient-gold" style={{ marginBottom: '15px', fontSize: '1.8rem' }}>Điều Khoản Dịch Vụ</h2>
      <div style={{ color: 'var(--text-main)', lineHeight: 1.6, overflowY: 'auto', paddingRight: '10px', textAlign: 'justify', fontSize: '0.95rem' }} className="no-scrollbar">
        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>1. Chấp thuận điều khoản</h3>
        <p style={{ marginBottom: '12px' }}>Bằng việc truy cập và sử dụng dịch vụ tại Hưng Máy Dập, quý khách mặc định đồng ý với tất cả các quy định, chính sách được nêu tại đây.</p>
        
        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>2. Quy định về tài khoản</h3>
        <p style={{ marginBottom: '12px' }}>Mọi tài khoản game được rao bán trên hệ thống đều là tài sản số hợp lệ. Hưng Máy Dập cam kết tài khoản đúng như mô tả trên website.</p>
        
        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>3. Trách nhiệm người mua</h3>
        <p style={{ marginBottom: '12px' }}>Người mua có trách nhiệm bảo mật thông tin sau khi nhận bàn giao. Chúng tôi khuyến cáo đổi mật khẩu và liên kết email ngay lập tức.</p>
        
        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>4. Chính sách bảo hành</h3>
        <p style={{ marginBottom: '12px' }}>Bảo hành 1 đổi 1 hoặc hoàn tiền trong vòng 30 ngày nếu tài khoản bị khóa do lỗi từ phía người chủ cũ hoặc lỗi hệ thống trước khi bàn giao.</p>

        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>5. Hành vi bị nghiêm cấm</h3>
        <p style={{ marginBottom: '12px' }}>Nghiêm cấm lừa đảo, phá hoại hoặc vi phạm pháp luật. Mọi hành vi vu khống sẽ bị từ chối hỗ trợ vĩnh viễn.</p>
      </div>
    </>
  ) : (
    <>
      <h2 className="text-gradient-gold" style={{ marginBottom: '15px', fontSize: '1.8rem' }}>Chính Sách Bảo Mật</h2>
      <div style={{ color: 'var(--text-main)', lineHeight: 1.6, overflowY: 'auto', paddingRight: '10px', textAlign: 'justify', fontSize: '0.95rem' }} className="no-scrollbar">
        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>1. Thu thập thông tin</h3>
        <p style={{ marginBottom: '12px' }}>Hưng Máy Dập thu thập Email để xác nhận đơn hàng và gửi thông tin tài khoản. Chúng tôi cũng ghi nhận lịch sử giao dịch để hỗ trợ bảo hành.</p>
        
        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>2. Sử dụng thông tin</h3>
        <p style={{ marginBottom: '12px' }}>Thông tin được sử dụng nhằm mục đích giao dịch tài sản số và gửi thông báo về các chương trình khuyến mãi (nếu đồng ý).</p>
        
        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>3. Bảo mật dữ liệu</h3>
        <p style={{ marginBottom: '12px' }}>Chúng tôi áp dụng mã hóa SSL/TLS để bảo vệ dữ liệu. Thông tin thanh toán ngân hàng được xử lý qua cổng an toàn, không lưu trữ số thẻ.</p>
        
        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>4. Chia sẻ thông tin</h3>
        <p style={{ marginBottom: '12px' }}>Hưng Máy Dập cam kết tuyệt đối không bán hay chia sẻ thông tin cá nhân của khách hàng cho bất kỳ bên thứ ba nào.</p>

        <h3 style={{ color: 'var(--genshin-gold)', fontSize: '1.1rem', marginBottom: '8px' }}>5. Quyền người dùng</h3>
        <p style={{ marginBottom: '12px' }}>Quý khách có quyền yêu cầu xem lại, thay đổi hoặc xóa bỏ thông tin cá nhân bằng cách liên hệ với đội ngũ hỗ trợ.</p>
      </div>
    </>
  );

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
      
      <div className="glass-panel animate-slide-up no-scrollbar" style={{
        width: '700px',
        maxWidth: '100%',
        maxHeight: '90vh',
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

        {content}
        
      </div>
    </div>
  );
};

export default PolicyModal;
