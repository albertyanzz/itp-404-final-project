'use strict'

const User = use('App/Models/User')

class UserController {
    async store({ request }) {
        const { username, email } = request.all()
        const user = new User()
        user.username = username
        user.email = email

        await user.save()

        return user
    }
}

module.exports = UserController
