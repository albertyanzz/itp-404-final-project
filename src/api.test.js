import { createServer } from "miragejs";
import {
  fetchTasks,
  fetchUsers,
  fetchAchievements,
  fetchSubtasks,
  fetchTask,
  fetchSubtask,
  fetchAchievement,
  fetchCategories,
  fetchCategory,
  saveTask,
  saveUser,
  saveSubtask,
  saveAchievement,
  saveCategory,
} from "./api";

let server;

beforeEach(() => {
  server = createServer({
    routes() {
      this.namespace = "api";

      this.get("/users", () => {
        return [
          {
            id: 1,
            username: "person1@email.com",
            email: "person1@email.com",
          },
          {
            id: 2,
            username: "person2@email.com",
            email: "person2@email.com",
          },
        ];
      });

      this.get("/tasks", () => {
        return [
          {
            id: 1,
            user_id: 1,
            tasks_name: "task 1",
            deadline: "2020-11-23T16:00:00.000Z",
            progress: 0,
            total: 5,
          },
          {
            id: 2,
            user_id: 2,
            tasks_name: "task 2",
            deadline: "2020-11-23T16:00:00.000Z",
            progress: 0,
            total: 4,
          },
        ];
      });

      this.get("/tasks/:id", (shema, request) => {
        if (request.params.id === "1") {
          return {
            id: 1,
            user_id: 1,
            tasks_name: "task 1",
            deadline: "2020-11-23T16:00:00.000Z",
            progress: 0,
            total: 5,
          };
        }
      });

      this.get("/achievements", () => {
        return [
          {
            id: 1,
            user_id: 1,
            tasks_completed: 0,
          },
          {
            id: 2,
            user_id: 2,
            tasks_completed: 3,
          },
        ];
      });

      this.get("/achievements/:id", (shema, request) => {
        if (request.params.id === "1") {
          return {
            id: 1,
            user_id: 1,
            tasks_completed: 0,
          };
        }
      });

      this.get("/subtasks", () => {
        return [
          {
            id: 1,
            task_id: 1,
            subtask_name: "subtask 1-1",
          },
          {
            id: 2,
            task_id: 1,
            subtask_name: "subtask 1-2",
          },
          {
            id: 3,
            task_id: 2,
            subtask_name: "subtask 2-1",
          },
        ];
      });

      this.get("/subtasks/:id", (shema, request) => {
        if (request.params.id === "1") {
          return {
            id: 1,
            task_id: 1,
            subtask_name: "subtask 1-1",
          };
        }
      });

      this.get("/categories", () => {
        return [
          {
            id: 1,
            user_id: 1,
            category_name: "category 1-1",
          },
          {
            id: 2,
            user_id: 1,
            category_name: "category 1-2",
          },
          {
            id: 3,
            user_id: 2,
            category_name: "category 2-1",
          },
        ];
      });

      this.get("/categories/:id", (shema, request) => {
        if (request.params.id === "1") {
          return {
            id: 1,
            user_id: 1,
            category_name: "category 1-1",
          };
        }
      });

      this.post("/users", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), { id: 3 });
      });

      this.post("/tasks", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), { id: 3 });
      });

      this.put("/tasks/:id", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), {
          progress: 1,
        });
      });

      this.post("/subtasks", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), { id: 4 });
      });

      this.post("/achievements", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), { id: 3 });
      });

      this.put("/achievements/:id", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), {
          tasks_completed: 1,
        });
      });

      this.post("/categories", (schema, request) => {
        return Object.assign(JSON.parse(request.requestBody), { id: 4 });
      });
    },
  });
});

afterEach(() => {
  server.shutdown();
});

test("fetch all users", () => {
  return fetchUsers().then((users) => {
    expect(users).toEqual([
      {
        id: 1,
        username: "person1@email.com",
        email: "person1@email.com",
      },
      {
        id: 2,
        username: "person2@email.com",
        email: "person2@email.com",
      },
    ]);
  });
});

test("fetch all tasks", () => {
  return fetchTasks().then((tasks) => {
    expect(tasks).toEqual([
      {
        id: 1,
        user_id: 1,
        tasks_name: "task 1",
        deadline: "2020-11-23T16:00:00.000Z",
        progress: 0,
        total: 5,
      },
      {
        id: 2,
        user_id: 2,
        tasks_name: "task 2",
        deadline: "2020-11-23T16:00:00.000Z",
        progress: 0,
        total: 4,
      },
    ]);
  });
});

test("fetch all subtasks", () => {
  return fetchSubtasks().then((subtasks) => {
    expect(subtasks).toEqual([
      {
        id: 1,
        task_id: 1,
        subtask_name: "subtask 1-1",
      },
      {
        id: 2,
        task_id: 1,
        subtask_name: "subtask 1-2",
      },
      {
        id: 3,
        task_id: 2,
        subtask_name: "subtask 2-1",
      },
    ]);
  });
});

test("fetch all achievements", () => {
  return fetchAchievements().then((achievements) => {
    expect(achievements).toEqual([
      {
        id: 1,
        user_id: 1,
        tasks_completed: 0,
      },
      {
        id: 2,
        user_id: 2,
        tasks_completed: 3,
      },
    ]);
  });
});

test("fetch all categories", () => {
  return fetchCategories().then((categories) => {
    expect(categories).toEqual([
      {
        id: 1,
        user_id: 1,
        category_name: "category 1-1",
      },
      {
        id: 2,
        user_id: 1,
        category_name: "category 1-2",
      },
      {
        id: 3,
        user_id: 2,
        category_name: "category 2-1",
      },
    ]);
  });
});

test("fetch a single task", () => {
  return fetchTask(1).then((task) => {
    expect(task).toEqual({
      id: 1,
      user_id: 1,
      tasks_name: "task 1",
      deadline: "2020-11-23T16:00:00.000Z",
      progress: 0,
      total: 5,
    });
  });
});

test("fetch a single subtask", () => {
  return fetchSubtask(1).then((subtask) => {
    expect(subtask).toEqual({
      id: 1,
      task_id: 1,
      subtask_name: "subtask 1-1",
    });
  });
});

test("fetch a single achievement", () => {
  return fetchAchievement(1).then((achievement) => {
    expect(achievement).toEqual({
      id: 1,
      user_id: 1,
      tasks_completed: 0,
    });
  });
});

test("fetch a single category", () => {
  return fetchCategory(1).then((category) => {
    expect(category).toEqual({
      id: 1,
      user_id: 1,
      category_name: "category 1-1",
    });
  });
});

test("fetch nonexisting task", () => {
  return fetchTask(99).then(
    () => {},
    (error) => {
      expect(error).toBe(
        "There was an error requesting the task with an id of 99"
      );
    }
  );
});

test("fetch nonexisting subtask", () => {
  return fetchSubtask(99).then(
    () => {},
    (error) => {
      expect(error).toBe(
        "There was an error requesting the subtask with an id of 99"
      );
    }
  );
});

test("fetch nonexisting achievement", () => {
  return fetchAchievement(99).then(
    () => {},
    (error) => {
      expect(error).toBe(
        "There was an error requesting the achievement with an id of 99"
      );
    }
  );
});

test("fetch nonexisting category", () => {
  return fetchCategory(99).then(
    () => {},
    (error) => {
      expect(error).toBe(
        "There was an error requesting the category with an id of 99"
      );
    }
  );
});

test("adding a user (POST)", () => {
  return saveUser({
    username: "person3@email.com",
    email: "person3@email.com",
  }).then((user) => {
    expect(user).toEqual({
      id: 3,
      username: "person3@email.com",
      email: "person3@email.com",
    });
  });
});

test("saveTask (POST)", () => {
  return saveTask({
    user_id: 2,
    tasks_name: "task 3",
    deadline: "2020-11-23T16:00:00.000Z",
    progress: 0,
    total: 5,
  }).then((task) => {
    expect(task).toEqual({
      id: 3,
      user_id: 2,
      tasks_name: "task 3",
      deadline: "2020-11-23T16:00:00.000Z",
      progress: 0,
      total: 5,
    });
  });
});

test("saveTask (PUT)", () => {
  return saveTask({
    id: 1,
    user_id: 1,
    tasks_name: "task 1",
    deadline: "2020-11-23T16:00:00.000Z",
    progress: 0,
    total: 5,
  }).then((task) => {
    expect(task).toEqual({
      id: 1,
      user_id: 1,
      tasks_name: "task 1",
      deadline: "2020-11-23T16:00:00.000Z",
      progress: 1,
      total: 5,
    });
  });
});

test("saveAchievement (POST)", () => {
  return saveAchievement({
    user_id: 3,
    tasks_completed: 0,
  }).then((achievement) => {
    expect(achievement).toEqual({
      id: 3,
      user_id: 3,
      tasks_completed: 0,
    });
  });
});

test("saveAchievement (PUT)", () => {
  return saveAchievement({
    id: 1,
    user_id: 1,
    tasks_completed: 0,
  }).then((achievement) => {
    expect(achievement).toEqual({
      id: 1,
      user_id: 1,
      tasks_completed: 1,
    });
  });
});

test("saveCategory (POST)", () => {
  return saveCategory({
    user_id: 2,
    category_name: "category 2-2",
  }).then((category) => {
    expect(category).toEqual({
      id: 4,
      user_id: 2,
      category_name: "category 2-2",
    });
  });
});

test("saveSubtask (POST)", () => {
  return saveSubtask({
    task_id: 2,
    subtask_name: "subtask 2-2",
  }).then((subtask) => {
    expect(subtask).toEqual({
      id: 4,
      task_id: 2,
      subtask_name: "subtask 2-2",
    });
  });
});
