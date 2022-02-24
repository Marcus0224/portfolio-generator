const fs = require('fs');
const { reject } = require('lodash');
const { resolve } = require('path/posix');

const writeFile = fileContent => {
    return new Promise((resolve, reject) => {
        fs.writeFile('./dist/index.html', fileContent, err => {
            //if there's an error, reject the Promis and send the error to the Promise's `.catch()` method
            if (err) {
                reject(err);
                //return out the function here to make sure the Promise doesn't accidentally execute the resolve() function as well
                return;
            }
            // if everything went well. resolve the Promis and send the successful data to the `.then()` method
            resolve({
                ok: true,
                message: 'File Created!'
            });
        });
    });
};

const copyFile = () => {
    return new Promise((resolve, reject) => {
        fs.copyFile('./src/style.css' , './dist/.style.css', err => {
            if (err) {
                reject(err);
                return;
            }
            resolve({
                ok: true,
                message: 'Stylesheet created'
            });
        });
    });
};

module.exports = {writeFile, copyFile };