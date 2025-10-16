<template>
  <div class="home">
    <div class="articles-grid">
      <article 
        v-for="article in displayedArticles" 
        :key="article.id" 
        class="article-card"
      >
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
            <span 
              v-for="tag in article.tags" 
              :key="tag"
              class="tag"
            >
              {{ tag }}
            </span>
          </div>
        </div>
      </article>
    </div>

    <div class="load-more" v-if="hasMoreArticles">
      <button 
        @click="loadMoreArticles" 
        :disabled="loading"
        class="load-more-btn"
      >
        {{ loading ? '加载中...' : '加载更多' }}
      </button>
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
      loading: false
    }
  },
  computed: {
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
  padding-top: 56.25%; /* 16:9 aspect ratio */
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
  .home::after {
    content: '';
    background: #f8f8f8;
    padding: 20px;
    border-radius: 10px;
    height: fit-content;
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
}
</style>