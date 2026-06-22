const fs = require('fs');
const file = 'app/conductor/page.tsx';
let code = fs.readFileSync(file, 'utf8');

const saveStatsFn = `
  const saveStats = (updated: any) => {
    localStorage.setItem("conductorStats", JSON.stringify({
      ticketsSold: updated.ticketsSold ?? ticketsSold,
      passengersBoarded: updated.passengersBoarded ?? passengersBoarded,
      totalRevenue: updated.totalRevenue ?? totalRevenue,
      cashCollection: updated.cashCollection ?? cashCollection,
      onlineCollection: updated.onlineCollection ?? onlineCollection
    }));
  };
`;

code = code.replace(/const handleIssueTicket/, saveStatsFn + '\n  const handleIssueTicket');
fs.writeFileSync(file, code);
