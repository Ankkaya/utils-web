/**
 * 页脚加载脚本
 * 自动加载 footer.html 并插入到页面中
 */
(function() {
  // 获取页脚容器
  const footerContainer = document.getElementById('footer-container');
  if (!footerContainer) {
    console.warn('未找到页脚容器 #footer-container');
    return;
  }

  // 根据当前页面路径确定 footer.html 的相对路径
  const isRootPage = window.location.pathname === '/' || 
                     window.location.pathname.endsWith('/index.html') ||
                     !window.location.pathname.includes('/tools/');
  const footerPath = isRootPage ? 'footer.html' : '../footer.html';

  // 加载页脚内容
  fetch(footerPath)
    .then(response => {
      if (!response.ok) {
        throw new Error('无法加载页脚文件');
      }
      return response.text();
    })
    .then(html => {
      // 根据当前页面路径修正图片路径
      // 如果在 tools 目录下，需要将 assets/ 改为 ../assets/
      if (!isRootPage) {
        // 使用正则表达式替换所有相对路径的 assets/ 为 ../assets/
        html = html.replace(/src="assets\//g, 'src="../assets/');
      }
      footerContainer.innerHTML = html;
    })
    .catch(error => {
      console.error('加载页脚失败:', error);
      // 如果加载失败，显示默认页脚
      footerContainer.innerHTML = `
        <footer class="bg-white dark:bg-gray-800 border-t border-gray-200 dark:border-gray-700 mt-12">
          <div class="container mx-auto px-4 py-6">
            <div class="text-center text-gray-600 dark:text-gray-400">
              <p>&copy; 2025 在线工具集合. 保留所有权利</p>
              <p>备案号：豫ICP备2025131709号-2</p>
            </div>
          </div>
        </footer>
      `;
    });
})();

