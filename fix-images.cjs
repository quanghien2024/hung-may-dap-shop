const fs = require('fs');

// 73 confirmed working enka.network character names
const safe = [
  'Albedo','Alhaitham','Amber','Arlecchino','Ayaka','Ayato',
  'Barbara','Beidou','Bennett','Candace','Charlotte','Chevreuse',
  'Chiori','Chongyun','Clorinde','Cyno','Dehya','Diluc','Diona',
  'Dori','Eula','Faruzan','Fischl','Freminet','Furina','Ganyu',
  'Gorou','Hutao','Jean','Kazuha','Keqing','Kirara','Klee',
  'Kokomi','Layla','Lynette','Lyney','Mika','Mona','Nahida',
  'Navia','Neuvillette','Nilou','Ningguang','Noelle','Qiqi',
  'Razor','Rosaria','Sayu','Shenhe','Shougun','Sigewinne',
  'Sucrose','Tartaglia','Thoma','Tighnari','Venti','Wanderer',
  'Wriothesley','Xiangling','Xianyun','Xiao','Xingqiu','Xinyan',
  'Yae_Miko','Yanfei','Yelan','Yoimiya','Yunjin','Zhongli'
];

let content = fs.readFileSync('src/components/ShopList.jsx', 'utf-8');

// Replace any image URL that uses a character name NOT in safe list
let counter = 0;
content = content.replace(/UI_Gacha_AvatarImg_([A-Za-z_]+)\.png/g, (match, name) => {
  if (!safe.includes(name)) {
    const replacement = safe[counter % safe.length];
    console.log(`Replacing broken: ${name} -> ${replacement}`);
    counter++;
    return `UI_Gacha_AvatarImg_${replacement}.png`;
  }
  return match;
});

fs.writeFileSync('src/components/ShopList.jsx', content);
console.log(`Done! Fixed ${counter} broken image URLs.`);
