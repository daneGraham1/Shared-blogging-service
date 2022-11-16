const express = require("express");
const router = express.Router();

// DB Access Objects
const postsDao = require("../modules/posts-dao.js");
// const filesDao = require("../modules/files-dao.js");

// authentication
const { addUserToLocals, verifyAuthenticated } = require("../middleware/auth-middleware.js");

const toaster = require("../middleware/toaster-middleware.js");
router.use(toaster);

const multer = require("multer");
// const upload = multer(
//     { "location": "/public/images/uploads/" },
//     { "fieldSize": 25 * 1024 * 1024 }

// );

const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, "./public/images/uploads/");
    },
    filename: (req, file, cb) => {
        const fileExtension = file.mimetype.split("/")[1];
        const uniqueFileName = `${nanoid(10)}-${Date.now()}.${fileExtension}`;
        cb(null, uniqueFileName);
    },
});

upload = multer({ storage: fileStorageEngine });


//Get the post to update
router.post("/admin", addUserToLocals, verifyAuthenticated, async function (req, res) {

    const updatePostId = req.body.postId;

    const post = await postsDao.retrievePostById(updatePostId);
    
    res.cookie("test", post);
    res.locals.post = post;

    res.render("updatePost");
});

//Update the post
router.post("/updatePost", addUserToLocals, verifyAuthenticated, upload.array("content", 4), async function (req, res) {
    
    const test2 = req.cookies.test
    console.log(test2);

    const postDetails = {
        content: req.body.content,
        userId: res.locals.user.id,
        title: req.body.title,
        id: req.cookies.test.id
    }

    const editedPost = await postsDao.updatePost(postDetails);

    res.clearCookie("test");

    res.redirect("/admin");
});


// Submit a new blog post
router.post("/submitPost", upload.array("content", 4), async function (req, res) {

    // retrieve post content from editor
    const postDetails = {
        content: req.body.content,
        userId: res.locals.user.id,
        title: req.body.title,
    }

    const newPost = await postsDao.createPost(postDetails);


 res.redirect("/home");
});


// Delete a blog post
router.post("/deletePost", addUserToLocals, verifyAuthenticated, async function (req, res) {

    const postId = parseInt(req.body.postId);
    const userId = res.locals.user.id;

    console.log("postId:", postId,
        "userId:", userId);

    const deletedPost = await postsDao.deletePost(postId, userId);

    res.redirect("/admin");

});


// retrieve comments on a post
router.get("/services/posts/comments", async function (req, res) {

    const comments = await postsDao.retrieveAllComments();

    res.json(comments);
});


// Submit a new comment
router.post("/submitComment", verifyAuthenticated, addUserToLocals,  async function (req, res) {

    const postId = parseInt(req.body.postId);
    const userId = res.locals.user.id;
    const comment = req.body.comment;
    console.log("postId:", postId,
        "userId:", userId,
        "comment:", comment);

    //placeholder to test functionality
    const newComment = await postsDao.createComment(postId, userId, comment);

});

// upload image file to server

// router.post("/uploadImage", imgUploader.single("imageFile"), async function (req, res) {
//     const newImage = req.file;
//     // array of links
//     // let imageLink = req.body.imageLink;

//     // const imgTitle = req.body.imgTitle;
//     // const imgAlt = req.body.imgAlt;

//     //rename file 
//     const oldName = newImage.path;

//     const newName = `./public/images/uploads/${newImage.originalname}`;
//     fs.renameSync(oldName, newName);
//     console.log(newName);
//     // record in files db
//     const userId = res.locals.user.id;
//     console.log(userId);
//     let newFile = await filesDao.uploadFileDetails(newName, userId);

    // console.log(newFile.fileName);
    // console.log(newFile.id);
    // if (newFile != undefined) {
        // const newImageLink = `<img src="${newFile.fileName}">`;
        // console.log(newImageLink);
        // const uploadedImgjson = {
        //     link: imageLink
        // };
        // console.log(uploadedImgjson);
        // console.log("File uploaded successfully");
        // res.setToastMessage("File uploaded successfully");
        // res.json(imageLink);
        // imageLink.push("newImageLink");
        // res.locals.imagelink = imageLink;
    // } else {
        // res.setToastMessage("Sorry, that file can not be uploaded for some reason");
    // }
//     res.redirect("/home");
// });


module.exports = router;