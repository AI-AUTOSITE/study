// src/app/components/PageLayout.tsx
import Header from './Header';
import Footer from './Footer';

interface PageLayoutProps {
  children: React.ReactNode;
  // ページごとにカスタムクラスを追加できるように
  className?: string;
  // 背景グラデーションを適用するかどうか
  useGradientBg?: boolean;
}

export default function PageLayout({ 
  children, 
  className = '', 
  useGradientBg = false 
}: PageLayoutProps) {
  return (
    <div className={`min-h-screen flex flex-col ${useGradientBg ? 'bg-gradient-to-br from-blue-50 to-indigo-100' : ''}`}>
      <Header />
      {/* メインコンテンツエリア - フッターが下部に固定されるようにflex-growを使用 */}
      <main className={`flex-grow ${className}`}>
        {children}
      </main>
      <Footer />
    </div>
  );
}