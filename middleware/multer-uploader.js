// Setup multer (files will temporarily be saved in the "temp" folder).
const multer = require("multer");
const path = require("path");
// const upload = multer({
//     dest: path.join (__dirname, "/images/uploads"),
//     limits: { fieldSize: 25 * 1024 * 1024 }
// });
const upload = multer({
    dest: path.join(__dirname, "temp")
});


// // Export the "upload" object, which we can use to actually accept file uploads.
module.exports = upload;