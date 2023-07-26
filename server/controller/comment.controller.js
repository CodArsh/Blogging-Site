import Comment from "../model/comment.js";
export const newComment = async (request, response) => {
  try {
    const comment = await new Comment(request.body);
    comment.save();

    response.status(200).json({ message: "Comment saved successfully" });
  } catch (error) {
    response.status(500).json({ error: error.message });
  }
};
export const getComments = async (req, res) => {
  try {
    const comments = await Comment.find({ postId: req.params.id });
    res.status(200).json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
export const deleteComment = async (request, response) => {
  try {
      const comment = await Comment.findById(request.params.id);
      await comment.delete()

      response.status(200).json('comment deleted successfully');
  } catch (error) {
      response.status(500).json(error)
  }
}