/**
 * 百度统计集成
 * 请在配置中添加您的百度统计代码 ID
 */

const Analytics = {
  // 百度统计代码 ID（需要替换为实际的统计代码ID）
  baiduId: 'c4705e819b3b8b20d59bc720231d047d',

  /**
   * 初始化百度统计
   */
  init() {
    if (!this.baiduId) {
      console.warn('百度统计代码ID未配置');
      return;
    }

    // 加载百度统计脚本
    const script = document.createElement('script');
    script.innerHTML = `
      var _hmt = _hmt || [];
      (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?${this.baiduId}";
        var s = document.getElementsByTagName("script")[0];
        s.parentNode.insertBefore(hm, s);
      })();
    `;
    document.head.appendChild(script);
  },

  /**
   * 跟踪页面访问
   */
  trackPageView(path) {
    if (typeof _hmt !== 'undefined') {
      _hmt.push(['_trackPageview', path]);
    }
  },

  /**
   * 跟踪事件
   */
  trackEvent(category, action, label = '') {
    if (typeof _hmt !== 'undefined') {
      _hmt.push(['_trackEvent', category, action, label]);
    }
  }
};

// 页面加载时初始化统计
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => Analytics.init());
} else {
  Analytics.init();
}

