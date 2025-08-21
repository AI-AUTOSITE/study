import { NextRequest, NextResponse } from 'next/server';

export async function POST(request: NextRequest) {
  try {
    // Webhookのボディを取得
    const body = await request.text();
    
    // Stripe署名の検証（実装予定）
    const signature = request.headers.get('stripe-signature');
    
    console.log('Webhook received:', {
      hasSignature: !!signature,
      bodyLength: body.length
    });

    // 仮の処理（実際のWebhook処理は後で実装）
    // ここでサブスクリプションの状態更新などを行う
    
    // Stripeに成功を返す
    return NextResponse.json({ received: true });
    
  } catch (error) {
    console.error('Webhook error:', error);
    // エラーでも200を返す（Stripeが再試行しないように）
    return NextResponse.json(
      { error: 'Webhook processing failed' }, 
      { status: 200 }
    );
  }
}