<template>
  <div class="home">
    <div class="articles-grid">
      <article v-for="article in displayedArticles" :key="article.id" class="article-card">
        <div class="article-thumbnail">
          <img :src="article.thumbnail" :alt="article.title">
        </div>
        <div class="article-content">
          <h2 class="article-title">
            <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          </h2>
          <p class="article-summary">{{ article.summary }}</p>
          <div class="article-meta">
            <span class="publish-date">{{ article.publishDate }}</span>
            <span class="category">
              <router-link :to="`/category?id=${article.categoryId}`">
                {{ article.category }}
              </router-link>
            </span>
            <span class="comment-count">{{ article.commentCount }} 评论</span>
          </div>
          <div class="article-tags">
            <span v-for="tag in article.tags" :key="tag" class="tag">
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <div class="load-more" v-if="hasMoreArticles">
      <button @click="loadMoreArticles" :disabled="loading" class="load-more-btn">
        {{ loading ? '加载中...' : '加载更多' }}
      </button>
    </div>

    <!-- 侧边栏内容 -->
    <div class="sidebar">
      <!-- 作者信息 -->
      <div class="sidebar-widget author-widget">
        <h3 class="widget-title">关于作者</h3>
        <div class="author-avatar">
          <img src="/src/assets/logo.svg" alt="作者头像">
        </div>
        <h4 class="author-name">前端开发者</h4>
        <p class="author-bio">专注于前端技术分享，热爱Vue.js、React等现代前端框架，致力于打造优雅的用户体验。</p>
      </div>

      <!-- 热门文章 -->
      <div class="sidebar-widget">
        <h3 class="widget-title">热门文章</h3>
        <ul class="hot-articles">
          <li v-for="(article, index) in hotArticles" :key="article.id" class="hot-article-item">
            <span class="article-rank">{{ index + 1 }}</span>
            <router-link :to="`/article/${article.id}`" class="hot-article-title">
              {{ article.title }}
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 分类列表 -->
      <div class="sidebar-widget">
        <h3 class="widget-title">文章分类</h3>
        <ul class="category-list">
          <li v-for="category in categories" :key="category.id" class="category-item">
            <router-link :to="`/category?id=${category.id}`">
              {{ category.name }}
              <span class="category-count">({{ category.count }})</span>
            </router-link>
          </li>
        </ul>
      </div>

      <!-- 标签云 -->
      <div class="sidebar-widget">
        <h3 class="widget-title">标签云</h3>
        <div class="tag-cloud">
          <router-link v-for="(tag) in allTags" :key="tag" to="/" class="cloud-tag"
            :style="{ fontSize: getRandomFontSize() }">
            {{ tag }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'HomeView',
  data() {
    return {
      articles: [
        {
          id: 1,
          title: '深入理解Vue.js响应式原理',
          summary: 'Vue.js的响应式系统是其最独特和强大的特性之一。本文将深入探讨Vue如何追踪数据变化并自动更新DOM...',
          thumbnail: '/src/assets/article-1.svg',
          publishDate: '2024-03-15',
          category: '前端开发',
          categoryId: 1,
          commentCount: 8,
          tags: ['Vue.js', 'JavaScript', '前端框架']
        },
        {
          id: 2,
          title: 'CSS Grid布局完全指南',
          summary: 'CSS Grid是一个强大的布局工具，它可以帮助我们创建复杂的网页布局。本文将介绍Grid的基本概念和实践应用...',
          thumbnail: '/src/assets/article-2.svg',
          publishDate: '2024-03-14',
          category: '前端开发',
          categoryId: 1,
          commentCount: 5,
          tags: ['CSS', 'Grid布局', '响应式设计']
        },
        {
          id: 3,
          title: 'JavaScript异步编程实践',
          summary: '异步编程是JavaScript中的重要概念。本文将探讨Promise、async/await等异步编程方案的最佳实践...',
          thumbnail: '/src/assets/article-3.svg',
          publishDate: '2024-03-13',
          category: '前端开发',
          categoryId: 1,
          commentCount: 12,
          tags: ['JavaScript', '异步编程', 'Promise']
        },
        {
          id: 4,
          title: 'Vue Router导航守卫详解',
          summary: '路由导航守卫是Vue Router中的重要特性，它可以控制导航流程。本文将详细介绍导航守卫的使用方法...',
          thumbnail: '/src/assets/article-4.svg',
          publishDate: '2024-03-12',
          category: '前端开发',
          categoryId: 1,
          commentCount: 6,
          tags: ['Vue.js', 'Vue Router', '路由']
        },
        {
          id: 5,
          title: 'Vuex状态管理实战',
          summary: 'Vuex是Vue.js的状态管理模式和库。本文将通过实际案例介绍Vuex的核心概念和使用技巧...',
          thumbnail: '/src/assets/article-5.svg',
          publishDate: '2024-03-11',
          category: '前端开发',
          categoryId: 1,
          commentCount: 9,
          tags: ['Vue.js', 'Vuex', '状态管理']
        },
        {
          id: 6,
          title: 'Vue.js组件设计模式',
          summary: '好的组件设计可以提高代码的可维护性和复用性。本文将分享Vue.js组件设计的最佳实践和常见模式...',
          thumbnail: '/src/assets/article-6.svg',
          publishDate: '2024-03-10',
          category: '前端开发',
          categoryId: 1,
          commentCount: 7,
          tags: ['Vue.js', '组件设计', '最佳实践']
        }
      ],
      currentPage: 1,
      pageSize: 6,
      loading: false,
      categories: [
        { id: 1, name: '前端开发', count: 6 },
        { id: 2, name: 'JavaScript', count: 3 },
        { id: 3, name: 'CSS', count: 2 },
        { id: 4, name: 'Vue.js', count: 4 }
      ]
    }
  },
  computed: {
    hotArticles() {
      // 按评论数排序获取热门文章
      return [...this.articles]
        .sort((a, b) => b.commentCount - a.commentCount)
        .slice(0, 5)
    },
    allTags() {
      // 收集所有文章的标签
      const tagSet = new Set()
      this.articles.forEach(article => {
        article.tags.forEach(tag => tagSet.add(tag))
      })
      return Array.from(tagSet)
    },
    displayedArticles() {
      return this.articles.slice(0, this.currentPage * this.pageSize)
    },
    hasMoreArticles() {
      return this.displayedArticles.length < this.articles.length
    }
  },
  methods: {
    async loadMoreArticles() {
      this.loading = true
      // 模拟异步加载
      await new Promise(resolve => setTimeout(resolve, 1000))
      this.currentPage++
      this.loading = false
    },
    getRandomFontSize() {
      // 生成随机字体大小，使标签云看起来更自然
      const sizes = ['0.9em', '1em', '1.1em', '1.2em']
      return sizes[Math.floor(Math.random() * sizes.length)]
    }
  }
}
</script>

<style scoped>
.home {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.articles-grid {
  display: grid;
  gap: 30px;
  margin-bottom: 40px;
}

.article-card {
  background: #fff;
  border-radius: 10px;
  overflow: hidden;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;
}

.article-card:hover {
  transform: translateY(-5px);
}

.article-thumbnail {
  position: relative;
  padding-top: 56.25%;
  /* 16:9 aspect ratio */
}

.article-thumbnail img {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-content {
  padding: 20px;
}

.article-title {
  margin: 0 0 10px;
  font-size: 1.5em;
}

.article-title a {
  color: #333;
  text-decoration: none;
  transition: color 0.3s ease;
}

.article-title a:hover {
  color: #4CAF50;
}

.article-summary {
  color: #666;
  margin-bottom: 15px;
  line-height: 1.5;
}

.article-meta {
  display: flex;
  gap: 20px;
  color: #888;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.article-meta a {
  color: #4CAF50;
  text-decoration: none;
}

.article-meta a:hover {
  text-decoration: underline;
}

.article-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  background-color: #f0f0f0;
  color: #666;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

.load-more {
  text-align: center;
  margin-top: 40px;
}

.load-more-btn {
  background: #4CAF50;
  color: white;
  border: none;
  padding: 12px 30px;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s ease;
}

.load-more-btn:hover:not(:disabled) {
  background: #45a049;
}

.load-more-btn:disabled {
  background: #ccc;
  cursor: not-allowed;
}

/* 响应式布局 */
/* 桌面端布局 */
@media (min-width: 1025px) {
  .home {
    display: grid;
    grid-template-columns: 3fr 1fr;
    gap: 30px;
  }

  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  /* 侧边栏样式 */
  .sidebar {
    display: flex;
    flex-direction: column;
    gap: 30px;
  }

  .sidebar-widget {
    background: #f8f8f8;
    padding: 20px;
    border-radius: 10px;
  }

  .widget-title {
    font-size: 1.2em;
    margin-bottom: 15px;
    padding-bottom: 10px;
    border-bottom: 2px solid #4CAF50;
    color: #333;
  }

  .author-widget {
    text-align: center;
  }

  .author-avatar {
    width: 80px;
    height: 80px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 15px;
    border: 3px solid #fff;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  }

  .author-avatar img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .author-name {
    font-size: 1.1em;
    margin-bottom: 10px;
    color: #333;
  }

  .author-bio {
    color: #666;
    font-size: 0.9em;
    line-height: 1.5;
  }

  .hot-articles {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .hot-article-item {
    display: flex;
    align-items: flex-start;
    margin-bottom: 15px;
  }

  .article-rank {
    width: 24px;
    height: 24px;
    border-radius: 50%;
    background: #4CAF50;
    color: white;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 0.8em;
    margin-right: 10px;
    flex-shrink: 0;
  }

  .hot-article-title {
    color: #333;
    text-decoration: none;
    font-size: 0.9em;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
    transition: color 0.3s ease;
  }

  .hot-article-title:hover {
    color: #4CAF50;
  }

  .category-list {
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .category-item {
    margin-bottom: 10px;
  }

  .category-item a {
    color: #333;
    text-decoration: none;
    display: flex;
    justify-content: space-between;
    align-items: center;
    transition: color 0.3s ease;
  }

  .category-item a:hover {
    color: #4CAF50;
  }

  .category-count {
    background: #eee;
    padding: 2px 8px;
    border-radius: 10px;
    font-size: 0.8em;
    color: #666;
  }

  .tag-cloud {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
  }

  .cloud-tag {
    color: #666;
    text-decoration: none;
    background: #eee;
    padding: 5px 10px;
    border-radius: 3px;
    transition: all 0.3s ease;
  }

  .cloud-tag:hover {
    background: #4CAF50;
    color: white;
    transform: translateY(-2px);
  }
}

/* 平板端布局 */
@media (min-width: 768px) and (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .article-card {
    display: grid;
    grid-template-columns: 1fr 2fr;
    gap: 20px;
  }

  .article-thumbnail {
    padding-top: 100%;
  }
}

/* 移动端布局 */
@media (max-width: 767px) {
  .home {
    padding: 10px;
  }

  .articles-grid {
    grid-template-columns: 1fr;
    gap: 20px;
  }

  .article-meta {
    flex-direction: column;
    gap: 5px;
  }

  .article-title {
    font-size: 1.2em;
  }

  .article-summary {
    font-size: 0.9em;
  }

  .tag {
    font-size: 0.8em;
  }

  /* 移动端侧边栏适配 */
  .sidebar {
    margin-top: 40px;
  }

  .sidebar-widget {
    background: #f8f8f8;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 20px;
  }

  .widget-title {
    font-size: 1.1em;
    margin-bottom: 10px;
  }
}
</style>