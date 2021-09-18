# 🚇🌊 Metronami
[![CodeQL](https://github.com/hiyamashu/Metronami/actions/workflows/codeql-analysis.yml/badge.svg)](https://github.com/hiyamashu/Metronami/actions/workflows/codeql-analysis.yml)
[![ESLint](https://github.com/hiyamashu/Metronami/actions/workflows/eslint.yml/badge.svg)](https://github.com/hiyamashu/Metronami/actions/workflows/eslint.yml)

An open source Public Transport network manager for roleplay and fantasy worlds
 
## Installation
**Step 1:** Required dependencies to install:
- NodeJS (LTS) - [Download](https://nodejs.org/en/)
  - Leave all settings to default
  - Right after 'Custom Setup', 'Tools for Natives Modules' screen will be shown. Make sure you check the box for 'Automatically install the neccessary tools. Note that this will also install Chocolatey.'
- Python (3 or higher; Select **'Add to PATH'** during install) - [Download](https://www.python.org/downloads/)

**Step 1.1 (Only do this if you encounter problems in Step 3):**
Chocolatey would have already done this step automatically for you. Only do this if you encounter a missing dependency error when trying to start Metronami in step 3.
- Install Visual Studio Build Tools 2017 manually
  - You must have NodeJS installed first
  - Open a terminal window (for windows, search Powershell; Open it with Administrator) and type `choco install visualstudio2017buildtools`. Press enter and wait for installation to be completed.

**Step 2:** Get the latest Metronami Loader release [here](https://github.com/hiyamashu/Metronami-Loader/releases). Only select pre-release versions if you want to participate in early-release testing. Download links can be found under assets, `Source code (zip)`.

**Step 3:** Open `start-metronami-loader.cmd` (For Windows) or `start-metronami-loader.sh` (For macOS & Linux) to start Metronami.

## Legal
Metronami is licensed under the GPL-3.0 license. A copy may be found in `LICENSE` file for your reference.
