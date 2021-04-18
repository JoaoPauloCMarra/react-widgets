declare type ID = string | number;
declare type StringObject = { [key: string]: string };
declare type BooleanObject = { [key: string]: boolean };
declare type NumberObject = { [key: string]: number };
declare type StringBooleanNumberObject = { [key: string]: string | boolean | number };

declare type Locales = { [key: string]: string };

interface Routes {
  [key: string]: JSX.Element;
}

declare type WidgetParams = {
  token: string;
  widget: string;
  language?: string;
};

declare type ClientSettings = {
  token: string;
  widget: string;
  language?: string;
  theme?: string;
};

declare type Post = {
  id: string;
  createdAt: string;
  authorName: string;
  authorAvatar: string;
  title: string;
  text: string;
};
