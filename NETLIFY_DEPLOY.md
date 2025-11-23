# Netlify 部署详细步骤

## 方法一：通过 Netlify 网站部署（推荐）

### 步骤 1：准备代码仓库

1. **初始化 Git 仓库**（如果还没有）
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **推送到 GitHub**
   - 在 GitHub 上创建一个新仓库
   - 将代码推送到 GitHub：
   ```bash
   git remote add origin https://github.com/你的用户名/你的仓库名.git
   git branch -M main
   git push -u origin main
   ```

### 步骤 2：在 Netlify 中部署

1. **访问 Netlify**
   - 打开 https://app.netlify.com
   - 如果没有账号，点击 "Sign up" 注册（可以用 GitHub 账号登录）

2. **导入项目**
   - 登录后，点击右上角的 "Add new site"
   - 选择 "Import an existing project"
   - 选择 "Deploy with GitHub"（或 GitLab/Bitbucket）
   - 授权 Netlify 访问你的 GitHub 账号
   - 选择你刚才创建的仓库

3. **配置构建设置**
   - Netlify 会自动检测到 `netlify.toml` 文件
   - 如果没有自动检测，手动设置：
     - **Build command**: `npm run build`
     - **Publish directory**: `dist`
   - 点击 "Show advanced" 展开高级设置

4. **添加环境变量**
   - 在 "Environment variables" 部分，点击 "New variable"
   - 添加第一个变量：
     - Key: `VITE_SUPABASE_URL`
     - Value: `https://jmsafmeyyjjtopjtfhhj.supabase.co`
   - 点击 "Add variable" 添加第二个变量：
     - Key: `VITE_SUPABASE_ANON_KEY`
     - Value: `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptc2FmbWV5eWpqdG9wanRmaGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzAxMDQsImV4cCI6MjA3OTQwNjEwNH0.Z9frOTaYNDmrQdxi4NH7CDvaxARPsLFEelqrN_hPgTc`

5. **开始部署**
   - 点击 "Deploy site" 按钮
   - 等待构建完成（通常需要 1-2 分钟）

6. **获取部署链接**
   - 部署成功后，你会看到一个绿色的 "Published" 状态
   - 你的网站链接会显示在页面顶部
   - 格式类似：`https://random-name-123456.netlify.app`
   - 点击链接即可访问你的网站

### 步骤 3：自定义域名（可选）

1. 在 Netlify 控制台中，进入你的网站
2. 点击 "Site settings" > "Domain management"
3. 可以：
   - 修改默认的 Netlify 域名
   - 添加自定义域名

---

## 方法二：通过 Netlify CLI 部署

### 步骤 1：安装 Netlify CLI

```bash
npm install -g netlify-cli
```

### 步骤 2：登录 Netlify

```bash
netlify login
```
这会打开浏览器让你登录 Netlify 账号。

### 步骤 3：初始化项目

```bash
# 在项目根目录执行
netlify init
```

按照提示选择：
- Create & configure a new site（创建新站点）
- 输入站点名称（或直接回车使用随机名称）
- 选择你的团队（如果有）

### 步骤 4：设置环境变量

```bash
netlify env:set VITE_SUPABASE_URL "https://jmsafmeyyjjtopjtfhhj.supabase.co"
netlify env:set VITE_SUPABASE_ANON_KEY "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptc2FmbWV5eWpqdG9wanRmaGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzAxMDQsImV4cCI6MjA3OTQwNjEwNH0.Z9frOTaYNDmrQdxi4NH7CDvaxARPsLFEelqrN_hPgTc"
```

### 步骤 5：部署到生产环境

```bash
netlify deploy --prod
```

### 步骤 6：获取部署链接

部署完成后，CLI 会显示你的网站链接。

---

## 部署后验证

部署完成后，请测试以下功能：

1. ✅ 访问网站首页
2. ✅ 创建新任务
3. ✅ 编辑任务
4. ✅ 完成任务
5. ✅ 查看个人资料页面
6. ✅ 检查任务统计是否正常

## 常见问题

### Q: 构建失败怎么办？
A: 
- 检查 Netlify 构建日志中的错误信息
- 确保 `package.json` 中的依赖都正确
- 确保环境变量已正确设置

### Q: 如何更新网站？
A: 
- 如果使用 Git 连接：推送新代码到 GitHub，Netlify 会自动重新部署
- 如果使用 CLI：再次运行 `netlify deploy --prod`

### Q: 如何查看部署日志？
A: 
- 在 Netlify 控制台的 "Deploys" 标签页可以查看所有部署记录和日志

### Q: 网站可以访问但无法连接数据库？
A: 
- 检查环境变量是否正确设置
- 在浏览器控制台查看是否有错误信息
- 确认 Supabase 项目的 CORS 设置允许你的 Netlify 域名

---

## 快速命令参考

```bash
# 本地构建测试
npm run build
npm run preview

# Netlify CLI 常用命令
netlify status          # 查看当前站点状态
netlify open            # 在浏览器中打开 Netlify 控制台
netlify logs            # 查看实时日志
netlify deploy          # 部署到预览环境
netlify deploy --prod   # 部署到生产环境
```

