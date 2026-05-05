const fs = require('fs');

const broken = ['Amber','Alhaitham','Jean','Lynette','Kirara','Lyney','Noelle','Thoma','Yae_Miko','Yanfei','Xianyun'];
const working = JSON.parse(fs.readFileSync('working-images.json','utf-8'));

let content = fs.readFileSync('src/components/ShopList.jsx', 'utf-8');
let repIdx = 0;

content = content.replace(/UI_Gacha_AvatarImg_([A-Za-z_]+)\.png/g, (match, name) => {
  if (broken.includes(name)) {
    // Pick replacement that isn't already adjacent - cycle through working list
    const replacement = working[repIdx % working.length];
    repIdx++;
    console.log(`Fixed: ${name} -> ${replacement}`);
    return `UI_Gacha_AvatarImg_${replacement}.png`;
  }
  return match;
});

fs.writeFileSync('src/components/ShopList.jsx', content);
console.log('Done!');
