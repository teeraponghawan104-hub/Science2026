const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const target = `           if (window._lastAdminDataStr === newDataStr) return;
           window._lastAdminDataStr = newDataStr;
           adminLists = data.allData;`;
           
const replacement = `           if (window._lastAdminDataStr === newDataStr) return;
           
           if (window._isAdminInteracting) {
              // skip render this tick if user is interacting, data will be updated next tick if they stop
              return;
           }
           
           window._lastAdminDataStr = newDataStr;
           adminLists = data.allData;`;

const target2 = `adminOverlay.addEventListener('click', (e)=>{ if(e.target===adminOverlay) adminOverlay.classList.remove('open'); });`;
const replacement2 = `adminOverlay.addEventListener('click', (e)=>{ if(e.target===adminOverlay) adminOverlay.classList.remove('open'); });
adminOverlay.addEventListener('touchstart', () => { window._isAdminInteracting = true; }, {passive:true});
adminOverlay.addEventListener('touchend', () => { setTimeout(() => window._isAdminInteracting = false, 1500); }, {passive:true});
adminOverlay.addEventListener('mousedown', () => { window._isAdminInteracting = true; });
adminOverlay.addEventListener('mouseup', () => { setTimeout(() => window._isAdminInteracting = false, 500); });
adminOverlay.addEventListener('wheel', () => { 
  window._isAdminInteracting = true; 
  clearTimeout(window._wheelTimeout);
  window._wheelTimeout = setTimeout(() => window._isAdminInteracting = false, 1000); 
}, {passive:true});`;

if (html.includes(target) && html.includes(target2)) {
    html = html.replace(target, replacement);
    html = html.replace(target2, replacement2);
    fs.writeFileSync('index.html', html);
    console.log('patched interaction');
} else {
    console.log('not found');
}
