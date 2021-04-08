export enum SupportedLanguages {
  EN,
  SV,
}
export const DEFAULT_LANGUAGE = SupportedLanguages.EN;

export const SUPPORTED_THEMES = ['theme1', 'theme2', 'theme3'];

export const ROOT_ELEMENT_ID = 'react-widgets-root';

const host = window.location.hostname === 'localhost' ? 'local-server-data' : 'remote-server-data';
export const API_URL = host + '/api';
