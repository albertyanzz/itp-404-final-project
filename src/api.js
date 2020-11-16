export function fetchTasks() {
  return fetch("/api/tasks").then((response) => {
    return response.json();
  });
}

export function fetchUsers() {
  return fetch("/api/users").then((response) => {
    return response.json();
  });
}

export function fetchSubtasks() {
  return fetch("/api/subtasks").then((response) => {
    return response.json();
  });
}

export function fetchCategories() {
  return fetch("/api/categories").then((response) => {
    return response.json();
  });
}

export function fetchAchievements() {
  return fetch("/api/achievements").then((response) => {
    return response.json();
  });
}

export function fetchTask(id) {
  return fetch(`/api/tasks/${id}`).then((response) => {
    if (response.status >= 400) {
      return Promise.reject(
        `There was an error requesting the task with an id of ${id}`
      );
    }

    return response.json();
  });
}

export function fetchSubtask(id) {
  return fetch(`/api/subtasks/${id}`).then((response) => {
    if (response.status >= 400) {
      return Promise.reject(
        `There was an error requesting the subtask with an id of ${id}`
      );
    }

    return response.json();
  });
}

export function fetchCategory(id) {
  return fetch(`/api/categories/${id}`).then((response) => {
    if (response.status >= 400) {
      return Promise.reject(
        `There was an error requesting the category with an id of ${id}`
      );
    }

    return response.json();
  });
}

export function fetchAchievement(id) {
  return fetch(`/api/achievements/${id}`).then((response) => {
    if (response.status >= 400) {
      return Promise.reject(
        `There was an error requesting the achievement with an id of ${id}`
      );
    }

    return response.json();
  });
}

export function destroyTask(id) {
  return fetch(`/api/tasks/${id}`, {
    method: "DELETE",
  });
}

export function destroySubtask(id) {
  return fetch(`/api/subtasks/${id}`, {
    method: "DELETE",
  });
}

export function destroyCategory(id) {
  return fetch(`/api/categories/${id}`, {
    method: "DELETE",
  });
}

export function saveUser(data) {
  const isEditing = data.hasOwnProperty("id");
  const url = isEditing ? `/api/users/${data.id}` : "/api/users";
  const method = isEditing ? "PUT" : "POST";

  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function saveTask(data) {
  const isEditing = data.hasOwnProperty("id");
  const url = isEditing ? `/api/tasks/${data.id}` : "/api/tasks";
  const method = isEditing ? "PUT" : "POST";

  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function saveSubtask(data) {
  const isEditing = data.hasOwnProperty("id");
  const url = isEditing ? `/api/subtasks/${data.id}` : "/api/subtasks";
  const method = isEditing ? "PUT" : "POST";

  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function saveCategory(data) {
  const isEditing = data.hasOwnProperty("id");
  const url = isEditing ? `/api/categories/${data.id}` : "/api/categories";
  const method = isEditing ? "PUT" : "POST";

  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}

export function saveAchievement(data) {
  const isEditing = data.hasOwnProperty("id");
  const url = isEditing ? `/api/achievements/${data.id}` : "/api/achievements";
  const method = isEditing ? "PUT" : "POST";

  return fetch(url, {
    method,
    body: JSON.stringify(data),
    headers: {
      "Content-Type": "application/json",
    },
  }).then((response) => {
    return response.json();
  });
}
