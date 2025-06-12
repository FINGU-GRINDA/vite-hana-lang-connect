import React, { useState } from 'react';

const BottomNavigation: React.FC = () => {
  const [activeTab, setActiveTab] = useState('home');

  const navigationItems = [
    {
      id: 'home',
      name: '메인',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-emerald-500' : 'text-gray-400'}`} 
             fill={active ? 'currentColor' : 'none'} 
             stroke="currentColor" 
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      )
    },
    {
      id: 'account',
      name: '조회',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-emerald-500' : 'text-gray-400'}`} 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      id: 'transfer',
      name: '이체',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-emerald-500' : 'text-gray-400'}`} 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
        </svg>
      )
    },
    {
      id: 'invest',
      name: '투자',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-emerald-500' : 'text-gray-400'}`} 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
        </svg>
      )
    },
    {
      id: 'menu',
      name: '메뉴',
      icon: (active: boolean) => (
        <svg className={`w-6 h-6 ${active ? 'text-emerald-500' : 'text-gray-400'}`} 
             fill="none" 
             stroke="currentColor" 
             viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-0 left-1/2 transform -translate-x-1/2 w-full max-w-md bg-white border-t border-gray-200 safe-area-pb">
      <div className="flex justify-around items-center py-2">
        {navigationItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center py-2 px-3 min-w-0 flex-1 ${
              activeTab === item.id ? 'text-emerald-500' : 'text-gray-400'
            } hover:text-emerald-500 transition-colors`}
          >
            <div className="mb-1">
              {item.icon(activeTab === item.id)}
            </div>
            <span className={`text-xs font-medium ${
              activeTab === item.id ? 'text-emerald-500' : 'text-gray-400'
            }`}>
              {item.name}
            </span>
            {activeTab === item.id && (
              <div className="w-1 h-1 bg-emerald-500 rounded-full mt-1"></div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default BottomNavigation; 