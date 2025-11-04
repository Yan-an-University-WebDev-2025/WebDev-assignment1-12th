/**
 * 文章数据管理类
 * 负责文章的加载、分页和显示功能
 */
class ArticleManager {
    /**
     * 构造函数 - 初始化文章管理器
     */
    constructor() {
        this.allArticles = this.generateSampleArticles(12); // 生成示例文章数据
        this.currentPage = 0; // 当前页码
        this.articlesPerPage = 6; // 每页显示文章数量
        this.articleList = document.getElementById('article-list'); // 文章列表容器
        this.loadMoreBtn = document.getElementById('load-more'); // 加载更多按钮
    }

    /**
     * 生成示例文章数据
     * @param {number} count - 要生成的文章数量
     * @returns {Array} 文章数据数组
     */
    generateSampleArticles(count) {
        const categories = ['技术', '生活', '娱乐', '旅行', '教育', '编程', '美食', '健康', '运动', '科技', '心理学', '文学'];
        const titles = [
            'JavaScript高级编程技巧',
            'React Hooks深度解析',
            'CSS Grid布局完全指南',
            'Node.js性能优化实践',
            'Vue 3组合式API实战',
            'TypeScript类型系统详解',
            'Webpack配置最佳实践',
            '前端工程化建设方案',
            '移动端适配解决方案',
            '浏览器渲染原理剖析',
            'HTTP协议深入理解',
            '数据库设计原则'
        ];
        
        const articles = [];
        
        for (let i = 1; i <= count; i++) {
            const viewCount = Math.floor(Math.random() * 1000) + 50; // 50-1049次浏览
            const likeCount = Math.floor(viewCount * 0.2) + Math.floor(Math.random() * 20); // 基于浏览量的点赞数
            
            articles.push({
                title: titles[i - 1] || `文章 ${i}`,
                summary: `这是关于${titles[i - 1] || '技术'}的深度解析文章，包含实用技巧和最佳实践。`,
                date: `2025-11-${i.toString().padStart(2, '0')}`,
                category: categories[i - 1] || '其他',
                comments: Math.floor(Math.random() * 15) + 1,
                views: viewCount,
                likes: likeCount,
                image: `images/article${i}.jpg`,
                id: i
            });
        }
        return articles;
    }

    /**
     * 创建文章DOM元素
     * @param {Object} article - 文章数据对象
     * @returns {HTMLElement} 文章DOM元素
     */
    createArticleElement(article) {
        const articleElement = document.createElement('article');
        articleElement.classList.add('post');
        articleElement.innerHTML = `
            <img src="${article.image}" alt="${article.title}的缩略图" loading="lazy">
            <h2><a href="detail.html?id=${article.id}">${article.title}</a></h2>
            <p>${article.summary}</p>
            <div class="article-meta">
                <span> ${article.date}</span>
                <span> ${article.category}</span>
                <span> ${article.comments}条评论</span>
            </div>
        `;
        return articleElement;
    }

    /**
     * 加载文章到页面
     * 处理分页逻辑和显示控制
     */
    loadArticles() {
        const startIndex = this.currentPage * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToDisplay = this.allArticles.slice(startIndex, endIndex);

        if (articlesToDisplay.length === 0) {
            this.loadMoreBtn.style.display = 'none';
            return;
        }

        const fragment = document.createDocumentFragment();
        articlesToDisplay.forEach(article => {
            fragment.appendChild(this.createArticleElement(article));
        });

        this.articleList.appendChild(fragment);
        this.currentPage++;

        // 检查是否还有更多文章
        if (this.currentPage * this.articlesPerPage >= this.allArticles.length) {
            this.loadMoreBtn.style.display = 'none';
        }
    }

    /**
     * 获取热门文章Top5（按浏览量排序）
     * @returns {Array} 热门文章数组
     */
    getHotArticles() {
        return [...this.allArticles]
            .sort((a, b) => b.views - a.views)
            .slice(0, 5);
    }

    /**
     * 创建热门文章DOM元素
     * @param {Object} article - 文章数据对象
     * @param {number} rank - 排名（1-5）
     * @returns {HTMLElement} 热门文章DOM元素
     */
    createHotArticleElement(article, rank) {
        const articleElement = document.createElement('a');
        articleElement.classList.add('hot-article-item');
        articleElement.href = `detail.html?id=${article.id}`;
        articleElement.innerHTML = `
            <div class="hot-article-rank top-${rank}">${rank}</div>
            <div class="hot-article-content">
                <div class="hot-article-title">${article.title}</div>
                <div class="hot-article-meta">${article.views}次浏览 · ${article.likes}赞</div>
            </div>
        `;
        return articleElement;
    }

    /**
     * 加载热门文章到侧边栏
     */
    loadHotArticles() {
        const hotArticlesContainer = document.getElementById('hot-articles');
        if (!hotArticlesContainer) return;

        const hotArticles = this.getHotArticles();
        const fragment = document.createDocumentFragment();

        hotArticles.forEach((article, index) => {
            fragment.appendChild(this.createHotArticleElement(article, index + 1));
        });

        hotArticlesContainer.appendChild(fragment);
    }

    /**
     * 初始化文章管理器
     * 绑定事件监听器和初始加载
     */
    init() {
        this.loadArticles();
        this.loadHotArticles();
        
        this.loadMoreBtn.addEventListener('click', () => {
            this.loadArticles();
        });

        // 添加键盘支持
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement === this.loadMoreBtn) {
                this.loadArticles();
            }
        });
    }
}

/**
 * 页面初始化函数
 * DOM加载完成后执行
 */
document.addEventListener('DOMContentLoaded', () => {
    // 检查必要元素是否存在
    if (!document.getElementById('article-list') || !document.getElementById('load-more')) {
        console.warn('必要的DOM元素未找到，文章加载功能可能无法正常工作');
        return;
    }

    const articleManager = new ArticleManager();
    articleManager.init();
});
