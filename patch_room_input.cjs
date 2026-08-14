const fs = require('fs');
let html = fs.readFileSync('index.html', 'utf-8');

const targetRegex = /<div class="field" data-field="room">[\s\S]*?<\/div>/;

const replacement = `<div class="field" data-field="room">
        <label for="f_room">ห้อง <span class="req">*</span></label>
        <select id="f_room">
          <option value="">เลือกห้อง</option>
          <option value="1/1">1/1</option>
          <option value="1/2">1/2</option>
          <option value="2/1">2/1</option>
          <option value="2/2">2/2</option>
          <option value="3/1">3/1</option>
          <option value="3/2">3/2</option>
          <option value="4/1">4/1</option>
          <option value="4/2">4/2</option>
          <option value="5/1">5/1</option>
          <option value="5/2">5/2</option>
          <option value="6/1">6/1</option>
          <option value="6/2">6/2</option>
        </select>
        <div class="error">กรุณาเลือกห้อง</div>
      </div>`;

if (targetRegex.test(html)) {
    html = html.replace(targetRegex, replacement);
    fs.writeFileSync('index.html', html);
    console.log('patched room input in index.html');
} else {
    console.log('target not found in index.html');
}
