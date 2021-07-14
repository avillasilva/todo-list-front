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
    t.getNotes =  () => t._notes;
    t.getCategories = () => t._categories;

    function fetchData(url) {
        return fetch(api+url, {
            method: "GET",
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            credentials: "include",
        }).then((response) => response.json());
    }

    return fetch(api+"todorest/login", {
        method: "POST",
        credentials: "include",
        body: "username="+username+"&password="+password,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    }).then((response) => {
        t.username = username;
        fetchData('todorest/tasklist').then((i) => t._tasklists = i);
        fetchData('todorest/task').then((i) => t._tasks = i);
        fetchData('notes/note').then((i) => t._notes = i);
        fetchData('todorest/category').then((i) => t._categories = i);
        return t;
    });
}

function registerToAPI(username, password, email, api) {
    api = api || API_SERVER;
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);
    email = encodeURIComponent(email);

    return fetch(api+"todorest/register", {
        method: "POST",
        credentials: "include",
        body: "username="+username+"&email="+email+"&password="+password,
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        }
    });
}

export {connectToAPI, registerToAPI};
