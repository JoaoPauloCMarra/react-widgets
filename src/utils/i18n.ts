import { DEFAULT_LANGUAGE, SupportedLanguages } from '../Constants';

const locales: { [key: string]: { [key: string]: string } } = {
  en: {
    loading: 'Loading',
  },
  sv: {},
};

class I18n {
  language = SupportedLanguages.EN;

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

  constructor(language?: SupportedLanguages) {
    if (language) {
      this.language = language;
    }
  }

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
