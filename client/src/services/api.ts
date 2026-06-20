// All backend requests go through this base URL
const BASE_URL = 'http://localhost:3000/';

export function register (email: string, password: string) {
  return fetch(`${BASE_URL}auth/register`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => res.json());
}

export function login (email: string, password: string) {
  return fetch(`${BASE_URL}auth/login`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ email, password })
  }).then(res => res.json()).then(data => {
    // Store the JWT token in localStorage so protected requests can use it
    if (data.token) {
      localStorage.setItem('token', data.token);
    }
    return data;
  });
}

// Removes the token from the browser — user is effectively logged out
export function logout () {
  localStorage.removeItem('token');
}

export function getFavorites () {
  // Read token from localStorage and send it in the Authorization header
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}user/favorites`, {
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json());
}

export function addFavorite (repo_id: string, repo_name: string, repo_url: string) {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}user/favorites`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    },
    body: JSON.stringify({ repo_id, repo_name, repo_url })
  }).then(res => res.json());
}

export function removeFavorite (id: number) {
  const token = localStorage.getItem('token');
  return fetch(`${BASE_URL}user/favorites/${id}`, {
    method: 'DELETE',
    headers: {
      'Authorization': `Bearer ${token}`
    }
  }).then(res => res.json());
}  