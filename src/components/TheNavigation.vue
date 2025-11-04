<template>
  <nav class="navigation" :class="{ 'mobile-menu-open': isMobileMenuOpen }">
    <div class="nav-container">
      <div class="nav-brand">
        <router-link to="/" class="logo">
          <span class="logo-text">Web Blog</span>
        </router-link>
        <button class="mobile-menu-toggle" @click="toggleMobileMenu" :aria-expanded="isMobileMenuOpen"
          aria-label="Toggle navigation menu">
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
          <span class="hamburger-line"></span>
        </button>
      </div>

      <ul class="nav-links" :class="{ 'show': isMobileMenuOpen }">
        <li>
          <router-link to="/" exact @click="closeMobileMenu">
            首页
          </router-link>
        </li>
        <li>
          <router-link to="/category" @click="closeMobileMenu">
            分类
          </router-link>
        </li>
        <li>
          <router-link to="/about" @click="closeMobileMenu">
            关于
          </router-link>
        </li>
        <li>
          <router-link to="/contact" @click="closeMobileMenu">
            联系
          </router-link>
        </li>
      </ul>
    </div>
  </nav>
</template>

<script>
export default {
  name: 'TheNavigation',
  data() {
    return {
      isMobileMenuOpen: false
    }
  },
  methods: {
    toggleMobileMenu() {
      this.isMobileMenuOpen = !this.isMobileMenuOpen
      document.body.style.overflow = this.isMobileMenuOpen ? 'hidden' : ''
    },
    closeMobileMenu() {
      if (this.isMobileMenuOpen) {
        this.isMobileMenuOpen = false
        document.body.style.overflow = ''
      }
    }
  },
  watch: {
    $route() {
      this.closeMobileMenu()
    }
  },
  mounted() {
    // 监听窗口大小变化，在大屏幕时关闭移动菜单
    window.addEventListener('resize', () => {
      if (window.innerWidth > 768 && this.isMobileMenuOpen) {
        this.closeMobileMenu()
      }
    })
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.closeMobileMenu)
  }
}
</script>

<style scoped>
.navigation {
  background: #fff;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.nav-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
  height: 60px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.nav-brand {
  display: flex;
  align-items: center;
}

.logo {
  text-decoration: none;
  color: #333;
  font-size: 1.5em;
  font-weight: bold;
}

.logo-text {
  background: linear-gradient(45deg, #4CAF50, #2196F3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.nav-links {
  display: flex;
  gap: 30px;
  list-style: none;
  margin: 0;
  padding: 0;
}

.nav-links a {
  color: #333;
  text-decoration: none;
  font-weight: 500;
  padding: 5px 0;
  position: relative;
}

.nav-links a::after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 100%;
  height: 2px;
  background: #4CAF50;
  transform: scaleX(0);
  transition: transform 0.3s ease;
}

.nav-links a:hover::after,
.nav-links a.router-link-active::after {
  transform: scaleX(1);
}

.mobile-menu-toggle {
  display: none;
  background: none;
  border: none;
  padding: 10px;
  cursor: pointer;
}

.hamburger-line {
  display: block;
  width: 24px;
  height: 2px;
  background: #333;
  margin: 5px 0;
  transition: 0.3s;
}

/* 桌面端布局 */
@media (min-width: 1025px) {
  .nav-container {
    max-width: 1200px;
  }

  .nav-links {
    gap: 40px;
  }
}

/* 平板端布局 */
@media (min-width: 768px) and (max-width: 1024px) {
  .nav-container {
    max-width: 90%;
  }

  .nav-links {
    gap: 20px;
  }

  .nav-links a {
    font-size: 0.9em;
  }
}

/* 移动端布局 */
@media (max-width: 767px) {
  .mobile-menu-toggle {
    display: block;
  }

  .nav-container {
    padding: 0 15px;
  }

  .nav-links {
    position: fixed;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 0;
    background: #fff;
    flex-direction: column;
    align-items: center;
    padding: 20px;
    gap: 30px;
    transform: translateX(100%);
    transition: transform 0.3s ease;
    box-shadow: -2px 0 5px rgba(0, 0, 0, 0.1);
  }

  .nav-links.show {
    transform: translateX(0);
  }

  .nav-links a {
    font-size: 1.2em;
    width: 100%;
    text-align: center;
    padding: 10px 0;
  }

  .mobile-menu-open .hamburger-line:nth-child(1) {
    transform: rotate(45deg) translate(5px, 5px);
  }

  .mobile-menu-open .hamburger-line:nth-child(2) {
    opacity: 0;
  }

  .mobile-menu-open .hamburger-line:nth-child(3) {
    transform: rotate(-45deg) translate(7px, -7px);
  }
}
</style>