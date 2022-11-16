// Set up express and import modules
const express = require("express");
const router = express.Router();

// DB Access Objects
const usersDao = require("../modules/users-dao.js");
const postsDao = require("../modules/posts-dao.js");


// authentication & password
const { addUserToLocals, verifyAuthenticated } = require("../middleware/auth-middleware.js");
const { hashSaltChangedPwd } = require("../modules/password.js");

// toast messages
const toaster = require("../middleware/toaster-middleware.js");
router.use(toaster);

/*********************************************************** */

/**
 * User account admin page 
 */
router.get("/admin*", addUserToLocals, verifyAuthenticated, async function (req, res) {

    res.locals.title = "User Account";
    const userId = res.locals.user.id;

    //- show all of the user's own posts
    const posts = await postsDao.retrievePostsFromUsername(userId);
    res.locals.posts = posts;

    res.render("admin");
});


/**
 * Retrieve all users to check username against
 */
router.get("/services/users/usernames", async function (req, res) {

    const users = await usersDao.retrieveAllUsers();

    // get just the usernames from the returned users list
    var usernames = [];

    for (let i = 0; i < users.length; i++) {
        usernames.push(users[i].username);
    }

    res.json(usernames);
});

/**
 * Render Edit Account page
 */

router.get("/editAccount", addUserToLocals, verifyAuthenticated, async function (req, res) {

    res.locals.title = "Edit user account";

    // retrieve all avatars for user to choose from
    res.locals.allAvatars = await usersDao.retrieveAllAvatars();

    res.render("editAccount");
});


/**
 * Submit edit account form
 */

router.post("/editAccount", addUserToLocals, verifyAuthenticated, async function (req, res) {

    // Need the existing userId and the new user details to update
    // If a user has left some fields blank, then these shouldn't be updated to blank and should instead retain the old value

    // get password from the form, hash & salt
    const changedPwd = req.body.password;
    const hashedChangedPwd = await hashSaltChangedPwd(changedPwd);

    // convert avatar selection to id
    const avatarName = req.body.avatar;
    const avatar = await usersDao.retrieveAvatarFromName(avatarName);
    const avatarID = avatar.id;

    // updated user account details from the form
    const user = {
        id: res.locals.user.id,
        username: req.body.username,
        password: hashedChangedPwd,
        fname: req.body.fname,
        lname: req.body.lname,
        doB: req.body.doB,
        description: req.body.description,
        authToken: res.locals.user.authToken,
        avatar: avatarID
    };

    console.log("Current res.locals.user:", res.locals.user);

    // update user in db
    await usersDao.updateUser(user);
    res.locals.user = user;

    console.log("Changed res.locals.user:", res.locals.user);
    // Success message
    res.setToastMessage("Account details changed successfully!");
    res.redirect("/");
});


/**
 * Delete account 
 */

router.get("/deleteAccount", async function (req, res) {

    // Delete user and associated posts and comments from the database
    await usersDao.deleteUser(res.locals.user.id);
    // Clear authToken from cookies
    res.clearCookie("authToken");
    res.locals.user = null;

    res.setToastMessage("Your account has now been deleted");
    res.redirect("./");
});


module.exports = router;