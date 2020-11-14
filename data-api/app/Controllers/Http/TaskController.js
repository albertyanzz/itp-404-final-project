'use strict'

const Task = use('App/Models/Task')

class TaskController {
    index() {
        return Task.all()
    }

    // GET /api/tasks/:id

    show({ params }) {
        return Task.find(params.id)
    }

    // POST /api/tasks

    async store({ request }) {
        const { task_name, deadline, total, user_id, category_id, progress } = request.all()
        const task = new Task()
        task.task_name = task_name
        task.deadline = deadline
        task.total = total
        task.user_id = user_id
        task.category_id = category_id
        task.progress = progress

        await task.save()

        return task
    }

    // DELETE /api/tasks/:id
    async destroy({ params }) {
        const task = await Task.find(params.id)
        await task.delete()
    }

    // PUT /api/tasks/:id
    async update({ params, request }) {
        const task = await Task.find(params.id)
        const { progress } = request.all()
        task.progress = progress
        await task.save()

        return task
    }
}

module.exports = TaskController
