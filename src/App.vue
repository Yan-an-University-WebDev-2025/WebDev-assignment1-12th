<template>
  <div id="app">
    <TheNavigation />
    <main class="main-content">
      <router-view/>
    </main>
    <TheFooter />
  </div>
</template>

<script>
import TheNavigation from './components/TheNavigation.vue'
import TheFooter from './components/TheFooter.vue'

export default {
  name: 'App',
  components: {
    TheNavigation,
    TheFooter
  }
}
</script>

<style>
/* 重置默认样式 */
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
    Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  line-height: 1.6;
  color: #333;
  background-color: #f5f5f5;
}

/* 主要内容区域样式 */
.main-content {
  margin-top: 60px; /* 为固定定位的导航栏留出空间 */
  min-height: calc(100vh - 60px - 400px); /* 确保页脚始终在底部 */
}

/* 全局链接样式 */
a {
  color: #4CAF50;
  text-decoration: none;
  transition: color 0.3s ease;
}

a:hover {
  color: #45a049;
}

/* 全局按钮样式 */
button {
  cursor: pointer;
  border: none;
  background: none;
  font: inherit;
}

button:focus {
  outline: none;
}

/* 全局图片样式 */
img {
  max-width: 100%;
  height: auto;
}

/* 全局表单样式 */
input,
textarea {
  font: inherit;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 8px 12px;
  transition: border-color 0.3s ease;
}

input:focus,
textarea:focus {
  outline: none;
  border-color: #4CAF50;
}

/* 全局标题样式 */
h1, h2, h3, h4, h5, h6 {
  font-weight: 600;
  line-height: 1.3;
  margin-bottom: 0.5em;
}

h1 {
  font-size: 2em;
}

h2 {
  font-size: 1.5em;
}

h3 {
  font-size: 1.25em;
}

/* 全局段落样式 */
p {
  margin-bottom: 1em;
}

/* 响应式布局辅助类 */
.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 20px;
}

/* 通用动画类 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}

.fade-enter,
.fade-leave-to {
  opacity: 0;
}

/* 响应式布局断点 */
@media (max-width: 1024px) {
  .container {
    max-width: 900px;
  }
}

@media (max-width: 768px) {
  .container {
    max-width: 100%;
  }

  h1 {
    font-size: 1.75em;
  }

  h2 {
    font-size: 1.35em;
  }

  h3 {
    font-size: 1.15em;
  }
}
</style>
