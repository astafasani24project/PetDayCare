const API_URL = 'https://localhost:7187/api/pets';

async function fetchWithAuth(url, options = {}) {
    const token = localStorage.getItem('token');
    options.headers = options.headers || {};
    if (token) {
        options.headers['Authorization'] = `Bearer ${token}`;
    }
    const res = await fetch(url, options);
    if (res.status === 401) {
        localStorage.removeItem('token');
        localStorage.removeItem('loggedIn');
        window.location.href = 'login.html';
    }
    return res;
}
