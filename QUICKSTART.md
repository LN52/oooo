# 快速开始指南

## 5 分钟快速部署

### 1. Supabase 设置（2 分钟）

1. 访问 https://supabase.com 创建项目
2. 在 SQL Editor 中执行 `supabase-schema.sql`
3. 在 Settings > API 中复制 URL 和 anon key

### 2. 本地测试（1 分钟）

```bash
# 安装依赖
npm install

# 创建 .env 文件
echo "VITE_SUPABASE_URL=你的URL" > .env
echo "VITE_SUPABASE_ANON_KEY=你的KEY" >> .env

# 启动开发服务器
npm run dev
```

### 3. Netlify 部署（2 分钟）

1. 将代码推送到 GitHub
2. 在 Netlify 中导入项目
3. 设置环境变量：
   - `VITE_SUPABASE_URL`
   - `VITE_SUPABASE_ANON_KEY`
4. 点击部署

完成！🎉

## 项目功能演示

部署完成后，你可以：

1. **任务列表页面** (`/`)
   - 查看所有任务
   - 筛选任务（全部/进行中/已完成）
   - 完成任务、编辑、删除任务

2. **创建任务页面** (`/create`)
   - 创建新任务
   - 设置标题、描述、优先级、分类

3. **个人资料页面** (`/profile`)
   - 查看任务统计
   - 查看完成率
   - 查看最近任务和分类

## 数据库表说明

项目包含 3 张表：

1. **users** - 用户信息
2. **categories** - 任务分类（已预置 5 个示例分类）
3. **tasks** - 任务数据

## 需要帮助？

查看详细文档：
- `README.md` - 项目说明
- `DEPLOYMENT.md` - 详细部署指南

