class Storage {
  set = (key: string, value: unknown, parse = false): void => {
    if (typeof window !== 'undefined') {
      if (parse && typeof value !== 'string') {
        localStorage.setItem(key, parse ? JSON.stringify(value) : String(value));
      } else {
        localStorage.setItem(key, String(value));
      }
    }
  };

  get = (key: string): string => {
    if (typeof window !== 'undefined') {
      return localStorage.getItem(key) || '';
    }
    return '';
  };

  clear = (): void => {
    if (typeof window !== 'undefined') {
      localStorage.clear();
    }
  };
}

export default Storage;
