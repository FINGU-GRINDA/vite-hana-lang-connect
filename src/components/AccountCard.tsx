import React, { useState } from 'react';

const AccountCard: React.FC = () => {
  const [showBalance, setShowBalance] = useState(false);
  
  const accounts = [
    {
      id: 1,
      name: '하나 입출금통장',
      number: '123-456789-012',
      balance: 1250000,
      type: 'primary'
    },
    {
      id: 2,
      name: '하나 적금통장',
      number: '123-456789-013',
      balance: 850000,
      type: 'savings'
    }
  ];

  const formatBalance = (amount: number) => {
    return amount.toLocaleString('ko-KR');
  };

  return (
    <div className="px-4 py-2">
      {/* 메인 계좌 카드 */}
      <div className="p-6 mb-4 rounded-2xl shadow-lg bg-gradient-to-br from-emerald-500 to-emerald-600 text-white">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="text-lg font-bold mb-1">{accounts[0].name}</h3>
            <p className="text-sm text-emerald-100">{accounts[0].number}</p>
          </div>
          <button 
            onClick={() => setShowBalance(!showBalance)}
            className="p-2 hover:bg-white/10 rounded-lg transition-colors"
          >
            {showBalance ? (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
              </svg>
            ) : (
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
              </svg>
            )}
          </button>
        </div>
        
        <div className="mb-4">
          <p className="text-sm mb-1 text-emerald-100">잔액</p>
          <p className="text-2xl font-bold">
            {showBalance ? `${formatBalance(accounts[0].balance)}원` : '••••••••원'}
          </p>
        </div>
        
        <div className="flex space-x-3">
          <button className="flex-1 bg-white/20 hover:bg-white/30 py-3 px-4 rounded-xl font-medium transition-colors">
            이체
          </button>
          <button className="flex-1 bg-white/20 hover:bg-white/30 py-3 px-4 rounded-xl font-medium transition-colors">
            조회
          </button>
        </div>
      </div>

      {/* 추가 계좌 */}
      <div className="space-y-3">
        {accounts.slice(1).map((account) => (
          <div key={account.id} className="bg-white p-4 rounded-2xl shadow-lg border border-emerald-100">
            <div className="flex justify-between items-center">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <h4 className="font-medium text-gray-800">{account.name}</h4>
                  <span className="bg-emerald-100 text-emerald-700 text-xs px-2 py-1 rounded-full">
                    적금
                  </span>
                </div>
                <p className="text-gray-500 text-sm mb-2">{account.number}</p>
                <p className="font-bold text-gray-800">
                  {showBalance ? `${formatBalance(account.balance)}원` : '••••••••원'}
                </p>
              </div>
              <button className="text-emerald-400 hover:text-emerald-600 transition-colors">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* 계좌 추가 버튼 */}
      <button className="w-full bg-white p-4 mt-3 rounded-2xl shadow-lg border-2 border-dashed border-emerald-200 hover:border-emerald-400 hover:bg-emerald-50 transition-colors">
        <div className="flex items-center justify-center space-x-2 text-emerald-600 hover:text-emerald-700">
          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          <span className="font-medium">다른 은행 계좌 추가</span>
        </div>
      </button>
    </div>
  );
};

export default AccountCard; 