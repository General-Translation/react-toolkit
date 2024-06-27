const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

// Function to update version number
function updateVersion(callback) {
    const packageJson = require('./package.json');
    const versionParts = packageJson.version.split('.');
    versionParts[2] = (parseInt(versionParts[2], 10) + 1).toString();
    packageJson.version = versionParts.join('.');

    fs.writeFile('package.json', JSON.stringify(packageJson, null, 2), (err) => {
        if (err) {
            console.error(`Error updating package.json: ${err.message}`);
            return;
        }
        callback();
    });
}

// Function to delete dist directory
function deleteDist(callback) {
    const distPath = path.join(__dirname, 'dist');
    fs.rm(distPath, { recursive: true, force: true }, (err) => {
        if (err) {
            console.error(`Error deleting dist directory: ${err.message}`);
            return;
        }
        callback();
    });
}

// Function to run transpile
function runTranspile(callback) {
    exec('npm run transpile', (error, stdout, stderr) => {
        if (error) {
            console.error(`Error running transpile: ${error.message}`);
            return;
        }
        if (stderr) {
            console.error(`stderr: ${stderr}`);
            return;
        }
        console.log(`stdout: ${stdout}`);
        callback();
    });
}

// Execute the steps in sequence
updateVersion(() => {
    deleteDist(() => {
        runTranspile(() => {
        });
    });
});
