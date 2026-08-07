const fs = require('fs');
const text = fs.readFileSync('index.html', 'utf-8');
const lines = text.split('\n');
for (let i = 0; i < lines.length; i++) {
  const line = lines[i];
  for (let j = 0; j < line.length; j++) {
    const code = line.charCodeAt(j);
    if (code > 127 && (code < 0x0E00 || code > 0x0E7F)) {
      console.log(`Line ${i+1}: char ${code.toString(16)} ('${line[j]}') at pos ${j}`);
    }
  }
}
