const fs = require('fs');
const path = require('path');

function walkDir(dir, callback) {
    fs.readdirSync(dir).forEach(f => {
        const dirPath = path.join(dir, f);
        const isDirectory = fs.statSync(dirPath).isDirectory();
        isDirectory ? walkDir(dirPath, callback) : callback(dirPath);
    });
}

function processFile(filePath) {
    if (!filePath.endsWith('.jsx')) return;
    
    let content = fs.readFileSync(filePath, 'utf8');
    const original = content;

    // Remaining glass classes
    content = content.replace(/\bdark:glass\b/g, 'bg-theme-card border border-theme-border');
    content = content.replace(/\bdark:glass-dialog\b/g, 'bg-theme-card border border-theme-border');
    content = content.replace(/\bdark:glass-table-header\b/g, 'bg-theme-surface');
    content = content.replace(/\bdark:glass-table-row\b/g, 'hover:bg-theme-surface');
    content = content.replace(/\bdark:bg-transparent\b/g, 'bg-transparent');

    // Remaining color classes
    content = content.replace(/\bdark:text-white\/[0-9]{1,2}\b/g, 'text-theme-text-sub');
    content = content.replace(/\bdark:text-white\/9[0-9]\b/g, 'text-theme-text');
    content = content.replace(/\bdark:text-white\b/g, 'text-theme-text');
    
    content = content.replace(/\bdark:bg-white\/\[0\.[0-9]+\]\b/g, 'bg-theme-surface');
    content = content.replace(/\bdark:bg-theme-card\/\[0\.[0-9]+\]\b/g, 'bg-theme-surface');
    content = content.replace(/\bdark:bg-theme-card\/10\b/g, 'bg-theme-surface');
    content = content.replace(/\bdark:bg-white\/10\b/g, 'bg-theme-surface');

    content = content.replace(/\bdark:border-white\/\[0\.[0-9]+\]\b/g, 'border-theme-border');
    content = content.replace(/\bdark:border-transparent\b/g, 'border-transparent');

    // Special cases
    content = content.replace(/\bbg-zinc-200\b/g, 'bg-theme-surface');
    content = content.replace(/\bbg-zinc-300\b/g, 'bg-theme-surface');
    content = content.replace(/\bbg-gray-200\b/g, 'bg-theme-surface');
    content = content.replace(/\bbg-gray-50\b/g, 'bg-theme-surface');
    
    content = content.replace(/\btext-gray-400\b/g, 'text-theme-text-sub');
    content = content.replace(/\btext-zinc-400\b/g, 'text-theme-text-sub');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

walkDir('./src', processFile);
