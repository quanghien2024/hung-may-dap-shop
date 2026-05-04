import React, { useState } from 'react';
import AccountCard from './AccountCard';

const mockAccounts = [
  {
    id: 1,
    code: 'ACC-8921',
    price: '1,500,000',
    numericPrice: 1500000,
    ar: 58,
    server: 'Asia',
    description: 'Raiden C2 + Trấn, Yelan C1, Zhongli. Đội hình lôi quốc siêu mạnh. Tích lũy 10,000 Nguyên Thạch.',
    characters: ['Raiden', 'Yelan', 'Zhongli'],
    moreChars: 5,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Shougun.png'
  },
  {
    id: 2,
    code: 'ACC-4322',
    price: '850,000',
    numericPrice: 850000,
    ar: 55,
    server: 'America',
    description: 'Nahida C2, Nilou, Ayaka. Team thảo nhàn hạ la hoàn. Khám phá Sumeru 100%.',
    characters: ['Nahida', 'Nilou', 'Ayaka'],
    moreChars: 3,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Nahida.png'
  },
  {
    id: 3,
    code: 'ACC-9934',
    price: '2,200,000',
    numericPrice: 2200000,
    ar: 60,
    server: 'Asia',
    description: 'Neuvillette C1 + Trấn, Furina, Kazuha. Team meta top 1 sát thương. Cốt truyện mới nhất.',
    characters: ['Neuv', 'Furina', 'Kazuha'],
    moreChars: 8,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Neuvillette.png'
  },
  {
    id: 4,
    code: 'ACC-1120',
    price: '500,000',
    numericPrice: 500000,
    ar: 45,
    server: 'Europe',
    description: 'Hu Tao + Trượng Hộ Ma, Yelan. Siêu phẩm cho tân thủ, la hoàn dễ dàng.',
    characters: ['Hu Tao', 'Yelan'],
    moreChars: 1,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Hutao.png'
  },
  {
    id: 5,
    code: 'ACC-7741',
    price: '3,500,000',
    numericPrice: 3500000,
    ar: 60,
    server: 'Asia',
    description: 'Whale Account - 20+ nhân vật 5 sao, nhiều vũ khí trấn. Chơi được mọi đội hình trên đời.',
    characters: ['Ayaka', 'Shenhe', 'Ganyu', 'Kokomi'],
    moreChars: 16,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Ayaka.png'
  },
  {
    id: 6,
    code: 'ACC-5521',
    price: '350,000',
    numericPrice: 350000,
    ar: 35,
    server: 'Asia',
    description: 'Tài khoản reroll có Kazuha và trấn. Đã gom đủ phong thần đồng.',
    characters: ['Kazuha'],
    moreChars: 0,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Kazuha.png'
  },
  {
    id: 7,
    code: 'ACC-3310',
    price: '1,800,000',
    numericPrice: 1800000,
    ar: 57,
    server: 'Asia',
    description: 'Arlecchino C1 + Trấn hỏa, Xiao, Xianyun. Meta mới nhất của bản 4.6.',
    characters: ['Arlec', 'Xiao', 'Xianyun'],
    moreChars: 4,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Arlecchino.png'
  },
  {
    id: 8,
    code: 'ACC-6670',
    price: '420,000',
    numericPrice: 420000,
    ar: 40,
    server: 'Europe',
    description: 'Wriothesley + Navia. Server EU ping thấp. Thích hợp người dùng ở châu Âu.',
    characters: ['Wrio', 'Navia'],
    moreChars: 2,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Wriothesley.png'
  },
  {
    id: 9,
    code: 'ACC-2287',
    price: '980,000',
    numericPrice: 980000,
    ar: 52,
    server: 'America',
    description: 'Wanderer C2, Venti, Faruzan. Team gió siêu cơ động cực mạnh ở vực thẳm.',
    characters: ['Wanderer', 'Venti', 'Faruzan'],
    moreChars: 3,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Wanderer.png'
  },
  {
    id: 10,
    code: 'ACC-5588',
    price: '720,000',
    numericPrice: 720000,
    ar: 50,
    server: 'Asia',
    description: 'Yae Miko + Fischl, Beidou. Team lôi xuyên không gian, farm tài nguyên hiệu quả.',
    characters: ['Yae', 'Fischl', 'Beidou'],
    moreChars: 2,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Yae.png'
  },
  {
    id: 11,
    code: 'ACC-1199',
    price: '1,200,000',
    numericPrice: 1200000,
    ar: 56,
    server: 'Asia',
    description: 'Alhaitham + Kaveh, Nahida. Đội hình thảo vĩnh cửu full nội dung.',
    characters: ['Alhai', 'Kaveh', 'Nahida'],
    moreChars: 6,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Alhatham.png'
  },
  {
    id: 12,
    code: 'ACC-4410',
    price: '650,000',
    numericPrice: 650000,
    ar: 48,
    server: 'Europe',
    description: 'Lyney + Freminet. Đội hình hỏa lửa đặc sắc, nhiều skin rare độc quyền.',
    characters: ['Lyney', 'Freminet'],
    moreChars: 1,
    image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Keqing.png'
  }
];

const ShopList = ({ onSelectAccount }) => {
  const [filter, setFilter] = useState('All');
  const [visibleCount, setVisibleCount] = useState(6);
  const [loadingMore, setLoadingMore] = useState(false);

  // Tất cả 12 tài khoản đã có trong mockAccounts
  const extendedAccounts = mockAccounts;

  const filteredAccounts = filter === 'All' 
    ? extendedAccounts 
    : extendedAccounts.filter(acc => acc.server === filter);

  const displayedAccounts = filteredAccounts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 6);
      setLoadingMore(false);
    }, 800);
  };

  return (
    <section id="shop" style={{ padding: '80px 0', background: 'var(--genshin-darker)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }} className="animate-slide-up">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
            Kho <span className="text-gradient-gold">Tài Khoản</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Hàng trăm tài khoản xịn xò đang chờ đón bạn. Lọc theo server hoặc nhân vật yêu thích.
          </p>
        </div>

        {/* Filters */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '15px', marginBottom: '40px', flexWrap: 'wrap' }} className="animate-fade-in delay-100">
          {['All', 'Asia', 'America', 'Europe'].map(server => (
            <button 
              key={server}
              onClick={() => { setFilter(server); setVisibleCount(6); }}
              className={filter === server ? "btn-primary" : "btn-secondary"}
              style={{ padding: '8px 20px' }}
            >
              {server === 'All' ? 'Tất cả Server' : server}
            </button>
          ))}
        </div>

        {/* Grid Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '30px',
          justifyContent: 'center'
        }}>
          {displayedAccounts.map((account, index) => (
            <div key={account.id} className="animate-slide-up" style={{ display: 'flex', justifyContent: 'center' }}>
              <AccountCard account={account} onClick={() => onSelectAccount(account)} />
            </div>
          ))}
        </div>
        
        {/* Load More */}
        {visibleCount < filteredAccounts.length && (
          <div style={{ textAlign: 'center', marginTop: '50px' }}>
            <button className="btn-secondary" style={{ padding: '12px 40px' }} onClick={handleLoadMore}>
              {loadingMore ? 'Đang Tải...' : 'Xem Thêm Tài Khoản'}
            </button>
          </div>
        )}
      </div>
    </section>
  );
};

export default ShopList;
