const { Restaurant, Category } = require('../../models')
const { getOffset, getPagination } = require('../../helpers/pagination-helpers')

const restaurantController = {
  getRestaurants: (req, res) => {
    const DEFAULT_LIMIT = 9
    const categoryId = Number(req.query.categoryId) || ''
    const page = Number(req.query.page) || 1
    const limit = Number(req.query.limit) || DEFAULT_LIMIT
    const offset = getOffset(limit, page)

    Promise.all([
      Restaurant.findAndCountAll({
        include: Category,
        where: {
          ...categoryId ? { categoryId } : {} // 檢查 categoryId 是否為空值
        },
        limit,
        offset,
        nest: true,
        raw: true
      }),
      Category.findAll({ raw: true })
    ])
      .then(([restaurants, categories]) => {
        const favoritedRestaurantsId = req.user?.FavoritedRestaurants ? req.user.FavoritedRestaurants.map(fr => fr.id) : []
        const likedRestaurantsId = req.user?.LikedRestaurants ? req.user.LikedRestaurants.map(fr => fr.id) : []
        const data = restaurants.rows.map(r => ({
          ...r,
          description: r.description.substring(0, 50), // 只取50個字，減少資源以及破版
          isFavorited: favoritedRestaurantsId.includes(r.id),
          isLiked: likedRestaurantsId.includes(r.id)
        }))
        return res.json({
          restaurants: data,
          categoryId,
          categories,
          pagination: getPagination(limit, page, restaurants.count)
        })
      })
  }
}

module.exports = restaurantController
