# Installing Superpowers for Antigravity

This guide explains how to install Superpowers into a project's workspace, globally on your machine, or as a native Antigravity plugin.

---

## ⚡ Quick Install (Recommended)

Install Superpowers as a native Antigravity plugin from this repository:

```bash
agy plugin install https://github.com/SriSatyaLokesh/superpowers-for-antigravity
```

Antigravity discovers the skills from the plugin manifest in `.antigravity-plugin/plugin.json`. Reinstall with the same command to update.

Verify:

```bash
agy plugin list
agy plugin validate .
```

---

## 🏗️ Workspace Installation (Manual)

Workspace skills live in `.agents/skills/`. That is the default path Antigravity scans, and the only path the `agy` CLI scans. The older `.agent/skills` layout is kept only for backward compatibility in the Antigravity App.

### 🪟 Windows (PowerShell)
Run these commands from the root of your project:

```powershell
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git powers-staging

xcopy /E /I powers-staging\.agents .agents
xcopy /E /I powers-staging\adapters adapters
copy powers-staging\PROJECT_RULES.md .\
copy powers-staging\SUPERPOWER-STYLE.md .\
copy powers-staging\GEMINI.md .\

Remove-Item -Path "powers-staging" -Recurse -Force
```

### 🐧 Linux / Mac (Bash)
Run these from your project root:

```bash
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git powers-staging

cp -r powers-staging/.agents ./
cp -r powers-staging/adapters ./
cp powers-staging/PROJECT_RULES.md ./
cp powers-staging/SUPERPOWER-STYLE.md ./
cp powers-staging/GEMINI.md ./

rm -rf powers-staging
```

> If your project already has a `GEMINI.md`, prefer `npx github:SriSatyaLokesh/superpowers-for-antigravity`. The npx installer appends a marked Superpowers block instead of replacing the file.

---

## 🌍 Global Installation

Global skills in `~/.gemini/config/skills/` are recognized by the Antigravity App, the Antigravity IDE, and the `agy` CLI.

### 🪟 Windows (PowerShell)
```powershell
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git "$env:USERPROFILE\.agents\superpowers"

New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.gemini\config\skills" | Out-Null
Copy-Item -Recurse -Force "$env:USERPROFILE\.agents\superpowers\.agents\skills\*" "$env:USERPROFILE\.gemini\config\skills\"
```

### 🐧 Linux / Mac (Bash)
```bash
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git ~/.agents/superpowers

mkdir -p ~/.gemini/config/skills
cp -r ~/.agents/superpowers/.agents/skills/* ~/.gemini/config/skills/
```

---

## 🔍 Understanding the Paths

- **`.agents/skills/`**: Workspace skills. Antigravity scans this directory automatically and turns every skill into a slash command.
- **`.agents/workflows/`**: Legacy slash-command aliases (`/brainstorm`, `/plan`, …). Skills are the preferred mechanism; workflows remain for older surfaces.
- **`GEMINI.md`**: The workspace bootstrap. It uses `@` references so the agent reads `using-superpowers`, the Antigravity tool bindings, `PROJECT_RULES.md`, and `SUPERPOWER-STYLE.md`.
- **`PROJECT_RULES.md`**: The process constitution.
- **`SUPERPOWER-STYLE.md`**: Communication and documentation standards.

## 🚀 Verify Installation

Start the Antigravity CLI in the project and list the skills:

```bash
agy
/skills
```

You should see the 24 Superpowers skills. In the Antigravity App, open the Customizations menu in the agent side panel.
