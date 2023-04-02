const postmodel = require("../Model/postmodel");
const commentmodel = require("../Model/comment");
const mongoose = require('mongoose')
const { isValidObjectId } = require("mongoose")



const createComment = async function (req, res) {
    try {
        let data = req.body;
        const postId = req.params.postId
        if (!data.Comment) return res.status(400).send({ status: false, message: "Comment is necessary" });

        if (!mongoose.isValidObjectId(postId)) {
            return res.status(400).send({ status: false, message: "provide valid PostId " })
        }
        const checkpostId = await postmodel.findOne({ _id: postId, isDeleted: false })
        if (!checkpostId) {
            return res.status(404).send({ status: false, message: "post id not found" })
        }
        let createcomment = await commentmodel.create(data);
        res.status(201).send({ status: true, data: createcomment })

    } catch (error) {
        res.status(500).send({ status: false, message: message.error })

    }
}



const updateComment = async function (req, res) {
    try {
      let postId = req.params.postId;
      // post id in the params
      let ExistId = await postmodel.findOne({ _id: postId, isDeleted: false });
      
      if (!ExistId) {
        return res
          .status(404)
          .send({ status: false, message: " post doesn't exist" });
      }
  
      if (!isValidObjectId(postId)) {
        return res
          .status(400)
          .send({ status: false, message: "please provide valid post id " });
      }
  
      // ================== comment id in the params ================
  
      let commentId = req.params.commentId;
  
      let ExistCmntId = await commentmodel.findOne({
        _id: commentId,
        isDeleted: false,
      });
      if (!ExistCmntId) {
        return res
          .status(404)
          .send({ status: false, message: "  invailed entry" });
      }
  
      if (!isValidObjectId(commentId)) {
        return res
          .status(400)
          .send({ status: false, message: "please provide valid comment id " });
      }
  
      // ============ taking data in body =====
  
      const data = req.body;
      
      if (Object.keys(data).length == 0) {
        return res.status(400).send({
          status: false,
          message: "please provide any field to update",
        });
      }
  
      if (data.comment) {
        if (!data.comment)
          return res
            .status(400)
            .send({ status: false, message: "Please Provide comment" });
      }
      
  
      const updteComment = await commentmodel.findOneAndUpdate(
        { _id: commentId, isDeleted: false },
        { $set: {  comment: data.comment } },
        { new: true }
      );
  
      if (!updteComment) {
        return res
          .status(404)
          .send({ status: false, messaage: "comment not found" });
      }
  
      res.status(200).send({ status: true, data: updteComment });
    } catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
  
}

//========================delet comment
const deletecomment = async function (req, res) {
  try {
    const commentId = req.params.commentId;

    let ExistId = await commentmodel.findById(commentId);

    if (!ExistId) {
      return res
        .status(404)
        .send({ status: false, message: "comment id doesn't exist" });
    }

    if (!isValidObjectId(commentId)) {
      return res
        .status(400)
        .send({ status: false, message: "Invailed comment id" });
    }

    await postmodel.findByIdAndUpdate(
      { _id: postId, isDeleted: false },
      { isDeleted: true }
    );

    res.status(200).send({ status: true, message: "successfully deleted" });
  } catch (err) {
    res.status(500).send({ status: false, message: err.message });
  }
};









module.exports.updateComment = updateComment;

module.exports.createComment = createComment;
module.exports.deletecomment =deletecomment;
