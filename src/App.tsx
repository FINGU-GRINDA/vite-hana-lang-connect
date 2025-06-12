import AccountCard from "./components/AccountCard";
import BottomNavigation from "./components/BottomNavigation";
import Header from "./components/Header";
import ProductRecommendation from "./components/ProductRecommendation";
import QuickMenu from "./components/QuickMenu";
import { Provider } from "react-redux";
import { store } from "./store";

function App() {
  return (
    <Provider store={store}>
      <div className="min-h-screen bg-gray-50 relative">
        <Header />
        
        <main className="pb-20 min-h-screen">
          <AccountCard />
          <QuickMenu />
          <ProductRecommendation />
        </main>
        
        <BottomNavigation />
      </div>
    </Provider>
  );
}

export default App;
