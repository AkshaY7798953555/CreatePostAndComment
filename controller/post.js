const postmodel = require("../Model/postmodel");
const commentmodel = require("../Model/comment");
const { isValidObjectId } = require("mongoose")


const createPost = async function (req, res) {
    try {
        let data = req.body;
        if (Object.keys(data).length == 0) {
            return res
                .status(400)
                .send({ status: false, message: "please provide something to post" });
        }
        if (!data.title) return res.status(400).send({ status: false, message: "title is necessary" });
        if (!data.Content) return res.status(400).send({ status: false, message: "Content is necessary" });
        if (!data.tags) return res.status(400).send({ status: false, message: "tags is necessary" });
        if (!data.category) return res.status(400).send({ status: false, message: "category is necessary" });
        let createpost = await postmodel.create(data);
        res.status(201).send({ status: true, data: createpost })

    } catch (error) {
        res.status(500).send({ status: false, message: message.error })

    }

}

//===============get post
const getPost = async function (req, res) {
    try {
        const postId = req.params.postId;

        let ExistId = await postmodel.findById(postId);

        if (!ExistId) {
            return res
                .status(404)
                .send({ status: false, message: "post id doesn't exist" });
        }

        if (!isValidObjectId(postId)) {
            return res
                .status(400)
                .send({ status: false, message: "Invailed post id" });
        }
        const PostDetails = await postmodel.findOne({
            _id: postId,
            isDeleted: false,
          }).select({
            title: 1,
            content: 1,
            tags: 1,
            category: 1,
          });
          if (!PostDetails) {
            return res.status(400).send({ status: false, message: "Invailed entry" });
          }
        
        const commentData = await commentmodel.find({
            post: postId,
            isDeleted: false,
        })
            .select({ _id: 0, Comment: 1, createdAt: 1 })
            .populate({
                path: "ReplyComment",
                model: "ReplyComment",
                select: { _id: 0, replyingTo: 1,  content: 1, createdAt: 1 },
            });

        let data = {
            PostDetails: PostDetails,
            comment: commentData,
        };

        res.status(200).send({ status: true, data: data });
    } catch (err) {
        res.status(500).send({ status: false, message: err.message });
    }
};

//=============================== update post


const updatePost = async function (req, res) {
    try {
      const postId = req.params.postId;
  
      let ExistId = await postmodel.findById(postId);
  
      if (!ExistId) {
        return res
          .status(404)
          .send({ status: false, message: "post id doesn't exist" });
      }
  
      if (!isValidObjectId(postId)) {
        return res
          .status(400)
          .send({ status: false, message: "Invailed post id" });
      }
  
      const data = req.body;
      const { title, Content, tags, category} = data;
  
      if (Object.keys(data).length == 0) {
        return res.status(400).send({
          status: false,
          message: "please provide some field to update",
        });
      }
  
      if (Content) {
        if (!data.Content)
          return res
            .status(400)
            .send({ status: false, message: "Please Provide your content" });
      }
      if (title) {
        if (!data.title)
          return res.status(400).send({
            status: false,
            message: " Please provide Title of your post ",
          });
      }
      if (tags) {
        if (!data.tags)
          return res.status(400).send({
            status: false,
            message: "Please provide tags",
          });
      }
      if (category) {
        if (!data.category)
          return res.status(400).send({
            status: false,
            message: "Please provide category",
          });
      }
  
      const upPost = await postmodel.findOneAndUpdate(
        { _id: postId },
        { $set: { tags: data.tags, title: data.title, content: data.Content,category: data.category } },
        { new: true }
      );
      res.status(201).send({ status: true, data: upPost });
    } catch (err) {
      res.status(500).send({ status: false, message: err.message });
    }
  };

//=====================deletpost
const deletePost = async function (req, res) {
    try {
      const postId = req.params.postId;
  
      let ExistId = await postmodel.findById(postId);
  
      if (!ExistId) {
        return res
          .status(404)
          .send({ status: false, message: "post id doesn't exist" });
      }
  
      if (!isValidObjectId(postId)) {
        return res
          .status(400)
          .send({ status: false, message: "Invailed post id" });
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
  

  
  
  
  





module.exports.createPost = createPost;
module.exports.getPost=getPost;
module.exports.updatePost=updatePost;
module.exports.deletePost=deletePost;;

