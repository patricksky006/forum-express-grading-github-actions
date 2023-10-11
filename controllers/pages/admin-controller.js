const { User } = require('../../models')
const adminServices = require('../../services/admin-services')

const adminController = {
  getRestaurants: (req, res, next) => {
    adminServices.getRestaurants(req, (err, data) => err ? next(err) : res.render('admin/restaurants', data))
  },
  createRestaurant: (req, res, next) => {
    adminServices.createRestaurant(req, (err, data) => err ? next(err) : res.render('admin/create-restaurant', data))
  },
  postRestaurant: (req, res, next) => {
    adminServices.postRestaurant(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'restaurant was successfully created')
      return res.redirect('/admin/restaurants', data)
    })
  },
  getRestaurant: (req, res, next) => {
    adminServices.getRestaurant(req, (err, data) => err ? next(err) : res.render('admin/restaurant', data))
  },
  editRestaurant: (req, res, next) => {
    adminServices.editRestaurant(req, (err, data) => err ? next(err) : res.render('admin/edit-restaurant', data))
  },
  putRestaurant: (req, res, next) => {
    adminServices.putRestaurant(req, (err, data) => {
      if (err) return next(err)
      req.flash('success_messages', 'restaurant was successfully to update')
      res.redirect('/admin/restaurants', data)
    })
  },
  deleteRestaurant: (req, res, next) => {
    adminServices.deleteRestaurant(req, (err, data) => {
      if (err) return next(err)
      req.session.deletedData = data
      return res.redirect('/admin/restaurants')
    })
  },
  getUsers: (req, res, next) => {
    return User.findAll({
      raw: true
    })
      .then(users => res.render('admin/users', { users }))
      .catch(err => next(err))
  },
  patchUser: (req, res, next) => {
    const id = req.params.id
    return User.findByPk(id)
      .then(user => {
        if (!user) throw new Error("User didn't exist!")
        if (user.email === 'root@example.com') {
          req.flash('error_messages', '禁止變更 root 權限')
          return res.redirect('back')
        }
        return user.update({
          isAdmin: !user.isAdmin
        })
      })
      .then(() => {
        req.flash('success_messages', '使用者權限變更成功')
        return res.redirect('/admin/users')
      })
      .catch(err => next(err))
  }
}

module.exports = adminController
