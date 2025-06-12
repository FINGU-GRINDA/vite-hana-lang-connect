import React from 'react';

const Header: React.FC = () => {
  const handleTranslateClick = () => {
    alert('번역 기능이 실행됩니다!');
  };

  return (
    <header className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-4 sticky top-0 z-50 shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-md">
            <span className="text-emerald-600 font-bold text-lg">H</span>
          </div>
          <div>
            <h1 className="text-xl font-bold text-white drop-shadow-sm">하나원큐</h1>
            <p className="text-xs text-emerald-100 -mt-1">Hana 1Q</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-2">
          {/* 번역 버튼 */}
          <button 
            onClick={handleTranslateClick}
            className="p-3 hover:bg-white/15 rounded-xl transition-all duration-200 hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M3 5h12M9 3v2m1.048 9.5A18.022 18.022 0 016.412 9m6.088 9h7M11 21l5-10 5 10M12.751 5C11.783 10.77 8.07 15.61 3 18.129" />
            </svg>
          </button>
          
          {/* 메뉴 */}
          <button className="p-3 hover:bg-white/15 rounded-xl transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>
      
      {/* 선택적: 하단 장식 라인 */}
      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-emerald-400 to-emerald-300 opacity-50"></div>
    </header>
  );
};

export default Header; 