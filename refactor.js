const fs = require('fs');
const path = '/Users/premkumar/Downloads/webpage of jeff ben copy 2/app/live-map/page.tsx';

let content = fs.readFileSync(path, 'utf8');

const startRegex = /\{selectedBus && !isDrawerClosed && \(\s*<motion\.div/m;
const endRegex = /<\/AnimatePresence>\s*<AnimatePresence>\s*\{isDrawerClosed && selectedBus && \(/m;

const startMatch = content.match(startRegex);
const endMatch = content.match(endRegex);

if (!startMatch || !endMatch) {
  console.log("Could not find markers.");
  console.log("Start Match: ", !!startMatch, "End Match: ", !!endMatch);
  process.exit(1);
}

const startIndex = startMatch.index;
const endIndex = endMatch.index;

const before = content.slice(0, startIndex);
const after = content.slice(endIndex);

const newPanel = `{selectedBus && !isDrawerClosed && (
          <TrackingStatusPanel 
            bus={selectedBus} 
            userLocation={userLocation}
            onClose={() => setSelectedBus(null)}
            onMinimize={() => setIsDrawerClosed(true)}
          />
        )}
      `;

const newContent = before + newPanel + after;
fs.writeFileSync(path, newContent);
console.log("Refactored successfully.");
