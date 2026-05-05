import React, { useState, useMemo } from 'react';
import AccountCard from './AccountCard';

const mockAccounts = [
  { id: 1, code: "GS-0001", game: "genshin", price: "3.700.000", numericPrice: 3700000, ar: 57, server: "Asia", description: "Acc lao top meta, full nhân vật 5 sao mới nhất", characters: ["Raiden","Yelan","Zhongli"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Albedo.png" },
  { id: 2, code: "GS-0002", game: "genshin", price: "1.000.000", numericPrice: 1000000, ar: 57, server: "Asia", description: "Đội hình thảo nhàn đỉnh nhất server", characters: ["Nahida","Nilou","Ayaka"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Arlecchino.png" },
  { id: 3, code: "GS-0003", game: "genshin", price: "3.400.000", numericPrice: 3400000, ar: 50, server: "Asia", description: "Neuvillette C1 + Trấn - damage khủng nhất game", characters: ["Furina","Neuv","Kazuha"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ayato.png" },
  { id: 4, code: "GS-0004", game: "genshin", price: "4.400.000", numericPrice: 4400000, ar: 45, server: "America", description: "Hu Tao + Hồ Ly combo cực ngầu", characters: ["Hutao","Yelan","ZH"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Arlecchino.png" },
  { id: 5, code: "GS-0005", game: "genshin", price: "2.800.000", numericPrice: 2800000, ar: 52, server: "America", description: "Ayaka freeze team - la hoàn mượt mà", characters: ["Ayaka","Shenhe","Kokomi"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ayaka.png" },
  { id: 6, code: "GS-0006", game: "genshin", price: "2.700.000", numericPrice: 2700000, ar: 38, server: "Europe", description: "Eula lôi team - siêu sát thương burst", characters: ["Eula","Raiden","Fischl"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ayato.png" },
  { id: 7, code: "GS-0007", game: "genshin", price: "1.000.000", numericPrice: 1000000, ar: 36, server: "Asia", description: "Ganyu bloom đội hình phổ thông dễ chơi", characters: ["Ganyu","Zhongli","Venti"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Barbara.png" },
  { id: 8, code: "GS-0008", game: "genshin", price: "500.000", numericPrice: 500000, ar: 46, server: "Asia", description: "Arlecchino meta 4.6 kèm full constellation", characters: ["Arlec","Xiao","Xianyun"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Beidou.png" },
  { id: 9, code: "GS-0009", game: "genshin", price: "2.200.000", numericPrice: 2200000, ar: 48, server: "Asia", description: "Đội hình 5 sao all-round đa năng", characters: ["Navia","Furina","Clorinde"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Bennett.png" },
  { id: 10, code: "GS-0010", game: "genshin", price: "400.000", numericPrice: 400000, ar: 57, server: "America", description: "Wriothesley + Navia - acc chơi được mọi thứ", characters: ["Wrio","Navia","Furina"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Candace.png" },
  { id: 11, code: "GS-0011", game: "genshin", price: "2.600.000", numericPrice: 2600000, ar: 35, server: "America", description: "Acc lao top meta, full nhân vật 5 sao mới nhất", characters: ["Raiden","Yelan","Zhongli"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Charlotte.png" },
  { id: 12, code: "GS-0012", game: "genshin", price: "3.000.000", numericPrice: 3000000, ar: 53, server: "Europe", description: "Đội hình thảo nhàn đỉnh nhất server", characters: ["Nahida","Nilou","Ayaka"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Chevreuse.png" },
  { id: 13, code: "GS-0013", game: "genshin", price: "1.800.000", numericPrice: 1800000, ar: 40, server: "Asia", description: "Neuvillette C1 + Trấn - damage khủng nhất game", characters: ["Furina","Neuv","Kazuha"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Chiori.png" },
  { id: 14, code: "GS-0014", game: "genshin", price: "1.600.000", numericPrice: 1600000, ar: 44, server: "Asia", description: "Hu Tao + Hồ Ly combo cực ngầu", characters: ["Hutao","Yelan","ZH"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Chongyun.png" },
  { id: 15, code: "GS-0015", game: "genshin", price: "1.800.000", numericPrice: 1800000, ar: 39, server: "Asia", description: "Ayaka freeze team - la hoàn mượt mà", characters: ["Ayaka","Shenhe","Kokomi"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Clorinde.png" },
  { id: 16, code: "GS-0016", game: "genshin", price: "1.100.000", numericPrice: 1100000, ar: 57, server: "America", description: "Eula lôi team - siêu sát thương burst", characters: ["Eula","Raiden","Fischl"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Eula.png" },
  { id: 17, code: "GS-0017", game: "genshin", price: "1.300.000", numericPrice: 1300000, ar: 37, server: "America", description: "Ganyu bloom đội hình phổ thông dễ chơi", characters: ["Ganyu","Zhongli","Venti"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Cyno.png" },
  { id: 18, code: "GS-0018", game: "genshin", price: "4.200.000", numericPrice: 4200000, ar: 56, server: "Europe", description: "Arlecchino meta 4.6 kèm full constellation", characters: ["Arlec","Xiao","Xianyun"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Dehya.png" },
  { id: 19, code: "GS-0019", game: "genshin", price: "3.600.000", numericPrice: 3600000, ar: 45, server: "Asia", description: "Đội hình 5 sao all-round đa năng", characters: ["Navia","Furina","Clorinde"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Diluc.png" },
  { id: 20, code: "GS-0020", game: "genshin", price: "1.700.000", numericPrice: 1700000, ar: 56, server: "Asia", description: "Wriothesley + Navia - acc chơi được mọi thứ", characters: ["Wrio","Navia","Furina"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Diona.png" },
  { id: 21, code: "GS-0021", game: "genshin", price: "1.100.000", numericPrice: 1100000, ar: 50, server: "Asia", description: "Acc lao top meta, full nhân vật 5 sao mới nhất", characters: ["Raiden","Yelan","Zhongli"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Dori.png" },
  { id: 22, code: "GS-0022", game: "genshin", price: "2.200.000", numericPrice: 2200000, ar: 35, server: "America", description: "Đội hình thảo nhàn đỉnh nhất server", characters: ["Nahida","Nilou","Ayaka"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Eula.png" },
  { id: 23, code: "GS-0023", game: "genshin", price: "2.200.000", numericPrice: 2200000, ar: 51, server: "America", description: "Neuvillette C1 + Trấn - damage khủng nhất game", characters: ["Furina","Neuv","Kazuha"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Faruzan.png" },
  { id: 24, code: "GS-0024", game: "genshin", price: "3.900.000", numericPrice: 3900000, ar: 41, server: "Europe", description: "Hu Tao + Hồ Ly combo cực ngầu", characters: ["Hutao","Yelan","ZH"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Fischl.png" },
  { id: 25, code: "GS-0025", game: "genshin", price: "3.000.000", numericPrice: 3000000, ar: 47, server: "Asia", description: "Ayaka freeze team - la hoàn mượt mà", characters: ["Ayaka","Shenhe","Kokomi"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Freminet.png" },
  { id: 26, code: "GS-0026", game: "genshin", price: "900.000", numericPrice: 900000, ar: 58, server: "Asia", description: "Eula lôi team - siêu sát thương burst", characters: ["Eula","Raiden","Fischl"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Furina.png" },
  { id: 27, code: "GS-0027", game: "genshin", price: "2.200.000", numericPrice: 2200000, ar: 51, server: "Asia", description: "Ganyu bloom đội hình phổ thông dễ chơi", characters: ["Ganyu","Zhongli","Venti"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ganyu.png" },
  { id: 28, code: "GS-0028", game: "genshin", price: "1.600.000", numericPrice: 1600000, ar: 36, server: "America", description: "Arlecchino meta 4.6 kèm full constellation", characters: ["Arlec","Xiao","Xianyun"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Gorou.png" },
  { id: 29, code: "GS-0029", game: "genshin", price: "4.500.000", numericPrice: 4500000, ar: 56, server: "America", description: "Đội hình 5 sao all-round đa năng", characters: ["Navia","Furina","Clorinde"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Albedo.png" },
  { id: 30, code: "GS-0030", game: "genshin", price: "2.400.000", numericPrice: 2400000, ar: 52, server: "Europe", description: "Wriothesley + Navia - acc chơi được mọi thứ", characters: ["Wrio","Navia","Furina"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Hutao.png" },
  { id: 31, code: "GS-0031", game: "genshin", price: "1.400.000", numericPrice: 1400000, ar: 58, server: "Asia", description: "Acc lao top meta, full nhân vật 5 sao mới nhất", characters: ["Raiden","Yelan","Zhongli"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Barbara.png" },
  { id: 32, code: "GS-0032", game: "genshin", price: "1.300.000", numericPrice: 1300000, ar: 48, server: "Asia", description: "Đội hình thảo nhàn đỉnh nhất server", characters: ["Nahida","Nilou","Ayaka"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Kazuha.png" },
  { id: 33, code: "GS-0033", game: "genshin", price: "300.000", numericPrice: 300000, ar: 60, server: "Asia", description: "Neuvillette C1 + Trấn - damage khủng nhất game", characters: ["Furina","Neuv","Kazuha"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Keqing.png" },
  { id: 34, code: "GS-0034", game: "genshin", price: "2.000.000", numericPrice: 2000000, ar: 58, server: "America", description: "Hu Tao + Hồ Ly combo cực ngầu", characters: ["Hutao","Yelan","ZH"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Beidou.png" },
  { id: 35, code: "GS-0035", game: "genshin", price: "3.400.000", numericPrice: 3400000, ar: 59, server: "America", description: "Ayaka freeze team - la hoàn mượt mà", characters: ["Ayaka","Shenhe","Kokomi"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Klee.png" },
  { id: 36, code: "GS-0036", game: "genshin", price: "2.800.000", numericPrice: 2800000, ar: 59, server: "Europe", description: "Eula lôi team - siêu sát thương burst", characters: ["Eula","Raiden","Fischl"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Kokomi.png" },
  { id: 37, code: "GS-0037", game: "genshin", price: "4.200.000", numericPrice: 4200000, ar: 37, server: "Asia", description: "Ganyu bloom đội hình phổ thông dễ chơi", characters: ["Ganyu","Zhongli","Venti"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Layla.png" },
  { id: 38, code: "GS-0038", game: "genshin", price: "3.200.000", numericPrice: 3200000, ar: 40, server: "Asia", description: "Arlecchino meta 4.6 kèm full constellation", characters: ["Arlec","Xiao","Xianyun"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Bennett.png" },
  { id: 39, code: "GS-0039", game: "genshin", price: "1.500.000", numericPrice: 1500000, ar: 45, server: "Asia", description: "Đội hình 5 sao all-round đa năng", characters: ["Navia","Furina","Clorinde"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Candace.png" },
  { id: 40, code: "GS-0040", game: "genshin", price: "1.600.000", numericPrice: 1600000, ar: 43, server: "America", description: "Wriothesley + Navia - acc chơi được mọi thứ", characters: ["Wrio","Navia","Furina"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Mika.png" },
  { id: 41, code: "GS-0041", game: "genshin", price: "3.500.000", numericPrice: 3500000, ar: 60, server: "America", description: "Acc lao top meta, full nhân vật 5 sao mới nhất", characters: ["Raiden","Yelan","Zhongli"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Mona.png" },
  { id: 42, code: "GS-0042", game: "genshin", price: "900.000", numericPrice: 900000, ar: 42, server: "Europe", description: "Đội hình thảo nhàn đỉnh nhất server", characters: ["Nahida","Nilou","Ayaka"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Nahida.png" },
  { id: 43, code: "GS-0043", game: "genshin", price: "1.800.000", numericPrice: 1800000, ar: 39, server: "Asia", description: "Neuvillette C1 + Trấn - damage khủng nhất game", characters: ["Furina","Neuv","Kazuha"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Navia.png" },
  { id: 44, code: "GS-0044", game: "genshin", price: "800.000", numericPrice: 800000, ar: 41, server: "Asia", description: "Hu Tao + Hồ Ly combo cực ngầu", characters: ["Hutao","Yelan","ZH"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Neuvillette.png" },
  { id: 45, code: "GS-0045", game: "genshin", price: "2.500.000", numericPrice: 2500000, ar: 46, server: "Asia", description: "Ayaka freeze team - la hoàn mượt mà", characters: ["Ayaka","Shenhe","Kokomi"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Nilou.png" },
  { id: 46, code: "GS-0046", game: "genshin", price: "4.300.000", numericPrice: 4300000, ar: 53, server: "America", description: "Eula lôi team - siêu sát thương burst", characters: ["Eula","Raiden","Fischl"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ningguang.png" },
  { id: 47, code: "GS-0047", game: "genshin", price: "1.200.000", numericPrice: 1200000, ar: 60, server: "America", description: "Ganyu bloom đội hình phổ thông dễ chơi", characters: ["Ganyu","Zhongli","Venti"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ayaka.png" },
  { id: 48, code: "GS-0048", game: "genshin", price: "1.400.000", numericPrice: 1400000, ar: 43, server: "Europe", description: "Arlecchino meta 4.6 kèm full constellation", characters: ["Arlec","Xiao","Xianyun"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Qiqi.png" },
  { id: 49, code: "GS-0049", game: "genshin", price: "3.700.000", numericPrice: 3700000, ar: 38, server: "Asia", description: "Đội hình 5 sao all-round đa năng", characters: ["Navia","Furina","Clorinde"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Razor.png" },
  { id: 50, code: "GS-0050", game: "genshin", price: "2.900.000", numericPrice: 2900000, ar: 52, server: "Asia", description: "Wriothesley + Navia - acc chơi được mọi thứ", characters: ["Wrio","Navia","Furina"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Shougun.png" },
  { id: 101, code: "LQ-0001", game: "lienquan", price: "2.000.000", numericPrice: 2000000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc full tướng, 120 trang phục hiếm", characters: ["Tulen","Nakroth","Flo"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Rosaria.png" },
  { id: 102, code: "LQ-0002", game: "lienquan", price: "2.000.000", numericPrice: 2000000, rank: "Bach Kim", server: "Viet Nam", description: "Thách Đấu với skin SSS Violet đỉnh cao", characters: ["Violet","Raz","Murad"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Sayu.png" },
  { id: 103, code: "LQ-0003", game: "lienquan", price: "1.200.000", numericPrice: 1200000, rank: "Cao Thu", server: "Viet Nam", description: "Acc smurf cày rank, winrate 80%", characters: ["Zuka","Ngo Khong"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Shenhe.png" },
  { id: 104, code: "LQ-0004", game: "lienquan", price: "2.600.000", numericPrice: 2600000, rank: "Chien Tuong", server: "Viet Nam", description: "Nhiều skin giới hạn sự kiện collab", characters: ["Airi","Valhein","Krixi"], moreChars: 12, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Sigewinne.png" },
  { id: 105, code: "LQ-0005", game: "lienquan", price: "2.700.000", numericPrice: 2700000, rank: "Thach Dau", server: "Viet Nam", description: "Acc cân team, nhiều tướng đường giữa", characters: ["Yena","Lorion","Omen"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Sucrose.png" },
  { id: 106, code: "LQ-0006", game: "lienquan", price: "2.900.000", numericPrice: 2900000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc carry, main Ryoma đi rừng cực ngầu", characters: ["Ryoma","Grakk","Jinnar"], moreChars: 8, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Tartaglia.png" },
  { id: 107, code: "LQ-0007", game: "lienquan", price: "2.000.000", numericPrice: 2000000, rank: "Kim Cuong", server: "Viet Nam", description: "Full ngọc 90, đồ giới hạn đầy kho", characters: ["Elandorr","Florentino"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Albedo.png" },
  { id: 108, code: "LQ-0008", game: "lienquan", price: "1.400.000", numericPrice: 1400000, rank: "Bach Kim", server: "Viet Nam", description: "Acc đua top, từng đạt hạng Thần", characters: ["Capheny","Zata","Dirak"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Tighnari.png" },
  { id: 109, code: "LQ-0009", game: "lienquan", price: "1.700.000", numericPrice: 1700000, rank: "Cao Thu", server: "Viet Nam", description: "Nhiều skin mùa giải, rank ổn định", characters: ["Veres","Vex","Tel"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Venti.png" },
  { id: 110, code: "LQ-0010", game: "lienquan", price: "2.900.000", numericPrice: 2900000, rank: "Chien Tuong", server: "Viet Nam", description: "Acc full hiệu ứng hành động đặc biệt", characters: ["Lauriel","Aleister","Ignis"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Wanderer.png" },
  { id: 111, code: "LQ-0011", game: "lienquan", price: "2.400.000", numericPrice: 2400000, rank: "Thach Dau", server: "Viet Nam", description: "Acc full tướng, 120 trang phục hiếm", characters: ["Tulen","Nakroth","Flo"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Wriothesley.png" },
  { id: 112, code: "LQ-0012", game: "lienquan", price: "1.200.000", numericPrice: 1200000, rank: "Huyen Thoai", server: "Viet Nam", description: "Thách Đấu với skin SSS Violet đỉnh cao", characters: ["Violet","Raz","Murad"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Xiangling.png" },
  { id: 113, code: "LQ-0013", game: "lienquan", price: "600.000", numericPrice: 600000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc smurf cày rank, winrate 80%", characters: ["Zuka","Ngo Khong"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Chiori.png" },
  { id: 114, code: "LQ-0014", game: "lienquan", price: "1.100.000", numericPrice: 1100000, rank: "Bach Kim", server: "Viet Nam", description: "Nhiều skin giới hạn sự kiện collab", characters: ["Airi","Valhein","Krixi"], moreChars: 10, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Xiao.png" },
  { id: 115, code: "LQ-0015", game: "lienquan", price: "3.000.000", numericPrice: 3000000, rank: "Cao Thu", server: "Viet Nam", description: "Acc cân team, nhiều tướng đường giữa", characters: ["Yena","Lorion","Omen"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Xingqiu.png" },
  { id: 116, code: "LQ-0016", game: "lienquan", price: "2.600.000", numericPrice: 2600000, rank: "Chien Tuong", server: "Viet Nam", description: "Acc carry, main Ryoma đi rừng cực ngầu", characters: ["Ryoma","Grakk","Jinnar"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Xinyan.png" },
  { id: 117, code: "LQ-0017", game: "lienquan", price: "100.000", numericPrice: 100000, rank: "Thach Dau", server: "Viet Nam", description: "Full ngọc 90, đồ giới hạn đầy kho", characters: ["Elandorr","Florentino"], moreChars: 12, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Chevreuse.png" },
  { id: 118, code: "LQ-0018", game: "lienquan", price: "700.000", numericPrice: 700000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc đua top, từng đạt hạng Thần", characters: ["Capheny","Zata","Dirak"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Chongyun.png" },
  { id: 119, code: "LQ-0019", game: "lienquan", price: "1.100.000", numericPrice: 1100000, rank: "Kim Cuong", server: "Viet Nam", description: "Nhiều skin mùa giải, rank ổn định", characters: ["Veres","Vex","Tel"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Yelan.png" },
  { id: 120, code: "LQ-0020", game: "lienquan", price: "2.900.000", numericPrice: 2900000, rank: "Bach Kim", server: "Viet Nam", description: "Acc full hiệu ứng hành động đặc biệt", characters: ["Lauriel","Aleister","Ignis"], moreChars: 8, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Yoimiya.png" },
  { id: 121, code: "LQ-0021", game: "lienquan", price: "300.000", numericPrice: 300000, rank: "Cao Thu", server: "Viet Nam", description: "Acc full tướng, 120 trang phục hiếm", characters: ["Tulen","Nakroth","Flo"], moreChars: 8, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Yunjin.png" },
  { id: 122, code: "LQ-0022", game: "lienquan", price: "1.100.000", numericPrice: 1100000, rank: "Chien Tuong", server: "Viet Nam", description: "Thách Đấu với skin SSS Violet đỉnh cao", characters: ["Violet","Raz","Murad"], moreChars: 10, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Zhongli.png" },
  { id: 123, code: "LQ-0023", game: "lienquan", price: "700.000", numericPrice: 700000, rank: "Thach Dau", server: "Viet Nam", description: "Acc smurf cày rank, winrate 80%", characters: ["Zuka","Ngo Khong"], moreChars: 10, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Freminet.png" },
  { id: 124, code: "LQ-0024", game: "lienquan", price: "900.000", numericPrice: 900000, rank: "Huyen Thoai", server: "Viet Nam", description: "Nhiều skin giới hạn sự kiện collab", characters: ["Airi","Valhein","Krixi"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Furina.png" },
  { id: 125, code: "LQ-0025", game: "lienquan", price: "500.000", numericPrice: 500000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc cân team, nhiều tướng đường giữa", characters: ["Yena","Lorion","Omen"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ganyu.png" },
  { id: 126, code: "LQ-0026", game: "lienquan", price: "1.300.000", numericPrice: 1300000, rank: "Bach Kim", server: "Viet Nam", description: "Acc carry, main Ryoma đi rừng cực ngầu", characters: ["Ryoma","Grakk","Jinnar"], moreChars: 9, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Gorou.png" },
  { id: 127, code: "LQ-0027", game: "lienquan", price: "2.000.000", numericPrice: 2000000, rank: "Cao Thu", server: "Viet Nam", description: "Full ngọc 90, đồ giới hạn đầy kho", characters: ["Elandorr","Florentino"], moreChars: 14, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Hutao.png" },
  { id: 128, code: "LQ-0028", game: "lienquan", price: "2.800.000", numericPrice: 2800000, rank: "Chien Tuong", server: "Viet Nam", description: "Acc đua top, từng đạt hạng Thần", characters: ["Capheny","Zata","Dirak"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Albedo.png" },
  { id: 129, code: "LQ-0029", game: "lienquan", price: "100.000", numericPrice: 100000, rank: "Thach Dau", server: "Viet Nam", description: "Nhiều skin mùa giải, rank ổn định", characters: ["Veres","Vex","Tel"], moreChars: 14, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Dehya.png" },
  { id: 130, code: "LQ-0030", game: "lienquan", price: "2.100.000", numericPrice: 2100000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc full hiệu ứng hành động đặc biệt", characters: ["Lauriel","Aleister","Ignis"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Clorinde.png" },
  { id: 131, code: "LQ-0031", game: "lienquan", price: "1.500.000", numericPrice: 1500000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc full tướng, 120 trang phục hiếm", characters: ["Tulen","Nakroth","Flo"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Arlecchino.png" },
  { id: 132, code: "LQ-0032", game: "lienquan", price: "1.800.000", numericPrice: 1800000, rank: "Bach Kim", server: "Viet Nam", description: "Thách Đấu với skin SSS Violet đỉnh cao", characters: ["Violet","Raz","Murad"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ayaka.png" },
  { id: 133, code: "LQ-0033", game: "lienquan", price: "2.800.000", numericPrice: 2800000, rank: "Cao Thu", server: "Viet Nam", description: "Acc smurf cày rank, winrate 80%", characters: ["Zuka","Ngo Khong"], moreChars: 13, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ayato.png" },
  { id: 134, code: "LQ-0034", game: "lienquan", price: "800.000", numericPrice: 800000, rank: "Chien Tuong", server: "Viet Nam", description: "Nhiều skin giới hạn sự kiện collab", characters: ["Airi","Valhein","Krixi"], moreChars: 11, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Barbara.png" },
  { id: 135, code: "LQ-0035", game: "lienquan", price: "2.200.000", numericPrice: 2200000, rank: "Thach Dau", server: "Viet Nam", description: "Acc cân team, nhiều tướng đường giữa", characters: ["Yena","Lorion","Omen"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Beidou.png" },
  { id: 136, code: "LQ-0036", game: "lienquan", price: "2.200.000", numericPrice: 2200000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc carry, main Ryoma đi rừng cực ngầu", characters: ["Ryoma","Grakk","Jinnar"], moreChars: 12, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Bennett.png" },
  { id: 137, code: "LQ-0037", game: "lienquan", price: "200.000", numericPrice: 200000, rank: "Kim Cuong", server: "Viet Nam", description: "Full ngọc 90, đồ giới hạn đầy kho", characters: ["Elandorr","Florentino"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Candace.png" },
  { id: 138, code: "LQ-0038", game: "lienquan", price: "2.500.000", numericPrice: 2500000, rank: "Bach Kim", server: "Viet Nam", description: "Acc đua top, từng đạt hạng Thần", characters: ["Capheny","Zata","Dirak"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Charlotte.png" },
  { id: 139, code: "LQ-0039", game: "lienquan", price: "1.000.000", numericPrice: 1000000, rank: "Cao Thu", server: "Viet Nam", description: "Nhiều skin mùa giải, rank ổn định", characters: ["Veres","Vex","Tel"], moreChars: 14, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Chevreuse.png" },
  { id: 140, code: "LQ-0040", game: "lienquan", price: "500.000", numericPrice: 500000, rank: "Chien Tuong", server: "Viet Nam", description: "Acc full hiệu ứng hành động đặc biệt", characters: ["Lauriel","Aleister","Ignis"], moreChars: 8, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Chiori.png" },
  { id: 141, code: "LQ-0041", game: "lienquan", price: "1.800.000", numericPrice: 1800000, rank: "Thach Dau", server: "Viet Nam", description: "Acc full tướng, 120 trang phục hiếm", characters: ["Tulen","Nakroth","Flo"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Chongyun.png" },
  { id: 142, code: "LQ-0042", game: "lienquan", price: "700.000", numericPrice: 700000, rank: "Huyen Thoai", server: "Viet Nam", description: "Thách Đấu với skin SSS Violet đỉnh cao", characters: ["Violet","Raz","Murad"], moreChars: 8, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Clorinde.png" },
  { id: 143, code: "LQ-0043", game: "lienquan", price: "1.400.000", numericPrice: 1400000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc smurf cày rank, winrate 80%", characters: ["Zuka","Ngo Khong"], moreChars: 13, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Cyno.png" },
  { id: 144, code: "LQ-0044", game: "lienquan", price: "1.700.000", numericPrice: 1700000, rank: "Bach Kim", server: "Viet Nam", description: "Nhiều skin giới hạn sự kiện collab", characters: ["Airi","Valhein","Krixi"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Dehya.png" },
  { id: 145, code: "LQ-0045", game: "lienquan", price: "2.300.000", numericPrice: 2300000, rank: "Cao Thu", server: "Viet Nam", description: "Acc cân team, nhiều tướng đường giữa", characters: ["Yena","Lorion","Omen"], moreChars: 8, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Diluc.png" },
  { id: 146, code: "LQ-0046", game: "lienquan", price: "2.500.000", numericPrice: 2500000, rank: "Chien Tuong", server: "Viet Nam", description: "Acc carry, main Ryoma đi rừng cực ngầu", characters: ["Ryoma","Grakk","Jinnar"], moreChars: 9, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Diona.png" },
  { id: 147, code: "LQ-0047", game: "lienquan", price: "2.200.000", numericPrice: 2200000, rank: "Thach Dau", server: "Viet Nam", description: "Full ngọc 90, đồ giới hạn đầy kho", characters: ["Elandorr","Florentino"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Dori.png" },
  { id: 148, code: "LQ-0048", game: "lienquan", price: "2.700.000", numericPrice: 2700000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc đua top, từng đạt hạng Thần", characters: ["Capheny","Zata","Dirak"], moreChars: 8, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Eula.png" },
  { id: 149, code: "LQ-0049", game: "lienquan", price: "1.900.000", numericPrice: 1900000, rank: "Kim Cuong", server: "Viet Nam", description: "Nhiều skin mùa giải, rank ổn định", characters: ["Veres","Vex","Tel"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Faruzan.png" },
  { id: 150, code: "LQ-0050", game: "lienquan", price: "2.200.000", numericPrice: 2200000, rank: "Bach Kim", server: "Viet Nam", description: "Acc full hiệu ứng hành động đặc biệt", characters: ["Lauriel","Aleister","Ignis"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Fischl.png" },
  { id: 201, code: "FF-0001", game: "freefire", price: "1.400.000", numericPrice: 1400000, rank: "Kim Cuong", server: "Viet Nam", description: "AK Rồng Xanh lv max, súng xịn nhất server", characters: ["Alok","Chrono"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Freminet.png" },
  { id: 202, code: "FF-0002", game: "freefire", price: "300.000", numericPrice: 300000, rank: "Bach Kim", server: "Viet Nam", description: "Full skin súng tiến hóa, MP40 Mãng Xà", characters: ["Kelly","Hayato","Wukong"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Furina.png" },
  { id: 203, code: "FF-0003", game: "freefire", price: "1.200.000", numericPrice: 1200000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc giá học sinh, thẻ vô cực mùa cũ", characters: ["K","Moco","Jai"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ganyu.png" },
  { id: 204, code: "FF-0004", game: "freefire", price: "1.700.000", numericPrice: 1700000, rank: "Thach Dau", server: "Viet Nam", description: "Nhiều set đồ collab, hành động ngầu", characters: ["Skyler","Xayne","Clu"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Gorou.png" },
  { id: 205, code: "FF-0005", game: "freefire", price: "1.000.000", numericPrice: 1000000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc rank cao, nhiều bộ trang phục hiếm", characters: ["Kapella","Jota","Maxim"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Albedo.png" },
  { id: 206, code: "FF-0006", game: "freefire", price: "1.400.000", numericPrice: 1400000, rank: "Bach Kim", server: "Viet Nam", description: "Full bundle, skin nhân vật xịn nhất", characters: ["Wukong","Alok","Chrono"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Hutao.png" },
  { id: 207, code: "FF-0007", game: "freefire", price: "200.000", numericPrice: 200000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc Diamond I, kho đồ phong phú", characters: ["Moco","Skyler","Kelly"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Cyno.png" },
  { id: 208, code: "FF-0008", game: "freefire", price: "1.600.000", numericPrice: 1600000, rank: "Thach Dau", server: "Viet Nam", description: "Nhiều skin súng màu sắc đẹp mắt", characters: ["Hayato","K","Xayne"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Kazuha.png" },
  { id: 209, code: "FF-0009", game: "freefire", price: "2.000.000", numericPrice: 2000000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc TOP 1 server, nhiều phần thưởng rank", characters: ["Jota","Maxim","Miguel"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Keqing.png" },
  { id: 210, code: "FF-0010", game: "freefire", price: "1.200.000", numericPrice: 1200000, rank: "Bach Kim", server: "Viet Nam", description: "Súng lv max hết, huy chương đầy", characters: ["Caroline","Steffie","Misha"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Diona.png" },
  { id: 211, code: "FF-0011", game: "freefire", price: "400.000", numericPrice: 400000, rank: "Huyen Thoai", server: "Viet Nam", description: "AK Rồng Xanh lv max, súng xịn nhất server", characters: ["Alok","Chrono"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Klee.png" },
  { id: 212, code: "FF-0012", game: "freefire", price: "1.800.000", numericPrice: 1800000, rank: "Thach Dau", server: "Viet Nam", description: "Full skin súng tiến hóa, MP40 Mãng Xà", characters: ["Kelly","Hayato","Wukong"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Kokomi.png" },
  { id: 213, code: "FF-0013", game: "freefire", price: "200.000", numericPrice: 200000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc giá học sinh, thẻ vô cực mùa cũ", characters: ["K","Moco","Jai"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Layla.png" },
  { id: 214, code: "FF-0014", game: "freefire", price: "1.900.000", numericPrice: 1900000, rank: "Bach Kim", server: "Viet Nam", description: "Nhiều set đồ collab, hành động ngầu", characters: ["Skyler","Xayne","Clu"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Diluc.png" },
  { id: 215, code: "FF-0015", game: "freefire", price: "1.000.000", numericPrice: 1000000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc rank cao, nhiều bộ trang phục hiếm", characters: ["Kapella","Jota","Maxim"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Charlotte.png" },
  { id: 216, code: "FF-0016", game: "freefire", price: "600.000", numericPrice: 600000, rank: "Thach Dau", server: "Viet Nam", description: "Full bundle, skin nhân vật xịn nhất", characters: ["Wukong","Alok","Chrono"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Mika.png" },
  { id: 217, code: "FF-0017", game: "freefire", price: "300.000", numericPrice: 300000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc Diamond I, kho đồ phong phú", characters: ["Moco","Skyler","Kelly"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Mona.png" },
  { id: 218, code: "FF-0018", game: "freefire", price: "1.500.000", numericPrice: 1500000, rank: "Bach Kim", server: "Viet Nam", description: "Nhiều skin súng màu sắc đẹp mắt", characters: ["Hayato","K","Xayne"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Nahida.png" },
  { id: 219, code: "FF-0019", game: "freefire", price: "100.000", numericPrice: 100000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc TOP 1 server, nhiều phần thưởng rank", characters: ["Jota","Maxim","Miguel"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Navia.png" },
  { id: 220, code: "FF-0020", game: "freefire", price: "100.000", numericPrice: 100000, rank: "Thach Dau", server: "Viet Nam", description: "Súng lv max hết, huy chương đầy", characters: ["Caroline","Steffie","Misha"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Neuvillette.png" },
  { id: 221, code: "FF-0021", game: "freefire", price: "200.000", numericPrice: 200000, rank: "Kim Cuong", server: "Viet Nam", description: "AK Rồng Xanh lv max, súng xịn nhất server", characters: ["Alok","Chrono"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Nilou.png" },
  { id: 222, code: "FF-0022", game: "freefire", price: "1.300.000", numericPrice: 1300000, rank: "Bach Kim", server: "Viet Nam", description: "Full skin súng tiến hóa, MP40 Mãng Xà", characters: ["Kelly","Hayato","Wukong"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Ningguang.png" },
  { id: 223, code: "FF-0023", game: "freefire", price: "1.100.000", numericPrice: 1100000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc giá học sinh, thẻ vô cực mùa cũ", characters: ["K","Moco","Jai"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Dori.png" },
  { id: 224, code: "FF-0024", game: "freefire", price: "1.800.000", numericPrice: 1800000, rank: "Thach Dau", server: "Viet Nam", description: "Nhiều set đồ collab, hành động ngầu", characters: ["Skyler","Xayne","Clu"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Qiqi.png" },
  { id: 225, code: "FF-0025", game: "freefire", price: "900.000", numericPrice: 900000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc rank cao, nhiều bộ trang phục hiếm", characters: ["Kapella","Jota","Maxim"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Razor.png" },
  { id: 226, code: "FF-0026", game: "freefire", price: "2.000.000", numericPrice: 2000000, rank: "Bach Kim", server: "Viet Nam", description: "Full bundle, skin nhân vật xịn nhất", characters: ["Wukong","Alok","Chrono"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Rosaria.png" },
  { id: 227, code: "FF-0027", game: "freefire", price: "700.000", numericPrice: 700000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc Diamond I, kho đồ phong phú", characters: ["Moco","Skyler","Kelly"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Sayu.png" },
  { id: 228, code: "FF-0028", game: "freefire", price: "800.000", numericPrice: 800000, rank: "Thach Dau", server: "Viet Nam", description: "Nhiều skin súng màu sắc đẹp mắt", characters: ["Hayato","K","Xayne"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Shenhe.png" },
  { id: 229, code: "FF-0029", game: "freefire", price: "300.000", numericPrice: 300000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc TOP 1 server, nhiều phần thưởng rank", characters: ["Jota","Maxim","Miguel"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Sigewinne.png" },
  { id: 230, code: "FF-0030", game: "freefire", price: "200.000", numericPrice: 200000, rank: "Bach Kim", server: "Viet Nam", description: "Súng lv max hết, huy chương đầy", characters: ["Caroline","Steffie","Misha"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Sucrose.png" },
  { id: 231, code: "FF-0031", game: "freefire", price: "800.000", numericPrice: 800000, rank: "Huyen Thoai", server: "Viet Nam", description: "AK Rồng Xanh lv max, súng xịn nhất server", characters: ["Alok","Chrono"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Tartaglia.png" },
  { id: 232, code: "FF-0032", game: "freefire", price: "600.000", numericPrice: 600000, rank: "Thach Dau", server: "Viet Nam", description: "Full skin súng tiến hóa, MP40 Mãng Xà", characters: ["Kelly","Hayato","Wukong"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Eula.png" },
  { id: 233, code: "FF-0033", game: "freefire", price: "100.000", numericPrice: 100000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc giá học sinh, thẻ vô cực mùa cũ", characters: ["K","Moco","Jai"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Tighnari.png" },
  { id: 234, code: "FF-0034", game: "freefire", price: "300.000", numericPrice: 300000, rank: "Bach Kim", server: "Viet Nam", description: "Nhiều set đồ collab, hành động ngầu", characters: ["Skyler","Xayne","Clu"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Venti.png" },
  { id: 235, code: "FF-0035", game: "freefire", price: "2.000.000", numericPrice: 2000000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc rank cao, nhiều bộ trang phục hiếm", characters: ["Kapella","Jota","Maxim"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Wanderer.png" },
  { id: 236, code: "FF-0036", game: "freefire", price: "1.700.000", numericPrice: 1700000, rank: "Thach Dau", server: "Viet Nam", description: "Full bundle, skin nhân vật xịn nhất", characters: ["Wukong","Alok","Chrono"], moreChars: 7, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Wriothesley.png" },
  { id: 237, code: "FF-0037", game: "freefire", price: "1.100.000", numericPrice: 1100000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc Diamond I, kho đồ phong phú", characters: ["Moco","Skyler","Kelly"], moreChars: 0, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Xiangling.png" },
  { id: 238, code: "FF-0038", game: "freefire", price: "1.500.000", numericPrice: 1500000, rank: "Bach Kim", server: "Viet Nam", description: "Nhiều skin súng màu sắc đẹp mắt", characters: ["Hayato","K","Xayne"], moreChars: 1, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Gorou.png" },
  { id: 239, code: "FF-0039", game: "freefire", price: "600.000", numericPrice: 600000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc TOP 1 server, nhiều phần thưởng rank", characters: ["Jota","Maxim","Miguel"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Xiao.png" },
  { id: 240, code: "FF-0040", game: "freefire", price: "1.300.000", numericPrice: 1300000, rank: "Thach Dau", server: "Viet Nam", description: "Súng lv max hết, huy chương đầy", characters: ["Caroline","Steffie","Misha"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Xingqiu.png" },
  { id: 241, code: "FF-0041", game: "freefire", price: "1.400.000", numericPrice: 1400000, rank: "Kim Cuong", server: "Viet Nam", description: "AK Rồng Xanh lv max, súng xịn nhất server", characters: ["Alok","Chrono"], moreChars: 3, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Xinyan.png" },
  { id: 242, code: "FF-0042", game: "freefire", price: "900.000", numericPrice: 900000, rank: "Bach Kim", server: "Viet Nam", description: "Full skin súng tiến hóa, MP40 Mãng Xà", characters: ["Kelly","Hayato","Wukong"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Freminet.png" },
  { id: 243, code: "FF-0043", game: "freefire", price: "900.000", numericPrice: 900000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc giá học sinh, thẻ vô cực mùa cũ", characters: ["K","Moco","Jai"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Kazuha.png" },
  { id: 244, code: "FF-0044", game: "freefire", price: "800.000", numericPrice: 800000, rank: "Thach Dau", server: "Viet Nam", description: "Nhiều set đồ collab, hành động ngầu", characters: ["Skyler","Xayne","Clu"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Yelan.png" },
  { id: 245, code: "FF-0045", game: "freefire", price: "1.100.000", numericPrice: 1100000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc rank cao, nhiều bộ trang phục hiếm", characters: ["Kapella","Jota","Maxim"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Yoimiya.png" },
  { id: 246, code: "FF-0046", game: "freefire", price: "2.000.000", numericPrice: 2000000, rank: "Bach Kim", server: "Viet Nam", description: "Full bundle, skin nhân vật xịn nhất", characters: ["Wukong","Alok","Chrono"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Yunjin.png" },
  { id: 247, code: "FF-0047", game: "freefire", price: "200.000", numericPrice: 200000, rank: "Huyen Thoai", server: "Viet Nam", description: "Acc Diamond I, kho đồ phong phú", characters: ["Moco","Skyler","Kelly"], moreChars: 5, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Zhongli.png" },
  { id: 248, code: "FF-0048", game: "freefire", price: "1.100.000", numericPrice: 1100000, rank: "Thach Dau", server: "Viet Nam", description: "Nhiều skin súng màu sắc đẹp mắt", characters: ["Hayato","K","Xayne"], moreChars: 2, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Hutao.png" },
  { id: 249, code: "FF-0049", game: "freefire", price: "800.000", numericPrice: 800000, rank: "Kim Cuong", server: "Viet Nam", description: "Acc TOP 1 server, nhiều phần thưởng rank", characters: ["Jota","Maxim","Miguel"], moreChars: 4, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Fischl.png" },
  { id: 250, code: "FF-0050", game: "freefire", price: "400.000", numericPrice: 400000, rank: "Bach Kim", server: "Viet Nam", description: "Súng lv max hết, huy chương đầy", characters: ["Caroline","Steffie","Misha"], moreChars: 6, image: "https://enka.network/ui/UI_Gacha_AvatarImg_Arlecchino.png" }
];

const ShopList = ({ onSelectAccount }) => {
  const [filterGame, setFilterGame] = useState('all');
  const [filterServer, setFilterServer] = useState('all');
  const [filterPrice, setFilterPrice] = useState('all');
  const [sortOrder, setSortOrder] = useState('default');
  
  const [visibleCount, setVisibleCount] = useState(9);
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
      setVisibleCount(prev => prev + 9);
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
            <div key={account.id} className="animate-slide-up" style={{ height: '100%' }}>
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

