const commentServices = require('../../services/comment-services')

const commentController = {
  postComment: (req, res, next) => {
    commentServices.postComment(req, (err, data) => err ? next(err) : res.redirect(`/restaurants/${data.dataValues.restaurantId}`))
  },
  deleteComment: (req, res, next) => {
    commentServices.deleteComment(req, (err, data) => err ? next(err) : res.redirect(`/restaurants/${data.dataValues.restaurantId}`))
  }
}

module.exports = commentController
