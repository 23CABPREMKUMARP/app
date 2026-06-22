const fs = require('fs');
const path = 'src/data/conductor_assignments.json';

let data = [];
if (fs.existsSync(path)) {
  data = JSON.parse(fs.readFileSync(path, 'utf8'));
}

data.push({
  id: "cond_" + Math.random().toString(36).substr(2, 9),
  name: "Premkumar Perumal",
  email: "premkumarperumal232@gmail.com",
  employee_id: "EMP-PREM-01",
  assigned_bus: "TN38AB1234",
  assigned_route: "Gandhipuram → Airport",
  status: "Active",
  created_at: new Date().toISOString()
});

fs.writeFileSync(path, JSON.stringify(data, null, 2), 'utf8');
console.log("Conductor added successfully.");
