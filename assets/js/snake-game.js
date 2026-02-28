/* =========================================
   snake-game.js
   经典贪吃蛇游戏逻辑实现
   ========================================= */

class SnakeGame {
    constructor(canvasId, scoreId, startBtnId) {
        this.canvas = document.getElementById(canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.scoreElement = document.getElementById(scoreId);
        this.startBtn = document.getElementById(startBtnId);
        
        // 游戏配置
        this.gridSize = 20; // 每个格子的大小
        this.tileCount = this.canvas.width / this.gridSize; // 格子总数 (20x20)
        this.speed = 8; // 游戏速度 (帧率)
        
        // 游戏状态
        this.isRunning = false;
        this.score = 0;
        
        // 初始化蛇和食物的位置
        this.reset();
        
        // 绑定事件
        this.bindEvents();
    }

    reset() {
        // 蛇初始化在中间位置，向右移动
        this.snake = [
            {x: 10, y: 10}, 
            {x: 9, y: 10}, 
            {x: 8, y: 10}
        ];
        this.dx = 1; // x方向速度
        this.dy = 0; // y方向速度
        
        this.score = 0;
        if(this.scoreElement) this.scoreElement.innerText = this.score;
        
        this.generateFood();
    }

    bindEvents() {
        // 键盘控制
        document.addEventListener('keydown', (e) => this.handleKeyPress(e));
        
        // 开始/重新开始按钮
        if(this.startBtn) {
            this.startBtn.addEventListener('click', () => {
                if (!this.isRunning) {
                    this.start();
                } else {
                    // 如果已经在运行，点击视为暂停/重置
                    this.stop();
                    this.reset();
                    this.draw();
                }
            });
        }
    }

    handleKeyPress(e) {
        // 防止反向移动 (比如正在向右时不能直接向左)
        // WASD 或 方向键
        const goingUp = this.dy === -1;
        const goingDown = this.dy === 1;
        const goingRight = this.dx === 1;
        const goingLeft = this.dx === -1;

        if ((e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') && !goingRight) {
            this.dx = -1;
            this.dy = 0;
        }
        if ((e.key === 'ArrowUp' || e.key === 'w' || e.key === 'W') && !goingDown) {
            this.dx = 0;
            this.dy = -1;
        }
        if ((e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') && !goingLeft) {
            this.dx = 1;
            this.dy = 0;
        }
        if ((e.key === 'ArrowDown' || e.key === 's' || e.key === 'S') && !goingUp) {
            this.dx = 0;
            this.dy = 1;
        }
        
        // 空格键暂停/开始
        if (e.key === ' ') {
            if (this.isRunning) this.stop();
            else this.start();
        }
    }

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        if(this.startBtn) this.startBtn.innerText = "重置游戏";
        
        // 使用 setInterval 驱动游戏循环
        this.gameLoop = setInterval(() => this.update(), 1000 / this.speed);
    }

    stop() {
        this.isRunning = false;
        if(this.startBtn) this.startBtn.innerText = "开始游戏";
        if (this.gameLoop) clearInterval(this.gameLoop);
    }

    update() {
        // 1. 计算新头部位置
        const head = {x: this.snake[0].x + this.dx, y: this.snake[0].y + this.dy};

        // 2. 检查游戏结束条件 (撞墙 或 撞自己)
        if (this.checkCollision(head)) {
            this.gameOver();
            return;
        }

        // 3. 将新头部添加到蛇身
        this.snake.unshift(head);

        // 4. 检查是否吃到食物
        if (head.x === this.food.x && head.y === this.food.y) {
            this.score += 10;
            if(this.scoreElement) this.scoreElement.innerText = this.score;
            this.generateFood();
            // 可选：随着分数增加速度
            if (this.score % 50 === 0) this.speedUp();
        } else {
            // 没吃到食物，移除尾部，保持长度
            this.snake.pop();
        }

        // 5. 渲染画面
        this.draw();
    }

    checkCollision(head) {
        // 撞墙检测
        const hitLeftWall = head.x < 0;
        const hitRightWall = head.x >= this.tileCount;
        const hitTopWall = head.y < 0;
        const hitBottomWall = head.y >= this.tileCount;
        
        if (hitLeftWall || hitRightWall || hitTopWall || hitBottomWall) return true;

        // 撞自己检测 (忽略头部)
        for (let i = 1; i < this.snake.length; i++) {
            if (head.x === this.snake[i].x && head.y === this.snake[i].y) {
                return true;
            }
        }
        return false;
    }

    generateFood() {
        // 随机生成食物位置
        let newFood;
        while (true) {
            newFood = {
                x: Math.floor(Math.random() * this.tileCount),
                y: Math.floor(Math.random() * this.tileCount)
            };
            // 确保食物不在蛇身上
            let onSnake = false;
            for (let bodyPart of this.snake) {
                if (bodyPart.x === newFood.x && bodyPart.y === newFood.y) {
                    onSnake = true;
                    break;
                }
            }
            if (!onSnake) break;
        }
        this.food = newFood;
    }

    speedUp() {
        // 加速逻辑：重置定时器
        this.speed += 1;
        clearInterval(this.gameLoop);
        this.gameLoop = setInterval(() => this.update(), 1000 / this.speed);
    }

    draw() {
        // 清空画布
        this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--bg-secondary').trim() || '#f8fafc';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);

        // 绘制网格 (可选，为了美观)
        this.ctx.strokeStyle = getComputedStyle(document.body).getPropertyValue('--border-color').trim() || '#e2e8f0';
        this.ctx.lineWidth = 0.5;
        for (let i = 0; i <= this.tileCount; i++) {
            this.ctx.beginPath();
            this.ctx.moveTo(i * this.gridSize, 0);
            this.ctx.lineTo(i * this.gridSize, this.canvas.height);
            this.ctx.stroke();
            this.ctx.beginPath();
            this.ctx.moveTo(0, i * this.gridSize);
            this.ctx.lineTo(this.canvas.width, i * this.gridSize);
            this.ctx.stroke();
        }

        // 绘制食物
        this.ctx.fillStyle = '#ef4444'; // 红色
        this.ctx.beginPath();
        const foodRadius = this.gridSize / 2 - 2;
        this.ctx.arc(
            this.food.x * this.gridSize + this.gridSize / 2, 
            this.food.y * this.gridSize + this.gridSize / 2, 
            foodRadius, 0, Math.PI * 2
        );
        this.ctx.fill();

        // 绘制蛇
        this.snake.forEach((part, index) => {
            // 蛇头颜色深，身体颜色浅
            if (index === 0) {
                this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--primary-color').trim() || '#2563eb';
                this.ctx.shadowColor = 'rgba(37, 99, 235, 0.5)';
                this.ctx.shadowBlur = 10;
            } else {
                this.ctx.fillStyle = getComputedStyle(document.body).getPropertyValue('--primary-light').trim() || '#3b82f6';
                this.ctx.shadowBlur = 0;
            }
            
            // 绘制圆角矩形身体
            this.roundRect(
                part.x * this.gridSize + 1, 
                part.y * this.gridSize + 1, 
                this.gridSize - 2, 
                this.gridSize - 2, 
                4
            );
        });
        this.ctx.shadowBlur = 0; // 重置阴影
    }

    // 绘制圆角矩形辅助函数
    roundRect(x, y, width, height, radius) {
        this.ctx.beginPath();
        this.ctx.moveTo(x + radius, y);
        this.ctx.lineTo(x + width - radius, y);
        this.ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
        this.ctx.lineTo(x + width, y + height - radius);
        this.ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
        this.ctx.lineTo(x + radius, y + height);
        this.ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
        this.ctx.lineTo(x, y + radius);
        this.ctx.quadraticCurveTo(x, y, x + radius, y);
        this.ctx.closePath();
        this.ctx.fill();
    }

    gameOver() {
        this.stop();
        // 简单的弹窗提示，你可以后续换成更美观的 UI
        setTimeout(() => {
            alert(`游戏结束！你的得分是: ${this.score}`);
            this.reset();
            this.draw(); // 绘制初始状态
        }, 100);
    }
}

// 初始化游戏
document.addEventListener('DOMContentLoaded', () => {
    // 确保在 playground 页面才初始化
    if (document.getElementById('game-canvas')) {
        new SnakeGame('game-canvas', 'score', 'start-btn');
    }
});
