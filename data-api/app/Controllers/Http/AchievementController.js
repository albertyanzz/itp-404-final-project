'use strict'

const Achievement = use('App/Models/Achievement')


class AchievementController {
    index() {
        return Achievement.all()
    }

    // GET /api/achievement/:id

    show({ params }) {
        return Achievement.find(params.id)
    }

    // POST /api/achievement

    async store({ request }) {
        const { tasks_completed, user_id } = request.all()
        const achievement = new Achievement()
        achievement.tasks_completed = tasks_completed
        achievement.user_id = user_id

        await achievement.save()

        return achievement
    }

    // Won't really need this

    // DELETE /api/subtasks/:id
    // async destroy({ params }) {
    //     const achievement = await Achievement.find(params.id)
    //     await achievement.delete()
    // }

}

module.exports = AchievementController
