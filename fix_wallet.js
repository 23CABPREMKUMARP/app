const fs = require('fs');
const file = 'app/admin/town-bus/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/c\.walletBalance === 0/g, '(c.walletBalance || 0) === 0');
code = code.replace(/c\.walletBalance > 0/g, '(c.walletBalance || 0) > 0');
code = code.replace(/\{c\.walletBalance\}/g, '{c.walletBalance || 0}');

fs.writeFileSync(file, code);
