const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');
const os = require('os');

/**
 * Superpowers for Antigravity - Integration Test
 * Verifies that the cross-platform setup script (scripts/init.js) correctly
 * initializes a target project directory with the requisite Antigravity-native files.
 */

console.log('🧪 Starting Antigravity Installer Integration Test...\n');

// Set up temporary environment
const tmpDir = fs.mkdtempSync(path.join(os.tmpdir(), 'superpowers-test-'));
const projectRoot = path.resolve(__dirname, '..');
const initScript = path.join(projectRoot, 'scripts', 'init.js');

try {
    console.log(`📦 Created temporary test directory: ${tmpDir}`);

    // Create a mock package.json in tmp dir to simulate a real project
    fs.writeFileSync(path.join(tmpDir, 'package.json'), JSON.stringify({ name: "mock-project" }));

    // Execute the installer within the temp directory
    console.log(`⚙️ Executing installer: node ${initScript}`);
    execSync(`node "${initScript}"`, { cwd: tmpDir, stdio: 'inherit' });

    // Verification Suite
    console.log('\n🔍 Verifying installation outputs...');
    let testsFailed = 0;

    const requiredPaths = [
        '.agent/skills/using-superpowers/SKILL.md',
        '.agent/skills/brainstorming/SKILL.md',
        '.agent/workflows/brainstorm.md',
        '.gemini/GEMINI.md',
        'PROJECT_RULES.md',
        'SUPERPOWER-STYLE.md'
    ];

    requiredPaths.forEach(expectedPath => {
        const fullPath = path.join(tmpDir, expectedPath);
        if (fs.existsSync(fullPath)) {
            console.log(`  ✅ [PASS] Found: ${expectedPath}`);
        } else {
            console.error(`  ❌ [FAIL] Missing: ${expectedPath}`);
            testsFailed++;
        }
    });

    if (testsFailed > 0) {
        console.error(`\n💥 Test Failed: ${testsFailed} components were missing from the installation.`);
        process.exit(1);
    } else {
        console.log('\n🎉 All automated installer tests passed successfully!');
    }

} catch (err) {
    console.error('\n❌ Test execution failed with error:', err.message);
    process.exit(1);
} finally {
    console.log(`\n🧹 Cleaning up temporary directory: ${tmpDir}`);
    fs.rmSync(tmpDir, { recursive: true, force: true });
}
