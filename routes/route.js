const express = require('express');
const postcontroller = require('../controller/post');
const commentcontroller = require('../controller/comment');
//const comment2controller = require('../controller/comment')
const router = express.Router();
//const midware = require("../middlewares/commonMidleware")

// create post
router.post("/Createpost",postcontroller.createPost)
// get post
router.get("/getPost/:postId", postcontroller.getPost);
//  update /edit his post
router.put("/updatePost/:postId", postcontroller.updatePost);
//  delete his post
router.delete("/deletePost/:postId", postcontroller.deletePost);







router.post("/CreateComment/:postId",commentcontroller.createComment)

router.put("/updateComment/:postId/:commentId", commentcontroller.updateComment);
router.delete("/deletecomment/:commentid", commentcontroller.deletecomment);


module.exports = router;
