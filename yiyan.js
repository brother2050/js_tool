
// 创建一言容器元素并设置样式
function createYiyanContainer() {
    const yiyanContainer = document.createElement('div');
    yiyanContainer.id = 'yiyan-container';
    
    // 设置一言容器的样式
    yiyanContainer.style.position = 'fixed';
    yiyanContainer.style.top = '50%';
    yiyanContainer.style.right = '20px';
    yiyanContainer.style.transform = 'translateY(-50%)';
    yiyanContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    yiyanContainer.style.color = '#333333';
    yiyanContainer.style.padding = '20px';
    yiyanContainer.style.fontSize = '16px';
    yiyanContainer.style.fontFamily = "'Helvetica Neue', Arial, sans-serif";
    yiyanContainer.style.borderRadius = '10px';
    yiyanContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    yiyanContainer.style.transition = 'all 0.3s ease';
    yiyanContainer.style.writingMode = 'vertical-rl'; // 纵向显示文字
    yiyanContainer.style.textOrientation = 'mixed'; // 保持文字方向为混合模式
    yiyanContainer.style.height = 'fit-content';
    yiyanContainer.style.display = 'flex';
    yiyanContainer.style.alignItems = 'center';
    yiyanContainer.style.justifyContent = 'center';
    yiyanContainer.style.backdropFilter = 'blur(10px)';
    yiyanContainer.style.maxHeight = '80vh'; // 设置最大高度，避免文字过长超出屏幕
    yiyanContainer.style.overflow = 'hidden'; // 隐藏溢出内容
    yiyanContainer.style.opacity = '0'; // 初始不透明度为0
    yiyanContainer.style.transform = 'translateY(-50%) translateX(20px)'; // 初始位置偏移
    
    // 将一言容器添加到页面
    document.body.appendChild(yiyanContainer);
    
    return yiyanContainer;
}

// 获取一言的元素
const yiyanContainer = createYiyanContainer();

// 获取一言的函数
async function updateYiyan() {
    try {
        // 使用fetch API请求数据
        const response = await fetch('https://api.kuleu.com/api/yiyan');
        const yiyanText = await response.text();

        // 在页面右侧显示一言
        yiyanContainer.textContent = yiyanText;
        
        // 动画效果
        yiyanContainer.style.animation = 'none';
        yiyanContainer.style.opacity = '0';
        yiyanContainer.style.transform = 'translateY(-50%) translateX(20px)';
        void yiyanContainer.offsetWidth; // 触发重排
        yiyanContainer.style.animation = 'fadeIn 0.8s ease-out forwards'; // 使用forwards保持最终状态
        yiyanContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        yiyanContainer.style.opacity = '1';
        yiyanContainer.style.transform = 'translateY(-50%) translateX(0)';
    } catch (error) {
        // 如果请求失败，显示默认消息
        console.error('获取一言失败:', error);
        yiyanContainer.textContent = '生活是一场旅行，不在乎目的地，在乎的是沿途的风景。';
        
        // 动画效果
        yiyanContainer.style.animation = 'none';
        yiyanContainer.style.opacity = '0';
        yiyanContainer.style.transform = 'translateY(-50%) translateX(20px)';
        void yiyanContainer.offsetWidth; // 触发重排
        yiyanContainer.style.animation = 'fadeIn 0.8s ease-out forwards';
        yiyanContainer.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out';
        yiyanContainer.style.opacity = '1';
        yiyanContainer.style.transform = 'translateY(-50%) translateX(0)';
    }
}

// 页面加载完成后获取一言
window.addEventListener('load', updateYiyan);

// 每5秒更新一次一言
setInterval(updateYiyan, 3000);
