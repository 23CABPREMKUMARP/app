const fs = require('fs');
const file = 'app/conductor/page.tsx';
let code = fs.readFileSync(file, 'utf8');

code = code.replace(/\{authRole\}/g, 'Conductor');

fs.writeFileSync(file, code);
