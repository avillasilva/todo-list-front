const API_SERVER = 'http://127.0.0.1:8000/';

function connectToAPI(username, password, api) {
    api = api || API_SERVER;
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);

    let t = {};
    t.username = '';
    t._tasklists = undefined;
    t._tasks = undefined;
    t._notes = undefined;
    t._categories = undefined;

    t.getTaskLists = () => t._tasklists;
    t.getTasks = () => t._tasks;
    t.getNotes = () => t._notes;
    t.getCategories = () => t._categories;
    t.getTaskListsTasks = (tl) => {
        if (!Number.isInteger(tl)) tl = tl.id;
        return t.getTasks().filter((i) => i.owner_list.id==tl);
    }

    t.makeRequest = (url, body) => {
        body = body || {};
        body.method = body.method || "GET";
        body.credentials = body.credentials || "include";
        body.headers = body.headers || { "Content-Type": "application/x-www-form-urlencoded" };
        return fetch(api + url, body).then((response) => response.json());
    };

    t.deleteNote = (id) => {
        return t.makeRequest(`notes/note/${id}`, { method: "DELETE" }).then(() => t._notes = t._notes.filter(e => e.id !== id));
    }

    t.deleteTask = (id) => {
        return t.makeRequest(`todorest/task/${id}`, { method: "DELETE" }).then(() => t._tasks = t._tasks.filter(e => e.id !== id));
    }

    t.deleteTasklist = (id) => {
        return t.makeRequest(`todorest/tasklist/${id}`, { method: "DELETE" }).then(() => t._tasklists = t._tasklists.filter(e => e.id !== id));
    }

    t.postNote = (note) => {
        return t.makeRequest(`notes/note/`, {
            method: "POST",
            body: JSON.stringify(note),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => t.makeRequest('notes/note/').then((i) => t._notes = i))
    }

    t.postTask = (task) => {
        return t.makeRequest(`todorest/task/`, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => t.makeRequest('todorest/task/').then((i) => t._tasks = i))
    }

    t.postTaskList = (task) => {
        return t.makeRequest(`todorest/tasklist/`, {
            method: "POST",
            body: JSON.stringify(task),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => t.makeRequest('todorest/tasklist/').then((i) => t._tasklists = i))
    }

    t.putTaskList = (id, tasklist) => {
        return t.makeRequest(`todorest/tasklist/${id}`, {
            method: "PUT",
            body: JSON.stringify(tasklist),
            headers: {
                "Content-Type": "application/json"
            }
        }).then(() => t.makeRequest('todorest/tasklist/').then((i) => t._tasklists = i))
    }

    return fetch(api + "todorest/login", {
        method: "POST",
        credentials: "include",
        body: "username=" + username + "&password=" + password,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        t.username = username;
        return t.makeRequest('todorest/tasklist').then((i) => t._tasklists = i).then(() =>
            t.makeRequest('todorest/task').then((i) => t._tasks = i).then(() =>
                t.makeRequest('notes/note').then((i) => t._notes = i).then(() =>
                    t.makeRequest('todorest/category').then((i) => { 
                        if (i.length == 0) {
                            return t.makeRequest(`todorest/category/`, {
                                method: "POST",
                                body: JSON.stringify({title:"default", description:"default"}),
                                headers: {
                                    "Content-Type": "application/json"
                                }
                            }).then(() => t.makeRequest('todorest/category/').then((i) => t._categories = i))
                            .then(() => t)
                        } else {
                            t._categories = i; return t
                        }
                    }))));
        // return t;
    });
}

function registerToAPI(username, password, email, api) {
    api = api || API_SERVER;
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);
    email = encodeURIComponent(email);

    return fetch(api + "todorest/register", {
        method: "POST",
        credentials: "include",
        body: "username=" + username + "&email=" + email + "&password=" + password,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

export { connectToAPI, registerToAPI };
