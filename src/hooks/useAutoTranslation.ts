import { useEffect, useCallback, useRef } from 'react';
import { useAppSelector } from '../store/hooks';
import { translationService } from '../utils/translationService';

interface AutoTranslationOptions {
  targetElement?: HTMLElement;
  excludeSelectors?: string[];
  includeSelectors?: string[];
}

export const useAutoTranslation = (options: AutoTranslationOptions = {}) => {
  const targetLanguage = useAppSelector((state) => state.translation.targetLanguage);
  const observer = useRef<MutationObserver | null>(null);
  const originalTexts = useRef<Map<Node, string>>(new Map());
  
  const {
    targetElement = options.targetElement,
    excludeSelectors = ['script', 'style', 'meta', 'link', 'svg'],
    includeSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'span', 'div', 'button', 'a', 'label']
  } = options;

  // 텍스트 노드인지 확인
  const isTextNode = (node: Node): node is Text => {
    return node.nodeType === Node.TEXT_NODE;
  };

  // 번역 가능한 텍스트인지 확인
  const isTranslatableText = (text: string): boolean => {
    const trimmedText = text.trim();
    if (!trimmedText) return false;
    if (trimmedText.length < 2) return false;
    if (/^[\d\s.,+()-]+$/.test(trimmedText)) return false; // 숫자만 있는 경우
    if (/^[a-zA-Z\s.,+()-]+$/.test(trimmedText)) return false; // 영어만 있는 경우
    return /[가-힣]/.test(trimmedText); // 한글이 포함된 경우만
  };

  // 제외할 요소인지 확인
  const shouldExcludeElement = (element: Element): boolean => {
    return excludeSelectors.some(selector => 
      element.matches?.(selector) || element.closest?.(selector)
    );
  };

  // 포함할 요소인지 확인
  const shouldIncludeElement = (element: Element): boolean => {
    return includeSelectors.some(selector => element.matches?.(selector));
  };

  // 텍스트 노드 번역
  const translateTextNode = useCallback(async (textNode: Text) => {
    if (!isTranslatableText(textNode.textContent || '')) return;
    
    const parent = textNode.parentElement;
    if (!parent || shouldExcludeElement(parent)) return;
    if (!shouldIncludeElement(parent)) return;

    // 원본 텍스트 저장
    if (!originalTexts.current.has(textNode)) {
      originalTexts.current.set(textNode, textNode.textContent || '');
    }

    try {
      const originalText = originalTexts.current.get(textNode) || textNode.textContent || '';
      const translatedText = await translationService.translateText(originalText);
      
      if (translatedText !== originalText && textNode.parentNode) {
        textNode.textContent = translatedText;
      }
    } catch (error) {
      console.error('Translation error:', error);
    }
  }, []);

  // 원본 텍스트로 복원
  const restoreTextNode = useCallback((textNode: Text) => {
    const originalText = originalTexts.current.get(textNode);
    if (originalText && textNode.parentNode) {
      textNode.textContent = originalText;
    }
  }, []);

  // DOM 트리에서 모든 텍스트 노드 찾기
  const findTextNodes = useCallback((element: Element): Text[] => {
    const textNodes: Text[] = [];
    const walker = document.createTreeWalker(
      element,
      NodeFilter.SHOW_TEXT,
      {
        acceptNode: (node: Node) => {
          const parent = node.parentElement;
          if (!parent || shouldExcludeElement(parent)) {
            return NodeFilter.FILTER_REJECT;
          }
          return NodeFilter.FILTER_ACCEPT;
        }
      }
    );

    let node;
    while ((node = walker.nextNode())) {
      if (isTextNode(node)) {
        textNodes.push(node);
      }
    }

    return textNodes;
  }, []);

  // 번역 적용
  const applyTranslation = useCallback(async (element: Element) => {
    const textNodes = findTextNodes(element);
    
    // 병렬로 번역 처리
    await Promise.all(
      textNodes.map(textNode => translateTextNode(textNode))
    );
  }, [translateTextNode, findTextNodes]);

  // 번역 해제
  const removeTranslation = useCallback((element: Element) => {
    const textNodes = findTextNodes(element);
    textNodes.forEach(textNode => restoreTextNode(textNode));
  }, [findTextNodes, restoreTextNode]);

  // MutationObserver 콜백
  const handleMutations = useCallback(async (mutations: MutationRecord[]) => {
    // 한국어가 아닌 경우에만 번역 적용
    if (targetLanguage === 'ko') return;

    for (const mutation of mutations) {
      if (mutation.type === 'childList') {
        mutation.addedNodes.forEach(async (node) => {
          if (node.nodeType === Node.ELEMENT_NODE) {
            await applyTranslation(node as Element);
          }
        });
      }
    }
  }, [targetLanguage, applyTranslation]);

  // 번역 시작/중지
  useEffect(() => {
    const element = targetElement || document.body;
    
    if (targetLanguage !== 'ko') {
      // 초기 번역 적용
      applyTranslation(element);
      
      // MutationObserver 설정
      observer.current = new MutationObserver(handleMutations);
      observer.current.observe(element, {
        childList: true,
        subtree: true
      });
    } else {
      // 번역 해제
      removeTranslation(element);
      
      // Observer 해제
      if (observer.current) {
        observer.current.disconnect();
      }
    }

    return () => {
      if (observer.current) {
        observer.current.disconnect();
      }
    };
  }, [targetLanguage, targetElement, applyTranslation, removeTranslation, handleMutations]);

  return {
    applyTranslation,
    removeTranslation,
    clearCache: translationService.clearCache.bind(translationService)
  };
}; 