const API_SERVER = 'http://127.0.0.1:8000/';

function connectToAPI(username, password, api) {
    api = api || API_SERVER;
    username = encodeURIComponent(username);
    password = encodeURIComponent(password);

    const COOKIES_INCLUDE = true;
    const TOKEN_INCLUDE = true;

    let t = {};
    t.username = '';
    t._tasklists = undefined;
    t._tasks = undefined;
    t._notes = undefined;
    t._categories = undefined;
    t._default_headers = { "Content-Type": "application/x-www-form-urlencoded" };

    t.getTaskLists = () => t._tasklists;
    t.getTasks = () => t._tasks;
    t.getNotes =  () => t._notes;
    t.getCategories = () => t._categories;

    t._makeRequest = (url, body) => {
        body = body || {};
        body.method = body.method || "GET";
        body.credentials = body.credentials || "include";
        body.headers = {...t._default_headers, ...(body.headers || { })};
        return fetch(api+url, body);
    };
    t.makeRequest = (url, body) => t._makeRequest(url, body).then((response) => response.json());

    let LOGIN_BODY = { method: 'POST', body: "username="+username+"&password="+password };
    if (COOKIES_INCLUDE) { LOGIN_BODY.credentials = "include"; }
    return t._makeRequest("notes/login", LOGIN_BODY).then((response) => response.text()).then((tokens) => {
        if (TOKEN_INCLUDE) {
            tokens.trim().split('\n').forEach((i) => {
                const j = i.trim().split(':');
                t._default_headers[j[0]] = j[1];
            });
        }
        t.username = username;
        t.makeRequest('todorest/tasklist/').then((i) => t._tasklists = i);
        t.makeRequest('todorest/task/').then((i) => t._tasks = i);
        t.makeRequest('notes/note/').then((i) => t._notes = i);
        t.makeRequest('todorest/category/').then((i) => t._categories = i);
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
