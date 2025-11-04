/**
 * 全局导航栏和页脚管理
 * 负责处理页面导航高亮和全局功能
 */
class GlobalNavigation {
    constructor() {
        this.currentPage = this.getCurrentPage();
        this.navItems = document.querySelectorAll('header nav .menu ul li a');
        this.hamburger = document.getElementById('hamburger');
        this.menu = document.getElementById('menu');
    }

    /**
     * 获取当前页面文件名（不含路径和扩展名）
     * @returns {string} 当前页面标识
     */
    getCurrentPage() {
        const path = window.location.pathname;
        const page = path.split('/').pop() || 'index.html';
        
        // 处理详情页的特殊情况
        if (page === 'detail.html') {
            const urlParams = new URLSearchParams(window.location.search);
            return urlParams.get('id') ? 'detail' : 'index';
        }
        
        // 返回不带扩展名的文件名
        return page.replace('.html', '');
    }

    /**
     * 高亮当前页面导航项
     */
    highlightCurrentPage() {
        this.navItems.forEach(item => {
            const href = item.getAttribute('href');
            const page = href.replace('.html', '');
            
            // 特殊处理首页
            if ((page === 'index' || page === '') && this.currentPage === 'index') {
                item.classList.add('active');
                item.setAttribute('aria-current', 'page');
            } else if (page === this.currentPage) {
                item.classList.add('active');
                item.setAttribute('aria-current', 'page');
            } else {
                item.classList.remove('active');
                item.removeAttribute('aria-current');
            }
        });
    }

    /**
     * 初始化移动端菜单交互
     */
    initMobileMenu() {
        if (this.hamburger && this.menu) {
            this.hamburger.addEventListener('click', () => {
                this.menu.classList.toggle('active');
                this.hamburger.classList.toggle('active');
            });

            // 点击菜单外区域关闭菜单
            document.addEventListener('click', (e) => {
                if (this.menu.classList.contains('active') && 
                    !this.menu.contains(e.target) && 
                    !this.hamburger.contains(e.target)) {
                    this.menu.classList.remove('active');
                    this.hamburger.classList.remove('active');
                }
            });

            // 菜单项点击后关闭菜单（移动端）
            this.navItems.forEach(item => {
                item.addEventListener('click', () => {
                    if (window.innerWidth <= 768) {
                        this.menu.classList.remove('active');
                        this.hamburger.classList.remove('active');
                    }
                });
            });
        }
    }

    /**
     * 显示用户信息或登录按钮
     */
    displayUserInfo() {
        const menuUl = document.querySelector('header nav .menu ul');
        if (!menuUl) return;

        // 移除旧的用户信息
        const oldUserInfo = menuUl.querySelector('.user-info-item');
        if (oldUserInfo) {
            oldUserInfo.remove();
        }

        const userInfoLi = document.createElement('li');
        userInfoLi.className = 'user-info-item';

        // 直接从 localStorage 获取用户信息
        const currentUserStr = localStorage.getItem('blog_current_user');
        const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;

        if (currentUser) {
            userInfoLi.innerHTML = `
                <div class="user-info">
                    <div class="user-avatar">${currentUser.nickname.charAt(0).toUpperCase()}</div>
                    <span class="user-nickname">${currentUser.nickname}</span>
                    <button class="logout-btn" id="logout-btn">退出</button>
                </div>
            `;

            // 绑定退出按钮
            setTimeout(() => {
                const logoutBtn = document.getElementById('logout-btn');
                if (logoutBtn) {
                    logoutBtn.addEventListener('click', (e) => {
                        e.preventDefault();
                        localStorage.removeItem('blog_current_user');
                        alert('退出成功！');
                        window.location.reload();
                    });
                }
            }, 0);
        } else {
            userInfoLi.innerHTML = '<a href="login.html" class="login-link">登录/注册</a>';
        }

        menuUl.appendChild(userInfoLi);
    }

    /**
     * 初始化全局功能
     */
    init() {
        this.highlightCurrentPage();
        this.initMobileMenu();
        this.displayUserInfo();
        
        // 监听窗口大小变化，自动调整菜单状态
        window.addEventListener('resize', () => {
            if (window.innerWidth > 768) {
                this.menu?.classList.remove('active');
                this.hamburger?.classList.remove('active');
            }
        });
    }
}

/**
 * 页脚信息管理
 */
class FooterManager {
    constructor() {
        this.currentYear = new Date().getFullYear();
        this.footerElements = document.querySelectorAll('footer');
    }

    /**
     * 更新页脚版权年份
     */
    updateCopyrightYear() {
        this.footerElements.forEach(footer => {
            const copyrightText = footer.querySelector('p');
            if (copyrightText) {
                copyrightText.innerHTML = copyrightText.innerHTML
                    .replace(/\d{4}/, this.currentYear)
                    .replace('2025', this.currentYear);
            }
        });
    }

    /**
     * 初始化页脚功能
     */
    init() {
        this.updateCopyrightYear();
    }
}

// 全局初始化
document.addEventListener('DOMContentLoaded', () => {
    // 初始化导航栏
    const navigation = new GlobalNavigation();
    navigation.init();

    // 初始化页脚
    const footerManager = new FooterManager();
    footerManager.init();

    console.log('全局导航和页脚功能已初始化');
});