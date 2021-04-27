declare type ID = string | number;
declare type StringObject = { [key: string]: string };
declare type BooleanObject = { [key: string]: boolean };
declare type NumberObject = { [key: string]: number };
declare type StringBooleanNumberObject = { [key: string]: string | boolean | number };

type OnSubmit = GenericEventHandler<Target> | UseFormHandleSubmit<TFieldValues>;

declare type Locales = { [key: string]: string };

interface Routes {
  [key: string]: JSX.Element;
}

declare type WidgetParams = {
  token: string;
  widget: string;
  language?: string;
  height?: number | string;
  width?: number | string;
};

declare type ClientSettings = WidgetParams & {
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

declare interface DataState {
  loading: boolean;

  settings?: ClientSettings;

  locales?: Locales;
  translate: (path: string, replaceKeys?: string[], replaceWith?: { [key: string]: string }) => string;

  postsLoading?: boolean;
  posts?: Post[];
  updatePosts: () => void;
}
