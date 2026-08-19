const fs = require('fs');

const html = fs.readFileSync('index.html', 'utf8');

// Dashboard HTML
const dashboardMatch = html.match(/adminBody\.innerHTML\s*=\s*`([\s\S]*?)`;\s*\} else \{/);
if (dashboardMatch) {
  console.log("Found dashboard HTML");
}

// Activity HTML
const activityMatch = html.match(/adminBody\.innerHTML\s*=\s*`([\s\S]*?)`;\s*\}\s*\/\/\s*END OF ELSE BLOCK/);
if (activityMatch) {
  console.log("Found activity HTML");
}
