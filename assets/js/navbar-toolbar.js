/**
 * 导航栏工具栏 Web Component
 * 使用方式：
 * <navbar-toolbar page="index"></navbar-toolbar>
 * page 可选值: "index" | "tool"
 */
class NavbarToolbar extends HTMLElement {
  constructor() {
    super();
  }

  connectedCallback() {
    const page = this.getAttribute('page') || 'tool';
    this.render(page);
    this.attachEventListeners();
  }

  render(page) {
    const isIndexPage = page === 'index';
    const homeLink = isIndexPage ? 'index.html' : '../index.html';
    const allToolsLink = isIndexPage ? 'tools/all-tools.html' : 'all-tools.html';
    const guestbookLink = isIndexPage ? 'tools/guestbook.html' : 'guestbook.html';

    this.innerHTML = `
      <div class="flex items-center space-x-4">
        ${!isIndexPage ? `
          <a href="${homeLink}" class="text-gray-700 dark:text-gray-300 theme-color-hover">首页</a>
        ` : ''}
        <a href="${allToolsLink}" class="text-gray-700 dark:text-gray-300 theme-color-hover">全部工具</a>
        <!-- 颜色选择器 -->
        <div class="relative">
          <button data-color-picker-toggle
            class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors" aria-label="选择主题色">
            <svg class="w-5 h-5 theme-color" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
            </svg>
          </button>
          <!-- 颜色选择面板 -->
          <div id="colorPickerPanel"
            class="hidden absolute right-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg border border-gray-200 dark:border-gray-700 p-4 z-50">
            <div class="mb-3">
              <h3 class="text-sm font-semibold mb-2">预设颜色</h3>
              <div class="grid grid-cols-4 gap-2" id="presetColors">
                <!-- 预设颜色将通过JavaScript动态生成 -->
              </div>
            </div>
            <div class="border-t border-gray-200 dark:border-gray-700 pt-3">
              <label class="block text-sm font-semibold mb-2">自定义颜色</label>
              <div class="flex items-center space-x-2">
                <input type="color" id="customColorPicker" class="w-12 h-10 rounded cursor-pointer" value="#3b82f6" />
                <input type="text" id="customColorInput" placeholder="#3b82f6"
                  class="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 text-sm font-mono"
                  maxlength="7" />
              </div>
            </div>
          </div>
        </div>
        <!-- 主题切换按钮 -->
        <button data-theme-toggle class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
          aria-label="切换主题">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z" />
          </svg>
        </button>
        <!-- 项目 github 入口 -->
        <a href="https://github.com/ankkaya/utils-web" target="_blank"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
            <path
              d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
          </svg>
        </a>
        <!-- 留言板入口 -->
        <a href="${guestbookLink}"
          class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-700 dark:text-gray-300"
          aria-label="留言板">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </a>
      </div>
    `;
  }

  attachEventListeners() {
    // 颜色选择器功能需要等待 common.js 加载完成
    // 这里只负责渲染，事件监听由 common.js 统一处理
  }
}

// 注册 Web Component
customElements.define('navbar-toolbar', NavbarToolbar);

