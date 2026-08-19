const fs = require('fs');
const jsdom = require('jsdom');
const { JSDOM } = jsdom;

const dom = new JSDOM(`
  <div id="adminOverlay">
    <div id="adminModal">
      <div id="adminBody">
        <div class="print-header">สรุปภาพรวมผู้สมัคร</div>
        <p class="modal-eyebrow">แผงควบคุมสำหรับเจ้าหน้าที่</p>
        <div style="display:flex; justify-content:space-between; align-items:center;">
          <h3>ภาพรวมการสมัคร (Dashboard)</h3>
          <button class="btn-tiny" id="announceAllBtn">ประกาศรายชื่อรวมทุกกิจกรรม</button>
        </div>
        <div class="admin-tabs">
          <button class="admin-tab active" data-tab="dashboard">ภาพรวม (Dashboard)</button>
          <button class="admin-tab" data-tab="rocket">จรวดขวดน้ำ</button>
        </div>
        <div style="margin-bottom:20px; padding:16px;">
          <h4>🌟 กิจกรรมที่ได้รับความสนใจมากที่สุด</h4>
          <p><strong>จรวดขวดน้ำ</strong> (สมัครแล้ว 5 ทีม)</p>
        </div>
      </div>
    </div>
  </div>
`);
const doc = dom.window.document;
const el = doc.querySelector('#adminBody > div:nth-of-type(3) > button:nth-of-type(1)');
if (el) {
  console.log("Matched element tag:", el.tagName, "text:", el.textContent, "id:", el.id, "class:", el.className);
} else {
  console.log("No element matched the dashboard HTML structure.");
}
