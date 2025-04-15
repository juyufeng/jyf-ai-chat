/**
 * 隐藏加载界面
 * 在React应用挂载完成后调用此函数移除loading界面
 */
export const hideLoading = (): void => {
  const loading = document.getElementById('loading');
  if (loading) {
    loading.style.opacity = '0';
    loading.style.transition = 'opacity 0.3s ease';
    setTimeout(() => loading.style.display = 'none', 300);
  }
};

/**
 * 初始化加载界面的隐藏逻辑
 * 使用requestIdleCallback确保在浏览器空闲时执行，不阻塞渲染
 */
export const initLoadingHandler = (): void => {
  if (window.requestIdleCallback) {
    window.requestIdleCallback(hideLoading);
  } else {
    // 降级处理
    setTimeout(hideLoading, 100);
  }
};