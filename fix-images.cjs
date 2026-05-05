const fs = require('fs');
let content = fs.readFileSync('src/components/ShopList.jsx', 'utf-8');

// Map of account code -> [broken name, safe replacement]
// LQ fixes: Freminet/Furina/Ganyu/Gorou/Hutao are not used anywhere in LQ slots
// FF fixes: Albedo/Alhaitham/Amber/Arlecchino are not used anywhere in FF slots
const fixes = [
  ['LQ-0023', 'Lumine',  'Freminet'],
  ['LQ-0024', 'Shinobu', 'Furina'],
  ['LQ-0025', 'Baizhu',  'Ganyu'],
  ['LQ-0026', 'Kaveh',   'Gorou'],
  ['LQ-0027', 'Aloy',    'Hutao'],
  ['FF-0005', 'Heizou',  'Albedo'],
  ['FF-0048', 'Lumine',  'Alhaitham'],
  ['FF-0049', 'Shinobu', 'Amber'],
  ['FF-0050', 'Baizhu',  'Arlecchino'],
  ['GS-0016', 'Collei',  'Eula'],
];

for (const [code, from, to] of fixes) {
  // Find the line with this code and replace the image name
  const lineRegex = new RegExp('(code: "' + code + '"[^\\n]*UI_Gacha_AvatarImg_)' + from + '(\\.png)');
  if (lineRegex.test(content)) {
    content = content.replace(lineRegex, '$1' + to + '$2');
    console.log('Fixed ' + code + ': ' + from + ' -> ' + to);
  } else {
    console.log('NOT FOUND: ' + code + ' (' + from + ')');
  }
}

fs.writeFileSync('src/components/ShopList.jsx', content);
console.log('All done!');
