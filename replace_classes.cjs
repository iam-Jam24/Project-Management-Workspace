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

    // Replace background classes for cards/surfaces
    content = content.replace(/bg-white\s+dark:glass(-dialog)?\b/g, 'bg-theme-card border border-theme-border');
    content = content.replace(/not-dark:bg-white\s+dark:glass\b/g, 'bg-theme-card border border-theme-border');
    content = content.replace(/not-dark:bg-white\s+dark:bg-gradient-to-br\s+dark:from-zinc-800\/70\s+dark:to-zinc-900\/50\s+border\s+border-zinc-300\s+dark:border-zinc-800/g, 'bg-theme-card border border-theme-border');
    content = content.replace(/not-dark:bg-white\s+dark:bg-gradient-to-br\s+dark:from-zinc-800\/70\s+dark:to-zinc-900\/50/g, 'bg-theme-card');
    content = content.replace(/bg-white\s+dark:bg-zinc-950(\s+dark:bg-gradient-to-br.*?)?\s+border\s+border-zinc-300\s+dark:border-zinc-800/g, 'bg-theme-card border border-theme-border');
    content = content.replace(/bg-white\s+dark:bg-zinc-950/g, 'bg-theme-card border border-theme-border');
    content = content.replace(/bg-white\s+dark:bg-zinc-900/g, 'bg-theme-card border border-theme-border');
    content = content.replace(/bg-white/g, 'bg-theme-card'); // Fallback for pure white
    
    // Replace hardcoded backgrounds that meant to be surface
    content = content.replace(/bg-gray-50\s+dark:bg-\[#0a0a1a\]/g, 'bg-theme-bg');
    content = content.replace(/bg-zinc-50\s+dark:bg-white\/\[0\.04\]/g, 'bg-theme-surface');
    content = content.replace(/bg-zinc-50\s+dark:bg-theme-surface/g, 'bg-theme-surface');
    content = content.replace(/bg-zinc-50\s+dark:bg-zinc-800\/40/g, 'bg-theme-surface');
    content = content.replace(/bg-zinc-100\s+dark:bg-zinc-800/g, 'hover:bg-theme-surface hover:brightness-110');
    content = content.replace(/bg-zinc-200\s+dark:bg-white\/\[0\.06\]/g, 'bg-theme-surface');
    content = content.replace(/bg-zinc-200\s+dark:bg-theme-surface/g, 'bg-theme-surface');
    content = content.replace(/bg-gray-100\s+dark:bg-white\/\[0\.08\]/g, 'bg-theme-surface');
    content = content.replace(/bg-gray-200\s+dark:bg-white\/\[0\.06\]/g, 'bg-theme-surface');
    content = content.replace(/bg-gray-200\s+dark:bg-white\/10/g, 'bg-theme-surface');

    // Replace text colors
    content = content.replace(/text-gray-900\s+dark:text-slate-100/g, 'text-theme-text');
    content = content.replace(/text-gray-900\s+dark:text-white\/90/g, 'text-theme-text');
    content = content.replace(/text-gray-900\s+dark:text-white/g, 'text-theme-text');
    content = content.replace(/text-zinc-900\s+dark:text-white\/90/g, 'text-theme-text');
    content = content.replace(/text-zinc-900\s+dark:text-white\/80/g, 'text-theme-text');
    content = content.replace(/text-zinc-900\s+dark:text-zinc-300/g, 'text-theme-text');
    content = content.replace(/text-zinc-900\s+dark:text-zinc-200/g, 'text-theme-text');
    content = content.replace(/text-zinc-900\s+dark:text-white/g, 'text-theme-text');
    content = content.replace(/text-zinc-800\s+dark:text-white\/80/g, 'text-theme-text');
    content = content.replace(/text-zinc-800\s+dark:text-white\/85/g, 'text-theme-text');
    content = content.replace(/text-zinc-800\s+dark:text-white/g, 'text-theme-text');
    content = content.replace(/text-gray-800\s+dark:text-white\/90/g, 'text-theme-text');
    content = content.replace(/text-gray-800\s+dark:text-white\/80/g, 'text-theme-text');
    content = content.replace(/text-gray-800\s+dark:text-white\/70/g, 'text-theme-text-sub');
    
    content = content.replace(/text-gray-600\s+dark:text-white\/50/g, 'text-theme-text-sub');
    content = content.replace(/text-zinc-600\s+dark:text-white\/50/g, 'text-theme-text-sub');
    content = content.replace(/text-zinc-600\s+dark:text-white\/40/g, 'text-theme-text-sub');
    content = content.replace(/text-zinc-600\s+dark:text-zinc-400/g, 'text-theme-text-sub');
    content = content.replace(/text-zinc-500\s+dark:text-white\/40/g, 'text-theme-text-sub');
    content = content.replace(/text-zinc-500\s+dark:text-white\/50/g, 'text-theme-text-sub');
    content = content.replace(/text-zinc-500\s+dark:text-zinc-400/g, 'text-theme-text-sub');
    content = content.replace(/text-gray-500\s+dark:text-white\/50/g, 'text-theme-text-sub');
    content = content.replace(/text-gray-500\s+dark:text-white\/40/g, 'text-theme-text-sub');
    content = content.replace(/text-gray-500\s+dark:text-white\/35/g, 'text-theme-text-sub');
    content = content.replace(/text-gray-700\s+dark:text-white\/80/g, 'text-theme-text');
    content = content.replace(/text-gray-700\s+dark:text-white\/60/g, 'text-theme-text-sub');
    content = content.replace(/text-zinc-700\s+dark:text-white\/90/g, 'text-theme-text');
    content = content.replace(/text-zinc-700\s+dark:text-white\/80/g, 'text-theme-text');
    content = content.replace(/text-zinc-700\s+dark:text-white\/40/g, 'text-theme-text-sub');

    // Inputs/Selects
    content = content.replace(/dark:glass-input/g, 'bg-theme-surface border-theme-border');
    content = content.replace(/dark:glass-select/g, 'bg-theme-surface border-theme-border');
    content = content.replace(/bg-zinc-100\s+dark:bg-zinc-800/g, 'bg-theme-surface border-theme-border');
    content = content.replace(/bg-zinc-100/g, 'bg-theme-surface');

    // Buttons
    content = content.replace(/dark:btn-glass-secondary/g, 'bg-theme-card border-theme-border hover:brightness-110');
    content = content.replace(/dark:btn-glass-primary/g, 'bg-theme-accent text-white hover:opacity-90');

    // Borders
    content = content.replace(/border-zinc-200\s+dark:border-white\/\[0\.06\]/g, 'border-theme-border');
    content = content.replace(/border-zinc-300\s+dark:border-zinc-800/g, 'border-theme-border');
    content = content.replace(/border-zinc-300\s+dark:border-transparent/g, 'border-theme-border');
    content = content.replace(/border-zinc-300\s+dark:border-white\/\[0\.04\]/g, 'border-theme-border');
    content = content.replace(/border-gray-200\s+dark:border-white\/\[0\.06\]/g, 'border-theme-border');
    content = content.replace(/border-gray-200\s+dark:border-transparent/g, 'border-theme-border');
    content = content.replace(/border-gray-300\s+dark:border-transparent/g, 'border-theme-border');
    content = content.replace(/border-gray-300\s+dark:border-white\/\[0\.06\]/g, 'border-theme-border');

    if (content !== original) {
        fs.writeFileSync(filePath, content);
        console.log(`Updated ${filePath}`);
    }
}

walkDir('./src', processFile);
