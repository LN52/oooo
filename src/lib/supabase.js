import { createClient } from '@supabase/supabase-js'

// Supabase 配置
// 优先使用环境变量，如果没有则使用默认值（用于本地开发）
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://jmsafmeyyjjtopjtfhhj.supabase.co'
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imptc2FmbWV5eWpqdG9wanRmaGhqIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjM4MzAxMDQsImV4cCI6MjA3OTQwNjEwNH0.Z9frOTaYNDmrQdxi4NH7CDvaxARPsLFEelqrN_hPgTc'

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

