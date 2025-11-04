/**
 * 文章详情页面管理类
 * 负责文章详情和评论功能的处理
 */
class ArticleDetail {
    /**
     * 构造函数 - 初始化文章详情管理器
     */
    constructor() {
        this.article = this.getArticleData();
        this.comments = this.getCommentsData();
        this.commentsList = document.getElementById('comments-list');
        this.form = document.getElementById('comment-form');
        this.errorMessage = document.getElementById('error-message');
    }

    /**
     * 获取文章数据（可根据URL参数动态获取）
     * @returns {Object} 文章数据对象
     */
    getArticleData() {
        const urlParams = new URLSearchParams(window.location.search);
        const articleId = urlParams.get('id') || '1';

        // 模拟从数据库获取文章数据
        const articles = {
            '1': {
                title: "深入理解JavaScript闭包",
                author: "张三",
                publishDate: "2025-10-01",
                content: `
                <p>JavaScript作为Web前端的核心语言，掌握其高级编程技巧能显著提升代码质量和开发效率。本文将深入探讨几个实用的高级技巧。</p>
                
                <h3>1. 函数式编程与纯函数</h3>
                <p>纯函数是指不依赖外部状态且没有副作用的函数，这使得代码更易于测试和维护：</p>
                <pre><code>// 纯函数示例
function calculateTotal(price, quantity, taxRate) {
  return price * quantity * (1 + taxRate);
}</code></pre>
                <p>纯函数的优势在于相同输入永远返回相同输出，非常适合用于数据处理逻辑。</p>
                
                <h3>2. 闭包的高级应用</h3>
                <p>闭包不仅可以用于私有变量，还能创建工厂函数和实现柯里化：</p>
                <pre><code>// 函数柯里化示例
function createMultiplier(multiplier) {
  return function(number) {
    return number * multiplier;
  };
}

const double = createMultiplier(2);
console.log(double(5)); // 输出: 10</code></pre>
                
                <h3>3. 异步编程模式</h3>
                <p>现代JavaScript中，异步编程已从回调函数发展到Promise和async/await：</p>
                <pre><code>// async/await示例
async function fetchUserData(userId) {
  try {
    const response = await fetch(\`/api/users/\${userId}\`);
    const user = await response.json();
    return user;
  } catch (error) {
    console.error('获取用户数据失败:', error);
    return null;
  }
}</code></pre>
                
                <h3>4. 性能优化技巧</h3>
                <ul>
                    <li>使用requestAnimationFrame优化动画性能</li>
                    <li>通过防抖节流控制高频事件（滚动、 resize等）</li>
                    <li>合理使用Web Workers处理复杂计算</li>
                    <li>利用WeakMap和WeakSet避免内存泄漏</li>
                </ul>
                
                <h3>总结</h3>
                <p>这些高级技巧能够帮助开发者编写更优雅、高效且可维护的JavaScript代码。重要的是理解每种技巧的适用场景，而不是盲目使用。随着JavaScript语言的不断发展，持续学习新特性和最佳实践是每个前端开发者的必备技能。</p>
            `
            },
            'life-1': {
                title: "周末徒步：城市边缘的自然探索",
                author: "林小夏",
                publishDate: "2025-10-12",
                content: `
        <p>在钢筋水泥的城市里待久了，总向往着一片能让脚步慢下来的土地。这个周末，我避开热门景区，选择了城市边缘一条小众徒步路线，收获了意外的宁静与惊喜。</p>
        
        <h3>出发前的准备</h3>
        <p>没有复杂的装备，只带了一双舒适的运动鞋、轻便背包、保温杯和相机。提前查好天气，穿上速干衣裤，七点准时从家里出发。避开早高峰的地铁，四十分钟后抵达徒步起点——一条连接城市与郊野的废弃铁路。</p>
        
        <h3>沿途风景</h3>
        <p>铁路两旁早已被自然接管：野生牵牛花顺着铁轨缝隙攀爬，不知名的小黄花在风中摇曳，偶尔有蝴蝶停在肩头。走了约两公里，遇见一处被当地人称为"秘密花园"的小山坡，漫山遍野的波斯菊正开得热烈。</p>
        
        <p>正午在一棵老槐树下休息，喝着自带的菊花茶，听着远处溪流声和鸟鸣。没有信号的两小时里，反而找回了久违的专注——观察蚂蚁搬家的路线，看云影在草地上流动，这种简单的快乐竟让人上瘾。</p>
        
        <h3>意外的相遇</h3>
        <p>返程时遇到一位守林老人，他说这条路线曾是运送木材的铁路，废弃后成了附近居民的"后花园"。老人给我指了条近路，沿途还能看到几十年前的铁轨枕木，上面的刻痕记录着时光的痕迹。</p>
        
        <h3>徒步的意义</h3>
        <p>其实所谓远方，未必需要长途跋涉。有时转身离开喧嚣，在城市边缘就能找到与自然对话的方式。徒步的意义不在于走多远，而在于让浮躁的心在脚步声中慢慢沉淀。</p>
        
        <p>下次计划探索城市另一端的湿地，如果你也有私藏的小众路线，欢迎在评论区分享~</p>
        `
            },
            'life-2': {
                title: "秋日厨房：用一顿早餐唤醒清晨",
                author: "陈默",
                publishDate: "2025-10-08",
                content: `
        <p>秋分过后，天亮得越来越晚。作为一个曾经的"早餐将就党"，这个秋天我决定做出改变——用三十分钟为自己准备一顿像样的早餐，开启元气满满的一天。</p>
        
        <h3>简易又治愈的早餐清单</h3>
        <ul>
            <li><strong>全麦吐司牛油果蛋</strong>：吐司烤至金黄，铺上切片牛油果，再盖一个水波蛋，撒少许黑胡椒和辣椒粉</li>
            <li><strong>南瓜小米粥</strong>：前一晚预约电饭煲，早上起来就能喝到温热绵密的粥，配一碟腌萝卜绝了</li>
            <li><strong>香蕉燕麦杯</strong>：燕麦加牛奶泡软，分层铺上香蕉片和希腊酸奶，撒点坚果碎</li>
        </ul>
        
        <h3>早餐时光的小确幸</h3>
        <p>把餐桌移到窗边，让晨光刚好落在餐碟上。慢慢咀嚼食物的过程中，会发现平时忽略的细节：牛油果的清香、鸡蛋黄的流心质感、粥里南瓜的甜味...</p>
        
        <p>其实做早餐的过程也是一种冥想。打鸡蛋时专注于蛋壳裂开的瞬间，切面包时听刀与砧板接触的声音，这些简单的动作能让人从对未来的焦虑中抽离出来，活在当下。</p>
        
        <h3>三十天坚持下来的变化</h3>
        <p>不再需要闹钟叫醒，身体会自然在七点苏醒；工作时的专注力明显提升，很少再出现上午犯困的情况；甚至开始期待每个清晨的厨房时光。</p>
        
        <p>生活的仪式感未必需要昂贵的成本，有时只是一顿认真对待的早餐，就能让人感受到被温柔对待的美好。</p>
        `
            }

        };



        return articles[articleId] || articles['1'];
    }

    /**
     * 获取评论数据
     * @returns {Array} 评论数据数组
     */
    getCommentsData() {
        return [
            { 
                author: "李四", 
                date: "2025-10-02", 
                content: "这篇文章解释得非常清晰，让我对闭包有了更深的理解！",
                avatar: "L"
            },
            { 
                author: "王五", 
                date: "2025-10-03", 
                content: "作者用简单的例子解释了复杂的概念，非常适合初学者阅读。",
                avatar: "W"
            }
        ];
    }

    /**
     * 加载文章内容到页面
     */
    loadArticle() {
        document.getElementById('article-title').textContent = this.article.title;
        document.getElementById('author').textContent = `作者：${this.article.author}`;
        document.getElementById('publish-date').textContent = `发布日期：${this.article.publishDate}`;
        document.getElementById('article-content').innerHTML = this.article.content;
    }

    /**
     * 加载评论列表到页面
     */
    loadComments() {
        const fragment = document.createDocumentFragment();

        this.comments.forEach(comment => {
            fragment.appendChild(this.createCommentElement(comment));
        });

        this.commentsList.appendChild(fragment);
    }

    /**
     * 创建评论DOM元素
     * @param {Object} comment - 评论数据对象
     * @returns {HTMLElement} 评论DOM元素
     */
    createCommentElement(comment) {
        const commentElement = document.createElement('div');
        commentElement.classList.add('comment-item');
        
        // 生成头像字母（使用昵称首字母）
        const avatarLetter = comment.avatar || comment.author.charAt(0).toUpperCase();
        
        commentElement.innerHTML = `
            <div class="comment-avatar">${avatarLetter}</div>
            <div class="comment-content-wrapper">
                <div class="comment-header">
                    <div class="author">${comment.author}</div>
                    <div class="date">${comment.date}</div>
                </div>
                <div class="content">${comment.content}</div>
            </div>
        `;
        return commentElement;
    }

    /**
     * 验证表单数据
     * @param {string} name - 姓名
     * @param {string} email - 邮箱
     * @param {string} content - 评论内容
     * @returns {string|null} 错误消息或null（验证通过）
     */
    validateForm(name, email, content) {
        if (!name || !email || !content) {
            return "请填写完整";
        }

        const emailPattern = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;;
        if (!emailPattern.test(email)) {
            return "请输入有效的邮箱地址";
        }

        return null;
    }

    /**
     * 处理表单提交事件
     * @param {Event} e - 事件对象
     */
    handleFormSubmit(e) {
        e.preventDefault();

        const name = document.getElementById('name').value.trim();
        const email = document.getElementById('email').value.trim();
        const content = document.getElementById('content').value.trim();

        const error = this.validateForm(name, email, content);
        if (error) {
            this.errorMessage.textContent = error;
            this.errorMessage.style.display = "block";
            return;
        }

        this.errorMessage.style.display = "none";
        this.addNewComment(name, content);
        this.form.reset();
    }

    /**
     * 添加新评论到页面和数据
     * @param {string} author - 评论作者
     * @param {string} content - 评论内容
     */
    addNewComment(author, content) {
        // 获取当前登录用户
        const currentUserStr = localStorage.getItem('blog_current_user');
        const currentUser = currentUserStr ? JSON.parse(currentUserStr) : null;
        
        const newComment = {
            author,
            date: new Date().toLocaleDateString('zh-CN'),
            content,
            avatar: currentUser ? currentUser.nickname.charAt(0).toUpperCase() : author.charAt(0).toUpperCase()
        };

        this.commentsList.appendChild(this.createCommentElement(newComment));
        this.comments.push(newComment);
    }

    /**
     * 初始化文章详情页面
     */
    init() {
        this.loadArticle();
        this.loadComments();

        if (this.form) {
            this.form.addEventListener('submit', (e) => this.handleFormSubmit(e));
        }
    }
}

/**
 * 页面初始化函数
 * DOM加载完成后执行
 */
document.addEventListener('DOMContentLoaded', () => {
    const articleDetail = new ArticleDetail();
    articleDetail.init();
});
