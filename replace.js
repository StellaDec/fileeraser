const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory()) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx')) {
          results.push(file);
      }
    }
  });
  return results;
}

const files = walk('c:/Users/nishu/Downloads/fileeraser/src');
let changedFiles = 0;

files.forEach(file => {
    let content = fs.readFileSync(file, 'utf8');
    
    // Replace "File Eraser" with "D-Secure File Eraser" globally
    let newContent = content.replace(/File Eraser/g, 'D-Secure File Eraser');
    
    // Fix any double "D-Secure D-Secure File Eraser"
    newContent = newContent.replace(/D-Secure D-Secure File Eraser/g, 'D-Secure File Eraser');
    
    if (content !== newContent) {
        fs.writeFileSync(file, newContent, 'utf8');
        console.log(`Updated ${file}`);
        changedFiles++;
    }
});

console.log(`Successfully updated ${changedFiles} files.`);
