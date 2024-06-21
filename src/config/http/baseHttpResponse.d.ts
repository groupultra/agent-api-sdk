export type BASE_HTTP_RESPONSE<T = undefined> = {
  url: string;
  method: 'POST' | 'GET';
  data?: T;
  config?: {
    ignoreAuth?: boolean;
  };
};
