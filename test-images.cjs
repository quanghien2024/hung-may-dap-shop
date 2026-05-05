const https = require('https');

const names = [
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

const working = [];
const broken = [];
let checked = 0;

function check(name) {
  return new Promise((resolve) => {
    const url = `https://enka.network/ui/UI_Gacha_AvatarImg_${name}.png`;
    const req = https.request(url, { method: 'HEAD' }, (res) => {
      if (res.statusCode === 200) working.push(name);
      else broken.push(name + '(' + res.statusCode + ')');
      resolve();
    });
    req.on('error', () => { broken.push(name + '(err)'); resolve(); });
    req.setTimeout(5000, () => { req.destroy(); broken.push(name + '(timeout)'); resolve(); });
    req.end();
  });
}

(async () => {
  // Check in batches of 10
  for (let i = 0; i < names.length; i += 10) {
    const batch = names.slice(i, i + 10);
    await Promise.all(batch.map(check));
    process.stdout.write('.');
  }
  console.log('\n\nWORKING (' + working.length + '):');
  console.log(working.join(', '));
  console.log('\nBROKEN (' + broken.length + '):');
  console.log(broken.join(', '));
  require('fs').writeFileSync('working-images.json', JSON.stringify(working));
})();
