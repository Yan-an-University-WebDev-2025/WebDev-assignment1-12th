<template>
  <div class="category-view">
    <h1>文章分类</h1>
    
    <div class="category-list">
      <div 
        v-for="category in categories" 
        :key="category.id" 
        class="category-item"
        :class="{ active: selectedCategory === category.id }"
        @click="selectCategory(category.id)"
      >
        <h2>{{ category.name }}</h2>
        <span class="article-count">{{ category.articleCount }} 篇文章</span>
      </div>
    </div>

    <div class="articles-container">
      <div 
        v-for="article in filteredArticles" 
        :key="article.id" 
        class="article-card"
      >
        <div class="article-image">
          <img :src="article.thumbnail" :alt="article.title">
        </div>
        <div class="article-info">
          <h3>
            <router-link :to="`/article/${article.id}`">{{ article.title }}</router-link>
          </h3>
          <p class="article-summary">{{ article.summary }}</p>
          <div class="article-meta">
            <span class="publish-date">{{ article.publishDate }}</span>
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
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'CategoryView',
  data() {
    return {
      selectedCategory: null,
      categories: [
        { id: 1, name: '技术', articleCount: 10 },
        { id: 2, name: '生活', articleCount: 5 },
        { id: 3, name: '随笔', articleCount: 8 }
      ],
      articles: [
        {
          id: 1,
          title: '示例文章标题1',
          summary: '这是一篇示例文章的摘要内容...',
          thumbnail: 'https://via.placeholder.com/300x200',
          publishDate: '2024-03-15',
          commentCount: 5,
          categoryId: 1,
          tags: ['Vue.js', 'JavaScript']
        },
        // 更多文章...
      ]
    }
  },
  computed: {
    filteredArticles() {
      if (!this.selectedCategory) return this.articles
      return this.articles.filter(article => article.categoryId === this.selectedCategory)
    }
  },
  methods: {
    selectCategory(categoryId) {
      this.selectedCategory = categoryId
    }
  }
}
</script>

<style scoped>
.category-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 20px;
}

.category-list {
  display: flex;
  gap: 20px;
  margin-bottom: 30px;
  flex-wrap: wrap;
}

.category-item {
  background-color: #f5f5f5;
  padding: 15px 25px;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.3s ease;
}

.category-item:hover {
  background-color: #e0e0e0;
}

.category-item.active {
  background-color: #4CAF50;
  color: white;
}

.article-count {
  font-size: 0.9em;
  color: #666;
}

.active .article-count {
  color: #fff;
}

.articles-container {
  display: grid;
  gap: 30px;
}

.article-card {
  display: flex;
  background: #fff;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.article-image {
  flex: 0 0 300px;
}

.article-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.article-info {
  flex: 1;
  padding: 20px;
}

.article-info h3 {
  margin: 0 0 10px;
}

.article-info h3 a {
  color: #333;
  text-decoration: none;
}

.article-info h3 a:hover {
  color: #4CAF50;
}

.article-summary {
  color: #666;
  margin-bottom: 15px;
}

.article-meta {
  display: flex;
  gap: 20px;
  color: #888;
  font-size: 0.9em;
  margin-bottom: 10px;
}

.article-tags {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.tag {
  background-color: #e0e0e0;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 0.9em;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .articles-container {
    grid-template-columns: repeat(2, 1fr);
  }

  .article-card {
    flex-direction: column;
  }

  .article-image {
    flex: 0 0 200px;
  }
}

@media (max-width: 768px) {
  .articles-container {
    grid-template-columns: 1fr;
  }

  .category-item {
    width: calc(50% - 10px);
    text-align: center;
  }
}
</style>