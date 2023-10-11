const { Category } = require('../models')

const categoryServices = {
  getCategories: (req, cb) => {
    return Category.findAll({
      raw: true
    })
      .then(categories => cb(null, { categories }))
      .catch(err => cb(err))
  },
  postCategory: (req, cb) => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')
    return Category.create({ name })
      .then(category => cb(null, category))
      .catch(err => cb(err))
  },
  getCategory: (req, cb) => {
    Promise.all([
      Category.findByPk(req.params.id, { raw: true }),
      Category.findAll({ raw: true })
    ])
      .then(([category, categories]) => {
        if (!category) throw new Error("Category didn't exist!")
        cb(null, { category, categories })
      })
      .catch(err => cb(err))
  },
  putCategory: (req, cb) => {
    const { name } = req.body
    if (!name) throw new Error('Category name is required!')
    return Category.findByPk(req.params.id)
      .then(category => {
        if (!category) throw new Error("Category didn't exist!")
        return category.update({ name })
      })
      .then(category => cb(null, category))
      .catch(err => cb(err))
  },
  deleteCategory: (req, cb) => {
    return Category.findByPk(req.params.id)
      .then(Category => {
        if (!Category) throw new Error("Category didn't exist!")
        return Category.destroy()
      })
      .then(category => cb(null, category))
      .catch(err => cb(err))
  }
}

module.exports = categoryServices
