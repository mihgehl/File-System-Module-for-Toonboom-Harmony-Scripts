/**
 * @file File System module for Toonboom Harmony Scripts
 * @copyright comadrejo
 * @author mihgehl < github.com/mihgehl >
 */

function readJSON(filename) {
    var file = new File(filename);
    try {
        if (file.exists) {
            file.open(FileAccess.ReadOnly);
            var string = file.read();
            file.close();
            return JSON.parse(string);
        }
    } catch (err) {}
    return null;
}

function saveConfigFile(configFile, data) {
    var newFile = new File(configFile);
    try {
        newFile.open(2);
        newFile.write(JSON.stringify(data, null, 2));
        newFile.close();
    } catch (error) {
        $.log(error);
    }
}

function loadConfigFile(configFile) {
    var newFile = new File(configFile);
    try {
        newFile.open(1);
        var data = newFile.read();
        newFile.close();
    } catch (error) {
        newFile.open(2);
        newFile.write(JSON.stringify({}, null, 2));
        newFile.close();
        newFile.open(1);
        var data = newFile.read();
        newFile.close();
    }
    return JSON.parse(data);
}

function readFile(filename) {
    try {
        var currentFile = new QFile(filename);
        if (currentFile.exists) {
            currentFile.open(QIODevice.ReadOnly);
            var data = currentFile.readAll();
            currentFile.close();
            return data;
        }
    } catch (err) {}
    return null;
}

/**
 *
 * @param { string } folderPath
 */
function openFolder(folderPath) {
    QDesktopServices.openUrl(QUrl.fromLocalFile(folderPath));
}

/**
 * File data fetcher script for Toonboom Harmony
 * @author mihgehl < github.com/mihgehl >
 * @param { string } absFilePath Absolute path of the file
 */
function fetchData(absFilePath) {
    var readFile = new QFile(absFilePath);
    try {
        if (!readFile.open(QIODevice.ReadOnly)) {
            throw new Error("Unable to open file.");
        }
        var data = readFile.readAll();
        return data;
    } catch (err) {
        MessageLog.trace(err);
    } finally {
        readFile.close();
    }
}

exports.readJSON = readJSON;
exports.saveConfigFile = saveConfigFile;
exports.loadConfigFile = loadConfigFile;
exports.openFolder = openFolder;
exports.readFile = readFile;
exports.fetchData = fetchData;
