const SQL = require("sql-template-strings");
const dbPromise = require("./database.js");

async function uploadFileDetails(fileName, userId) {
    const db = await dbPromise;
    // let success = false;

    const newFile = db.run(SQL`insert into files (fileName, userId) values 
    (${fileName}, ${userId})`);
    newFile.id = newFile.lastID;
    return newFile;
};

async function retrieveAllFiles(){
    const db = await dbPromise;
    const allFiles = db.all(SQL`select * from files`);
    return allFiles;
};


async function retrieveFilesByUser(userId){
    const db = await dbPromise;
    const files = db.all(SQL`select * from files where userId = ${userId}`);
    return files;
};


module.exports = {
    uploadFileDetails,
    retrieveAllFiles,
    retrieveFilesByUser
};