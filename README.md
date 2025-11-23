# 任务管理平台

一个基于 React + Supabase + Netlify 的现代化任务管理平台，帮助用户高效管理日常任务。

## 功能特性

- ✅ **任务管理**：创建、编辑、删除和完成任务
- 📋 **任务分类**：支持多分类管理任务
- 🎯 **优先级设置**：高、中、低三个优先级
- 📊 **数据统计**：个人资料页面显示任务统计和完成率
- 🎨 **现代化UI**：美观的渐变设计和流畅的动画效果
- 📱 **响应式设计**：支持桌面和移动设备

## 技术栈

- **前端框架**：React 18
- **构建工具**：Vite
- **路由**：React Router v6
- **后端服务**：Supabase (PostgreSQL + 实时API)
- **部署平台**：Netlify
- **样式**：CSS3 (渐变、动画、响应式)

## 项目结构

```
├── src/
│   ├── pages/          # 页面组件
│   │   ├── TaskList.jsx    # 任务列表页面
│   │   ├── TaskForm.jsx    # 任务创建/编辑页面
│   │   └── Profile.jsx     # 个人资料页面
│   ├── lib/
│   │   └── supabase.js     # Supabase 客户端配置
│   ├── App.jsx         # 主应用组件
│   ├── main.jsx        # 应用入口
│   └── index.css       # 全局样式
├── supabase-schema.sql # 数据库表结构 SQL
├── netlify.toml        # Netlify 部署配置
└── package.json        # 项目依赖
```

## 数据库设计

项目包含 3 张数据表：

1. **users** - 用户表
   - 存储用户基本信息
   - 关联 Supabase Auth

2. **categories** - 分类表
   - 任务分类信息
   - 包含分类名称、描述和颜色

3. **tasks** - 任务表
   - 任务详细信息
   - 关联用户和分类
   - 支持优先级和完成状态

## 部署步骤

### 1. 设置 Supabase

1. 访问 [Supabase](https://supabase.com) 创建新项目
2. 在 SQL Editor 中执行 `supabase-schema.sql` 文件中的 SQL 语句
3. 在项目设置中获取以下信息：
   - Project URL
   - Anon/Public Key

### 2. 配置环境变量

在项目根目录创建 `.env` 文件（本地开发）或在 Netlify 中设置环境变量：

```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

### 3. 本地开发

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

### 4. 部署到 Netlify

#### 方法一：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 初始化项目
netlify init

# 部署
netlify deploy --prod
```

#### 方法二：通过 GitHub 连接

1. 将代码推送到 GitHub 仓库
2. 访问 [Netlify](https://netlify.com) 并登录
3. 点击 "New site from Git"
4. 选择 GitHub 仓库
5. 配置构建设置：
   - Build command: `npm run build`
   - Publish directory: `dist`
6. 添加环境变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
7. 点击 "Deploy site"

### 5. 获取部署链接

部署完成后，Netlify 会提供一个类似 `https://your-site-name.netlify.app` 的链接。

## 使用说明

1. **查看任务列表**：首页显示所有任务，支持筛选（全部/进行中/已完成）
2. **创建任务**：点击"创建任务"按钮，填写任务信息
3. **编辑任务**：在任务卡片上点击编辑图标
4. **完成任务**：勾选任务前的复选框
5. **查看统计**：访问"个人资料"页面查看任务统计和完成率

## 注意事项

- 本项目为演示项目，RLS (Row Level Security) 策略设置为允许所有操作
- 生产环境需要根据实际需求调整安全策略
- 确保 Supabase 项目已正确配置 CORS 设置

## 许可证

MIT License

