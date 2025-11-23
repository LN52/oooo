# 部署指南

## 快速部署步骤

### 第一步：设置 Supabase 数据库

1. **创建 Supabase 项目**
   - 访问 https://supabase.com
   - 注册/登录账号
   - 点击 "New Project" 创建新项目
   - 等待项目初始化完成（约 2 分钟）

2. **执行 SQL 脚本**
   - 在 Supabase 控制台中，点击左侧菜单的 "SQL Editor"
   - 点击 "New query"
   - 复制 `supabase-schema.sql` 文件中的所有内容
   - 粘贴到 SQL Editor 中
   - 点击 "Run" 执行 SQL 语句
   - 确认所有表创建成功

3. **获取 API 密钥**
   - 在 Supabase 控制台中，点击左侧菜单的 "Settings" > "API"
   - 复制以下信息：
     - **Project URL** (例如: `https://xxxxx.supabase.co`)
     - **anon public** key (在 "Project API keys" 部分)

### 第二步：准备代码

1. **克隆或下载项目代码**
2. **安装依赖**
   ```bash
   npm install
   ```

3. **配置环境变量**
   - 创建 `.env` 文件（用于本地测试）
   - 或直接在 Netlify 中配置（推荐用于部署）

### 第三步：部署到 Netlify

#### 方法一：通过 Netlify 网站（推荐）

1. **准备代码仓库**
   - 将代码推送到 GitHub/GitLab/Bitbucket

2. **连接 Netlify**
   - 访问 https://netlify.com
   - 注册/登录账号
   - 点击 "Add new site" > "Import an existing project"
   - 选择你的代码仓库

3. **配置构建设置**
   - Build command: `npm run build`
   - Publish directory: `dist`
   - 点击 "Show advanced" 添加环境变量：
     - Key: `VITE_SUPABASE_URL`, Value: 你的 Supabase Project URL
     - Key: `VITE_SUPABASE_ANON_KEY`, Value: 你的 Supabase anon key

4. **部署**
   - 点击 "Deploy site"
   - 等待构建完成（约 1-2 分钟）

5. **获取部署链接**
   - 部署成功后，Netlify 会显示你的网站链接
   - 格式类似：`https://your-site-name.netlify.app`

#### 方法二：通过 Netlify CLI

```bash
# 安装 Netlify CLI
npm install -g netlify-cli

# 登录 Netlify
netlify login

# 在项目目录中初始化
netlify init

# 设置环境变量
netlify env:set VITE_SUPABASE_URL "your-supabase-url"
netlify env:set VITE_SUPABASE_ANON_KEY "your-anon-key"

# 部署到生产环境
netlify deploy --prod
```

### 第四步：验证部署

1. 访问 Netlify 提供的链接
2. 测试以下功能：
   - 创建任务
   - 编辑任务
   - 完成任务
   - 查看个人资料统计

## 常见问题

### Q: 部署后无法连接 Supabase？
A: 检查以下几点：
- 环境变量是否正确配置
- Supabase 项目的 API 密钥是否正确
- 浏览器控制台是否有错误信息

### Q: 如何更新网站？
A: 如果使用 Git 连接：
- 推送代码到仓库
- Netlify 会自动重新部署

如果使用 CLI：
```bash
netlify deploy --prod
```

### Q: 如何查看部署日志？
A: 在 Netlify 控制台的 "Deploys" 标签页可以查看构建日志

### Q: 如何自定义域名？
A: 在 Netlify 控制台的 "Domain settings" 中可以添加自定义域名

## 安全建议

1. **生产环境 RLS 策略**
   - 当前 SQL 脚本中的 RLS 策略允许所有操作（仅用于演示）
   - 生产环境应该根据用户身份设置更严格的策略

2. **环境变量保护**
   - 不要在代码中硬编码 API 密钥
   - 使用环境变量管理敏感信息

3. **CORS 配置**
   - 在 Supabase 项目设置中配置允许的域名
   - 添加你的 Netlify 域名到允许列表

