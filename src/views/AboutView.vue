<template>
  <div class="about">
    <div class="container">
      <h1>关于我们</h1>
      <div class="about-content">
        <section class="mission">
          <h2>我们的使命</h2>
          <p>致力于为读者提供高质量的文章和知识分享平台，让知识传播更加便捷和高效。</p>
        </section>

        <section class="vision">
          <h2>我们的愿景</h2>
          <p>成为最受欢迎的在线文章分享和交流平台，连接作者与读者，创造优质的阅读体验。</p>
        </section>

        <section class="values">
          <h2>核心价值观</h2>
          <ul>
            <li>质量至上：确保每篇文章都经过严格审核</li>
            <li>用户体验：提供简洁、易用的阅读环境</li>
            <li>开放共享：鼓励知识的自由传播和交流</li>
            <li>持续创新：不断改进和优化平台功能</li>
          </ul>
        </section>

        <section class="team">
          <h2>我们的团队</h2>
          <p>我们拥有一支充满激情的专业团队，包括经验丰富的编辑、技术专家和内容策划师。团队成员来自不同领域，致力于为用户提供最好的阅读体验。</p>
        </section>
      </div>
    </div>
  </div>
</template>

<style scoped>
.about {
  padding: 2rem 0;
}

.container {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 1rem;
}

h1 {
  font-size: 2.5rem;
  color: #333;
  margin-bottom: 2rem;
  text-align: center;
}

.about-content {
  display: grid;
  gap: 2rem;
}

section {
  background: #fff;
  padding: 2rem;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

h2 {
  color: #4CAF50;
  margin-bottom: 1rem;
  font-size: 1.5rem;
}

p {
  color: #666;
  line-height: 1.6;
  margin-bottom: 1rem;
}

ul {
  list-style-type: none;
  padding: 0;
}

li {
  color: #666;
  margin-bottom: 0.5rem;
  padding-left: 1.5rem;
  position: relative;
}

li::before {
  content: "•";
  color: #4CAF50;
  position: absolute;
  left: 0;
}

@media (min-width: 768px) {
  .about-content {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 767px) {
  .container {
    padding: 0 1rem;
  }

  h1 {
    font-size: 2rem;
  }

  section {
    padding: 1.5rem;
  }
}
</style>