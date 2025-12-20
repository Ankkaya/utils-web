/**
 * 导航栏工具栏 Web Component
 * 使用方式：
 * <navbar-toolbar page="index"></navbar-toolbar>
 * page 可选值: "index" | "tool"
 * 
 * 该组件会自动渲染完整的 header 和 nav 结构
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
    
    // 检测操作系统，Mac 显示 Cmd，其他显示 Ctrl
    const isMac = navigator.platform.toUpperCase().indexOf('MAC') >= 0 || 
                  navigator.userAgent.toUpperCase().indexOf('MAC') >= 0;
    const modifierKey = isMac ? 'Cmd' : 'Ctrl';

    this.innerHTML = `
      <header class="shadow-sm">
        <nav class="container mx-auto px-4 py-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center">
              <a href="${homeLink}" class="text-xl font-bold theme-color">
                在线工具集合
              </a>
              <button data-search-toggle
                class="pl-4 group flex items-center justify-between rounded-md transition-all text-left cursor-pointer">
                <div class="flex items-center space-x-2.5 flex-1 min-w-0 px-2">
                  <svg class="w-4 h-4 flex-shrink-0 text-gray-400 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                      d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                  <span class="text-sm text-gray-400 dark:text-gray-500">搜索</span>
                </div>
                <kbd class="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded shadow-sm theme-border-hover-child">
                  <span>${modifierKey}</span>
                  <span>K</span>
                </kbd>
              </button>
            </div>
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
          </div>
        </nav>
      </header>
      <!-- 搜索模态框 -->
      <div id="searchModal" class="fixed inset-0 z-[9999] hidden">
        <!-- 背景遮罩 -->
        <div class="absolute inset-0 bg-black/50 backdrop-blur-sm" data-search-close></div>
        <!-- 搜索容器 -->
        <div class="absolute top-20 left-1/2 transform -translate-x-1/2 w-full max-w-2xl px-4">
          <div class="bg-white dark:bg-gray-800 rounded-lg shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <!-- 搜索输入框 -->
            <div class="p-4 border-b border-gray-200 dark:border-gray-700">
              <div id="searchInputWrapper" class="flex items-center space-x-3 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg transition-colors focus-within:border-theme-color">
                <svg class="w-5 h-5 text-gray-400 dark:text-gray-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
                <input 
                  type="text" 
                  id="searchInput"
                  placeholder="搜索工具..." 
                  autocomplete="off"
                  class="flex-1 outline-none text-gray-900 dark:text-gray-100 bg-transparent placeholder-gray-400 dark:placeholder-gray-500 text-base"
                />
                <kbd class="hidden sm:inline-flex items-center gap-1 px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded">
                  <span>ESC</span>
                </kbd>
              </div>
            </div>
            <!-- 搜索结果区域 -->
            <div class="max-h-[60vh] overflow-y-auto">
              <div id="searchResults" class="p-4">
                <!-- 初始状态：显示提示 -->
                <div id="searchEmpty" class="text-center py-12 text-gray-400 dark:text-gray-500">
                  <p class="text-sm">暂无搜索结果</p>
                  <p class="text-xs mt-2">输入关键词搜索工具</p>
                </div>
                <!-- 搜索结果列表将在这里动态插入 -->
                <div id="searchResultsList" class="hidden"></div>
              </div>
            </div>
            <!-- 底部操作提示 -->
            <div class="px-4 py-3 bg-gray-50 dark:bg-gray-900 border-t border-gray-200 dark:border-gray-700 flex items-center justify-between text-xs text-gray-500 dark:text-gray-400">
              <div class="flex items-center space-x-4">
                <span class="flex items-center space-x-1">
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↩</kbd>
                  <span>选择</span>
                </span>
                <span class="flex items-center space-x-1">
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↓</kbd>
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">↑</kbd>
                  <span>导航</span>
                </span>
                <span class="flex items-center space-x-1">
                  <kbd class="px-1.5 py-0.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded">ESC</kbd>
                  <span>关闭</span>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    // 颜色选择器功能需要等待 common.js 加载完成
    // 这里只负责渲染，事件监听由 common.js 统一处理
    
    // 搜索快捷键监听 (Ctrl+K 或 Cmd+K 和 ESC)
    const handleKeydown = (e) => {
      const searchModal = document.getElementById('searchModal');
      const isSearchOpen = searchModal && !searchModal.classList.contains('hidden');
      
      // ESC 键关闭搜索框
      if (e.key === 'Escape' && isSearchOpen) {
        e.preventDefault();
        this.handleSearchClose();
        return;
      }
      
      // Ctrl+K 或 Cmd+K 打开/切换搜索框
      if ((e.ctrlKey || e.metaKey) && e.key === 'k') {
        e.preventDefault();
        this.handleSearchToggle();
      }
    };
    
    document.addEventListener('keydown', handleKeydown);

    // 搜索按钮点击事件
    const searchToggle = this.querySelector('[data-search-toggle]');
    if (searchToggle) {
      searchToggle.addEventListener('click', () => {
        this.handleSearchToggle();
      });
    }

    // 点击背景关闭搜索框
    const searchModal = this.querySelector('#searchModal');
    if (searchModal) {
      const backdrop = searchModal.querySelector('[data-search-close]');
      if (backdrop) {
        backdrop.addEventListener('click', () => {
          this.handleSearchClose();
        });
      }
    }
  }

  handleSearchToggle() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchModal) return;
    
    // 切换显示/隐藏
    if (searchModal.classList.contains('hidden')) {
      // 显示搜索框
      searchModal.classList.remove('hidden');
      document.body.style.overflow = 'hidden'; // 防止背景滚动
      
      // 延迟聚焦输入框，确保动画完成
      setTimeout(() => {
        if (searchInput) {
          searchInput.focus();
        }
      }, 100);
      
      // 初始化搜索列表
      this.initSearchData();
    } else {
      this.handleSearchClose();
    }
  }

  handleSearchClose() {
    const searchModal = document.getElementById('searchModal');
    const searchInput = document.getElementById('searchInput');
    
    if (!searchModal) return;
    
    searchModal.classList.add('hidden');
    document.body.style.overflow = ''; // 恢复滚动
    
    if (searchInput) {
      searchInput.value = '';
      this.renderSearchResults([]);
    }
  }

  initSearchData() {
    // 初始化搜索数据
    const searchInput = document.getElementById('searchInput');
    if (!searchInput) return;

    // 移除旧的事件监听器（如果存在）
    if (this.searchInputHandler) {
      searchInput.removeEventListener('input', this.searchInputHandler);
    }

    // 创建新的事件处理器
    this.searchInputHandler = (e) => {
      const query = e.target.value.trim();
      if (query) {
        this.performSearch(query);
      } else {
        this.renderSearchResults([]);
      }
    };

    // 添加搜索输入事件
    searchInput.addEventListener('input', this.searchInputHandler);
  }

  performSearch(query) {
    // 获取所有工具数据
    const tools = this.getToolsList();
    
    // 简单的关键词匹配搜索
    const results = tools.filter(tool => {
      const searchText = (tool.name + ' ' + tool.description + ' ' + tool.category).toLowerCase();
      return searchText.includes(query.toLowerCase());
    });
    
    this.renderSearchResults(results);
  }

  getToolsList() {
    // 判断当前页面路径
    const isIndexPage = window.location.pathname.includes('index.html') || 
                        window.location.pathname === '/' || 
                        !window.location.pathname.includes('/tools/');
    
    // 工具列表数据
    const tools = [
      { name: '时间工具', description: '时间戳转换，日期时间互转', category: '时间', url: 'tools/time.html' },
      { name: '图片Base64转换', description: '图片文件转Base64编码', category: '图片', url: 'tools/image.html' },
      { name: 'JSON格式化', description: 'JSON美化、压缩、验证格式', category: '开发', url: 'tools/json.html' },
      { name: 'URL编码/解码', description: 'URL编码、解码，查询参数解析', category: '开发', url: 'tools/url.html' },
      { name: '二维码生成', description: '文本转二维码图片', category: '生成器', url: 'tools/qrcode.html' },
      { name: '哈希计算', description: 'MD5、SHA1、SHA256等哈希值计算', category: '开发', url: 'tools/hash.html' },
      { name: '颜色选择器', description: '颜色选择、格式转换（HEX/RGB/HSL）', category: '设计', url: 'tools/color.html' },
      { name: '图片压缩', description: '压缩图片大小，优化图片质量', category: '图片', url: 'tools/image-compress.html' },
      { name: '图片裁剪', description: '上传图片后自由拖拽框选裁剪区域', category: '图片', url: 'tools/image-crop.html' },
      { name: '图片格式转换', description: '转换图片格式，支持多种格式', category: '图片', url: 'tools/image-format.html' },
    ];
    
    return tools;
  }

  renderSearchResults(results) {
    const searchEmpty = document.getElementById('searchEmpty');
    const searchResultsList = document.getElementById('searchResultsList');
    
    if (!searchEmpty || !searchResultsList) return;
    
    if (results.length === 0) {
      searchEmpty.classList.remove('hidden');
      searchResultsList.classList.add('hidden');
      return;
    }
    
    searchEmpty.classList.add('hidden');
    searchResultsList.classList.remove('hidden');
    
    // 判断页面路径来确定链接前缀
    const isIndexPage = window.location.pathname.includes('index.html') || 
                        window.location.pathname === '/' || 
                        !window.location.pathname.includes('/tools/');
    const basePath = isIndexPage ? '' : '../';
    
    // 渲染搜索结果
    searchResultsList.innerHTML = results.map(tool => `
      <a href="${basePath}${tool.url}" 
         class="block px-4 py-3 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors border-b border-gray-100 dark:border-gray-700 last:border-b-0">
        <div class="flex items-center justify-between">
          <div class="flex-1">
            <div class="font-medium text-gray-900 dark:text-gray-100">${tool.name}</div>
            <div class="text-sm text-gray-500 dark:text-gray-400 mt-1">${tool.description}</div>
          </div>
          <span class="ml-4 px-2 py-1 text-xs font-medium text-gray-500 dark:text-gray-400 bg-gray-100 dark:bg-gray-700 rounded">
            ${tool.category}
          </span>
        </div>
      </a>
    `).join('');
  }
}

// 注册 Web Component
customElements.define('navbar-toolbar', NavbarToolbar);

