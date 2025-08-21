import { createClient } from '@supabase/supabase-js';

// Supabase設定（環境変数のフォールバック付き）
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://msgprrphijjnunnupqdl.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im1zZ3BycnBoaWpqbnVubnVwcWRsIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NTQyNzk5MzUsImV4cCI6MjA2OTg1NTkzNX0.frPYH__uqsMHApfKh4mhTjMiC56AIDnziPGOwwqq0DE';

// エラーチェック
if (!supabaseUrl || !supabaseAnonKey) {
  console.error('Supabase configuration missing:', {
    url: !!supabaseUrl,
    key: !!supabaseAnonKey
  });
}

// Supabaseクライアントの作成
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// データベースの型定義
export type UserProfile = {
  id: string;
  clerk_user_id: string;
  email: string;
  first_name?: string;
  subscription_status: 'free' | 'pro';
  created_at: string;
  updated_at: string;
};

export type ProcessingHistory = {
  id: string;
  user_id: string;
  file_name: string;
  file_size: number;
  file_type: string;
  summary_text: string;
  flashcard_data: any;
  credits_used: number;
  created_at: string;
};

export type DailyUsage = {
  id: string;
  user_id: string;
  date: string;
  files_processed: number;
  credits_used: number;
};

export type MonthlyUsage = {
  id: string;
  user_id: string;
  month: string; // YYYY-MM format
  files_processed: number;
  credits_used: number;
};

// getOrCreateUserProfile関数
export async function getOrCreateUserProfile(clerkUserId: string, email: string, firstName?: string) {
  try {
    // 既存のプロフィールを確認
    const { data: existingProfile, error: fetchError } = await supabase
      .from('user_profiles')
      .select('*')
      .eq('clerk_user_id', clerkUserId)
      .single();

    // エラーがPGRST116（レコードなし）以外の場合はエラーを投げる
    if (fetchError && fetchError.code !== 'PGRST116') {
      console.error('Error fetching profile:', fetchError);
      throw fetchError;
    }

    if (existingProfile) {
      return { data: existingProfile, error: null };
    }

    // 新規作成
    const { data: newProfile, error: createError } = await supabase
      .from('user_profiles')
      .insert({
        clerk_user_id: clerkUserId,
        email,
        first_name: firstName || null,
        subscription_status: 'free',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })
      .select()
      .single();

    if (createError) {
      console.error('Error creating profile:', createError);
      throw createError;
    }

    return { data: newProfile, error: null };
  } catch (error) {
    console.error('Profile creation error:', error);
    return { data: null, error };
  }
}

// 日次使用量の取得・更新
export async function getDailyUsage(userId: string) {
  const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
  
  const { data, error } = await supabase
    .from('daily_usage')
    .select('*')
    .eq('user_id', userId)
    .eq('date', today)
    .single();

  if (error && error.code === 'PGRST116') {
    // レコードが存在しない場合は作成
    const { data: newData, error: createError } = await supabase
      .from('daily_usage')
      .insert({
        user_id: userId,
        date: today,
        files_processed: 0,
        credits_used: 0
      })
      .select()
      .single();
    
    return { data: newData, error: createError };
  }

  return { data, error };
}

// 月次使用量の取得・更新
export async function getMonthlyUsage(userId: string) {
  const currentMonth = new Date().toISOString().slice(0, 7); // YYYY-MM
  
  const { data, error } = await supabase
    .from('monthly_usage')
    .select('*')
    .eq('user_id', userId)
    .eq('month', currentMonth)
    .single();

  if (error && error.code === 'PGRST116') {
    // レコードが存在しない場合は作成
    const { data: newData, error: createError } = await supabase
      .from('monthly_usage')
      .insert({
        user_id: userId,
        month: currentMonth,
        files_processed: 0,
        credits_used: 0
      })
      .select()
      .single();
    
    return { data: newData, error: createError };
  }

  return { data, error };
}

// 使用量を増やす
export async function incrementUsage(userId: string, isProUser: boolean = false) {
  const today = new Date().toISOString().split('T')[0];
  const currentMonth = new Date().toISOString().slice(0, 7);

  // 日次使用量を更新（無料ユーザーのみ）
  if (!isProUser) {
    const { error: dailyError } = await supabase.rpc('increment_daily_usage', {
      p_user_id: userId,
      p_date: today
    });
    
    if (dailyError) {
      console.error('Error updating daily usage:', dailyError);
      return { error: dailyError };
    }
  }

  // 月次使用量を更新（Proユーザーのみ）
  if (isProUser) {
    const { error: monthlyError } = await supabase.rpc('increment_monthly_usage', {
      p_user_id: userId,
      p_month: currentMonth
    });
    
    if (monthlyError) {
      console.error('Error updating monthly usage:', monthlyError);
      return { error: monthlyError };
    }
  }

  return { error: null };
}

// 処理履歴を保存
export async function saveProcessingHistory(data: Omit<ProcessingHistory, 'id' | 'created_at'>) {
  const { data: result, error } = await supabase
    .from('processing_history')
    .insert(data)
    .select()
    .single();

  return { data: result, error };
}

// 処理履歴を取得
export async function getProcessingHistory(userId: string, limit: number = 10) {
  const { data, error } = await supabase
    .from('processing_history')
    .select('*')
    .eq('user_id', userId)
    .order('created_at', { ascending: false })
    .limit(limit);

  return { data, error };
}

// サブスクリプション状態を更新
export async function updateSubscriptionStatus(userId: string, status: 'free' | 'pro') {
  const { data, error } = await supabase
    .from('user_profiles')
    .update({ 
      subscription_status: status,
      updated_at: new Date().toISOString()
    })
    .eq('id', userId)
    .select()
    .single();

  return { data, error };
}