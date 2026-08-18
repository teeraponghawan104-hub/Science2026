const fs = require('fs');

const replacement = `      const newEntry = {
        ...data,
        id: activityId.slice(0,3).toUpperCase()+'-'+Date.now().toString(36).toUpperCase(),
        timestamp: new Date().toISOString()
      };`;

function patchFile(filepath) {
  let code = fs.readFileSync(filepath, 'utf-8');
  const targetRegex = /const newIdNum = list\.length \+ 1;[\s\S]*?timestamp: new Date\(\)\.toISOString\(\)\n      };/;
  if (targetRegex.test(code)) {
    code = code.replace(targetRegex, replacement);
    fs.writeFileSync(filepath, code);
    console.log(filepath, 'id logic patched');
  } else {
    console.log(filepath, 'target not found');
  }
}

patchFile('server.ts');
patchFile('api/index.ts');
