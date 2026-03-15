// script.js - 最终版（操作 html 元素）
const themeToggle = document.querySelector('.theme-toggle') || document.getElementById('themeToggle');
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const navLinks = document.getElementById('navLinks');

function toggleTheme() {
    const isLight = document.documentElement.classList.toggle('light');
    localStorage.setItem('theme', isLight ? 'light' : 'dark');
}

function toggleMobileMenu() {
    if (!navLinks || !mobileMenuBtn) return;
    navLinks.classList.toggle('active');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.innerHTML = navLinks.classList.contains('active')
            ? `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>`
            : `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`;
    }
}

function closeMobileMenu() {
    if (!navLinks || !mobileMenuBtn) return;
    navLinks.classList.remove('active');
    const menuIcon = mobileMenuBtn.querySelector('.menu-icon');
    if (menuIcon) {
        menuIcon.innerHTML = `<path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16"></path>`;
    }
}

function smoothScrollTo(target) {
    const element = document.querySelector(target);
    if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    // 主题切换按钮
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    // 移动端菜单按钮
    if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', toggleMobileMenu);
    }

    // 导航链接点击（平滑滚动）
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', (e) => {
            const href = link.getAttribute('href');
            if (href && href.startsWith('#')) {
                e.preventDefault();
                smoothScrollTo(href);
                closeMobileMenu();
            }
        });
    });

    // 监听系统主题变化（仅当用户未手动设置主题时）
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (e) => {
        if (!localStorage.getItem('theme')) {
            document.documentElement.classList.toggle('light', !e.matches);
        }
    });

    // ESC 关闭菜单
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && navLinks && navLinks.classList.contains('active')) {
            closeMobileMenu();
        }
    });

    // 窗口调整大小时关闭菜单
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMobileMenu();
        }
    });
});

