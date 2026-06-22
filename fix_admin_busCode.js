const fs = require('fs');
const file = 'app/admin/town-bus/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace remaining c.busCode with c.assigned_bus
code = code.replace(/c\.busCode/g, 'c.assigned_bus');

fs.writeFileSync(file, code);
