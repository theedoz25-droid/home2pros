// js/nav.js
document.addEventListener('DOMContentLoaded', () => {
  const navLinks = document.getElementById('navLinks');
  const user = localStorage.getItem('home2pros_user');

  if (user === 'customer') {
    navLinks.innerHTML = `
      <a href="index.html" class="nav-btn">Home</a>
      <a href="post-job.html" class="nav-btn">Post Job</a>
      <a href="dashboard.html" class="nav-btn">Dashboard</a>
      <button id="logoutBtn" class="nav-btn logout">Logout</button>
    `;
    document.getElementById('logoutBtn').onclick = () => {
      localStorage.removeItem('home2pros_user');
      alert('Logged out!');
      location.href = 'index.html';
    };
  } else if (user === 'contractor') {
    navLinks.innerHTML = `
      <a href="index.html" class="nav-btn">Home</a>
      <a href="pro-dashboard.html" class="nav-btn">Dashboard</a>
      <button id="logoutBtn" class="nav-btn logout">Logout</button>
    `;
    document.getElementById('logoutBtn').onclick = () => {
      localStorage.removeItem('home2pros_user');
      alert('Logged out!');
      location.href = 'index.html';
    };
  } else {
    // PUBLIC NAV — SHOW "Home" + LOGIN LINKS
    navLinks.innerHTML = `
      <a href="index.html" class="nav-btn">Home</a>
      <a href="customer-login.html" class="nav-btn">Customer Login</a>
      <a href="contractor-login.html" class="nav-btn">Contractor Login</a>
    `;
  }

  // Mobile menu toggle
  const mobileMenu = document.querySelector('.mobile-menu');
  if (mobileMenu) {
    mobileMenu.onclick = () => {
      navLinks.classList.toggle('active');
    };
  }
});