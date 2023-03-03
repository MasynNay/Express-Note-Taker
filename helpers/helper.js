const fs = require("fs");
const util = require("util");

const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', function(err, data) {
    if (err) {
        console.log(err);
    } else {
        let parsedData = JSON.parse(data);
        if (!Array.isArray(parsedData)) {
            parsedData = []; // initialize as an empty array
        }
        parsedData.push(content); // use push method to add newNote to parsedData
        fs.writeFile(file, JSON.stringify(parsedData), function(err) {
            if (err) {
                console.log(err);
            }
        });
    }});
};

module.exports = { readFromFile, writeToFile, readAndAppend };
