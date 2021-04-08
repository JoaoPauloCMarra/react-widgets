declare type ID = string | number;
declare type StringObject = { [key: string]: string };
declare type BooleanObject = { [key: string]: boolean };
declare type NumberObject = { [key: string]: number };
declare type StringBooleanNumberObject = { [key: string]: string | boolean | number };

declare type WidgetParams = {
  widget: string;
  token: string;
  language: string;
};

declare type Language = {
  slug: string;
  label: string;
};

declare type Languages = { [key: string]: StringObject[] };
