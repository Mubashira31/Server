const PostMessage = require("../models/postMessage.js");
const mongoose = require("mongoose");

module.exports = {
  getPosts: async (req, res) => {
    try {
      const postMessages = await PostMessage.find();
      console.log(postMessages);
      res.status(200).json(postMessages);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  },
};

module.exports = {
  createPost: async (req, res) => {
    const post = req.body;
    const newPost = new PostMessage(post);
    try {
      await newPost.save();
      res.status(201).json(newPost);
    } catch (error) {
      res.status(409).json({ message: error.message });
    }
  },
};

module.exports = {
  updatePost: async (req, res) => {
    const { id: _id } = req.params;
    const post = req.body;
    if (!mongoose.Types.ObjectId.isValid(_id))
      return res.status(404).send("no post with that id");

    const updatedPost = await PostMessage.findByIdAndUpdate(
      _id,
      { ...post, _id },
      { new: true }
    );
    res.json(updatedPost);
  },
};



module.exports = {
  deletePost: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("no post with that id");

    await PostMessage.findByIdAndRemove(id);
    res.json({ message: "post deleted successfully" });
  },
};


module.exports = {
  likePost: async (req, res) => {
    const { id } = req.params;
    if (!mongoose.Types.ObjectId.isValid(id))
      return res.status(404).send("no post with that id");

    const post = await PostMessage.findById(id);
    const updatedPost = await PostMessage.findByIdAndUpdate(
      id,
      { likeCount: post.likeCount + 1 },
      { new: true }
    );
    res.json(updatedPost);
  },
};
