/**
 * 公共工具函数
 */

const Utils = {
  /**
   * 复制文本到剪贴板
   */
  async copyToClipboard(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      } else {
        // 降级方案
        const textArea = document.createElement('textarea');
        textArea.value = text;
        textArea.style.position = 'fixed';
        textArea.style.left = '-999999px';
        document.body.appendChild(textArea);
        textArea.select();
        try {
          document.execCommand('copy');
          document.body.removeChild(textArea);
          return true;
        } catch (e) {
          document.body.removeChild(textArea);
          return false;
        }
      }
    } catch (e) {
      console.error('Copy error:', e);
      return false;
    }
  },

  /**
   * 显示提示消息
   */
  showToast(message, type = 'success') {
    const toast = document.createElement('div');
    toast.className = `fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 px-6 py-3 rounded-lg shadow-lg ${
      type === 'success' ? 'bg-green-500 text-white' : 
      type === 'error' ? 'bg-red-500 text-white' : 
      'bg-blue-500 text-white'
    }`;
    toast.textContent = message;
    document.body.appendChild(toast);

    setTimeout(() => {
      toast.style.opacity = '0';
      toast.style.transition = 'opacity 0.3s';
      setTimeout(() => {
        document.body.removeChild(toast);
      }, 300);
    }, 2000);
  },

  /**
   * 下载文件
   */
  downloadFile(content, filename, contentType = 'text/plain') {
    const blob = new Blob([content], { type: contentType });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  },

  /**
   * 格式化文件大小
   */
  formatFileSize(bytes) {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round(bytes / Math.pow(k, i) * 100) / 100 + ' ' + sizes[i];
  },

  /**
   * 防抖函数
   */
  debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
      const later = () => {
        clearTimeout(timeout);
        func(...args);
      };
      clearTimeout(timeout);
      timeout = setTimeout(later, wait);
    };
  },

  /**
   * 节流函数
   */
  throttle(func, limit) {
    let inThrottle;
    return function(...args) {
      if (!inThrottle) {
        func.apply(this, args);
        inThrottle = true;
        setTimeout(() => inThrottle = false, limit);
      }
    };
  }
};

// 主题切换按钮事件监听
document.addEventListener('DOMContentLoaded', () => {
  document.querySelectorAll('[data-theme-toggle]').forEach(btn => {
    btn.addEventListener('click', () => ThemeManager.toggle());
  });
  
  // 初始化颜色选择器
  initColorPicker();
});

// 颜色选择器初始化函数
function initColorPicker() {
  const colorPickerToggle = document.querySelector('[data-color-picker-toggle]');
  const colorPickerPanel = document.getElementById('colorPickerPanel');
  const presetColorsContainer = document.getElementById('presetColors');
  const customColorPicker = document.getElementById('customColorPicker');
  const customColorInput = document.getElementById('customColorInput');

  if (!colorPickerToggle || !colorPickerPanel) return;

  // 生成预设颜色按钮
  function renderPresetColors() {
    if (!presetColorsContainer) return;
    presetColorsContainer.innerHTML = '';
    ThemeManager.presetColors.forEach((color, index) => {
      const button = document.createElement('button');
      button.className = 'w-10 h-10 rounded-lg border-2 border-gray-300 dark:border-gray-600 hover:scale-110 transition-transform';
      button.style.backgroundColor = color.light;
      button.title = color.name;
      button.setAttribute('data-color-index', index);
      button.addEventListener('click', () => selectPresetColor(color));
      presetColorsContainer.appendChild(button);
    });
  }

  // 选择预设颜色
  function selectPresetColor(color) {
    ThemeManager.setThemeColor(color.light, color.dark);
    colorPickerPanel.classList.add('hidden');
    Utils.showToast(`已切换到${color.name}主题`);
  }

  // 自定义颜色处理
  function handleCustomColor(hex) {
    // 确保是有效的hex颜色
    if (!/^#[0-9A-F]{6}$/i.test(hex)) {
      if (!hex.startsWith('#')) {
        hex = '#' + hex;
      }
      if (!/^#[0-9A-F]{6}$/i.test(hex)) {
        Utils.showToast('颜色格式错误', 'error');
        return;
      }
    }

    // 计算深色模式下的颜色（稍微亮一点）
    const darkColor = ThemeManager.lightenColor(hex, 15);
    ThemeManager.setThemeColor(hex, darkColor);
    colorPickerPanel.classList.add('hidden');
    Utils.showToast('已应用自定义颜色');
  }

  // 切换颜色选择面板
  colorPickerToggle.addEventListener('click', (e) => {
    e.stopPropagation();
    colorPickerPanel.classList.toggle('hidden');
  });

  // 点击外部关闭面板
  document.addEventListener('click', (e) => {
    if (!colorPickerPanel.contains(e.target) && !colorPickerToggle.contains(e.target)) {
      colorPickerPanel.classList.add('hidden');
    }
  });

  // 自定义颜色选择器
  if (customColorPicker) {
    customColorPicker.addEventListener('input', (e) => {
      const color = e.target.value;
      if (customColorInput) customColorInput.value = color;
      handleCustomColor(color);
    });
  }

  // 自定义颜色输入
  if (customColorInput) {
    customColorInput.addEventListener('change', (e) => {
      handleCustomColor(e.target.value);
    });

    // 自定义颜色输入回车
    customColorInput.addEventListener('keypress', (e) => {
      if (e.key === 'Enter') {
        handleCustomColor(e.target.value);
      }
    });
  }

  // 初始化预设颜色
  renderPresetColors();

  // 恢复保存的自定义颜色
  const savedColor = Storage.local.get('themeColor');
  if (savedColor && customColorPicker && customColorInput) {
    customColorPicker.value = savedColor.light;
    customColorInput.value = savedColor.light;
  }
}

