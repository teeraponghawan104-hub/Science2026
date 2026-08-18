const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const targetAnchor = `function showSuccess(entry, act){`;
const idx1 = html.indexOf('window.openAdminEditModal = function(activityId, regId) {');
const idx2 = html.indexOf(targetAnchor);

if(idx1 < idx2 && idx1 > 0) {
    // The first injection is between 1216 and targetAnchor.
    html = html.substring(0, idx1) + html.substring(idx2);
    fs.writeFileSync('index.html', html);
    console.log('Removed duplicate from index.html');
} else {
    console.log('Duplicate not found in expected order');
}
