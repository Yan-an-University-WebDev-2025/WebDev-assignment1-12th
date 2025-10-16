<template>
  <div class="article-view">
    <article class="article-content">
      <header>
        <h1>{{ article.title }}</h1>
        <div class="article-meta">
          <span class="author">作者：{{ article.author }}</span>
          <span class="date">发布时间：{{ article.publishDate }}</span>
        </div>
      </header>
      <div class="content" v-html="article.content"></div>
    </article>

    <section class="comments-section">
      <h2>评论区</h2>
      <div class="comments-list">
        <div v-for="comment in comments" :key="comment.id" class="comment-item">
          <div class="comment-header">
            <img :src="comment.avatar" :alt="comment.name" class="avatar">
            <div class="comment-meta">
              <span class="name">{{ comment.name }}</span>
              <span class="time">{{ comment.time }}</span>
            </div>
          </div>
          <div class="comment-content">{{ comment.content }}</div>
        </div>
      </div>

      <form @submit.prevent="submitComment" class="comment-form">
        <div class="form-group">
          <label for="name">姓名：</label>
          <input 
            type="text" 
            id="name" 
            v-model="newComment.name" 
            required
            @blur="validateName"
          >
          <span class="error-message" v-if="errors.name">{{ errors.name }}</span>
        </div>

        <div class="form-group">
          <label for="email">邮箱：</label>
          <input 
            type="email" 
            id="email" 
            v-model="newComment.email" 
            required
            @blur="validateEmail"
          >
          <span class="error-message" v-if="errors.email">{{ errors.email }}</span>
        </div>

        <div class="form-group">
          <label for="content">评论内容：</label>
          <textarea 
            id="content" 
            v-model="newComment.content" 
            required
            @blur="validateContent"
          ></textarea>
          <span class="error-message" v-if="errors.content">{{ errors.content }}</span>
        </div>

        <button type="submit">提交评论</button>
      </form>
    </section>
  </div>
</template>

<script>
export default {
  name: 'ArticleView',
  data() {
    return {
      article: {
        title: '示例文章标题',
        author: '作者名称',
        publishDate: '2024-03-15',
        content: '<p>这是文章的详细内容...</p>'
      },
      comments: [
        {
          id: 1,
          name: '评论者1',
          avatar: 'https://via.placeholder.com/50',
          time: '2024-03-15 10:00',
          content: '这是一条示例评论...'
        }
      ],
      newComment: {
        name: '',
        email: '',
        content: ''
      },
      errors: {
        name: '',
        email: '',
        content: ''
      }
    }
  },
  methods: {
    validateName() {
      if (!this.newComment.name.trim()) {
        this.errors.name = '请输入姓名'
      } else {
        this.errors.name = ''
      }
    },
    validateEmail() {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!this.newComment.email) {
        this.errors.email = '请输入邮箱'
      } else if (!emailRegex.test(this.newComment.email)) {
        this.errors.email = '请输入有效的邮箱地址'
      } else {
        this.errors.email = ''
      }
    },
    validateContent() {
      if (!this.newComment.content.trim()) {
        this.errors.content = '请输入评论内容'
      } else {
        this.errors.content = ''
      }
    },
    submitComment() {
      this.validateName()
      this.validateEmail()
      this.validateContent()

      if (!this.errors.name && !this.errors.email && !this.errors.content) {
        // 提交评论的逻辑
        this.comments.push({
          id: this.comments.length + 1,
          name: this.newComment.name,
          avatar: 'https://via.placeholder.com/50',
          time: new Date().toLocaleString(),
          content: this.newComment.content
        })

        // 清空表单
        this.newComment = {
          name: '',
          email: '',
          content: ''
        }
      }
    }
  }
}
</script>

<style scoped>
.article-view {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
}

.article-content {
  margin-bottom: 40px;
}

.article-meta {
  color: #666;
  margin: 10px 0 20px;
}

.article-meta span {
  margin-right: 20px;
}

.comments-section {
  margin-top: 40px;
}

.comment-item {
  border-bottom: 1px solid #eee;
  padding: 15px 0;
}

.comment-header {
  display: flex;
  align-items: center;
  margin-bottom: 10px;
}

.avatar {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  margin-right: 15px;
}

.comment-meta {
  display: flex;
  flex-direction: column;
}

.comment-meta .name {
  font-weight: bold;
}

.comment-meta .time {
  color: #666;
  font-size: 0.9em;
}

.comment-form {
  margin-top: 30px;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
}

input,
textarea {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

textarea {
  height: 100px;
  resize: vertical;
}

.error-message {
  color: red;
  font-size: 0.9em;
  margin-top: 5px;
}

button {
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  background-color: #45a049;
}

/* 响应式布局 */
@media (max-width: 768px) {
  .article-view {
    padding: 10px;
  }

  .article-meta span {
    display: block;
    margin-bottom: 5px;
  }
}
</style>