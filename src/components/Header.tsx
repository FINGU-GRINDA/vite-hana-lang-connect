import React, { useRef, useState } from 'react';

import { useAppDispatch, useAppSelector } from '../store/hooks';
import { setTargetLanguage } from '../store/slices/translationSlice';
import { SUPPORTED_LANGUAGES, getLanguageByCode } from '../utils/languages';
import { translationService } from '../utils/translationService';

const Header: React.FC = () => {
  const dispatch = useAppDispatch();
  const targetLanguage = useAppSelector((state) => state.translation.targetLanguage);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  
  const handleLanguageSelect = (languageCode: string) => {
    dispatch(setTargetLanguage(languageCode));
    translationService.setTargetLanguage(languageCode);
    setIsDropdownOpen(false);
  };

  const currentLanguage = getLanguageByCode(targetLanguage);

  return (
    <header 
      ref={headerRef}
      className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-4 py-4 sticky top-0 z-50 shadow-lg"
    >
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
          {/* 언어 선택 드랍다운 */}
          <div className="relative">
            <button 
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="p-2 hover:bg-white/15 rounded-xl transition-all duration-200 hover:scale-105 flex items-center space-x-1"
              title="언어 선택"
            >
              <span className="text-lg">{currentLanguage?.flag || '🌐'}</span>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                      d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {/* 드랍다운 메뉴 */}
            {isDropdownOpen && (
              <div className="absolute right-0 top-full mt-2 w-64 bg-white rounded-xl shadow-lg border border-gray-200 py-2 z-60 max-h-80 overflow-y-auto">
                {SUPPORTED_LANGUAGES.map((language) => (
                  <button
                    key={language.code}
                    onClick={() => handleLanguageSelect(language.code)}
                    className={`w-full px-4 py-2 text-left hover:bg-gray-50 flex items-center space-x-3 ${
                      language.code === targetLanguage ? 'bg-emerald-50 text-emerald-600' : 'text-gray-800'
                    }`}
                  >
                    <span className="text-lg">{language.flag}</span>
                    <div className="flex-1">
                      <div className="font-medium">{language.nativeName}</div>
                      <div className="text-xs text-gray-500">{language.name}</div>
                    </div>
                    {language.code === targetLanguage && (
                      <svg className="w-4 h-4 text-emerald-600" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </button>
                ))}
              </div>
            )}
          </div>

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
      
      {/* 드랍다운 배경 클릭 시 닫기 */}
      {isDropdownOpen && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setIsDropdownOpen(false)}
        />
      )}
    </header>
  );
};

export default Header; 