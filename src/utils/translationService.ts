// 번역 서비스 (Google Translate API 사용)
export interface TranslationCache {
  [key: string]: string;
}

class TranslationService {
  private cache: TranslationCache = {};
  private targetLanguage = 'en'; // 기본 번역 대상 언어
  private accessToken = import.meta.env.VITE_GOOGLE_TRANSLATE_ACCESS_TOKEN; // OAuth2 Access Token
  private projectId = import.meta.env.VITE_GOOGLE_PROJECT_ID; // Google Cloud Project ID

  // 대상 언어 설정 메서드 추가
  setTargetLanguage(targetLang: string): void {
    this.targetLanguage = targetLang;
    console.log('Target language set to:', targetLang);
  }

  // 현재 대상 언어 반환 메서드 추가
  getTargetLanguage(): string {
    return this.targetLanguage;
  }

  async translateText(text: string, targetLang: string = this.targetLanguage): Promise<string> {
    const cacheKey = `${text}_${targetLang}`;
    
    // 캐시에서 확인
    if (this.cache[cacheKey]) {
      return this.cache[cacheKey];
    }

    try {
      // Google Translate API 사용
      const translatedText = await this.googleTranslate(text, targetLang);
      
      // 캐시에 저장
      this.cache[cacheKey] = translatedText;
      
      return translatedText;
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Unknown error';
      const errorStack = error instanceof Error ? error.stack : '';
      
      console.error('Translation failed:', {
        originalText: text,
        targetLanguage: targetLang,
        error: errorMessage,
        stack: errorStack,
        timestamp: new Date().toISOString()
      });
      
      return text; // 번역 실패 시 원본 텍스트 반환
    }
  }

  private async googleTranslate(text: string, targetLang: string): Promise<string> {
    // Access Token이 없으면 모의 번역 사용
    if (!this.accessToken) {
      console.warn('Google Translate Access Token not found. Using mock translation.');
      return text;
    }

    try {
      // 언어 감지 API 호출
      const detectedLang = await this.detectLanguage(text);
      
      // 이미 목표 언어라면 원본 반환
      if (detectedLang === targetLang) {
        return text;
      }

      // Google Translate API 호출 (Bearer token 방식)
      const response = await fetch(
        'https://translation.googleapis.com/language/translate/v2',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'x-goog-user-project': this.projectId,
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({
            q: text,
            source: detectedLang,
            target: targetLang,
            format: 'text'
          })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        throw new Error(`Translation API error: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      if (!data?.data?.translations?.[0]?.translatedText) {
        throw new Error(`Invalid API response structure: ${JSON.stringify(data)}`);
      }
      
      const translatedText = data.data.translations[0].translatedText;
      
      return translatedText;
    } catch (error) {
      const errorDetails = {
        originalText: text,
        targetLanguage: targetLang,
        accessTokenPresent: !!this.accessToken,
        projectIdPresent: !!this.projectId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : '',
        timestamp: new Date().toISOString()
      };
      
      console.error('Google Translate API error:', errorDetails);
      
      // API 실패 시 모의 번역으로 폴백
      return text;
    }
  }

  private async detectLanguage(text: string): Promise<string> {
    if (!this.accessToken) {
      return 'auto'; // Access Token이 없으면 자동 감지
    }

    try {
      const response = await fetch(
        'https://translation.googleapis.com/language/translate/v2/detect',
        {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${this.accessToken}`,
            'x-goog-user-project': this.projectId,
            'Content-Type': 'application/json; charset=utf-8',
          },
          body: JSON.stringify({ q: text })
        }
      );

      if (!response.ok) {
        const errorText = await response.text();
        let errorData;
        try {
          errorData = JSON.parse(errorText);
        } catch {
          errorData = { message: errorText };
        }
        
        throw new Error(`Language detection API error: ${response.status} ${response.statusText}. Details: ${JSON.stringify(errorData)}`);
      }

      const data = await response.json();
      
      if (!data?.data?.detections?.[0]?.[0]?.language) {
        console.warn('Invalid language detection response structure:', data);
        return 'auto';
      }
      
      const detectedLang = data.data.detections[0][0].language;
      
      return detectedLang;
    } catch (error) {
      const errorDetails = {
        text: text,
        accessTokenPresent: !!this.accessToken,
        projectIdPresent: !!this.projectId,
        error: error instanceof Error ? error.message : String(error),
        stack: error instanceof Error ? error.stack : '',
        timestamp: new Date().toISOString()
      };
      
      console.error('Language detection error:', errorDetails);
      return 'auto'; // 감지 실패 시 자동 감지
    }
  }

  // 캐시 클리어 메서드 추가
  clearCache(): void {
    this.cache = {};
    console.log('Translation cache cleared');
  }

  // 캐시 상태 확인 메서드 (선택사항)
  getCacheSize(): number {
    return Object.keys(this.cache).length;
  }
}

export const translationService = new TranslationService(); 