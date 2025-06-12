import React from 'react';

const ProductRecommendation: React.FC = () => {
  const products = [
    {
      id: 1,
      type: '예금',
      name: '하나 Dream 정기예금',
      rate: '3.5%',
      period: '12개월',
      description: '높은 금리의 정기예금',
      badge: '추천',
      color: 'bg-emerald-500',
      image: '💰'
    },
    {
      id: 2,
      type: '적금',
      name: '하나 젊은이 적금',
      rate: '4.0%',
      period: '36개월',
      description: '청년 전용 우대금리',
      badge: 'HOT',
      color: 'bg-blue-500',
      image: '🏦'
    },
    {
      id: 3,
      type: '투자',
      name: 'ESG 펀드',
      rate: '+12.5%',
      period: '수익률',
      description: '친환경 투자 상품',
      badge: 'NEW',
      color: 'bg-green-500',
      image: '📈'
    },
    {
      id: 4,
      type: '대출',
      name: '하나 신용대출',
      rate: '2.9%',
      period: '연 금리',
      description: '최저금리 보장',
      badge: '특가',
      color: 'bg-orange-500',
      image: '💳'
    }
  ];

  const events = [
    {
      id: 1,
      title: '신규 가입 이벤트',
      description: '하나원큐 첫 가입시 10만원 적립',
      endDate: '12.31까지',
      image: '🎁',
      color: 'bg-gradient-to-r from-pink-400 to-red-400'
    },
    {
      id: 2,
      title: '친구 추천 이벤트',
      description: '친구 추천시 5만원씩 적립',
      endDate: '상시진행',
      image: '👥',
      color: 'bg-gradient-to-r from-blue-400 to-purple-400'
    }
  ];

  return (
    <div className="px-4 pb-6">
      {/* 맞춤 상품 추천 */}
      <div className="hana-card p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-lg font-bold text-gray-800">맞춤 상품 추천</h2>
            <p className="text-sm text-gray-500 mt-1">고객님을 위한 특별한 상품</p>
          </div>
          <button className="text-emerald-500 text-sm font-medium hover:text-emerald-600">
            전체보기
          </button>
        </div>

        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="flex items-center p-4 bg-gray-50 rounded-xl hover:bg-gray-100 transition-colors cursor-pointer">
              <div className="text-3xl mr-4">{product.image}</div>
              
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-1">
                  <span className="text-xs bg-gray-200 text-gray-600 px-2 py-1 rounded-full">
                    {product.type}
                  </span>
                  <span className={`text-xs text-white px-2 py-1 rounded-full ${
                    product.badge === '추천' ? 'bg-emerald-500' :
                    product.badge === 'HOT' ? 'bg-red-500' :
                    product.badge === 'NEW' ? 'bg-blue-500' :
                    'bg-orange-500'
                  }`}>
                    {product.badge}
                  </span>
                </div>
                <h3 className="font-bold text-gray-800 mb-1">{product.name}</h3>
                <p className="text-sm text-gray-600">{product.description}</p>
              </div>
              
              <div className="text-right">
                <p className="text-lg font-bold text-emerald-600">{product.rate}</p>
                <p className="text-xs text-gray-500">{product.period}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 이벤트 & 혜택 */}
      <div className="hana-card p-6 mb-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-lg font-bold text-gray-800">이벤트 & 혜택</h2>
          <button className="text-emerald-500 text-sm font-medium hover:text-emerald-600">
            전체보기
          </button>
        </div>

        <div className="space-y-4">
          {events.map((event) => (
            <div key={event.id} className={`${event.color} text-white p-4 rounded-xl cursor-pointer hover:shadow-lg transition-shadow`}>
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <span className="text-2xl">{event.image}</span>
                  <div>
                    <h3 className="font-bold mb-1">{event.title}</h3>
                    <p className="text-sm opacity-90">{event.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-xs opacity-75">{event.endDate}</p>
                  <svg className="w-5 h-5 mt-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 금융 꿀팁 */}
      <div className="hana-card p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">금융 꿀팁</h2>
        
        <div className="space-y-3">
          <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-blue-600 text-sm">💡</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">연말정산 준비하기</h4>
              <p className="text-sm text-gray-600">세금 환급을 위한 필수 체크리스트</p>
              <span className="text-xs text-gray-400">2일 전</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-green-600 text-sm">📊</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">2024년 투자 전망</h4>
              <p className="text-sm text-gray-600">전문가가 분석한 올해 투자 트렌드</p>
              <span className="text-xs text-gray-400">1주 전</span>
            </div>
          </div>

          <div className="flex items-start space-x-3 p-3 hover:bg-gray-50 rounded-lg cursor-pointer">
            <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
              <span className="text-purple-600 text-sm">💰</span>
            </div>
            <div>
              <h4 className="font-medium text-gray-800 mb-1">자동이체 설정 꿀팁</h4>
              <p className="text-sm text-gray-600">효율적인 가계 관리 방법</p>
              <span className="text-xs text-gray-400">2주 전</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductRecommendation; 