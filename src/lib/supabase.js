import { createClient } from '@supabase/supabase-js'

// Supabase 配置
// 从环境变量获取配置（Netlify 部署时会自动注入）
// 注意：Supabase anon key 是设计为可以在客户端使用的公开密钥
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 运行时检查环境变量
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
  // 在开发环境中提供友好的错误提示
  if (import.meta.env.DEV) {
    throw new Error('Missing Supabase environment variables. Please check your .env file or Netlify environment variables.')
  }
}

// 创建 Supabase 客户端
// 如果环境变量未设置，使用空字符串（会在运行时报错，但不会导致构建失败）
export const supabase = createClient(
  supabaseUrl || '',
  supabaseAnonKey || ''
)

