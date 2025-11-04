/**
 * 文章数据管理类
 * 负责文章的加载、分页和显示功能
 */
class ArticleManager {
    /**
     * 构造函数 - 初始化文章管理器
     */
    constructor() {
        this.allArticles = this.generateSampleArticles(20); // 生成20篇文章用于演示分页
        this.currentPage = 1; // 当前页码（从1开始）
        this.articlesPerPage = 6; // 每页显示文章数量
        this.totalPages = Math.ceil(this.allArticles.length / this.articlesPerPage); // 总页数
        this.articleList = document.getElementById('article-list'); // 文章列表容器
        this.loadMoreBtn = document.getElementById('load-more'); // 加载更多按钮
        this.pagination = document.getElementById('pagination'); // 分页导航容器
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
            '数据库设计原则',
            '微服务架构实践',
            'Docker容器化部署',
            'Redis缓存优化',
            'MySQL性能调优',
            'Python数据分析',
            '机器学习入门',
            '人工智能应用',
            '云原生技术栈'
        ];
        
        const articles = [];
        
        for (let i = 1; i <= count; i++) {
            const viewCount = Math.floor(Math.random() * 1000) + 50;
            const likeCount = Math.floor(viewCount * 0.2) + Math.floor(Math.random() * 20);
            
            articles.push({
                title: titles[i - 1] || `文章 ${i}`,
                summary: `这是关于${titles[i - 1] || '技术'}的深度解析文章，包含实用技巧和最佳实践。`,
                date: `2025-11-${(i % 30 + 1).toString().padStart(2, '0')}`,
                category: categories[(i - 1) % categories.length],
                comments: Math.floor(Math.random() * 15) + 1,
                views: viewCount,
                likes: likeCount,
                image: `images/article${((i - 1) % 12) + 1}.jpg`,
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
     * 加载指定页码的文章（替换模式）
     * @param {number} page - 页码（从1开始）
     */
    loadArticlesByPage(page) {
        const startIndex = (page - 1) * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToDisplay = this.allArticles.slice(startIndex, endIndex);

        // 清空现有内容
        this.articleList.innerHTML = '';

        if (articlesToDisplay.length === 0) {
            this.articleList.innerHTML = '<p style="text-align: center; color: #666;">没有更多文章</p>';
            return;
        }

        const fragment = document.createDocumentFragment();
        articlesToDisplay.forEach(article => {
            fragment.appendChild(this.createArticleElement(article));
        });

        this.articleList.appendChild(fragment);
        this.currentPage = page;
        
        // 滚动到页面顶部
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // 更新分页导航
        this.updatePagination();
        
        // 更新加载更多按钮状态
        this.updateLoadMoreButton();
    }

    /**
     * 加载更多文章（追加模式）
     */
    loadMoreArticles() {
        if (this.currentPage >= this.totalPages) {
            this.loadMoreBtn.style.display = 'none';
            return;
        }
        
        const nextPage = this.currentPage + 1;
        const startIndex = (nextPage - 1) * this.articlesPerPage;
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
        this.currentPage = nextPage;
        
        // 更新分页导航
        this.updatePagination();
        
        // 更新加载更多按钮状态
        this.updateLoadMoreButton();
    }

    /**
     * 更新加载更多按钮状态
     */
    updateLoadMoreButton() {
        if (this.currentPage >= this.totalPages) {
            this.loadMoreBtn.style.display = 'none';
        } else {
            this.loadMoreBtn.style.display = 'block';
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
     * 创建分页导航
     */
    createPagination() {
        this.pagination.innerHTML = '';
        
        const fragment = document.createDocumentFragment();
        
        // 上一页按钮
        const prevBtn = document.createElement('button');
        prevBtn.textContent = '上一页';
        prevBtn.disabled = this.currentPage === 1;
        prevBtn.addEventListener('click', () => this.loadArticlesByPage(this.currentPage - 1));
        fragment.appendChild(prevBtn);
        
        // 页码按钮
        const maxButtons = 5; // 最多显示5个页码按钮
        let startPage = Math.max(1, this.currentPage - Math.floor(maxButtons / 2));
        let endPage = Math.min(this.totalPages, startPage + maxButtons - 1);
        
        // 调整起始页码
        if (endPage - startPage < maxButtons - 1) {
            startPage = Math.max(1, endPage - maxButtons + 1);
        }
        
        // 第一页
        if (startPage > 1) {
            const firstBtn = document.createElement('button');
            firstBtn.textContent = '1';
            firstBtn.addEventListener('click', () => this.loadArticlesByPage(1));
            fragment.appendChild(firstBtn);
            
            if (startPage > 2) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.className = 'page-info';
                fragment.appendChild(dots);
            }
        }
        
        // 中间页码
        for (let i = startPage; i <= endPage; i++) {
            const pageBtn = document.createElement('button');
            pageBtn.textContent = i;
            if (i === this.currentPage) {
                pageBtn.classList.add('active');
            }
            pageBtn.addEventListener('click', () => this.loadArticlesByPage(i));
            fragment.appendChild(pageBtn);
        }
        
        // 最后一页
        if (endPage < this.totalPages) {
            if (endPage < this.totalPages - 1) {
                const dots = document.createElement('span');
                dots.textContent = '...';
                dots.className = 'page-info';
                fragment.appendChild(dots);
            }
            
            const lastBtn = document.createElement('button');
            lastBtn.textContent = this.totalPages;
            lastBtn.addEventListener('click', () => this.loadArticlesByPage(this.totalPages));
            fragment.appendChild(lastBtn);
        }
        
        // 下一页按钮
        const nextBtn = document.createElement('button');
        nextBtn.textContent = '下一页';
        nextBtn.disabled = this.currentPage === this.totalPages;
        nextBtn.addEventListener('click', () => this.loadArticlesByPage(this.currentPage + 1));
        fragment.appendChild(nextBtn);
        
        this.pagination.appendChild(fragment);
    }

    /**
     * 更新分页导航
     */
    updatePagination() {
        this.createPagination();
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
        // 加载第一页文章
        this.loadArticlesByPage(1);
        
        // 加载热门文章
        this.loadHotArticles();
        
        // 绑定加载更多按钮
        this.loadMoreBtn.addEventListener('click', () => {
            this.loadMoreArticles();
        });

        // 添加键盘支持
        document.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && document.activeElement === this.loadMoreBtn) {
                this.loadMoreArticles();
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
