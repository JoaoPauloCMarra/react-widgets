import { DEFAULT_LANGUAGE, SupportedLanguages } from '../Constants';

const locales: { [key: string]: { [key: string]: string } } = {
  en: {
    LOADING: 'Loading',
    TITLE: 'Title',
    SUBTITLE: 'Subtitle',
    ACTION_1: 'Action 1',
    ACTION_2: 'Action 2',
  },
  sv: {},
};

class I18n {
  language = DEFAULT_LANGUAGE;

  languages: Language[] = [
    {
      slug: 'en',
      label: 'English',
    },
    {
      slug: 'sv',
      label: 'Svenska',
    },
  ];

  setLanguage(language: SupportedLanguages | string) {
    this.language = this.getLanguageCode(language);
    return this;
  }

  getLanguageCode = (language: SupportedLanguages | string) => {
    if (typeof language === 'string') {
      const index = Object.keys(SupportedLanguages).indexOf(language.toUpperCase());
      return Number(SupportedLanguages[index]) || DEFAULT_LANGUAGE;
    } else {
      return language;
    }
  };

  getLanguageFromCode = (language: SupportedLanguages): string => {
    try {
      return this.languages[language]?.slug || 'en';
    } catch (error) {
      return this.languages[DEFAULT_LANGUAGE]?.slug || 'en';
    }
  };

  t = (path: string, replaceKeys?: string[], replaceWith?: { [key: string]: string }): string => {
    const fallBackLocale = locales.en || {};
    let result = '';

    try {
      const language = this.getLanguageFromCode(this.language);
      const locale = locales[language];
      result = locale[path] || locale[path] === '' ? locale[path] : fallBackLocale[path];
      if (replaceKeys && replaceWith) {
        result = result.replace(
          new RegExp(`\\$${replaceKeys.join('\\$|\\$')}\\$`),
          (key: string): string => replaceWith[key] || '',
        );
      }
    } catch (error) {
      result = fallBackLocale && fallBackLocale[path] ? fallBackLocale[path] : '';
    }

    return result;
  };
}

export default I18n;
