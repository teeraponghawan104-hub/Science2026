const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const target = `        if (res.ok) {
           const data = await res.json();
           adminLists = data.allData;`;
           
const replacement = `        if (res.ok) {
           const data = await res.json();
           const newDataStr = JSON.stringify(data.allData);
           if (window._lastAdminDataStr === newDataStr) return;
           window._lastAdminDataStr = newDataStr;
           adminLists = data.allData;`;

if (html.includes(target)) {
    html = html.replace(target, replacement);
    fs.writeFileSync('index.html', html);
    console.log('patched interval');
} else {
    console.log('not found');
}
