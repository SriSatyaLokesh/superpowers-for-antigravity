# Installing Superpowers for Antigravity

This guide explains how to install Superpowers specifically into your project's local directory or globally on your machine.

---

## ⚡ Quick Install (Recommended)
The fastest way to install Superpowers into any project is via `npx`. This automatically downloads the latest library and sets up everything in your current directory.

```bash
# Run this from your project root
npx github:SriSatyaLokesh/superpowers-for-antigravity
```

---

## 🏗️ Local Installation (Manual)
If you prefer not to use `npx`, you can manually copy the engineering rules and skills into your repository.

### 🪟 Windows (PowerShell)
Run these commands from the root of your project:

```powershell
# 1. Download Superpowers to a temporary staging folder
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git powers-staging

# 2. Copy core components into your project's root directory (.\)
xcopy /E /I powers-staging\.agent .agent
xcopy /E /I powers-staging\.gemini .gemini
xcopy /E /I powers-staging\adapters adapters
copy powers-staging\PROJECT_RULES.md .\
copy powers-staging\SUPERPOWER-STYLE.md .\

# 3. Remove the staging folder
Remove-Item -Path "powers-staging" -Recurse -Force
```

### 🐧 Linux / Mac (Bash)
Run these from your project root:

```bash
# 1. Download Superpowers to a temporary staging folder
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git powers-staging

# 2. Copy core components into your project's root directory (./)
cp -r powers-staging/.agent ./
cp -r powers-staging/.gemini ./
cp -r powers-staging/adapters ./
cp powers-staging/PROJECT_RULES.md ./
cp powers-staging/SUPERPOWER-STYLE.md ./

# 3. Remove the staging folder
rm -rf powers-staging
```

---

## 🌍 Global Installation
This makes Superpowers available to Antigravity in **every project** you open on your machine without needing to copy files into every repo.

### 🪟 Windows (PowerShell)
```powershell
# 1. Clone to a permanent location in your user profile
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git "$env:USERPROFILE\.agents\superpowers"

# 2. Create the global skills link
New-Item -ItemType Directory -Force -Path "$env:USERPROFILE\.agents\skills"
cmd /c mklink /J "$env:USERPROFILE\.agents\skills\superpowers" "$env:USERPROFILE\.agents\superpowers\.agent\skills"
```

### 🐧 Linux / Mac (Bash)
```bash
# 1. Clone to your home directory
git clone https://github.com/SriSatyaLokesh/superpowers-for-antigravity.git ~/.agents/superpowers

# 2. Create the global skills link
mkdir -p ~/.agents/skills
ln -s ~/.agents/superpowers/.agent/skills ~/.agents/skills/superpowers
```

---

## 🔍 Understanding the Paths

-   **`./` or `.\`**: This represents your **current project directory**. When you run the copy commands, Superpowers is installed directly into your open project.
-   **Staging Folders (`powers-staging`)**: We clone into a temporary folder first because running `git clone` directly into an existing project would cause a "git-within-git" conflict. We copy only what we need and then delete the temporary folder.
-   **`.agent` folder**: This is where Antigravity looks for custom **Skills** and **Workflows**.
-   **`.gemini` folder**: This contains the core instructions that tell the AI how to use Superpowers.

## 🚀 Verify Installation

Start your Antigravity agent and type:
> `/help`

If you see the **Mission Control Overview**, the installation was successful!
