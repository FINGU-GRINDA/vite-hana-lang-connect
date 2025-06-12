import React from 'react';

interface LoadingOverlayProps {
  isVisible: boolean;
  message?: string;
}

const LoadingOverlay: React.FC<LoadingOverlayProps> = ({ 
  isVisible, 
  message = '번역 중...' 
}) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 bg-white bg-opacity-95 flex items-center justify-center z-[9999]">
      <div className="bg-white rounded-3xl p-10 flex flex-col items-center shadow-lg border border-gray-100">
        {/* 스피너 */}
        <div className="relative mb-8">
          <div className="w-16 h-16 border-4 border-gray-100 border-t-green-500 rounded-full animate-spin"></div>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">🌐</span>
          </div>
        </div>
        
        {/* 메시지 */}
        <p className="text-gray-800 font-semibold text-lg text-center mb-2">{message}</p>
        <p className="text-gray-500 text-sm text-center">잠시만 기다려 주세요</p>
      </div>
    </div>
  );
};

export default LoadingOverlay; 