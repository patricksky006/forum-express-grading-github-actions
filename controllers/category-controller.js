const { Category } = require('../models')

const categoryController = {
  getCategories: (req, res, next) => {
    return Category.findAll({
      raw: true
    })
      .then(categories => res.render('admin/categories', { categories }))
      .catch(err => next(err))
  },
  postCategory: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('Restaurant name is required!')
    return Category.create({
      name
    })
      .then(() => {
        req.flash('success_messages', 'Category was successfully created')
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  },
  getCategory: (req, res, next) => {
    Promise.all([
      Category.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([category, categories]) => {
        if (!category) throw new Error("Restaurant didn't exist!")
        res.render('admin/edit-category', { category, categories })
      })
      .catch(err => next(err))
  }
}

module.exports = categoryController
