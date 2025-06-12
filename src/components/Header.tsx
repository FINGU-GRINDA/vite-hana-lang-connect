import React from 'react';

const Header: React.FC = () => {
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
          {/* QR 스캔 */}
          <button className="p-3 hover:bg-white/15 rounded-xl transition-all duration-200 hover:scale-105">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
            </svg>
          </button>
          
          {/* 알림 */}
          <button className="p-3 hover:bg-white/15 rounded-xl transition-all duration-200 hover:scale-105 relative">
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                    d="M15 17h5l-5 5v-5zM9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-red-400 to-red-500 rounded-full text-xs flex items-center justify-center font-bold shadow-lg animate-pulse">
              3
            </span>
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