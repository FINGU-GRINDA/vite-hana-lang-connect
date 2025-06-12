import AccountCard from "./components/AccountCard";
import BottomNavigation from "./components/BottomNavigation";
import Header from "./components/Header";
import ProductRecommendation from "./components/ProductRecommendation";
import QuickMenu from "./components/QuickMenu";
import LoadingOverlay from "./components/LoadingOverlay";
import { Provider } from "react-redux";
import { store } from "./store";
import { useRef, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "./store/hooks";
import { useAutoTranslation } from "./hooks/useAutoTranslation";
import { setLoading } from "./store/slices/translationSlice";

function AppContent() {
  const dispatch = useAppDispatch();
  const targetLanguage = useAppSelector((state) => state.translation.targetLanguage);
  const isLoading = useAppSelector((state) => state.translation.isLoading);
  const appRef = useRef<HTMLDivElement>(null);
  
  // 전체 앱에 자동 번역 적용
  const { applyTranslation, removeTranslation } = useAutoTranslation({
    targetElement: appRef.current || undefined
  });

  useEffect(() => {
    const handleTranslation = async () => {
      if (!appRef.current) return;

      // 로딩 시작
      dispatch(setLoading(true));

      try {
        // 먼저 한국어로 복원
        removeTranslation(appRef.current as Element);
        
        // 한국어가 아닌 경우 번역 적용
        if (targetLanguage !== 'ko') {
          // 약간의 딜레이를 두고 번역 적용 (DOM 복원 후)
          await new Promise(resolve => setTimeout(resolve, 100));
          await applyTranslation(appRef.current as Element);
        }
      } finally {
        // 번역 완료 후 로딩 종료 (최소 500ms 표시)
        setTimeout(() => {
          dispatch(setLoading(false));
        }, 500);
      }
    };

    handleTranslation();
  }, [applyTranslation, removeTranslation, targetLanguage, dispatch]);

  return (
    <>
      <div ref={appRef} className="min-h-screen bg-gray-50 relative">
        <Header />
        
        <main className="pb-20 min-h-screen">
          <AccountCard />
          <QuickMenu />
          <ProductRecommendation />
        </main>
        
        <BottomNavigation />
      </div>
      
      {/* 로딩 오버레이 */}
      <LoadingOverlay isVisible={isLoading} message="언어를 변경하고 있습니다..." />
    </>
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
