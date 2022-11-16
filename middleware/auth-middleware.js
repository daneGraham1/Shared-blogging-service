const usersDao = require("../modules/users-dao.js");

async function addUserToLocals(req, res, next) {
    if (req.cookies.authToken != undefined) {
        const user = await usersDao.retrieveUserWithAuthToken(req.cookies.authToken);

        if (user != undefined) {
            res.locals.user = user;
            const avID = user.avatar;
            const avatar = await usersDao.retrieveAvatarFromId(avID);
            res.locals.avatar = avatar;
        };
        next();
    } else {
        next();
    }
};


function verifyAuthenticated(req, res, next) {
    if (res.locals.user != undefined) {
        
        next();
    }
    else {
        res.redirect("./login");
        // res.send("unverified");
    }
}

module.exports = {
    addUserToLocals,
    verifyAuthenticated
}