// js/auth.js
const AUTH_KEY = 'home2pros_user';
const USER_TYPE = 'contractor'; // or 'customer'

export function login(userType) {
  localStorage.setItem(AUTH_KEY, userType);
}

export function logout() {
  localStorage.removeItem(AUTH_KEY);
  location.href = 'index.html';
}

export function isLoggedIn() {
  return localStorage.getItem(AUTH_KEY) === USER_TYPE;
}

export function requireAuth() {
  if (!isLoggedIn()) {
    alert('Please log in to continue.');
    location.href = 'contractor-login.html';
  }
}

// Auto-run on contractor pages
if (window.location.pathname.includes('pro-dashboard') || 
    window.location.pathname.includes('submit-bid')) {
  requireAuth();
}