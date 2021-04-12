declare type ID = string | number;
declare type StringObject = { [key: string]: string };
declare type BooleanObject = { [key: string]: boolean };
declare type NumberObject = { [key: string]: number };
declare type StringBooleanNumberObject = { [key: string]: string | boolean | number };

declare type Locales = { [key: string]: string };
declare type Language = {
  slug: string;
  label: string;
};
declare type Languages = { [key: string]: StringObject[] };

interface Routes {
  [key: string]: JSX.Element;
}

declare type WidgetParams = {
  id: string;
  token: string;
  widget: string;
  language?: string;
};

declare type ClientSettings = {
  widgetElId: string;
  token: string;
  widget: string;
  language?: string;
  theme?: string;
};
