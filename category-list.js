/**
 * 分类文章列表管理类
 * 负责加载特定分类的文章
 */
class CategoryArticleList {
    constructor() {
        this.category = this.getCategoryFromUrl();
        this.allArticles = this.generateSampleArticles(12); // 复用文章数据生成方法
        this.filteredArticles = this.filterArticlesByCategory();
        this.currentPage = 0;
        this.articlesPerPage = 6;
        this.articleList = document.getElementById('article-list');
        this.loadMoreBtn = document.getElementById('load-more');
        this.categoryTitle = document.getElementById('category-title');
    }

    /**
     * 从URL获取当前分类
     */
    getCategoryFromUrl() {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get('category') || 'all';
    }

    /**
     * 生成示例文章数据（与首页保持一致）
     */
    generateSampleArticles(count) {
        const categoriesMap = {
            'tech': '技术文章',
            'life': '生活随笔',
            'study': '学习笔记'
        };
        
        const titles = {
            'tech': ['JavaScript高级编程', 'React组件设计', 'CSS布局技巧'],
            'life': ['旅行见闻', '日常感悟', '生活技巧'],
            'study': ['学习方法', '笔记技巧', '知识总结']
        };

        const articles = [];
        
        // 为每个分类生成文章
        Object.keys(categoriesMap).forEach(categoryKey => {
            for (let i = 1; i <= 4; i++) {
                const viewCount = Math.floor(Math.random() * 1000) + 50;
                articles.push({
                    title: `${titles[categoryKey][i%3]} ${i}`,
                    summary: `这是一篇关于${categoriesMap[categoryKey]}的文章，包含实用的内容和见解。`,
                    date: `2025-11-${i.toString().padStart(2, '0')}`,
                    category: categoriesMap[categoryKey],
                    categoryKey: categoryKey,
                    comments: Math.floor(Math.random() * 15) + 1,
                    views: viewCount,
                    likes: Math.floor(viewCount * 0.2) + Math.floor(Math.random() * 20),
                    image: `thumbnail-${categoryKey}-${i}.jpg`,
                    id: `${categoryKey}-${i}`
                });
            }
        });
        
        return articles;
    }

    /**
     * 根据分类筛选文章
     */
    filterArticlesByCategory() {
        if (this.category === 'all') return this.allArticles;
        
        return this.allArticles.filter(article => 
            article.categoryKey === this.category
        );
    }

    /**
     * 创建文章DOM元素（与首页保持一致）
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
     * 加载分类文章
     */
    loadArticles() {
        // 设置页面标题
        const categoryNames = {
            'tech': '技术文章',
            'life': '生活随笔',
            'study': '学习笔记'
        };
        this.categoryTitle.textContent = categoryNames[this.category] || '所有文章';

        const startIndex = this.currentPage * this.articlesPerPage;
        const endIndex = startIndex + this.articlesPerPage;
        const articlesToDisplay = this.filteredArticles.slice(startIndex, endIndex);

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
        if (this.currentPage * this.articlesPerPage >= this.filteredArticles.length) {
            this.loadMoreBtn.style.display = 'none';
        }
    }

    /**
     * 初始化页面
     */
    init() {
        this.loadArticles();
        
        if (this.loadMoreBtn) {
            this.loadMoreBtn.addEventListener('click', () => {
                this.loadArticles();
            });
        }
    }
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    const categoryList = new CategoryArticleList();
    categoryList.init();
});