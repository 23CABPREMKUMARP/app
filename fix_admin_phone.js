const fs = require('fs');
const file = 'app/admin/town-bus/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// Replace remaining c.phone with c.email and change the label if possible
code = code.replace(/<span className="text-slate-500">Contact No:<\/span>\s*<span className="font-medium">\{c\.phone\}<\/span>/g, 
  '<span className="text-slate-500">Email:</span>\n                                  <span className="font-medium text-[9px] truncate">{c.email}</span>');

code = code.replace(/c\.phone/g, 'c.email');

fs.writeFileSync(file, code);
