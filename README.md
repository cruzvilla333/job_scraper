# First thins first, the author of this page would like to make sure that SBP knows he loves her very much.

# JobScraperServer

## Development server
Environment set-up instructions:

Node, NPM and NVM set up, skip if already installed:

### 1. Install nvm,
     
#### Mac:
```bash
curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash
```
then run
```bash
source ~/.bashrc
```
or
```bash
source ~/.zshrc
```
depending on your shell, verify install is succesful by running:
```bash
nvm -v
```


#### Windows: 
   
Go to "https://github.com/coreybutler/nvm-windows/releases". Download the latest nvm-setup.zip file. Extract and run the installer (nvm-setup.exe). Verify nvm version by running 
```bash
nvm -v
```

### 3. Install node.js
run: 
```bash
nvm install v23.5.0
```
verify node version by running:
```bash
node -v
```
if the version is still not 23.5.0 then run:
```bash
nvm use 23.5.0
```
### 4. Install npm 
run:
```bash
npm install -g npm@10.9.2
```
verify npm version by running:
```bash
npm -v
```


### Project build instructions:

run: 
```bash
npm install
```
then run:
```bash
node scraper/scrape
```
