// Set up express and import modules
const express = require("express");
const router = express.Router();
// authToken creation
const { v4: uuid } = require("uuid");

// DB Access Objects
const usersDao = require("../modules/users-dao.js");

// password
const { checkPwd } = require("../modules/password.js");

// toast messages
const toaster = require("../middleware/toaster-middleware.js");
router.use(toaster);

/************************************************************* */

/* Login page */
// Whenever we navigate to /login, if we're already logged in, redirect to "/".
// Otherwise, render the "login" view.
router.get("/login", function (req, res) {
    if (res.locals.user != undefined) {
        res.redirect("/");
    } else {
        res.locals.title = "Sign In";
        res.render("login");
    }
});

/* Login submit */
// Whenever we POST to /login, check the username and password submitted by the user.
// If they match a user in the database, give that user an authToken, save the authToken
// in a cookie, and redirect to "/home". Otherwise, redirect to "/login".
router.post("/login", async function (req, res) {

    res.locals.title = "Sign In";
    const username = req.body.username;
    const password = req.body.password;

    /* IF PASSWORD STORED AS PLAINTEXT: */
        // Find a matching user in the database
        // const user = await usersDao.retrieveUserWithCredentials(username, password); 

    /* IF PASSWORD HASHED & SALTED:  */
    const user = await checkPwd(username, password);

    // If there is a matching user...
    if (user != undefined) {
        // Auth success - give that user an authToken
        const authToken = uuid();
        user.authToken = authToken;
        // look up user's avatar & add to locals
        let avatarID = user.avatar;
        let avatar = await usersDao.retrieveAvatarFromId(avatarID);
        res.locals.avatar = avatar;
        // Save the authToken in a cookie and update user in db
        res.cookie("authToken", authToken);
        await usersDao.updateUserAuthToken(user.username, authToken);
        res.locals.user = user;
        // display success message and redirect to homepage
        res.setToastMessage("Log in successful! Welcome")
        res.redirect("./home");
    }

    // Otherwise, if there's no matching user...
    else {
        // Auth fail
        res.locals.user = null;
        res.setToastMessage("Authentification failed! Please try again");
        res.redirect("./login");
    }
});


/* Logout page */
// Whenever we navigate to /logout, delete the authToken cookie.
// redirect to "/login", supplying a "logged out successfully" message.
router.get("/logout", function (req, res) {
    res.clearCookie("authToken");
    res.locals.user = null;
    res.setToastMessage("Successfully logged out!");
    res.redirect("./");
});

module.exports = router;