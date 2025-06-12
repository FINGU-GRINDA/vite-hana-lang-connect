import AccountCard from "./components/AccountCard";
import BottomNavigation from "./components/BottomNavigation";
import Header from "./components/Header";
import ProductRecommendation from "./components/ProductRecommendation";
import QuickMenu from "./components/QuickMenu";
import { Provider } from "react-redux";
import { store } from "./store";
import { useRef, useEffect } from "react";
import { useAppSelector } from "./store/hooks";
import { useAutoTranslation } from "./hooks/useAutoTranslation";

function AppContent() {
  const targetLanguage = useAppSelector((state) => state.translation.targetLanguage);
  const appRef = useRef<HTMLDivElement>(null);
  
  // 전체 앱에 자동 번역 적용
  const { applyTranslation, removeTranslation } = useAutoTranslation({
    targetElement: appRef.current || undefined
  });

  useEffect(() => {
    // 먼저 한국어로 복원
    removeTranslation(appRef.current as Element);
    
    // 한국어가 아닌 경우 번역 적용
    if (targetLanguage !== 'ko') {
      // 약간의 딜레이를 두고 번역 적용 (DOM 복원 후)
      setTimeout(() => {
        applyTranslation(appRef.current as Element);
      }, 100);
    }
  }, [applyTranslation, removeTranslation, targetLanguage]);

  return (
    <div ref={appRef} className="min-h-screen bg-gray-50 relative">
      <Header />
      
      <main className="pb-20 min-h-screen">
        <AccountCard />
        <QuickMenu />
        <ProductRecommendation />
      </main>
      
      <BottomNavigation />
    </div>
  );
}

function App() {
  return (
    <Provider store={store}>
      <AppContent />
    </Provider>
  );
}

export default App;
