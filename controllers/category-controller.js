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
    if (!name) throw new Error('Category name is required!')
    return Category.create({ name })
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
        if (!category) throw new Error("Category didn't exist!")
        res.render('admin/categories', { category, categories })
      })
      .catch(err => next(err))
  },
  putCategory: (req, res, next) => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("Category didn't exist!")
        return category.update({ name })
      })
      .then(() => {
        req.flash('success_messages', 'Category was successfully updated')
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  },
  deleteCategory: (req, res, next) => {
    return Category.findByPk(req.params.id)
      .then(Category => {
        if (!Category) throw new Error("Category didn't exist!")
        return Category.destroy()
      })
      .then(() => {
        req.flash('success_messages', 'Category was successfully deleted')
        res.redirect('/admin/categories')
      })
      .catch(err => next(err))
  }
}

module.exports = categoryController
