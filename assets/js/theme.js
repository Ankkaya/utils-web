/**
 * 主题切换管理
 */

const ThemeManager = {
  // 预设颜色
  presetColors: [
    { name: '蓝色', light: '#3b82f6', dark: '#60a5fa' },
    { name: '紫色', light: '#8b5cf6', dark: '#a78bfa' },
    { name: '绿色', light: '#10b981', dark: '#34d399' },
    { name: '红色', light: '#ef4444', dark: '#f87171' },
    { name: '橙色', light: '#f59e0b', dark: '#fbbf24' },
    { name: '粉色', light: '#ec4899', dark: '#f472b6' },
    { name: '青色', light: '#06b6d4', dark: '#22d3ee' },
    { name: '黄色', light: '#eab308', dark: '#fde047' }
  ],

  // 初始化主题
  init() {
    const savedTheme = Storage.local.get('theme', 'light');
    this.setTheme(savedTheme);
    
    // 初始化主题色
    const savedColor = Storage.local.get('themeColor');
    if (savedColor) {
      this.setThemeColor(savedColor.light, savedColor.dark);
    }
  },

  // 设置主题
  setTheme(theme) {
    if (theme !== 'light' && theme !== 'dark') {
      theme = 'light';
    }
    
    document.documentElement.setAttribute('data-theme', theme);
    Storage.local.set('theme', theme);
    
    // 更新主题切换按钮图标
    this.updateThemeButton(theme);
    
    // 应用保存的主题色
    const savedColor = Storage.local.get('themeColor');
    if (savedColor) {
      this.applyThemeColor(theme === 'light' ? savedColor.light : savedColor.dark);
    }
    
    // 触发主题变化事件
    window.dispatchEvent(new CustomEvent('themechange', { detail: { theme } }));
  },

  // 切换主题
  toggle() {
    const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
    const newTheme = currentTheme === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  },

  // 获取当前主题
  getCurrentTheme() {
    return document.documentElement.getAttribute('data-theme') || 'light';
  },

  // 设置主题色
  setThemeColor(lightColor, darkColor) {
    const colorData = { light: lightColor, dark: darkColor };
    Storage.local.set('themeColor', colorData);
    
    const currentTheme = this.getCurrentTheme();
    this.applyThemeColor(currentTheme === 'light' ? lightColor : darkColor);
    
    // 触发颜色变化事件
    window.dispatchEvent(new CustomEvent('colorchange', { detail: colorData }));
  },

  // 应用主题色到CSS变量
  applyThemeColor(color) {
    document.documentElement.style.setProperty('--primary-color', color);
    
    // 计算浅色和深色变体
    const lightColor = this.lightenColor(color, 20);
    const darkColor = this.darkenColor(color, 20);
    document.documentElement.style.setProperty('--primary-color-light', lightColor);
    document.documentElement.style.setProperty('--primary-color-dark', darkColor);
  },

  // 颜色工具函数
  hexToRgb(hex) {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
    } : null;
  },

  rgbToHex(r, g, b) {
    return "#" + [r, g, b].map(x => {
      const hex = x.toString(16);
      return hex.length === 1 ? "0" + hex : hex;
    }).join("");
  },

  lightenColor(hex, percent) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    
    const r = Math.min(255, Math.round(rgb.r + (255 - rgb.r) * percent / 100));
    const g = Math.min(255, Math.round(rgb.g + (255 - rgb.g) * percent / 100));
    const b = Math.min(255, Math.round(rgb.b + (255 - rgb.b) * percent / 100));
    
    return this.rgbToHex(r, g, b);
  },

  darkenColor(hex, percent) {
    const rgb = this.hexToRgb(hex);
    if (!rgb) return hex;
    
    const r = Math.max(0, Math.round(rgb.r * (1 - percent / 100)));
    const g = Math.max(0, Math.round(rgb.g * (1 - percent / 100)));
    const b = Math.max(0, Math.round(rgb.b * (1 - percent / 100)));
    
    return this.rgbToHex(r, g, b);
  },

  // 更新主题切换按钮
  updateThemeButton(theme) {
    const themeButtons = document.querySelectorAll('[data-theme-toggle]');
    themeButtons.forEach(btn => {
      const icon = btn.querySelector('svg');
      if (icon) {
        if (theme === 'dark') {
          // 显示太阳图标（切换到浅色模式）
          icon.innerHTML = `
            <path d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"/>
          `;
        } else {
          // 显示月亮图标（切换到深色模式）
          icon.innerHTML = `
            <path d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"/>
          `;
        }
      }
    });
  }
};

// 页面加载时初始化主题
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => ThemeManager.init());
} else {
  ThemeManager.init();
}

