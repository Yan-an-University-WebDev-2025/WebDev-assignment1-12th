/**
 * 用户认证管理类
 * 负责用户注册、登录、注销等功能
 */
class AuthManager {
    constructor() {
        this.currentUser = this.getCurrentUser();
        this.users = this.getAllUsers();
    }

    /**
     * 获取所有用户
     * @returns {Array} 用户数组
     */
    getAllUsers() {
        const users = localStorage.getItem('blog_users');
        return users ? JSON.parse(users) : [];
    }

    /**
     * 保存所有用户
     * @param {Array} users - 用户数组
     */
    saveAllUsers(users) {
        localStorage.setItem('blog_users', JSON.stringify(users));
    }

    /**
     * 获取当前登录用户
     * @returns {Object|null} 当前用户对象或null
     */
    getCurrentUser() {
        const user = localStorage.getItem('blog_current_user');
        return user ? JSON.parse(user) : null;
    }

    /**
     * 设置当前登录用户
     * @param {Object} user - 用户对象
     */
    setCurrentUser(user) {
        localStorage.setItem('blog_current_user', JSON.stringify(user));
        this.currentUser = user;
    }

    /**
     * 验证账号格式
     * @param {string} account - 账号
     * @returns {string|null} 错误信息或null
     */
    validateAccount(account) {
        if (account.length < 6 || account.length > 20) {
            return '账号长度必须在6-20位之间';
        }
        if (!/^[a-zA-Z0-9_]+$/.test(account)) {
            return '账号只能包含字母、数字和下划线';
        }
        return null;
    }

    /**
     * 验证密码格式
     * @param {string} password - 密码
     * @returns {string|null} 错误信息或null
     */
    validatePassword(password) {
        if (password.length < 6) {
            return '密码长度不能少于6位';
        }
        return null;
    }

    /**
     * 验证邮箱格式
     * @param {string} email - 邮箱
     * @returns {string|null} 错误信息或null
     */
    validateEmail(email) {
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(email)) {
            return '请输入有效的邮箱地址';
        }
        return null;
    }

    /**
     * 检查账号是否已存在
     * @param {string} account - 账号
     * @returns {boolean} 是否存在
     */
    accountExists(account) {
        return this.users.some(user => user.account === account);
    }

    /**
     * 检查邮箱是否已存在
     * @param {string} email - 邮箱
     * @returns {boolean} 是否存在
     */
    emailExists(email) {
        return this.users.some(user => user.email === email);
    }

    /**
     * 用户注册
     * @param {Object} userData - 用户数据
     * @returns {Object} 结果对象 {success: boolean, message: string}
     */
    register(userData) {
        const { nickname, account, email, password, confirmPassword, avatar } = userData;

        // 验证必填字段
        if (!nickname || !account || !email || !password || !confirmPassword || !avatar) {
            return { success: false, message: '请填写完整信息' };
        }

        // 验证账号
        const accountError = this.validateAccount(account);
        if (accountError) {
            return { success: false, message: accountError };
        }

        // 检查账号是否已存在
        if (this.accountExists(account)) {
            return { success: false, message: '该账号已被注册' };
        }

        // 验证邮箱
        const emailError = this.validateEmail(email);
        if (emailError) {
            return { success: false, message: emailError };
        }

        // 检查邮箱是否已存在
        if (this.emailExists(email)) {
            return { success: false, message: '该邮箱已被注册' };
        }

        // 验证密码
        const passwordError = this.validatePassword(password);
        if (passwordError) {
            return { success: false, message: passwordError };
        }

        // 验证两次密码是否一致
        if (password !== confirmPassword) {
            return { success: false, message: '两次输入的密码不一致' };
        }

        // 创建新用户
        const newUser = {
            id: Date.now(), // 使用时间戳作为ID
            nickname,
            account,
            email,
            password, // 实际应用中应该加密
            avatar,
            registerTime: new Date().toISOString(),
            role: 'user' // 角色：user(普通用户) / admin(管理员)
        };

        // 保存用户
        this.users.push(newUser);
        this.saveAllUsers(this.users);

        return { success: true, message: '注册成功！' };
    }

    /**
     * 用户登录
     * @param {string} account - 账号
     * @param {string} password - 密码
     * @returns {Object} 结果对象 {success: boolean, message: string}
     */
    login(account, password) {
        if (!account || !password) {
            return { success: false, message: '请输入账号和密码' };
        }

        const user = this.users.find(u => u.account === account);
        
        if (!user) {
            return { success: false, message: '账号不存在' };
        }

        if (user.password !== password) {
            return { success: false, message: '密码错误' };
        }

        // 登录成功，保存当前用户（不保存密码）
        const currentUser = {
            id: user.id,
            nickname: user.nickname,
            account: user.account,
            email: user.email,
            avatar: user.avatar,
            role: user.role
        };

        this.setCurrentUser(currentUser);

        return { success: true, message: '登录成功！' };
    }

    /**
     * 用户注销
     */
    logout() {
        localStorage.removeItem('blog_current_user');
        this.currentUser = null;
    }

    /**
     * 检查是否已登录
     * @returns {boolean} 是否已登录
     */
    isLoggedIn() {
        return this.currentUser !== null;
    }
}

/**
 * 登录注册页面管理类
 */
class AuthPage {
    constructor() {
        this.authManager = new AuthManager();
        this.loginForm = document.getElementById('login');
        this.registerForm = document.getElementById('register');
        this.loginError = document.getElementById('login-error');
        this.registerError = document.getElementById('register-error');
        this.authTabs = document.querySelectorAll('.auth-tab');
    }

    /**
     * 切换登录/注册标签
     * @param {string} tab - 标签名称
     */
    switchTab(tab) {
        console.log('切换到标签:', tab); // 调试信息
        
        // 切换标签激活状态
        this.authTabs.forEach(tabBtn => {
            if (tabBtn.dataset.tab === tab) {
                tabBtn.classList.add('active');
            } else {
                tabBtn.classList.remove('active');
            }
        });

        // 切换表单显示
        const loginFormContainer = document.getElementById('login-form');
        const registerFormContainer = document.getElementById('register-form');

        if (tab === 'login') {
            loginFormContainer.classList.add('active');
            registerFormContainer.classList.remove('active');
        } else if (tab === 'register') {
            loginFormContainer.classList.remove('active');
            registerFormContainer.classList.add('active');
        }

        // 清空错误信息
        this.loginError.textContent = '';
        this.loginError.style.display = 'none';
        this.registerError.textContent = '';
        this.registerError.style.display = 'none';
    }

    /**
     * 处理登录表单提交
     * @param {Event} e - 事件对象
     */
    handleLogin(e) {
        e.preventDefault();

        const account = document.getElementById('login-account').value.trim();
        const password = document.getElementById('login-password').value;

        const result = this.authManager.login(account, password);

        if (result.success) {
            alert(result.message);
            // 登录成功，跳转到首页
            window.location.href = 'index.html';
        } else {
            this.loginError.textContent = result.message;
            this.loginError.style.display = 'block';
        }
    }

    /**
     * 处理注册表单提交
     * @param {Event} e - 事件对象
     */
    handleRegister(e) {
        e.preventDefault();

        const userData = {
            nickname: document.getElementById('register-nickname').value.trim(),
            account: document.getElementById('register-account').value.trim(),
            email: document.getElementById('register-email').value.trim(),
            password: document.getElementById('register-password').value,
            confirmPassword: document.getElementById('register-confirm-password').value,
            avatar: document.getElementById('register-avatar').value
        };

        const result = this.authManager.register(userData);

        if (result.success) {
            alert(result.message);
            // 注册成功，切换到登录标签
            this.switchTab('login');
            this.registerForm.reset();
        } else {
            this.registerError.textContent = result.message;
            this.registerError.style.display = 'block';
        }
    }

    /**
     * 初始化页面
     */
    init() {
        // 检查是否已登录
        if (this.authManager.isLoggedIn()) {
            // 已登录，跳转到首页
            window.location.href = 'index.html';
            return;
        }

        // 绑定标签切换
        this.authTabs.forEach(tab => {
            tab.addEventListener('click', (e) => {
                const tabName = tab.getAttribute('data-tab');
                console.log('点击标签:', tabName); // 调试信息
                this.switchTab(tabName);
            });
        });

        // 绑定登录表单
        if (this.loginForm) {
            this.loginForm.addEventListener('submit', (e) => this.handleLogin(e));
        }

        // 绑定注册表单
        if (this.registerForm) {
            this.registerForm.addEventListener('submit', (e) => this.handleRegister(e));
        }

        console.log('认证页面初始化完成'); // 调试信息
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const authPage = new AuthPage();
    authPage.init();
});
