// 1. 主题切换功能
const themeToggle = document.getElementById('theme-toggle');
const body = document.body;

// 检查本地存储或系统偏好
const currentTheme = localStorage.getItem('theme') || 
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');

if (currentTheme === 'dark') {
    body.setAttribute('data-theme', 'dark');
    updateThemeIcon(true);
}

themeToggle.addEventListener('click', () => {
    const isDark = body.getAttribute('data-theme') === 'dark';
    
    if (isDark) {
        body.removeAttribute('data-theme');
        localStorage.setItem('theme', 'light');
    } else {
        body.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
    }
    updateThemeIcon(!isDark);
});

function updateThemeIcon(isDark) {
    const icon = themeToggle.querySelector('i');
    icon.className = isDark ? 'fas fa-sun' : 'fas fa-moon';
}

// 2. 导航栏滚动效果 {
    const navbar = document.querySelector('.navbar');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.style.boxShadow = 'var(--shadow-md)';
            navbar.style.height = '60px';
        } else {
            navbar.style.boxShadow = 'none';
            navbar.style.height = '70px';
        }
    });
})();

// 3. 数字递增动画 {
    const counters = document.querySelectorAll('.stat-num');
    const speed = 200; // 数字滚动速度

    const animateCounters = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counter = entry.target;
                // 提取数字部分，这里简单处理，实际应用中可解析真实数据
                const text = counter.innerText;
                const value = parseInt(text); 
                const suffix = text.replace(/[0-9]/g, ''); // 获取后缀 (如 +, W+)

                let startValue = 0;
                const duration = 1500; // 动画持续时间
                const startTime = performance.now();

                const updateCount = (currentTime) => {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    // 使用缓动函数
                    const easeOut = 1 - Math.pow(1 - progress, 3);
                    const current = Math.floor(easeOut * value);
                    
                    counter.innerText = current + suffix;

                    if (progress < 1) {
                        requestAnimationFrame(updateCount);
                    } else {
                        counter.innerText = text; // 确保最终是目标值
                    }
                };
                
                requestAnimationFrame(updateCount);
                observer.unobserve(counter); // 只触发一次
            }
        });
    };

    const observer = new IntersectionObserver(animateCounters, {
        threshold: 0.5
    });

    counters.forEach(counter => {
        observer.observe(counter);
    });
})();

// 4. 页面加载淡入动画
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});
// 5. 技能进度条滚动动画 {
    const skillSection = document.getElementById('education-skills');
    const skillBars = document.querySelectorAll('.skill-item');

    const showSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                skillBars.forEach(item => {
                    const percent = item.getAttribute('data-percent');
                    const fill = item.querySelector('.progress-fill');
                    // 设置自定义属性作为过渡后的宽度
                    setTimeout(() => {
                        fill.style.width = percent;
                    }, 200); // 稍微延迟一下，让效果更明显
                });
                observer.unobserve(entry.target); // 只触发一次
            }
        });
    };

    const skillObserver = new IntersectionObserver(showSkills, {
        threshold: 0.3 // 当30%的区域可见时触发
    });

    if (skillSection) {
        skillObserver.observe(skillSection);
    }
})();
// 6. 时间轴滚动动画 {
    const timelineItems = document.querySelectorAll('.timeline-item');

    const animateTimeline = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('show');
                observer.unobserve(entry.target); // 只触发一次
            }
        });
    };

    const observer = new IntersectionObserver(animateTimeline, {
        threshold: 0.2, // 当20%的元素可见时触发
        rootMargin: "0px 0px -50px 0px" // 稍微提前触发
    });

    timelineItems.forEach(item => {
        observer.observe(item);
    });
})();
// 7. 项目与奖项滚动动画 {
    const elements = document.querySelectorAll('.project-card, .award-item');

    const animateOnScroll = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
                observer.unobserve(entry.target);
            }
        });
    };

    const observer = new IntersectionObserver(animateOnScroll, {
        threshold: 0.2
    });

    elements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'all 0.6s cubic-bezier(0.5, 0, 0, 1)';
        observer.observe(el);
    });
})();

