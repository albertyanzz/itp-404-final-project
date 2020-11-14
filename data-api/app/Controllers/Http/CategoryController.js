'use strict'

const Category = use('App/Models/Category')


class CategoryController {
    index() {
        return Category.all()
    }

    // GET /api/categories/:id

    show({ params }) {
        return Category.find(params.id)
    }

    // POST /api/categories

    async store({ request }) {
        const { category_name, user_id } = request.all()
        const category = new Category()
        category.category_name = category_name
        category.user_id = user_id

        await category.save()

        return category
    }

    // DELETE /api/categories/:id
    async destroy({ params }) {
        const category = await Category.find(params.id)
        await category.delete()
    }
}

module.exports = CategoryController
