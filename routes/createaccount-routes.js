// Set up express and import modules
const express = require("express");
const router = express.Router();
// authToken creation
const { v4: uuid } = require("uuid");

// DB Access Objects
const usersDao = require("../modules/users-dao.js");

// password
const { hashSaltNewPwd } = require("../modules/password.js");

// toast messages
const toaster = require("../middleware/toaster-middleware.js");
router.use(toaster);

/************************************************************* */

/* Render sign-up page */
router.get("/createaccount*", async function (req, res) {
    res.locals.title = "Create a User Account";
    // retrieve all avatars for user to choose from
    res.locals.allAvatars = await usersDao.retrieveAllAvatars();
    res.render("createaccount");
});

/* Retrieve all users to check username against */
router.get("/services/users/usernames", async function (req, res) {

    const users = await usersDao.retrieveAllUsers();

    // get just the usernames from the returned users list
    var usernames = [];

    for (let i = 0; i < users.length; i++) {
        usernames.push(users[i].username);
    }

    res.json(usernames);
});


/* Submit create account form */
router.post("/createaccount*", async function (req, res) {
    res.locals.title = "Create a User Account";
    // create new authToken
    const authToken = uuid();

    // convert avatar name to id for user table in db
    const avatarName = req.body.avatar;
    const avatar = await usersDao.retrieveAvatarFromName(avatarName);
    const avatarID = avatar.id;

    // get sign up details from form
    const user = {
        username: req.body.username,
        password: req.body.password,
        fname: req.body.fname,
        lname: req.body.lname,
        doB: req.body.doB,
        description: req.body.description,
        authToken: authToken,
        avatar: avatarID
    };

    // create new user in db, redirect to login if successful
    try {
        const success = await hashSaltNewPwd(user);
        res.cookie("authToken", authToken);
        res.setToastMessage("Account creation successful. Please login using your new credentials.");
        res.redirect("./login");
    }
    catch (err) {
        res.setToastMessage("Whoops, dunno what happened there. Try again!");
        // redirect to try again
        res.redirect("./createaccount");
    }
});

module.exports = router;