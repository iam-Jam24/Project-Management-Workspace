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

    content = content.replace(/bg-gradient-to-br from-blue-500 to-blue-600 bg-theme-accent text-white hover:opacity-90 text-white hover:opacity-90/g, 'bg-theme-accent text-white hover:opacity-90');
    content = content.replace(/bg-gradient-to-br from-blue-500 to-blue-600 bg-theme-accent text-white hover:opacity-90 hover:opacity-90 text-white/g, 'bg-theme-accent text-white hover:opacity-90');
    content = content.replace(/bg-gradient-to-l from-blue-500 to-blue-600 bg-theme-accent text-white hover:opacity-90 transition-colors text-white/g, 'bg-theme-accent text-white transition-colors hover:opacity-90');
    content = content.replace(/bg-gradient-to-br from-blue-500 to-blue-600 bg-theme-accent text-white hover:opacity-90 text-white space-x-2 hover:opacity-90/g, 'bg-theme-accent text-white space-x-2 hover:opacity-90');
    content = content.replace(/bg-gradient-to-br from-blue-500 to-blue-600 bg-theme-accent text-white hover:opacity-90 text-white disabled:opacity-50/g, 'bg-theme-accent text-white hover:opacity-90 disabled:opacity-50');
    content = content.replace(/bg-theme-accent text-white hover:opacity-90 bg-gradient-to-br from-blue-500 to-blue-600 text-white/g, 'bg-theme-accent text-white hover:opacity-90');
    content = content.replace(/bg-theme-accent text-white hover:opacity-90 bg-blue-500 hover:bg-blue-600 text-white/g, 'bg-theme-accent text-white hover:opacity-90');
    content = content.replace(/bg-gradient-to-br from-blue-500 to-blue-600 bg-theme-accent text-white hover:opacity-90 text-white/g, 'bg-theme-accent text-white hover:opacity-90');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Cleaned up ${filePath}`);
    }
}

walkDir('./src', processFile);
