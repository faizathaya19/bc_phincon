document.addEventListener('DOMContentLoaded', () => {
    const burger = document.getElementById('burger');
    const navLinks = document.getElementById('nav-links');

    burger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
    });
});

document.getElementById('vip-btn').addEventListener('click', function() {
    window.location.href = 'vip.html';
});

