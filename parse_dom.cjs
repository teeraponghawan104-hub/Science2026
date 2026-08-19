const fs = require('fs');
const html = fs.readFileSync('index.html', 'utf8');

const dashboardMatch = html.match(/adminBody\.innerHTML\s*=\s*`([\s\S]*?)`;\s*\} else \{/);
const activityMatch = html.match(/\}\s*else\s*\{\s*const act[\s\S]*?adminBody\.innerHTML\s*=\s*`([\s\S]*?)`;\s*\}\s*\/\/\s*END OF ELSE BLOCK/);

if (dashboardMatch) {
  fs.writeFileSync('dashboard.html', dashboardMatch[1]);
}
if (activityMatch) {
  fs.writeFileSync('activity.html', activityMatch[1]);
}
