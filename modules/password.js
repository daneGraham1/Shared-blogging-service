const bcrypt = require("bcrypt");
const saltRounds = 10;

const usersDao = require("../modules/users-dao.js");


async function hashSaltNewPwd(user) {
    const hashedPwd = await bcrypt.hash(user.password, saltRounds).then(function (hash) {
        // console.log(`Password hash: ${hash}`);
        return hash;
    });
    user.password = hashedPwd;
    let createdUserOk;
    try {
        await usersDao.createUser(user);
        createdUserOk = true;
    }
    catch (err) {
        console.log(err);
        createdUserOk = false;
       }
    return createdUserOk;
};


async function hashSaltChangedPwd(changedPwd) {
    const hashedChgdPwd = await bcrypt.hash(changedPwd, saltRounds).then(function (hash) {
        // console.log(`Changed Password: changed hash: ${hash}`);
        return hash;
    });
    return hashedChgdPwd;
};

async function checkPwd(username, password) {
    const userPwd = await usersDao.retrieveUserPassword(username);
    
    const hashedPwd = userPwd.password;
    const match = await bcrypt.compare(password, hashedPwd);

    // console.log(`match: ${match}`);
    if (match) {

        const user = await usersDao.retrieveUserWithCredentials(username, hashedPwd);
        return user;
    };

};

module.exports = {
    hashSaltNewPwd,
    hashSaltChangedPwd,
    checkPwd
};