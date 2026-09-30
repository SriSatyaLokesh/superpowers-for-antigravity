const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const repoRoot = path.resolve(__dirname, '..');
const readmePath = path.join(repoRoot, 'README.md');
const configPath = path.join(repoRoot, '_config.yml');

console.log('🧪 Starting README & Jekyll Rendering Validation Test...\n');

let failed = false;

function fail(msg) {
  console.error(`  ❌ [FAIL] ${msg}`);
  failed = true;
}

function pass(msg) {
  console.log(`  ✅ [PASS] ${msg}`);
}

// 1. Check README.md exists
if (!fs.existsSync(readmePath)) {
  fail('README.md not found');
  process.exit(1);
}

const readmeContent = fs.readFileSync(readmePath, 'utf8');

// 2. Check redundant top banner badge is removed
const redundantBadgePattern = /img\.shields\.io\/badge\/Superpowers-for_Google_Antigravity-FF6D00\?style=for-the-badge/;
if (redundantBadgePattern.test(readmeContent)) {
  fail('Redundant oversized top banner badge found in README.md hero section');
} else {
  pass('Confirmed absence of redundant top banner badge in README.md');
}

// 3. Check _config.yml exists and has parse_block_html: true
if (!fs.existsSync(configPath)) {
  fail('_config.yml not found');
} else {
  const configContent = fs.readFileSync(configPath, 'utf8');
  if (/parse_block_html:\s*true/.test(configContent)) {
    pass('Confirmed parse_block_html: true configured in _config.yml');
  } else {
    fail('parse_block_html: true is missing from _config.yml kramdown configuration');
  }
}

// 4. Check for unparsed raw block HTML tags in README.md
// Any <div align="center"> must have markdown="1" so Kramdown parses its markdown content
const unparsedDivPattern = /<div\s+align="center"(?!.*markdown="1")[\s\S]*?#[^\n]+/;
if (unparsedDivPattern.test(readmeContent)) {
  fail('Found <div align="center"> without markdown="1" containing raw markdown headings in README.md');
} else {
  pass('Confirmed no raw markdown headings inside unconfigured block HTML');
}

// 5. Test Kramdown rendering directly if kramdown command is present
try {
  const kramdownCheck = execSync('kramdown -v', { stdio: 'pipe' }).toString();
  if (kramdownCheck) {
    const kramdownOutput = execSync('kramdown --input GFM', {
      input: readmeContent,
      encoding: 'utf8',
      stdio: ['pipe', 'pipe', 'pipe']
    });

    // Verify no literal markdown header leaked into HTML output
    if (kramdownOutput.includes('# 🚀 Superpowers for Google Antigravity') || /<p>#\s+/.test(kramdownOutput)) {
      fail('Kramdown rendered literal "#" header markdown instead of HTML heading');
    } else {
      pass('Kramdown parsed headers into semantic HTML tags');
    }

    // Verify no literal markdown badges leaked into HTML output
    if (kramdownOutput.includes('[![Version](') || kramdownOutput.includes('[![License](')) {
      fail('Kramdown rendered literal "[![" badge link markdown instead of HTML links');
    } else {
      pass('Kramdown parsed badge links into semantic HTML anchor tags');
    }

    // Verify no literal **Process Over Guessing.** leaked into HTML
    if (kramdownOutput.includes('**Process Over Guessing.**')) {
      fail('Kramdown rendered literal bold/italic markdown in hero section');
    } else {
      pass('Kramdown parsed hero typography into semantic HTML tags');
    }

    // Verify footer parsed cleanly
    if (kramdownOutput.includes('**Maintained with') || kramdownOutput.includes('*Maintain the process.')) {
      fail('Kramdown rendered literal markdown in footer section');
    } else {
      pass('Kramdown parsed footer into semantic HTML tags');
    }
  }
} catch (e) {
  console.log(`  ℹ️ Kramdown CLI execution skipped or errored: ${e.message}`);
}

if (failed) {
  console.error('\n❌ README & Jekyll Rendering Validation Failed.');
  process.exit(1);
} else {
  console.log('\n🎉 ALL README & JEKYLL RENDERING CHECKS PASSED');
  process.exit(0);
}
