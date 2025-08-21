import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, userId, clerkUserId } = body;

    // Stripeの設定が完了するまでの仮実装
    console.log('Subscription request:', { priceId, userId, clerkUserId });

    // 仮のレスポンス
    return NextResponse.json({ 
      sessionId: 'test_session_' + Date.now(),
      url: '/success',
      message: 'Stripe integration pending' 
    });
  } catch (error) {
    console.error('Subscription error:', error);
    return NextResponse.json(
      { error: 'Failed to create subscription session' }, 
      { status: 500 }
    );
  }
}