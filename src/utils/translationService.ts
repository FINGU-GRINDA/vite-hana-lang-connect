// 번역 서비스 (Google Translate API 대신 임시로 모의 번역 서비스 사용)
export interface TranslationCache {
  [key: string]: string;
}

class TranslationService {
  private cache: TranslationCache = {};
  private targetLanguage = 'en'; // 기본 번역 대상 언어

  async translateText(text: string, targetLang: string = this.targetLanguage): Promise<string> {
    const cacheKey = `${text}_${targetLang}`;
    
    // 캐시에서 확인
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    try {
      // 실제 환경에서는 Google Translate API 사용
      // 현재는 모의 번역 서비스
      const translatedText = await this.mockTranslate(text, targetLang);
      
      // 캐시에 저장
      this.cache[cacheKey] = translatedText;
      
      return translatedText;
    } catch (error) {
      console.error('Translation failed:', error);
      return text; // 번역 실패 시 원본 텍스트 반환
    }
  }

  private async mockTranslate(text: string, targetLang: string): Promise<string> {
    console.log('mockTranslate', text, targetLang);
    // 실제 API 호출을 시뮬레이션하기 위한 지연
    await new Promise(resolve => setTimeout(resolve, 100));
    
    // 간단한 한-영 번역 매핑 (실제로는 Google Translate API 사용)
    const translations: { [key: string]: string } = {
      '하나원큐': 'Hana 1Q',
      '홈': 'Home',
      '조회': 'Inquiry',
      '이체': 'Transfer',
      '투자': 'Investment',
      '메뉴': 'Menu',
      '빠른메뉴': 'Quick Menu',
      '편집': 'Edit',
      '잔액': 'Balance',
      '자주 사용': 'Frequently Used',
      '다른 은행 계좌 추가': 'Add Other Bank Account',
      '적금': 'Savings',
      '김하나님께 이체': 'Transfer to Kim Hana',
      '하나카드 결제': 'Hana Card Payment',
      '자동결제 설정': 'Auto Payment Setup'
    };

    return translations[text] || text;
  }

  getCache(): TranslationCache {
    return { ...this.cache };
  }

  clearCache(): void {
    this.cache = {};
  }

  setTargetLanguage(lang: string): void {
    this.targetLanguage = lang;
  }
}

export const translationService = new TranslationService(); 