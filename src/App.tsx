import AccountCard from "./components/AccountCard";
import BottomNavigation from "./components/BottomNavigation";
import Header from "./components/Header";
import ProductRecommendation from "./components/ProductRecommendation";
import QuickMenu from "./components/QuickMenu";

function App() {
  return (
    <div className="min-h-screen bg-gray-50 relative">
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

export default App;
