// ===== 导航栏移动端菜单 =====
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');
const navLinks = document.querySelectorAll('.nav-menu a');
hamburger.addEventListener('click', () => {
hamburger.classList.toggle('active');
navMenu.classList.toggle('active');
});
navLinks.forEach(link => {
link.addEventListener('click', () => {
hamburger.classList.remove('active');
navMenu.classList.remove('active');
});
});
// ===== 滚动时导航栏高亮 =====
const sections = document.querySelectorAll('section');
window.addEventListener('scroll', () => {
let current = '';
sections.forEach(section => {
const sectionTop = section.offsetTop;
const sectionHeight = section.clientHeight;
if (scrollY >= sectionTop - 200) {
current = section.getAttribute('id');
}
});
navLinks.forEach(link => {
link.classList.remove('active');
if (link.getAttribute('href').slice(1) === current) {
link.classList.add('active');
}
});
// 回到顶部按钮显示
const backToTop = document.getElementById('backToTop');
if (scrollY > 500) {
backToTop.classList.add('show');
} else {
backToTop.classList.remove('show');
}
});
// ===== 项目筛选功能 =====
const filterBtns = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
filterBtns.forEach(btn => {
btn.addEventListener('click', () => {
// 移除所有按钮的 active 类
filterBtns.forEach(b => b.classList.remove('active'));
// 添加当前按钮的 active 类
btn.classList.add('active');
const filterValue = btn.getAttribute('data-filter');
projectCards.forEach(card => {
if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
card.style.display = 'block';
card.style.animation = 'fadeInUp 0.5s ease';
} else {
card.style.display = 'none';
}
});
});
});
// ===== 联系表单处理 =====
const contactForm = document.getElementById('contactForm');
contactForm.addEventListener('submit', (e) => {
e.preventDefault();
// 获取表单数据
const formData = {
name: document.getElementById('name').value,
email: document.getElementById('email').value,
subject: document.getElementById('subject').value,
message: document.getElementById('message').value
};
// 这里可以添加发送到服务器的代码
// 目前只是显示成功消息
alert('感谢您的留言！我会尽快回复您。');
// 重置表单
contactForm.reset();
});
// ===== 技能条动画 =====
const skillSection = document.getElementById('skills');
const progressBars = document.querySelectorAll('.progress');
const animateSkills = () => {
const sectionTop = skillSection.offsetTop;
const sectionHeight = skillSection.clientHeight;
if (scrollY >= sectionTop - window.innerHeight / 2) {
progressBars.forEach(bar => {
const width = bar.style.width;
bar.style.width = '0';
setTimeout(() => {
bar.style.width = width;
}, 100);
});
}
};
window.addEventListener('scroll', animateSkills);
// ===== 平滑滚动 =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function(e) {
e.preventDefault();
const targetId = this.getAttribute('href');
if (targetId === '#') return;
const targetElement = document.querySelector(targetId);
if (targetElement) {
const navHeight = document.querySelector('.navbar').offsetHeight;
const targetPosition = targetElement.offsetTop - navHeight;
window.scrollTo({
top: targetPosition,
behavior: 'smooth'
});
}
});
});
// ===== 打字机效果（可选） =====
const typeWriter = (element, text, speed = 100) => {
let i = 0;
element.textContent = '';
function type() {
if (i < text.length) {
element.textContent += text.charAt(i);
i++;
setTimeout(type, speed);
}
}
type();
};
// ===== 页面加载动画 =====
window.addEventListener('load', () => {
document.body.style.opacity = '0';
document.body.style.transition = 'opacity 0.5s ease';
setTimeout(() => {
document.body.style.opacity = '1';
}, 100);
});
// ===== 控制台欢迎信息 =====
console.log('%c 欢迎访问我的个人网站！', 'color: #4A90E2; font-size: 20px; font-weight: bold;');
console.log('%c 如果您对我的工作感兴趣，欢迎联系我！', 'color: #6C63FF; font-size: 14px;');
console.log('%c GitHub: https://github.com/yourusername', 'color: #7F8C8D; font-size: 12px;');
// ===== 图片懒加载（可选优化） =====
const lazyImages = document.querySelectorAll('img[data-src]');
const imageObserver = new IntersectionObserver((entries, observer) => {
entries.forEach(entry => {
if (entry.isIntersecting) {
const img = entry.target;
img.src = img.dataset.src;
img.removeAttribute('data-src');
observer.unobserve(img);
}
});
});
lazyImages.forEach(img => imageObserver.observe(img));
// ===== 表单验证增强 =====
const validateEmail = (email) => {
const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
return re.test(email);
};
contactForm.addEventListener('submit', (e) => {
const emailInput = document.getElementById('email');
if (!validateEmail(emailInput.value)) {
e.preventDefault();
emailInput.style.borderColor = '#e74c3c';
alert('请输入有效的邮箱地址！');
return;
}
emailInput.style.borderColor = '#4A90E2';
});
// ===== 复制邮箱功能 =====
const copyEmail = () => {
const email = 'zhangsan@email.com';
navigator.clipboard.writeText(email).then(() => {
alert('邮箱已复制到剪贴板！');
});
};
// ===== 主题切换（可选功能） =====
const toggleTheme = () => {
document.body.classList.toggle('dark-theme');
localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
};
// 检查本地存储的主题偏好
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
document.body.classList.add('dark-theme');
}
