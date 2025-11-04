<template>
  <footer class="footer">
    <div class="footer-container">
      <div class="footer-content">
        <div class="footer-section">
          <h3>关于我们</h3>
          <p>Web Blog 是一个专注于前端开发技术分享的博客平台，致力于为开发者提供高质量的技术文章和学习资源。</p>
        </div>

        <div class="footer-section">
          <h3>快速链接</h3>
          <ul class="footer-links">
            <li>
              <router-link to="/">首页</router-link>
            </li>
            <li>
              <router-link to="/category">文章分类</router-link>
            </li>
            <li>
              <router-link to="/about">关于我们</router-link>
            </li>
            <li>
              <router-link to="/contact">联系我们</router-link>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>友情链接</h3>
          <ul class="footer-links">
            <li>
              <a href="https://vuejs.org" target="_blank" rel="noopener noreferrer">Vue.js</a>
            </li>
            <li>
              <a href="https://router.vuejs.org" target="_blank" rel="noopener noreferrer">Vue Router</a>
            </li>
            <li>
              <a href="https://vuex.vuejs.org" target="_blank" rel="noopener noreferrer">Vuex</a>
            </li>
            <li>
              <a href="https://vitejs.dev" target="_blank" rel="noopener noreferrer">Vite</a>
            </li>
          </ul>
        </div>

        <div class="footer-section">
          <h3>关注我们</h3>
          <div class="social-links">
            <a href="#" class="social-link" title="微信">
              <svg class="icon" viewBox="0 0 24 24">
                <path
                  d="M8.5,13.5A1.5,1.5 0 0,1 7,12A1.5,1.5 0 0,1 8.5,10.5A1.5,1.5 0 0,1 10,12A1.5,1.5 0 0,1 8.5,13.5M13.5,13.5A1.5,1.5 0 0,1 12,12A1.5,1.5 0 0,1 13.5,10.5A1.5,1.5 0 0,1 15,12A1.5,1.5 0 0,1 13.5,13.5M19,12C19,15.86 15.86,19 12,19C8.14,19 5,15.86 5,12C5,8.14 8.14,5 12,5C15.86,5 19,8.14 19,12Z" />
              </svg>
            </a>
            <a href="#" class="social-link" title="微博">
              <svg class="icon" viewBox="0 0 24 24">
                <path
                  d="M9.82,13.87C9.46,13.87 9.17,13.58 9.17,13.22C9.17,12.86 9.46,12.57 9.82,12.57H11.93C12.29,12.57 12.58,12.86 12.58,13.22C12.58,13.58 12.29,13.87 11.93,13.87H9.82M14.13,11.91C13.77,11.91 13.48,11.62 13.48,11.26C13.48,10.9 13.77,10.61 14.13,10.61H16.41C16.77,10.61 17.06,10.9 17.06,11.26C17.06,11.62 16.77,11.91 16.41,11.91H14.13M9.82,10.61C9.46,10.61 9.17,10.32 9.17,9.96C9.17,9.6 9.46,9.31 9.82,9.31H14.13C14.49,9.31 14.78,9.6 14.78,9.96C14.78,10.32 14.49,10.61 14.13,10.61H9.82M8.52,16.47C8.16,16.47 7.87,16.18 7.87,15.82C7.87,15.46 8.16,15.17 8.52,15.17H15.43C15.79,15.17 16.08,15.46 16.08,15.82C16.08,16.18 15.79,16.47 15.43,16.47H8.52M20,12C20,16.42 16.42,20 12,20C7.58,20 4,16.42 4,12C4,7.58 7.58,4 12,4C16.42,4 20,7.58 20,12Z" />
              </svg>
            </a>
            <a href="#" class="social-link" title="GitHub">
              <svg class="icon" viewBox="0 0 24 24">
                <path
                  d="M12,2A10,10 0 0,0 2,12C2,16.42 4.87,20.17 8.84,21.5C9.34,21.58 9.5,21.27 9.5,21C9.5,20.77 9.5,20.14 9.5,19.31C6.73,19.91 6.14,17.97 6.14,17.97C5.68,16.81 5.03,16.5 5.03,16.5C4.12,15.88 5.1,15.9 5.1,15.9C6.1,15.97 6.63,16.93 6.63,16.93C7.5,18.45 8.97,18 9.54,17.76C9.63,17.11 9.89,16.67 10.17,16.42C7.95,16.17 5.62,15.31 5.62,11.5C5.62,10.39 6,9.5 6.65,8.79C6.55,8.54 6.2,7.5 6.75,6.15C6.75,6.15 7.59,5.88 9.5,7.17C10.29,6.95 11.15,6.84 12,6.84C12.85,6.84 13.71,6.95 14.5,7.17C16.41,5.88 17.25,6.15 17.25,6.15C17.8,7.5 17.45,8.54 17.35,8.79C18,9.5 18.38,10.39 18.38,11.5C18.38,15.32 16.04,16.16 13.81,16.41C14.17,16.72 14.5,17.33 14.5,18.26C14.5,19.6 14.5,20.68 14.5,21C14.5,21.27 14.66,21.59 15.17,21.5C19.14,20.16 22,16.42 22,12A10,10 0 0,0 12,2Z" />
              </svg>
            </a>
          </div>
        </div>
      </div>

      <div class="footer-bottom">
        <p class="copyright">&copy; {{ currentYear }} Web Blog. All rights reserved.</p>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: 'TheFooter',
  computed: {
    currentYear() {
      return new Date().getFullYear()
    }
  }
}
</script>

<style scoped>
.footer {
  background: #f8f9fa;
  padding: 60px 0 20px;
  margin-top: 60px;
}

.footer-container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

.footer-content {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: 40px;
  margin-bottom: 40px;
}

.footer-section h3 {
  color: #333;
  margin-bottom: 20px;
  font-size: 1.2em;
}

.footer-section p {
  color: #666;
  line-height: 1.6;
}

.footer-links {
  list-style: none;
  padding: 0;
  margin: 0;
}

.footer-links li {
  margin-bottom: 10px;
}

.footer-links a {
  color: #666;
  text-decoration: none;
  transition: color 0.3s ease;
}

.footer-links a:hover {
  color: #4CAF50;
}

.social-links {
  display: flex;
  gap: 20px;
}

.social-link {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  background: #f0f0f0;
  transition: all 0.3s ease;
}

.social-link:hover {
  background: #4CAF50;
}

.icon {
  width: 24px;
  height: 24px;
  fill: #666;
  transition: fill 0.3s ease;
}

.social-link:hover .icon {
  fill: #fff;
}

.footer-bottom {
  border-top: 1px solid #ddd;
  padding-top: 20px;
  text-align: center;
}

.copyright {
  color: #888;
  font-size: 0.9em;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .footer-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 768px) {
  .footer {
    padding: 40px 0 20px;
  }

  .footer-content {
    grid-template-columns: 1fr;
    gap: 30px;
  }

  .footer-section {
    text-align: center;
  }

  .social-links {
    justify-content: center;
  }
}
</style>