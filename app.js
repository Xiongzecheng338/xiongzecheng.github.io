/* ==========================================
   全局状态与配置
   ========================================== */
const APP_CONFIG = {
    GITHUB_USER: 'badhope',
    CSDN_ID: 'weixin_56622231',
    ZHIHU_ID: 'badhope',
    RSS_BASE: 'https://rsshub.app',
    RSS_TO_JSON: 'https://api.rss2json.com/v1/api.json?rss_url=',
    TRENDING_API: 'https://api.vvhan.com/api/hotlist'
};

let currentPage = 'home';
let currentGame = 'sudoku';
let currentTrendingSource = 'weibo';
let currentBlogFilter = 'all';
let currentProjectFilter = 'all';
let isSpinning = false;

// 缓存数据
let cachedProjects = [];
let cachedArticles = { csdn: [], zhihu: [], github: [] };

// 游戏状态
let sudokuBoard = [];
let sudokuSolution = [];
let sudokuTimer = 0;
let sudokuInterval = null;
let memoryCards = [];
let memoryFlipped = [];
let memoryMoves = 0;
let memoryLocked = false;
let game2048Board = [];
let game2048Score = 0;
let game2048Best = 0;
let reactionState = 'idle';
let reactionTimeout = null;
let reactionStartTime = 0;
let reactionBest = Infinity;

// 运势数据
const fortuneData = [
    { level: '大吉', desc: '今天适合写代码，灵感不断！', color: '#ef4444', icon: '🎉' },
    { level: '吉', desc: '学习新技能的好时机。', color: '#f97316', icon: '⭐' },
    { level: '中吉', desc: '保持专注，适合重构项目。', color: '#eab308', icon: '✨' },
    { level: '小吉', desc: '多看文档，代码更优雅。', color: '#22c55e', icon: '🌟' },
    { level: '末吉', desc: '帮助他人，提升自己。', color: '#0ea5e9', icon: '💫' },
    { level: '平', desc: '稳扎稳打，完成任务。', color: '#6366f1', icon: '📋' },
    { level: '凶', desc: '注意休息，避免疲劳。', color: '#8b5cf6', icon: '⚠️' },
    { level: '大凶', desc: '建议摸鱼一天，明日再战！', color: '#ec4899', icon: '🎮' }
];

// 技能数据
const skillsData = {
    '前端开发': [
        { name: 'HTML/CSS', level: 90, color: '#0ea5e9' },
        { name: 'JavaScript', level: 85, color: '#eab308' },
        { name: 'Vue.js', level: 80, color: '#22c55e' },
        { name: 'React', level: 70, color: '#3b82f6' },
        { name: 'TypeScript', level: 75, color: '#6366f1' }
    ],
    '后端开发': [
        { name: 'Node.js', level: 75, color: '#22c55e' },
        { name: 'Python', level: 70, color: '#3b82f6' },
        { name: 'MySQL', level: 65, color: '#f59e0b' },
        { name: 'MongoDB', level: 60, color: '#22c55e' }
    ],
    'AI 与工具': [
        { name: 'Prompt Engineering', level: 85, color: '#8b5cf6' },
        { name: 'AI 工具应用', level: 90, color: '#0ea5e9' },
        { name: 'Git', level: 85, color: '#f97316' },
        { name: 'VS Code', level: 90, color: '#3b82f6' }
    ]
};

/* ==========================================
   初始化
   ========================================== */
document.addEventListener('DOMContentLoaded', () => {
    initTheme();
    initNavigation();
    initParticles();
    initSearch();
    initContactForm();
    initGameTabs();
    loadInitialData();
    startTypingEffect();
});

/* ==========================================
   主题管理
   ========================================== */
function initTheme() {
    const theme = localStorage.getItem('theme');
    if (theme === 'dark' || (!theme && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
        document.documentElement.classList.add('dark');
    }
    
    document.querySelectorAll('[id^="theme-toggle"]').forEach(btn => {
        btn.addEventListener('click', toggleTheme);
    });
}

function toggleTheme() {
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', document.documentElement.classList.contains('dark') ? 'dark' : 'light');
}

/* ==========================================
   导航与路由
   ========================================== */
function initNavigation() {
    // 桌面端导航
    document.querySelectorAll('.nav-item[data-page]').forEach(btn => {
        btn.addEventListener('click', () => showPage(btn.dataset.page));
    });
    
    // 移动端底部导航
    document.querySelectorAll('.bottom-nav-item[data-page]').forEach(btn => {
        btn.addEventListener('click', () => showPage(btn.dataset.page));
    });
    
    // 快速入口按钮
    document.querySelectorAll('[data-page]').forEach(btn => {
        if (!btn.classList.contains('nav-item') && !btn.classList.contains('bottom-nav-item')) {
            btn.addEventListener('click', () => showPage(btn.dataset.page));
        }
    });
    
    // 移动端侧边栏
    document.getElementById('mobile-menu-btn')?.addEventListener('click', openMobileDrawer);
    document.getElementById('close-drawer')?.addEventListener('click', closeMobileDrawer);
    document.getElementById('mobile-drawer-backdrop')?.addEventListener('click', closeMobileDrawer);
    
    // 生成移动端菜单
    generateMobileDrawerMenu();
}

function generateMobileDrawerMenu() {
    const nav = document.getElementById('mobile-drawer-nav');
    if (!nav) return;
    
    nav.innerHTML = `
        <div class="nav-section">
            <span class="nav-section-title">主菜单</span>
            <button data-page="home" class="nav-item active"><span>首页</span></button>
            <button data-page="dashboard" class="nav-item"><span>数据看板</span></button>
            <button data-page="projects" class="nav-item"><span>项目作品</span></button>
            <button data-page="blog" class="nav-item"><span>博客文章</span></button>
            <button data-page="skills" class="nav-item"><span>技能图谱</span></button>
        </div>
        <div class="nav-section">
            <span class="nav-section-title">娱乐</span>
            <button data-page="fortune" class="nav-item"><span>每日运势</span></button>
            <button data-page="games" class="nav-item"><span>趣味游戏</span></button>
            <button data-page="trending" class="nav-item"><span>热搜榜</span></button>
        </div>
        <div class="nav-section">
            <span class="nav-section-title">关于</span>
            <button data-page="about" class="nav-item"><span>关于我</span></button>
            <button data-page="contact" class="nav-item"><span>联系我</span></button>
        </div>
    `;
    
    nav.querySelectorAll('[data-page]').forEach(btn => {
        btn.addEventListener('click', () => showPage(btn.dataset.page));
    });
}

function showPage(pageId) {
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    const targetPage = document.getElementById('page-' + pageId);
    if (targetPage) targetPage.classList.add('active');
    
    document.querySelectorAll('.nav-item').forEach(n => n.classList.remove('active'));
    document.querySelectorAll('.bottom-nav-item').forEach(n => n.classList.remove('active'));
    
    document.querySelector(`.nav-item[data-page="${pageId}"]`)?.classList.add('active');
    document.querySelector(`.bottom-nav-item[data-page="${pageId}"]`)?.classList.add('active');
    
    currentPage = pageId;
    closeMobileDrawer();
    window.scrollTo(0, 0);
}

function openMobileDrawer() {
    document.getElementById('mobile-drawer-backdrop')?.classList.remove('hidden');
    document.getElementById('mobile-drawer')?.classList.remove('-translate-x-full');
}

function closeMobileDrawer() {
    document.getElementById('mobile-drawer-backdrop')?.classList.add('hidden');
    document.getElementById('mobile-drawer')?.classList.add('-translate-x-full');
}

/* ==========================================
   数据加载
   ========================================== */
async function loadInitialData() {
    getSystemInfo();
    getLunarInfo();
    getGitHubUserData();
    getGitHubRepos();
    fetchAllArticles();
    loadFortuneHistory();
    load2048Best();
    loadGame();
    
    renderSkills();
    renderContactCards();
    renderSocialLinks();
    
    setTimeout(() => fetchTrending('weibo'), 1000);
}

/* ==========================================
   系统信息
   ========================================== */
function getSystemInfo() {
    const container = document.getElementById('system-cards');
    if (!container) return;

    container.innerHTML = `
        <div class="card p-5 rounded-2xl">
            <h3 class="card-title text-sky-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.111 16.404a5.5 5.5 0 017.778 0M12 20h.01m-7.08-7.071c3.904-3.905 10.236-3.905 14.141 0M1.394 9.393c5.857-5.857 15.355-5.857 21.213 0"></path></svg>
                网络
            </h3>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-slate-500">状态</span><span class="${navigator.onLine ? 'text-green-600' : 'text-red-600'} font-medium">${navigator.onLine ? '在线' : '离线'}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">类型</span><span class="font-medium">${navigator.connection?.effectiveType || '未知'}</span></div>
            </div>
        </div>
        <div class="card p-5 rounded-2xl">
            <h3 class="card-title text-violet-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
                设备
            </h3>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-slate-500">屏幕</span><span class="font-medium">${screen.width}x${screen.height}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">DPR</span><span class="font-medium">${window.devicePixelRatio}x</span></div>
            </div>
        </div>
        <div class="card p-5 rounded-2xl">
            <h3 class="card-title text-emerald-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
                浏览器
            </h3>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-slate-500">平台</span><span class="font-medium">${navigator.platform}</span></div>
                <div class="flex justify-between"><span class="text-slate-500">语言</span><span class="font-medium">${navigator.language}</span></div>
            </div>
        </div>
        <div class="card p-5 rounded-2xl">
            <h3 class="card-title text-amber-600">
                <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>
                位置
            </h3>
            <div class="space-y-2 text-sm">
                <div class="flex justify-between"><span class="text-slate-500">时区</span><span class="font-medium">${Intl.DateTimeFormat().resolvedOptions().timeZone}</span></div>
                <button onclick="getLocation()" class="w-full mt-2 py-2 text-xs bg-sky-100 dark:bg-sky-900/30 rounded-lg hover:opacity-80 transition">获取位置</button>
            </div>
        </div>
    `;
}

function getLocation() {
    if (navigator.geolocation) {
        showToast('正在获取位置...');
        navigator.geolocation.getCurrentPosition(
            pos => showToast(`位置: ${pos.coords.latitude.toFixed(4)}, ${pos.coords.longitude.toFixed(4)}`),
            () => showToast('无法获取位置，请检查权限')
        );
    } else {
        showToast('浏览器不支持定位');
    }
}

/* ==========================================
   GitHub API
   ========================================== */
async function getGitHubUserData() {
    try {
        const res = await fetch(`https://api.github.com/users/${APP_CONFIG.GITHUB_USER}`);
        const data = await res.json();
        
        document.getElementById('stat-projects').textContent = data.public_repos || 0;
        document.getElementById('gh-repos').textContent = data.public_repos || 0;
        document.getElementById('gh-followers').textContent = data.followers || 0;
        document.getElementById('gh-following').textContent = data.following || 0;
        
        getGitHubStars();
    } catch (e) {
        console.error('GitHub用户数据获取失败', e);
    }
}

async function getGitHubRepos() {
    const container = document.getElementById('projects-grid');
    if (!container) return;
    
    container.innerHTML = Array(6).fill().map(() => `<div class="skeleton h-64 rounded-2xl"></div>`).join('');

    try {
        const res = await fetch(`https://api.github.com/users/${APP_CONFIG.GITHUB_USER}/repos?sort=updated&per_page=30`);
        const repos = await res.json();
        
        if (repos.message) throw new Error(repos.message);
        
        cachedProjects = repos;
        renderProjects(repos);
    } catch (e) {
        container.innerHTML = `<div class="col-span-3 text-center py-10 text-slate-500">GitHub 项目加载失败</div>`;
    }
}

function renderProjects(repos) {
    const container = document.getElementById('projects-grid');
    container.innerHTML = repos.slice(0, 9).map(repo => `
        <div class="project-card card rounded-2xl overflow-hidden group">
            <div class="h-32 bg-gradient-to-br from-slate-100 to-slate-50 dark:from-slate-700 dark:to-slate-800 flex items-center justify-center">
                <svg class="w-12 h-12 text-slate-300 group-hover:text-sky-400 transition-colors" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2h-6l-2-2H5a2 2 0 00-2 2z"></path></svg>
            </div>
            <div class="p-5">
                <h3 class="font-bold truncate">${repo.name}</h3>
                <p class="text-slate-500 text-sm mt-1 h-10 line-clamp-2">${repo.description || '暂无描述'}</p>
                <div class="flex items-center justify-between mt-4 text-xs text-slate-400">
                    <div class="flex gap-3">
                        <span class="flex items-center gap-1">
                            <svg class="w-3 h-3" fill="currentColor" viewBox="0 0 24 24"><path d="M12 .587l3.668 7.568 8.332 1.151-6.064 5.828 1.48 8.279-7.416-3.967-7.417 3.967 1.481-8.279-6.064-5.828 8.332-1.151z"></path></svg>
                            ${repo.stargazers_count}
                        </span>
                        <span class="flex items-center gap-1">
                            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
                            ${repo.forks_count}
                        </span>
                    </div>
                    <a href="${repo.html_url}" target="_blank" class="hover:text-sky-500 transition-colors">查看 →</a>
                </div>
            </div>
        </div>
    `).join('');
}

async function getGitHubStars() {
    try {
        const res = await fetch(`https://api.github.com/users/${APP_CONFIG.GITHUB_USER}/repos?per_page=100`);
        const repos = await res.json();
        const total = repos.reduce((acc, r) => acc + r.stargazers_count, 0);
        document.getElementById('stat-stars').textContent = total;
    } catch (e) {}
}

// 项目筛选
document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentProjectFilter = this.dataset.filter;
        // 这里可以添加筛选逻辑
    });
});

/* ==========================================
   文章获取
   ========================================== */
async function fetchAllArticles() {
    fetchRSS('csdn', `https://rsshub.app/csdn/blog/${APP_CONFIG.CSDN_ID}`);
    fetchRSS('zhihu', `https://rsshub.app/zhihu/people/activities/${APP_CONFIG.ZHIHU_ID}`);
    fetchGitHubActivities();
}

async function fetchRSS(source, rssUrl) {
    try {
        const res = await fetch(`${APP_CONFIG.RSS_TO_JSON}${encodeURIComponent(rssUrl)}`);
        const data = await res.json();
        
        if (data.status === 'ok') {
            cachedArticles[source] = data.items.map(item => ({
                title: item.title,
                link: item.link,
                date: new Date(item.pubDate).toLocaleDateString(),
                source: source
            }));
            if (currentBlogFilter === 'all' || currentBlogFilter === source) {
                renderArticles();
            }
        } else {
            throw new Error('RSS Parse Error');
        }
    } catch (e) {
        console.error(`${source} 文章加载失败`, e);
        cachedArticles[source] = [
            { title: `访问 ${source.toUpperCase()} 主页`, link: source === 'csdn' ? `https://blog.csdn.net/${APP_CONFIG.CSDN_ID}` : `https://www.zhihu.com/people/${APP_CONFIG.ZHIHU_ID}`, date: '点击访问', source }
        ];
        renderArticles();
    }
}

async function fetchGitHubActivities() {
    try {
        const res = await fetch(`https://api.github.com/users/${APP_CONFIG.GITHUB_USER}/events/public`);
        const events = await res.json();
        
        cachedArticles['github'] = events.slice(0, 10).map(e => ({
            title: `${e.type.replace('Event', '')}: ${e.repo?.name || 'Activity'}`,
            link: `https://github.com/${e.repo?.name}`,
            date: new Date(e.created_at).toLocaleDateString(),
            source: 'github'
        }));
        renderArticles();
    } catch (e) {
        console.error('GitHub Activity 加载失败', e);
    }
}

function renderArticles() {
    const container = document.getElementById('blog-grid');
    if (!container) return;

    let allArticles = [];
    if (currentBlogFilter === 'all') {
        allArticles = [...(cachedArticles.csdn || []), ...(cachedArticles.zhihu || []), ...(cachedArticles.github || [])];
        allArticles.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else {
        allArticles = cachedArticles[currentBlogFilter] || [];
    }

    if (allArticles.length === 0) {
        container.innerHTML = `<div class="col-span-3 text-center py-10 text-slate-400">暂无内容或加载中...</div>`;
        return;
    }

    container.innerHTML = allArticles.slice(0, 12).map(article => `
        <a href="${article.link}" target="_blank" class="card p-5 rounded-2xl hover:border-sky-300 transition-colors block">
            <div class="flex items-center gap-2 mb-2">
                <span class="text-xs px-2 py-0.5 rounded-full ${article.source === 'csdn' ? 'bg-red-100 text-red-600' : article.source === 'zhihu' ? 'bg-blue-100 text-blue-600' : 'bg-slate-100 text-slate-600'}">${article.source.toUpperCase()}</span>
                <span class="text-xs text-slate-400">${article.date}</span>
            </div>
            <h3 class="font-medium line-clamp-2">${article.title}</h3>
        </a>
    `).join('');
}

// 文章筛选
document.querySelectorAll('.source-btn').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.source-btn').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        currentBlogFilter = this.dataset.source;
        renderArticles();
    });
});

/* ==========================================
   热搜榜
   ========================================== */
async function fetchTrending(type) {
    const container = document.getElementById('trending-grid');
    if (!container) return;
    
    container.innerHTML = Array(10).fill().map(() => `<div class="skeleton h-16 rounded-xl"></div>`).join('');

    const typeMap = {
        weibo: 'weiboHot',
        zhihu: 'zhihuHot',
        bilibili: 'biliHot',
        douyin: 'douyinHot'
    };

    try {
        const res = await fetch(`${APP_CONFIG.TRENDING_API}/${typeMap[type]}`);
        const data = await res.json();
        
        if (!data.success && !data.data) throw new Error('API Error');

        const list = data.data || data.result || [];
        renderTrending(list);
    } catch (e) {
        container.innerHTML = `<div class="col-span-2 text-center py-10 text-red-500">数据加载失败</div>`;
    }
}

function renderTrending(list) {
    const container = document.getElementById('trending-grid');
    container.innerHTML = list.slice(0, 20).map((item, index) => `
        <div class="trending-item card p-4 rounded-xl flex items-center gap-4">
            <div class="trending-rank ${index < 3 ? `top-${index+1}` : 'bg-slate-200 dark:bg-slate-700 text-slate-500'}">${index + 1}</div>
            <div class="flex-1 min-w-0">
                <div class="font-medium truncate">${item.title || item.hot_word}</div>
                <div class="text-xs text-slate-400 mt-1">${item.hot_num || ''}</div>
            </div>
            ${item.hot_num ? `<span class="text-xs text-red-500 font-medium">${item.hot_num}</span>` : ''}
        </div>
    `).join('');
}

document.querySelectorAll('.trending-tab').forEach(btn => {
    btn.addEventListener('click', function() {
        document.querySelectorAll('.trending-tab').forEach(b => b.classList.remove('active'));
        this.classList.add('active');
        fetchTrending(this.dataset.source);
    });
});

/* ==========================================
   技能
   ========================================== */
function renderSkills() {
    const container = document.getElementById('skills-container');
    if (!container) return;

    const colors = ['sky', 'violet', 'amber'];
    
    container.innerHTML = Object.entries(skillsData).map(([category, skills], i) => `
        <div class="card p-6 rounded-2xl">
            <h3 class="card-title">
                <div class="w-8 h-8 rounded-lg bg-${colors[i % 3]}-100 dark:bg-${colors[i % 3]}-900/30 flex items-center justify-center">
                    <svg class="w-4 h-4 text-${colors[i % 3]}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                ${category}
            </h3>
            <div class="space-y-4">
                ${skills.map(s => `
                    <div>
                        <div class="flex justify-between mb-1">
                            <span class="text-sm font-medium">${s.name}</span>
                            <span class="text-sm text-slate-500">${s.level}%</span>
                        </div>
                        <div class="h-2 bg-slate-100 dark:bg-slate-700 rounded-full overflow-hidden">
                            <div class="h-full rounded-full transition-all duration-1000" style="width: ${s.level}%; background: ${s.color};"></div>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
    `).join('');
}

/* ==========================================
   联系方式
   ========================================== */
function renderContactCards() {
    const container = document.getElementById('contact-cards');
    if (!container) return;
    
    const contacts = [
        { icon: 'mail', label: '邮箱', value: 'x18825407105@outlook.com', href: 'mailto:x18825407105@outlook.com', color: 'sky' },
        { icon: 'phone', label: '电话', value: '18825407105', href: 'tel:18825407105', color: 'violet' },
        { icon: 'map-pin', label: '位置', value: '中国，广东', color: 'emerald' },
        { icon: 'message-circle', label: '微信', value: 'WeixinNo_10001', color: 'amber' }
    ];
    
    container.innerHTML = contacts.map(c => `
        <div class="card p-5 rounded-2xl flex items-center gap-4">
            <div class="w-12 h-12 rounded-xl bg-${c.color}-100 dark:bg-${c.color}-900/30 flex items-center justify-center">
                <svg class="w-6 h-6 text-${c.color}-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path></svg>
            </div>
            <div>
                <div class="text-sm text-slate-500">${c.label}</div>
                ${c.href ? `<a href="${c.href}" class="font-medium hover:text-sky-500">${c.value}</a>` : `<div class="font-medium">${c.value}</div>`}
            </div>
        </div>
    `).join('');
}

function renderSocialLinks() {
    const container = document.getElementById('social-links-list');
    if (!container) return;
    
    const links = [
        { name: 'GitHub', url: 'https://github.com/badhope', color: 'slate' },
        { name: 'CSDN', url: 'https://blog.csdn.net/weixin_56622231', color: 'red' },
        { name: '知乎', url: 'https://www.zhihu.com/people/badhope', color: 'blue' },
        { name: '邮箱', url: 'mailto:x18825407105@outlook.com', color: 'sky' }
    ];
    
    container.innerHTML = links.map(l => `
        <a href="${l.url}" target="_blank" class="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-700/50 transition-colors">
            <div class="w-10 h-10 rounded-lg bg-${l.color}-100 dark:bg-${l.color}-900/30 flex items-center justify-center">
                <span class="text-sm font-bold">${l.name[0]}</span>
            </div>
            <span class="font-medium">${l.name}</span>
        </a>
    `).join('');
}

/* ==========================================
   农历与打字效果
   ========================================== */
function getLunarInfo() {
    try {
        const solar = Solar.fromDate(new Date());
        const lunar = solar.getLunar();
        
        document.getElementById('lunar-info').innerHTML = `
            <div class="flex justify-between"><span class="text-slate-500">公历</span><span>${solar.toString()}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">农历</span><span>${lunar.toString()}</span></div>
            <div class="flex justify-between"><span class="text-slate-500">生肖</span><span>${lunar.getYearShengXiao()}</span></div>
        `;
    } catch(e) {}
}

function startTypingEffect() {
    const el = document.getElementById('typing-text');
    if (!el) return;
    
    const texts = ['熊泽城', 'AI 探索者', '全栈开发者', '大学生'];
    let textIdx = 0, charIdx = 0, isDeleting = false;
    
    function tick() {
        const current = texts[textIdx];
        el.textContent = current.substring(0, charIdx);
        
        if (!isDeleting) {
            charIdx++;
            if (charIdx > current.length) {
                isDeleting = true;
                setTimeout(tick, 2000);
                return;
            }
        } else {
            charIdx--;
            if (!charIdx) {
                isDeleting = false;
                textIdx = (textIdx + 1) % texts.length;
            }
        }
        setTimeout(tick, isDeleting ? 50 : 150);
    }
    tick();
}

/* ==========================================
   运势转盘
   ========================================== */
function initFortuneWheel() {
    const wheel = document.getElementById('fortune-wheel');
    if (!wheel) return;
    
    const segmentAngle = 360 / fortuneData.length;
    
    wheel.innerHTML = '';
    
    fortuneData.forEach((item, i) => {
        const segment = document.createElement('div');
        segment.style.cssText = `
            position: absolute;
            width: 50%;
            height: 50%;
            top: 0;
            right: 0;
            transform-origin: bottom left;
            transform: rotate(${i * segmentAngle - 90 + segmentAngle}deg) skewY(${90 - segmentAngle}deg);
            background: ${item.color};
            border: 1px solid rgba(255,255,255,0.3);
        `;
        
        const text = document.createElement('span');
        text.textContent = item.level;
        text.style.cssText = `
            position: absolute;
            left: 60%;
            top: 45%;
            transform: skewY(${-(90 - segmentAngle)}deg) rotate(${segmentAngle / 2}deg);
            color: white;
            font-weight: bold;
            font-size: 12px;
            text-shadow: 1px 1px 2px rgba(0,0,0,0.3);
        `;
        segment.appendChild(text);
        wheel.appendChild(segment);
    });
}

function spinWheel() {
    if (isSpinning) return;
    isSpinning = true;
    
    const wheel = document.getElementById('fortune-wheel');
    const btn = document.getElementById('spin-btn');
    btn.textContent = '...';
    
    const randomIndex = Math.floor(Math.random() * fortuneData.length);
    const segmentAngle = 360 / fortuneData.length;
    const targetAngle = 360 * 10 + (360 - randomIndex * segmentAngle - segmentAngle / 2);
    
    wheel.style.transform = `rotate(${targetAngle}deg)`;
    
    setTimeout(() => {
        isSpinning = false;
        btn.textContent = '开始';
        
        showFortuneResult(fortuneData[fortuneData.length - randomIndex - 1]);
        createConfetti();
    }, 4000);
}

function showFortuneResult(result) {
    const colors = ['红', '橙', '黄', '绿', '蓝'];
    const activities = ['写代码', '学习', '开源', '摸鱼'];
    
    document.getElementById('fortune-result').innerHTML = `
        <div class="text-center p-6 bg-gradient-to-br from-sky-50 to-violet-50 dark:from-sky-900/20 dark:to-violet-900/20 rounded-xl mb-4">
            <div class="text-4xl mb-2">${result.icon}</div>
            <div class="text-2xl font-bold" style="color: ${result.color}">${result.level}</div>
            <p class="text-slate-600 dark:text-slate-400 mt-2">${result.desc}</p>
        </div>
        <div class="grid grid-cols-2 gap-4 text-sm">
            <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                <div class="text-slate-400 mb-1">幸运颜色</div>
                <div class="font-bold">${colors[Math.floor(Math.random()*5)]}色</div>
            </div>
            <div class="p-4 bg-slate-50 dark:bg-slate-800 rounded-xl text-center">
                <div class="text-slate-400 mb-1">宜</div>
                <div class="font-bold">${activities[Math.floor(Math.random()*4)]}</div>
            </div>
        </div>
    `;
    
    saveFortuneHistory(result);
}

function saveFortuneHistory(result) {
    let history = JSON.parse(localStorage.getItem('fortuneHistory') || '[]');
    history.unshift({ icon: result.icon, level: result.level, date: new Date().toLocaleString() });
    if (history.length > 5) history.pop();
    localStorage.setItem('fortuneHistory', JSON.stringify(history));
    loadFortuneHistory();
}

function loadFortuneHistory() {
    const container = document.getElementById('fortune-history');
    const history = JSON.parse(localStorage.getItem('fortuneHistory') || '[]');
    
    if (!container) return;
    
    if (!history.length) {
        container.innerHTML = `<div class="text-center text-slate-400 py-4">暂无记录</div>`;
        return;
    }
    
    container.innerHTML = history.map(item => `
        <div class="fortune-history-item">
            <div class="flex items-center gap-2">
                <span>${item.icon}</span>
                <span class="font-medium">${item.level}</span>
            </div>
            <span class="text-xs text-slate-400">${item.date}</span>
        </div>
    `).join('');
}

/* ==========================================
   游戏模块
   ========================================== */
function initGameTabs() {
    document.querySelectorAll('.game-tab').forEach(btn => {
        btn.addEventListener('click', function() {
            document.querySelectorAll('.game-tab').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
            loadGame(this.dataset.game);
        });
    });
}

function loadGame(game) {
    currentGame = game;
    const container = document.getElementById('game-container');
    
    switch(game) {
        case 'sudoku': renderSudokuUI(); break;
        case 'memory': renderMemoryUI(); break;
        case '2048': render2048UI(); break;
        case 'reaction': renderReactionUI(); break;
    }
}

function loadGame() {
    renderSudokuUI();
}

// --- 数独 ---
function renderSudokuUI() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <div class="text-lg font-bold">数独</div>
            <div class="flex gap-2">
                <select id="sudoku-level" class="form-select py-1 text-sm">
                    <option value="easy">简单</option>
                    <option value="medium">中等</option>
                    <option value="hard">困难</option>
                </select>
                <button onclick="initSudoku()" class="primary-btn px-3 py-1 text-sm rounded-lg">新游戏</button>
            </div>
        </div>
        <div class="sudoku-grid" id="sudoku-grid"></div>
        <div class="mt-4 text-center text-sm text-slate-500">点击空格输入数字</div>
    `;
    initSudoku();
}

function initSudoku() {
    const board = generateSudoku();
    sudokuBoard = board.map(row => [...row]);
    sudokuSolution = board.map(row => [...row]);
    renderSudokuBoard();
}

function generateSudoku() {
    const base = [
        [5,3,4,6,7,8,9,1,2],
        [6,7,2,1,9,5,3,4,8],
        [1,9,8,3,4,2,5,6,7],
        [8,5,9,7,6,1,4,2,3],
        [4,2,6,8,5,3,7,9,1],
        [7,1,3,9,2,4,8,5,6],
        [9,6,1,5,3,7,2,8,4],
        [2,8,7,4,1,9,6,3,5],
        [3,4,5,2,8,6,1,7,9]
    ];
    
    const shuffle = arr => arr.sort(() => Math.random() - 0.5);
    const rows = shuffle([...Array(9).keys()]);
    const cols = shuffle([...Array(9).keys()]);
    const nums = shuffle([1,2,3,4,5,6,7,8,9]);
    
    const board = Array(9).fill().map(() => Array(9).fill(0));
    for(let r=0; r<9; r++) {
        for(let c=0; c<9; c++) {
            board[r][c] = nums[base[rows[r]][cols[c]] - 1];
        }
    }
    
    let holes = 40;
    while(holes > 0) {
        const r = Math.floor(Math.random() * 9);
        const c = Math.floor(Math.random() * 9);
        if(board[r][c]) {
            board[r][c] = 0;
            holes--;
        }
    }
    return board;
}

function renderSudokuBoard() {
    const grid = document.getElementById('sudoku-grid');
    if (!grid) return;
    
    grid.innerHTML = '';
    for(let i=0; i<81; i++) {
        const row = Math.floor(i/9), col = i%9;
        const cell = document.createElement('input');
        cell.type = 'text';
        cell.maxLength = 1;
        cell.className = 'sudoku-cell';
        cell.value = sudokuBoard[row][col] || '';
        if(sudokuBoard[row][col]) cell.readOnly = true;
        cell.addEventListener('input', e => {
            const val = parseInt(e.target.value) || 0;
            sudokuBoard[row][col] = val;
        });
        grid.appendChild(cell);
    }
}

// --- 2048 ---
function render2048UI() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <div class="text-lg font-bold">2048</div>
            <div>分数: <span id="score-2048">0</span></div>
        </div>
        <div class="game-2048-grid" id="grid-2048"></div>
        <p class="text-xs text-center mt-4 text-slate-400">使用方向键操作</p>
    `;
    init2048();
}

function init2048() {
    game2048Board = Array(16).fill(0);
    addRandomTile();
    addRandomTile();
    render2048Board();
    
    document.onkeydown = handle2048Key;
}

function addRandomTile() {
    const empty = game2048Board.map((v,i) => v===0 ? i : -1).filter(i => i!==-1);
    if(empty.length > 0) {
        const idx = empty[Math.floor(Math.random() * empty.length)];
        game2048Board[idx] = Math.random() < 0.9 ? 2 : 4;
    }
}

function render2048Board() {
    const grid = document.getElementById('grid-2048');
    if (!grid) return;
    
    grid.innerHTML = game2048Board.map(val => 
        `<div class="tile-2048 tile-${val}">${val || ''}</div>`
    ).join('');
    document.getElementById('score-2048').textContent = game2048Score;
}

function handle2048Key(e) {
    if (currentPage !== 'games' || currentGame !== '2048') return;
    
    const keyMap = { ArrowLeft: 'left', ArrowRight: 'right', ArrowUp: 'up', ArrowDown: 'down' };
    if (!keyMap[e.key]) return;
    
    e.preventDefault();
    
    // 简化的移动逻辑
    const size = 4;
    const direction = keyMap[e.key];
    const rotated = direction === 'up' || direction === 'down';
    const reversed = direction === 'right' || direction === 'down';
    
    for(let i=0; i<size; i++) {
        let line = [];
        for(let j=0; j<size; j++) {
            const idx = rotated ? j * size + i : i * size + j;
            if(game2048Board[idx]) line.push(game2048Board[idx]);
        }
        
        if(reversed) line.reverse();
        
        for(let j=0; j<line.length-1; j++) {
            if(line[j] === line[j+1]) {
                line[j] *= 2;
                game2048Score += line[j];
                line.splice(j+1, 1);
            }
        }
        
        while(line.length < size) line.push(0);
        
        if(reversed) line.reverse();
        
        for(let j=0; j<size; j++) {
            const idx = rotated ? j * size + i : i * size + j;
            game2048Board[idx] = line[j];
        }
    }
    
    addRandomTile();
    render2048Board();
    
    const best = localStorage.getItem('game2048best') || 0;
    if(game2048Score > best) localStorage.setItem('game2048best', game2048Score);
}

function load2048Best() {
    game2048Best = parseInt(localStorage.getItem('game2048best') || '0');
}

// --- 记忆翻牌 ---
function renderMemoryUI() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="flex justify-between items-center mb-4">
            <div class="text-lg font-bold">记忆翻牌</div>
            <div>步数: <span id="memory-moves">0</span></div>
        </div>
        <div class="memory-grid" id="memory-grid"></div>
    `;
    initMemory();
}

function initMemory() {
    const emojis = ['🎮','🎲','🎯','🎪','🎨','🎭','🎸','🎺'];
    memoryCards = [...emojis, ...emojis].sort(() => Math.random() - 0.5);
    memoryFlipped = [];
    memoryMoves = 0;
    memoryLocked = false;
    renderMemoryBoard();
}

function renderMemoryBoard() {
    const grid = document.getElementById('memory-grid');
    if (!grid) return;
    
    grid.innerHTML = memoryCards.map((emoji, i) => `
        <div class="memory-card aspect-square cursor-pointer" onclick="flipMemoryCard(${i})">
            <div class="memory-card-inner">
                <div class="memory-card-front">?</div>
                <div class="memory-card-back">${emoji}</div>
            </div>
        </div>
    `).join('');
}

window.flipMemoryCard = function(index) {
    if(memoryLocked) return;
    // 简化实现
};

// --- 反应测试 ---
function renderReactionUI() {
    const container = document.getElementById('game-container');
    container.innerHTML = `
        <div class="text-center">
            <div class="text-lg font-bold mb-4">反应测试</div>
            <div id="reaction-box" class="w-full h-64 rounded-2xl bg-slate-200 dark:bg-slate-700 flex items-center justify-center cursor-pointer" onclick="handleReaction()">
                <span id="reaction-text">点击开始</span>
            </div>
            <div class="mt-4 text-sm text-slate-500">最佳: <span id="reaction-best">-</span></div>
        </div>
    `;
}

window.handleReaction = function() {
    // 简化实现
};

/* ==========================================
   工具函数
   ========================================== */
function showToast(message) {
    const toast = document.getElementById('toast');
    document.getElementById('toast-message').textContent = message;
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3000);
}

function createConfetti() {
    const container = document.getElementById('confetti-container');
    const colors = ['#ef4444', '#f97316', '#eab308', '#22c55e', '#0ea5e9'];
    for(let i=0; i<50; i++) {
        const conf = document.createElement('div');
        conf.className = 'confetti';
        conf.style.left = Math.random() * 100 + 'vw';
        conf.style.background = colors[Math.floor(Math.random()*colors.length)];
        conf.style.animationDuration = (Math.random()*2 + 2) + 's';
        container.appendChild(conf);
        setTimeout(() => conf.remove(), 3000);
    }
}

function initParticles() {
    const container = document.getElementById('particles-container');
    if(!container) return;
    
    for(let i=0; i<30; i++) {
        const p = document.createElement('div');
        p.className = 'absolute rounded-full bg-sky-500/10';
        p.style.width = Math.random() * 10 + 5 + 'px';
        p.style.height = p.style.width;
        p.style.left = Math.random() * 100 + '%';
        p.style.top = Math.random() * 100 + '%';
        p.style.animation = `float ${10 + Math.random()*10}s infinite`;
        container.appendChild(p);
    }
}

function initContactForm() {
    document.getElementById('contact-form')?.addEventListener('submit', (e) => {
        e.preventDefault();
        showToast('消息已发送！');
        e.target.reset();
    });
}

function initSearch() {
    const modal = document.getElementById('search-modal');
    document.getElementById('global-search-btn')?.addEventListener('click', () => modal.classList.remove('hidden'));
    document.addEventListener('keydown', (e) => {
        if(e.key === 'Escape') modal.classList.add('hidden');
        if((e.metaKey || e.ctrlKey) && e.key === 'k') {
            e.preventDefault();
            modal.classList.toggle('hidden');
        }
    });
    modal?.querySelector('.modal-backdrop')?.addEventListener('click', () => modal.classList.add('hidden'));
}

// 暴露全局函数
window.spinWheel = spinWheel;
window.getLocation = getLocation;
window.initSudoku = initSudoku;
window.handleReaction = window.handleReaction;
window.flipMemoryCard = window.flipMemoryCard;
window.closeSearchModal = function() {
    document.getElementById('search-modal')?.classList.add('hidden');
};
