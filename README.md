# 在线工具集合

一个多页面工具类网站，提供多种实用的在线工具，帮助您提高工作效率。

## 功能特性

- 🎨 **现代化UI**: 使用Tailwind CSS构建，界面简洁美观
- 🌓 **主题切换**: 支持浅色/深色主题切换
- 📱 **响应式设计**: 完美适配桌面端和移动端
- 🔒 **数据安全**: 所有数据保存在本地，保护隐私
- ⚡ **纯前端**: 无需后端，所有功能在浏览器中运行
- 🔍 **SEO优化**: 完整的SEO优化，便于搜索引擎收录

## 工具列表

### 时间工具
- **时间戳转换**: 显示当前时间，支持10位和13位时间戳转换，日期时间互转

### 图片工具
- **图片Base64转换**: 图片文件转Base64编码，Base64编码转图片预览

### 编码工具
- **JSON格式化**: JSON美化、压缩、验证格式，支持格式化输出
- **URL编码/解码**: URL编码、解码，查询参数解析和格式化

### 其他工具
- **二维码生成**: 文本转二维码图片，支持自定义大小和下载
- **哈希计算**: MD5、SHA1、SHA256等哈希值计算
- **颜色选择器**: 颜色选择、格式转换（HEX/RGB/HSL）

## 技术栈

- **HTML**: 原生HTML5，语义化标签
- **CSS**: Tailwind CSS（CDN版本）
- **JavaScript**: 原生ES6+，无框架依赖
- **数据存储**: localStorage, sessionStorage, Cookie, IndexedDB

## 项目结构

```
utils-web/
├── index.html              # 首页
├── tools/                  # 工具页面目录
│   ├── time.html          # 时间工具
│   ├── image.html         # 图片Base64转换
│   ├── json.html          # JSON格式化
│   ├── url.html           # URL编码/解码
│   ├── qrcode.html        # 二维码生成
│   ├── hash.html          # 哈希计算
│   ├── color.html         # 颜色选择器
│   └── all-tools.html     # 全部工具列表
├── assets/
│   ├── css/
│   │   └── main.css       # 自定义样式
│   ├── js/
│   │   ├── common.js      # 公共工具函数
│   │   ├── theme.js       # 主题切换逻辑
│   │   ├── storage.js     # 本地存储封装
│   │   └── analytics.js   # 百度统计集成
│   └── images/            # 图片资源
├── .cursorrules           # 项目开发规则
└── README.md              # 项目说明文档
```

## 使用方法

1. 直接在浏览器中打开 `index.html` 即可使用
2. 点击首页的工具卡片或访问 `tools/all-tools.html` 查看全部工具
3. 选择需要的工具，按照页面提示操作即可

## 配置说明

### 百度统计

如需使用百度统计，请在 `assets/js/analytics.js` 中配置您的统计代码ID：

```javascript
baiduId: 'your_baidu_id_here'
```

## 浏览器支持

- Chrome (最新版本)
- Firefox (最新版本)
- Safari (最新版本)
- Edge (最新版本)

## 开发规范

详细的开发规范请参考 [.cursorrules](.cursorrules) 文件。

## 许可证

MIT License

## 更新日志

### v1.0.0 (2024-01-XX)
- 初始版本发布
- 包含7个实用工具
- 支持主题切换
- 完整的SEO优化

