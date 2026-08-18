import fs from 'fs';

const lines = fs.readFileSync('src/site-pages/Home.tsx', 'utf8').split('\n');

// Remove lines 876 to 1072 (1-indexed → 0-indexed: 875 to 1071 inclusive)
const start = 875; // 0-indexed
const end = 1071;  // 0-indexed inclusive

const newLines = [...lines.slice(0, start), ...lines.slice(end + 1)];

// Also clean up the return block
let content = newLines.join('\n');

// Update the return block: remove CriticalAssistanceSection call
content = content.replace(/<CriticalAssistanceSection \/>\s*\n/g, '');
content = content.replace(/<AtelierMaintenanceSection \/>\s*\n/g, '');
content = content.replace(/<TimelineSection \/>\s*\n/g, '');
content = content.replace(/<PillarsSection \/>\s*\n/g, '');

fs.writeFileSync('src/site-pages/Home.tsx', content);
console.log('Done. Lines:', content.split('\n').length);
