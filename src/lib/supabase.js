import { createClient } from '@supabase/supabase-js'

// Supabase 配置
// 从环境变量获取配置（Netlify 部署时会自动注入）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

// 运行时检查环境变量（不在构建时检查，避免构建失败）
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Missing Supabase environment variables. Please set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY')
}

// 使用环境变量或提供默认值（仅用于开发环境）
export const supabase = createClient(
  supabaseUrl || 'https://jmsafmeyyjjtopjtfhhj.supabase.co',
  supabaseAnonKey || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptc2FmbWV5eWpqdG9wanRmaGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzAxMDQsImV4cCI6MjA3OTQwNjEwNH0.Z9frOTaYNDmrQdxi4NH7CDvaxARPsLFEelqrN_hPgTc'
)

