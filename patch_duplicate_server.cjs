const fs = require('fs');
let code = fs.readFileSync('server.ts', 'utf-8');

const target = `          const timeConflict = (periods.currentIsMorning && isMorning) || (periods.currentIsAfternoon && isAfternoon);`;
const replacement = `          // "ชื่อห้ามซ้ำทุกรายการ ยกเว้นรายการตอนบ่าย" means afternoon activities do not conflict with each other
          // So conflict only happens if BOTH are morning activities.
          // Wait, if one is morning and one is morning -> conflict.
          // If one is afternoon and one is afternoon -> NO conflict (because of the exception).
          // If one is morning and one is afternoon -> NO conflict.
          const timeConflict = (periods.currentIsMorning && isMorning);`;

if (code.includes(target)) {
    code = code.replace(target, replacement);
    fs.writeFileSync('server.ts', code);
    console.log('patched duplicate logic in server');
} else {
    console.log('target not found in server');
}
