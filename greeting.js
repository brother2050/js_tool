// 创建问候容器元素并设置样式
function createGreetingContainer() {
    const greetingContainer = document.createElement('div');
    greetingContainer.id = 'greeting-container';
    
    // 设置问候容器的样式
    greetingContainer.style.position = 'fixed';
    greetingContainer.style.top = '50%';
    greetingContainer.style.left = '10px';
    greetingContainer.style.transform = 'translateY(-50%)';
    greetingContainer.style.backgroundColor = 'rgba(255, 255, 255, 0.9)';
    greetingContainer.style.color = '#333333';
    greetingContainer.style.padding = '20px';
    greetingContainer.style.fontSize = '16px';
    greetingContainer.style.fontFamily = "'Helvetica Neue', Arial, sans-serif";
    greetingContainer.style.borderRadius = '10px';
    greetingContainer.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.1)';
    greetingContainer.style.transition = 'all 0.3s ease';
    greetingContainer.style.writingMode = 'vertical-rl';
    greetingContainer.style.textOrientation = 'mixed';
    greetingContainer.style.height = 'fit-content';
    greetingContainer.style.display = 'flex';
    greetingContainer.style.alignItems = 'center';
    greetingContainer.style.justifyContent = 'center';
    greetingContainer.style.backdropFilter = 'blur(10px)';
    
    // 设置动画关键帧
    const style = document.createElement('style');
    style.textContent = `
        @keyframes fadeIn {
            from {
                opacity: 0;
                transform: translateX(-20px) translateY(-50%);
            }
            to {
                opacity: 1;
                transform: translateX(0) translateY(-50%);
            }
        }
    `;
    document.head.appendChild(style);
    
    // 将问候容器添加到页面
    document.body.appendChild(greetingContainer);
    
    return greetingContainer;
}

// 获取打招呼的元素
const greetingContainer = createGreetingContainer();

// 获取打招呼语的函数
async function updateGreetingMessage() {
    try {
        // 使用fetch API请求数据
        const response = await fetch('https://api.kuleu.com/api/getGreetingMessage?type=json');
        const data = await response.json();

        // 获取当前时间、打招呼语和提示信息
        const currentTime = data.data.currentTime;
        const greeting = data.data.greeting;
        const tip = data.data.tip;

        // 创建打招呼语信息
        const greetingMessage = `${currentTime}，${greeting}！${tip}`;

        // 在页面左侧显示打招呼语
        greetingContainer.textContent = greetingMessage;
        
        // 重置动画
        greetingContainer.style.animation = 'none';
        void greetingContainer.offsetWidth;
        greetingContainer.style.animation = 'fadeIn 0.8s ease-out';
    } catch (error) {
        // 如果请求失败，显示默认消息
        console.error('获取打招呼语失败:', error);
        greetingContainer.textContent = '欢迎访问我们的网站！';
        
        // 重置动画
        greetingContainer.style.animation = 'none';
        void greetingContainer.offsetWidth;
        greetingContainer.style.animation = 'fadeIn 0.8s ease-out';
    }
}

// 页面加载完成后获取打招呼语
window.addEventListener('load', updateGreetingMessage);

// 每5秒更新一次打招呼语
setInterval(updateGreetingMessage, 5000);
