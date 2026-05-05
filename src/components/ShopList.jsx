import React, { useState, useMemo } from 'react';
import AccountCard from './AccountCard';

const mockAccounts = [
  // --- GENSHIN IMPACT ---
  { id: 1, code: 'ACC-8921', game: 'genshin', price: '1,500,000', numericPrice: 1500000, ar: 58, server: 'Asia', description: 'Raiden C2 + Trấn, Yelan C1, Zhongli. Đội hình lôi quốc siêu mạnh. Tích lũy 10,000 Nguyên Thạch.', characters: ['Raiden', 'Yelan', 'Zhongli'], moreChars: 5, image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Shougun.png' },
  { id: 2, code: 'ACC-4322', game: 'genshin', price: '850,000', numericPrice: 850000, ar: 55, server: 'America', description: 'Nahida C2, Nilou, Ayaka. Team thảo nhàn hạ la hoàn. Khám phá Sumeru 100%.', characters: ['Nahida', 'Nilou', 'Ayaka'], moreChars: 3, image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Nahida.png' },
  { id: 3, code: 'ACC-9934', game: 'genshin', price: '2,200,000', numericPrice: 2200000, ar: 60, server: 'Asia', description: 'Neuvillette C1 + Trấn, Furina, Kazuha. Team meta top 1 sát thương. Cốt truyện mới nhất.', characters: ['Neuv', 'Furina', 'Kazuha'], moreChars: 8, image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Neuvillette.png' },
  { id: 4, code: 'ACC-1120', game: 'genshin', price: '500,000', numericPrice: 500000, ar: 45, server: 'Europe', description: 'Hu Tao + Trượng Hộ Ma, Yelan. Siêu phẩm cho tân thủ, la hoàn dễ dàng.', characters: ['Hu Tao', 'Yelan'], moreChars: 1, image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Hutao.png' },
  { id: 5, code: 'ACC-7741', game: 'genshin', price: '3,500,000', numericPrice: 3500000, ar: 60, server: 'Asia', description: 'Whale Account - 20+ nhân vật 5 sao, nhiều vũ khí trấn. Chơi được mọi đội hình trên đời.', characters: ['Ayaka', 'Shenhe', 'Ganyu', 'Kokomi'], moreChars: 16, image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Ayaka.png' },
  { id: 6, code: 'ACC-5521', game: 'genshin', price: '350,000', numericPrice: 350000, ar: 35, server: 'Asia', description: 'Tài khoản reroll có Kazuha và trấn. Đã gom đủ phong thần đồng.', characters: ['Kazuha'], moreChars: 0, image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Kazuha.png' },
  { id: 7, code: 'ACC-3310', game: 'genshin', price: '1,800,000', numericPrice: 1800000, ar: 57, server: 'Asia', description: 'Arlecchino C1 + Trấn hỏa, Xiao, Xianyun. Meta mới nhất của bản 4.6.', characters: ['Arlec', 'Xiao', 'Xianyun'], moreChars: 4, image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Arlecchino.png' },
  { id: 8, code: 'ACC-6670', game: 'genshin', price: '420,000', numericPrice: 420000, ar: 40, server: 'Europe', description: 'Wriothesley + Navia. Server EU ping thấp. Thích hợp người dùng ở châu Âu.', characters: ['Wrio', 'Navia'], moreChars: 2, image: 'https://enka.network/ui/UI_Gacha_AvatarImg_Wriothesley.png' },
  
  // --- LIÊN QUÂN MOBILE ---
  { id: 101, code: 'LQ-1029', game: 'lienquan', price: '850,000', numericPrice: 850000, rank: 'Cao Thủ', server: 'Việt Nam', description: 'Acc full tướng, 120 trang phục. Có skin SS tuyệt sắc.', characters: ['Tulen', 'Nakroth', 'Flo'], moreChars: 15, image: 'https://cdn.tgdd.vn/2020/08/content/lien-quan-mobile-la-gi-co-gi-dac-biet-thu-hut-nguoi-choi-den-vay-1-800x450-1.jpg' },
  { id: 102, code: 'LQ-8832', game: 'lienquan', price: '2,500,000', numericPrice: 2500000, rank: 'Thách Đấu', server: 'Việt Nam', description: 'Acc Thách Đấu, skin SSS Violet Huyết Ma Thần. Kèm nhiều hiệu ứng hiếm.', characters: ['Violet', 'Raz', 'Murad'], moreChars: 30, image: 'https://cdn.tgdd.vn/2020/06/content/Hinh-nen-Lien-Quan-Mobile-100-tuong-dep-nhat-Full-HD-cho-dien-thoai-May-tinh-7-800x450-2.jpg' },
  { id: 103, code: 'LQ-4421', game: 'lienquan', price: '300,000', numericPrice: 300000, rank: 'Kim Cương', server: 'Việt Nam', description: 'Acc cày smurf, winrate 80%. Đủ ngọc 90 chuẩn.', characters: ['Zuka', 'Ngộ Không'], moreChars: 5, image: 'https://cdn.tgdd.vn/2020/06/content/Hinh-nen-Lien-Quan-Mobile-100-tuong-dep-nhat-Full-HD-cho-dien-thoai-May-tinh-22-800x450-1.jpg' },
  { id: 104, code: 'LQ-9911', game: 'lienquan', price: '1,200,000', numericPrice: 1200000, rank: 'Chiến Tướng', server: 'Việt Nam', description: 'Acc Vip, nhiều trang phục giới hạn sự kiện, collab.', characters: ['Airi', 'Valhein', 'Krixi'], moreChars: 20, image: 'https://cdn.tgdd.vn/2020/06/content/Hinh-nen-Lien-Quan-Mobile-100-tuong-dep-nhat-Full-HD-cho-dien-thoai-May-tinh-15-800x450-1.jpg' },

  // --- FREE FIRE ---
  { id: 201, code: 'FF-5511', game: 'freefire', price: '350,000', numericPrice: 350000, rank: 'Huyền Thoại', server: 'Việt Nam', description: 'Acc có AK Rồng Xanh lv max, súng xịn cực chất.', characters: ['Alok', 'Chrono'], moreChars: 2, image: 'https://cdn.tgdd.vn/2021/04/content/5-800x450-1.jpg' },
  { id: 202, code: 'FF-9944', game: 'freefire', price: '1,500,000', numericPrice: 1500000, rank: 'Thách Đấu', server: 'Việt Nam', description: 'Acc Vip, full skin súng tiến hóa, MP40 Mãng Xà. Đồ hiếm.', characters: ['Kelly', 'Hayato', 'Wukong'], moreChars: 8, image: 'https://cdn.tgdd.vn/2021/04/content/4-800x450-1.jpg' },
  { id: 203, code: 'FF-2211', game: 'freefire', price: '150,000', numericPrice: 150000, rank: 'Kim Cương', server: 'Việt Nam', description: 'Acc giá học sinh, có thẻ vô cực mùa cũ.', characters: ['K'], moreChars: 1, image: 'https://cdn.tgdd.vn/2021/04/content/6-800x450-1.jpg' },
  { id: 204, code: 'FF-7733', game: 'freefire', price: '800,000', numericPrice: 800000, rank: 'Huyền Thoại', server: 'Việt Nam', description: 'Acc nhiều set đồ collab xịn, hành động cực ngầu.', characters: ['Skyler', 'Moco'], moreChars: 4, image: 'https://cdn.tgdd.vn/2021/04/content/8-800x450-1.jpg' }
];

const ShopList = ({ onSelectAccount }) => {
  const [filterGame, setFilterGame] = useState('all');
  const [filterServer, setFilterServer] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  
  const [visibleCount, setVisibleCount] = useState(8);
  const [loadingMore, setLoadingMore] = useState(false);

  // Logic Lọc & Sắp xếp
  const processedAccounts = useMemo(() => {
    let result = mockAccounts;

    // 1. Lọc theo Game
    if (filterGame !== 'all') {
      result = result.filter(acc => acc.game === filterGame);
    }

    // 2. Lọc theo Server
    if (filterServer !== 'all') {
      result = result.filter(acc => acc.server === filterServer);
    }

    // 3. Lọc theo Giá
    if (filterPrice !== 'all') {
      if (filterPrice === 'under500') result = result.filter(acc => acc.numericPrice < 500000);
      else if (filterPrice === '500-1m') result = result.filter(acc => acc.numericPrice >= 500000 && acc.numericPrice <= 1000000);
      else if (filterPrice === '1m-2m') result = result.filter(acc => acc.numericPrice > 1000000 && acc.numericPrice <= 2000000);
      else if (filterPrice === 'over2m') result = result.filter(acc => acc.numericPrice > 2000000);
    }

    // 4. Sắp xếp
    if (sortOrder === 'price_asc') {
      result = [...result].sort((a, b) => a.numericPrice - b.numericPrice);
    } else if (sortOrder === 'price_desc') {
      result = [...result].sort((a, b) => b.numericPrice - a.numericPrice);
    }

    return result;
  }, [filterGame, filterServer, filterPrice, sortOrder]);

  const displayedAccounts = processedAccounts.slice(0, visibleCount);

  const handleLoadMore = () => {
    setLoadingMore(true);
    setTimeout(() => {
      setVisibleCount(prev => prev + 8);
      setLoadingMore(false);
    }, 800);
  };

  // Reset pagination khi đổi filter
  const handleFilterChange = (setter, value) => {
    setter(value);
    setVisibleCount(8);
  };

  return (
    <section id="shop" style={{ padding: '80px 0', background: 'var(--genshin-darker)' }}>
      <div className="container">
        <div style={{ textAlign: 'center', marginBottom: '50px' }} className="animate-slide-up">
          <h2 style={{ fontSize: '2.5rem', marginBottom: '15px' }}>
            Kho <span className="text-gradient-gold">Tài Khoản</span>
          </h2>
          <p style={{ color: 'var(--text-muted)', maxWidth: '600px', margin: '0 auto' }}>
            Đa dạng các thể loại game với mức giá tốt nhất. Lọc và tìm ngay tài khoản chân ái của bạn.
          </p>
        </div>

        {/* Thanh Công Cụ - Toolbar */}
        <div className="filter-toolbar glass-panel animate-fade-in delay-100" style={{ 
          padding: '20px', 
          marginBottom: '40px', 
          display: 'flex', 
          flexWrap: 'wrap', 
          gap: '20px',
          justifyContent: 'space-between',
          alignItems: 'center'
        }}>
          
          <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', flex: 1 }}>
            {/* Filter Game */}
            <select 
              className="glass-select"
              value={filterGame} 
              onChange={(e) => handleFilterChange(setFilterGame, e.target.value)}
            >
              <option value="all">🎮 Tất cả Game</option>
              <option value="genshin">Genshin Impact</option>
              <option value="lienquan">Liên Quân Mobile</option>
              <option value="freefire">Free Fire</option>
            </select>

            {/* Filter Price */}
            <select 
              className="glass-select"
              value={filterPrice} 
              onChange={(e) => handleFilterChange(setFilterPrice, e.target.value)}
            >
              <option value="all">💰 Mọi mức giá</option>
              <option value="under500">Dưới 500k</option>
              <option value="500-1m">500k - 1 Triệu</option>
              <option value="1m-2m">1 Triệu - 2 Triệu</option>
              <option value="over2m">Trên 2 Triệu</option>
            </select>

            {/* Filter Server */}
            <select 
              className="glass-select"
              value={filterServer} 
              onChange={(e) => handleFilterChange(setFilterServer, e.target.value)}
            >
              <option value="all">🌐 Tất cả Server</option>
              {filterGame === 'genshin' || filterGame === 'all' ? (
                <>
                  <option value="Asia">Asia</option>
                  <option value="America">America</option>
                  <option value="Europe">Europe</option>
                </>
              ) : null}
              {filterGame === 'lienquan' || filterGame === 'freefire' ? (
                <option value="Việt Nam">Việt Nam</option>
              ) : null}
            </select>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ color: 'var(--text-muted)' }}>Sắp xếp:</span>
            <select 
              className="glass-select"
              value={sortOrder} 
              onChange={(e) => handleFilterChange(setSortOrder, e.target.value)}
            >
              <option value="default">Mặc định</option>
              <option value="price_asc">Giá: Thấp đến Cao</option>
              <option value="price_desc">Giá: Cao đến Thấp</option>
            </select>
          </div>

        </div>

        {/* Kết quả tìm kiếm */}
        <div style={{ marginBottom: '20px', color: 'var(--text-muted)' }}>
          Tìm thấy <strong className="text-gradient-gold">{processedAccounts.length}</strong> tài khoản phù hợp
        </div>

        {/* Grid Layout */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', 
          gap: '30px',
          justifyContent: 'center'
        }}>
          {displayedAccounts.map((account) => (
            <div key={account.id} className="animate-slide-up" style={{ display: 'flex', justifyContent: 'center' }}>
              <AccountCard account={account} onClick={() => onSelectAccount(account)} />
            </div>
          ))}
        </div>
        
        {/* Load More */}
        {visibleCount < processedAccounts.length && (
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

