const express = require("express");
const router = express.Router();

// DB Access Objects
const usersDao = require("../modules/users-dao.js");
const postsDao = require("../modules/posts-dao.js");
const filesDao = require("../modules/files-dao.js");

// authentication
const { addUserToLocals, verifyAuthenticated } = require("../middleware/auth-middleware.js");

// toast messages
const toaster = require("../middleware/toaster-middleware.js");
router.use(toaster);


/* Routes */

router.get("/home", addUserToLocals, verifyAuthenticated, async function (req, res) {

    res.locals.title = "Team Hardy Herons!";
    if (res.locals.user != undefined) {
        // display avatar
        let avatar = await usersDao.retrieveAvatarFromId(res.locals.user.avatar);
        res.locals.avatar = avatar;    
    }

    const allPosts = await postsDao.retrieveAllPosts();

    res.locals.allPosts = allPosts;


    res.render("home");
});

// landing page 
router.get("/", addUserToLocals, async function (req, res) {

    res.locals.title = "Team Hardy Herons!";
    // show all posts on home page
    const allPosts = await postsDao.retrieveAllPosts();
    res.locals.allPosts = allPosts;

    res.render("home");
});


module.exports = router;