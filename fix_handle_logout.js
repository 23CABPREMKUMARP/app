const fs = require('fs');
const file = 'app/conductor/page.tsx';
let code = fs.readFileSync(file, 'utf8');

const logoutFn = `
  const handleLogout = () => {
    signOut(() => router.push("/"));
  };
`;

code = code.replace(/const handleIssueTicket/, logoutFn + '\n  const handleIssueTicket');

fs.writeFileSync(file, code);
