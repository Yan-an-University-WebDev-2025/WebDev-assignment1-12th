<template>
  <div class="contact-view">
    <div class="contact-container">
      <div class="contact-info">
        <h1>联系我们</h1>
        <div class="info-item">
          <i class="fas fa-envelope"></i>
          <span>邮箱：contact@example.com</span>
        </div>
        <div class="info-item">
          <i class="fas fa-phone"></i>
          <span>电话：+86 123 4567 8900</span>
        </div>
        <div class="info-item">
          <i class="fas fa-map-marker-alt"></i>
          <span>地址：北京市朝阳区xxx街xxx号</span>
        </div>
        <div class="social-media">
          <a href="#" class="social-link">
            <i class="fab fa-weixin"></i>
          </a>
          <a href="#" class="social-link">
            <i class="fab fa-weibo"></i>
          </a>
          <a href="#" class="social-link">
            <i class="fab fa-github"></i>
          </a>
        </div>
      </div>

      <div class="contact-form">
        <h2>给我们留言</h2>
        <form @submit.prevent="submitForm">
          <div class="form-group">
            <label for="name">姓名</label>
            <input 
              type="text" 
              id="name" 
              v-model="form.name" 
              required
            >
          </div>

          <div class="form-group">
            <label for="email">邮箱</label>
            <input 
              type="email" 
              id="email" 
              v-model="form.email" 
              required
            >
          </div>

          <div class="form-group">
            <label for="subject">主题</label>
            <input 
              type="text" 
              id="subject" 
              v-model="form.subject" 
              required
            >
          </div>

          <div class="form-group">
            <label for="message">留言内容</label>
            <textarea 
              id="message" 
              v-model="form.message" 
              required
            ></textarea>
          </div>

          <button type="submit" class="submit-btn">发送留言</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ContactView',
  data() {
    return {
      form: {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
    }
  },
  methods: {
    submitForm() {
      // 这里添加表单提交逻辑
      console.log('Form submitted:', this.form)
      // 清空表单
      this.form = {
        name: '',
        email: '',
        subject: '',
        message: ''
      }
      // 显示提交成功提示
      alert('留言已提交，我们会尽快回复您！')
    }
  }
}
</script>

<style scoped>
.contact-view {
  max-width: 1200px;
  margin: 0 auto;
  padding: 40px 20px;
}

.contact-container {
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 50px;
  background: #fff;
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.1);
  overflow: hidden;
}

.contact-info {
  background: #4CAF50;
  color: white;
  padding: 40px;
}

.contact-info h1 {
  margin-bottom: 30px;
  font-size: 2em;
}

.info-item {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.info-item i {
  margin-right: 15px;
  font-size: 1.2em;
}

.social-media {
  margin-top: 40px;
  display: flex;
  gap: 20px;
}

.social-link {
  color: white;
  font-size: 1.5em;
  transition: transform 0.3s ease;
}

.social-link:hover {
  transform: scale(1.2);
}

.contact-form {
  padding: 40px;
}

.contact-form h2 {
  margin-bottom: 30px;
  color: #333;
}

.form-group {
  margin-bottom: 20px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: #666;
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
}

textarea {
  height: 150px;
  resize: vertical;
}

.submit-btn {
  background: #4CAF50;
  color: white;
  padding: 12px 30px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1em;
  transition: background 0.3s ease;
}

.submit-btn:hover {
  background: #45a049;
}

/* 响应式布局 */
@media (max-width: 1024px) {
  .contact-container {
    grid-template-columns: 1fr 1.5fr;
  }
}

@media (max-width: 768px) {
  .contact-container {
    grid-template-columns: 1fr;
  }

  .contact-info,
  .contact-form {
    padding: 30px;
  }

  .contact-info {
    text-align: center;
  }

  .info-item {
    justify-content: center;
  }

  .social-media {
    justify-content: center;
  }
}
</style>