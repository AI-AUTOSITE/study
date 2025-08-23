// src/lib/userService.ts
import { supabase } from './supabase';
import { PRICING_PLANS, USAGE_KEYS } from './constants';

export interface UserUsage {
  filesProcessedToday: number;
  filesProcessedThisMonth: number;
  pagesProcessedThisMonth: number;
  remainingFiles: number | null; // null means unlimited
  remainingPages: number;
  canProcess: boolean;
  userPlan: keyof typeof PRICING_PLANS;
  limitations?: string[];
}

export interface ProcessingResult {
  success: boolean;
  data?: any;
  error?: string;
  partialProcessing?: boolean;
  pagesProcessed?: number;
}

export async function getUserPlan(userId: string): Promise<keyof typeof PRICING_PLANS> {
  try {
    const { data, error } = await supabase
      .from('users')
      .select('subscription_status, subscription_tier')
      .eq('clerk_user_id', userId)
      .single();
    
    if (error || !data) return 'free';
    
    if (data.subscription_status === 'active') {
      return (data.subscription_tier as keyof typeof PRICING_PLANS) || 'free';
    }
    
    return 'free';
  } catch (error) {
    console.error('Error fetching user plan:', error);
    return 'free';
  }
}

export async function getUserUsage(userId: string): Promise<UserUsage> {
  const userPlan = await getUserPlan(userId);
  const planLimits = PRICING_PLANS[userPlan].limits;
  
  try {
    // Get or create user usage record
    const { data: usageData, error } = await supabase
      .from('user_usage')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();
    
    if (error && error.code === 'PGRST116') {
      // No record exists, create one
      await initializeUserUsage(userId);
      return getDefaultUsage(userPlan);
    }
    
    // Check if we need to reset daily or monthly counters
    await resetCountersIfNeeded(userId, usageData);
    
    // Fetch updated usage data
    const { data: currentUsage } = await supabase
      .from('user_usage')
      .select('*')
      .eq('clerk_user_id', userId)
      .single();
    
    const filesProcessedToday = currentUsage?.files_processed_today || 0;
    const filesProcessedThisMonth = currentUsage?.files_processed_month || 0;
    const pagesProcessedThisMonth = currentUsage?.pages_processed_month || 0;
    
    // Calculate remaining allowances
    let remainingFiles = null;
    let canProcess = true;
    const limitations: string[] = [];
    
    // Check daily file limit (free plan only)
    if (planLimits.filesPerDay) {
      remainingFiles = planLimits.filesPerDay - filesProcessedToday;
      if (remainingFiles <= 0) {
        canProcess = false;
        limitations.push(`Daily limit reached (${planLimits.filesPerDay} files/day)`);
      }
    }
    
    // Check monthly file limit
    if (planLimits.filesPerMonth) {
      const monthlyRemaining = planLimits.filesPerMonth - filesProcessedThisMonth;
      remainingFiles = remainingFiles !== null 
        ? Math.min(remainingFiles, monthlyRemaining) 
        : monthlyRemaining;
      
      if (monthlyRemaining <= 0) {
        canProcess = false;
        limitations.push(`Monthly file limit reached (${planLimits.filesPerMonth} files/month)`);
      }
    }
    
    // Check monthly page limit
    const remainingPages = planLimits.pagesPerMonth - pagesProcessedThisMonth;
    if (remainingPages <= 0) {
      canProcess = false;
      limitations.push(`Monthly page limit reached (${planLimits.pagesPerMonth} pages/month)`);
    }
    
    return {
      filesProcessedToday,
      filesProcessedThisMonth,
      pagesProcessedThisMonth,
      remainingFiles,
      remainingPages: Math.max(0, remainingPages),
      canProcess,
      userPlan,
      limitations: limitations.length > 0 ? limitations : undefined,
    };
  } catch (error) {
    console.error('Error getting user usage:', error);
    return getDefaultUsage(userPlan);
  }
}

export async function incrementUsage(
  userId: string, 
  pageCount: number
): Promise<ProcessingResult> {
  try {
    const usage = await getUserUsage(userId);
    
    if (!usage.canProcess) {
      return {
        success: false,
        error: usage.limitations?.join(' '),
      };
    }
    
    // Determine how many pages we can actually process
    const pagesToProcess = Math.min(pageCount, usage.remainingPages);
    const partialProcessing = pagesToProcess < pageCount;
    
    // Update usage counters
    const { error } = await supabase.rpc('increment_usage', {
      p_user_id: userId,
      p_pages: pagesToProcess,
    });
    
    if (error) throw error;
    
    return {
      success: true,
      partialProcessing,
      pagesProcessed: pagesToProcess,
    };
  } catch (error) {
    console.error('Error incrementing usage:', error);
    return {
      success: false,
      error: 'Failed to update usage tracking',
    };
  }
}

async function initializeUserUsage(userId: string) {
  const today = new Date().toISOString().split('T')[0];
  
  await supabase.from('user_usage').insert({
    clerk_user_id: userId,
    files_processed_today: 0,
    files_processed_month: 0,
    pages_processed_month: 0,
    last_reset_date: today,
    last_monthly_reset: today,
  });
}

async function resetCountersIfNeeded(userId: string, usageData: any) {
  const today = new Date();
  const todayStr = today.toISOString().split('T')[0];
  const lastResetDate = new Date(usageData.last_reset_date);
  const lastMonthlyReset = new Date(usageData.last_monthly_reset);
  
  const updates: any = {};
  
  // Reset daily counter if it's a new day
  if (todayStr !== usageData.last_reset_date) {
    updates.files_processed_today = 0;
    updates.last_reset_date = todayStr;
  }
  
  // Reset monthly counters if it's a new month
  if (today.getMonth() !== lastMonthlyReset.getMonth() || 
      today.getFullYear() !== lastMonthlyReset.getFullYear()) {
    updates.files_processed_month = 0;
    updates.pages_processed_month = 0;
    updates.last_monthly_reset = todayStr;
  }
  
  if (Object.keys(updates).length > 0) {
    await supabase
      .from('user_usage')
      .update(updates)
      .eq('clerk_user_id', userId);
  }
}

function getDefaultUsage(userPlan: keyof typeof PRICING_PLANS): UserUsage {
  const planLimits = PRICING_PLANS[userPlan].limits;
  
  return {
    filesProcessedToday: 0,
    filesProcessedThisMonth: 0,
    pagesProcessedThisMonth: 0,
    remainingFiles: planLimits.filesPerDay || planLimits.filesPerMonth || null,
    remainingPages: planLimits.pagesPerMonth,
    canProcess: true,
    userPlan,
  };
}

export async function saveProcessingHistory(
  userId: string,  // clerk_user_id を直接受け取る
  fileName: string,
  fileSize: number,
  pageCount: number,
  summary: string,
  flashcards: any[],
  processingDetails: {
    model: string;
    processedChars: number;
    partialProcessing?: boolean;
    pagesProcessed?: number;
  }
) {
  try {
    const { error } = await supabase.from('processing_history').insert({
      clerk_user_id: userId,  // userId をそのまま使用
      file_name: fileName,
      file_size: fileSize,
      page_count: pageCount,
      pages_processed: processingDetails.pagesProcessed || pageCount,
      summary: summary,
      flashcards: flashcards,
      model_used: processingDetails.model,
      processed_chars: processingDetails.processedChars,
      partial_processing: processingDetails.partialProcessing || false,
      created_at: new Date().toISOString(),
    });
    
    if (error) throw error;
  } catch (error) {
    console.error('Error saving processing history:', error);
  }
}

export async function getProcessingHistory(userId: string, limit = 10) {
  try {
    const userPlan = await getUserPlan(userId);
    const planLimits = PRICING_PLANS[userPlan].limits;
    
    // Calculate date limit based on plan's history days
    let dateLimit = null;
    if (planLimits.historyDays) {
      const limitDate = new Date();
      limitDate.setDate(limitDate.getDate() - planLimits.historyDays);
      dateLimit = limitDate.toISOString();
    }
    
    let query = supabase
      .from('processing_history')
      .select('*')
      .eq('clerk_user_id', userId)
      .order('created_at', { ascending: false })
      .limit(limit);
    
    if (dateLimit) {
      query = query.gte('created_at', dateLimit);
    }
    
    const { data, error } = await query;
    
    if (error) throw error;
    
    return data || [];
  } catch (error) {
    console.error('Error fetching processing history:', error);
    return [];
  }
}