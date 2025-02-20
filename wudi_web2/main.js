// 主题切换
const themeToggle = document.querySelector('.theme-toggle');
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
});

// 导航栏滚动效果
let lastScroll = 0;
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > lastScroll) {
        header.style.opacity = '0.8';
    } else {
        header.style.opacity = '1';
    }
    lastScroll = currentScroll;
});

// 轮播图功能
const carousel = {
    currentSlide: 0,
    slides: document.querySelectorAll('.carousel-slide'),
    indicators: document.querySelector('.carousel-indicators'),
    
    init() {
        // 创建指示器
        this.slides.forEach((_, index) => {
            const dot = document.createElement('div');
            dot.classList.add('carousel-dot');
            if (index === 0) dot.classList.add('active');
            dot.addEventListener('click', () => this.goToSlide(index));
            this.indicators.appendChild(dot);
        });

        // 添加按钮事件监听
        document.querySelector('.carousel-prev').addEventListener('click', () => this.prevSlide());
        document.querySelector('.carousel-next').addEventListener('click', () => this.nextSlide());

        // 自动播放
        setInterval(() => this.nextSlide(), 5000);
    },

    goToSlide(n) {
        this.slides[this.currentSlide].classList.remove('active');
        this.indicators.children[this.currentSlide].classList.remove('active');
        
        this.currentSlide = (n + this.slides.length) % this.slides.length;
        
        this.slides[this.currentSlide].classList.add('active');
        this.indicators.children[this.currentSlide].classList.add('active');
    },

    nextSlide() {
        this.goToSlide(this.currentSlide + 1);
    },

    prevSlide() {
        this.goToSlide(this.currentSlide - 1);
    }
};

// 初始化轮播
carousel.init();

// 作品集过滤功能
const portfolioFilter = {
    init() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const portfolioItems = document.querySelectorAll('.portfolio-item');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // 更新按钮状态
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                // 过滤项目
                const filter = btn.dataset.filter;
                portfolioItems.forEach(item => {
                    if (filter === 'all' || item.dataset.category === filter) {
                        item.style.display = 'block';
                    } else {
                        item.style.display = 'none';
                    }
                });
            });
        });
    }
};

// 项目详情弹窗
const projectModal = {
    init() {
        const viewButtons = document.querySelectorAll('.view-project');
        viewButtons.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.preventDefault();
                const projectCard = btn.closest('.portfolio-card');
                const title = projectCard.querySelector('h3').textContent;
                const description = projectCard.querySelector('p').textContent;
                this.showModal(title, description);
            });
        });
    },

    showModal(title, description) {
        const modal = document.createElement('div');
        modal.className = 'project-modal';
        modal.innerHTML = `
            <div class="modal-content">
                <h3>${title}</h3>
                <p>${description}</p>
                <button class="close-modal">关闭</button>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        modal.querySelector('.close-modal').addEventListener('click', () => {
            modal.remove();
        });
    }
};

// 添加微信二维码显示功能
function showWechatQR() {
    const modal = document.createElement('div');
    modal.className = 'wechat-modal';
    modal.innerHTML = `
        <img src="imgs/5.jpg" alt="微信二维码">
        <button class="close-modal" onclick="this.parentElement.remove()">×</button>
    `;
    
    // 点击背景关闭
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.remove();
        }
    });
    
    document.body.appendChild(modal);
}

// 初始化功能
document.addEventListener('DOMContentLoaded', () => {
    portfolioFilter.init();
    projectModal.init();
}); 