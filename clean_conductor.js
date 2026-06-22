const fs = require('fs');
const file = 'app/conductor/page.tsx';
let code = fs.readFileSync(file, 'utf8');

// remove handleBiometricSuccess
code = code.replace(/const handleBiometricSuccess = \(\) => \{[\s\S]*?playBeep\(true\);\n  \};/, '');

// replace handleLogout properly
code = code.replace(/const handleLogout = \(\) => \{[\s\S]*?setError\(""\);\n  \};/, '');

// remove showBiometricPrompt usage and related overlay
code = code.replace(/\{.*?Simulated Biometric Overlay[\s\S]*?<\/AnimatePresence>/, '');

fs.writeFileSync(file, code);
