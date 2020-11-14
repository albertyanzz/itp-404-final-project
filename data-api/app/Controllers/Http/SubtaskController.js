'use strict'

const Subtask = use('App/Models/Subtask')


class SubtaskController {
    index() {
        return Subtask.all()
    }

    // GET /api/subtasks/:id

    show({ params }) {
        return Subtask.find(params.id)
    }

    // POST /api/subtasks

    async store({ request }) {
        const { subtask_name, task_id } = request.all()
        const subtask = new Subtask()
        subtask.subtask_name = subtask_name
        subtask.task_id = task_id

        await subtask.save()

        return subtask
    }

    // DELETE /api/subtasks/:id
    async destroy({ params }) {
        const subtask = await Subtask.find(params.id)
        await subtask.delete()
    }

}

module.exports = SubtaskController
