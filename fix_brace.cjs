const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');
html = html.replace(`           if (newTableWrap) {
             newTableWrap.scrollTop = scrollTop;
             newTableWrap.scrollLeft = scrollLeft;
           }
           }`, `           if (newTableWrap) {
             newTableWrap.scrollTop = scrollTop;
             newTableWrap.scrollLeft = scrollLeft;
           }`);
fs.writeFileSync('index.html', html);
