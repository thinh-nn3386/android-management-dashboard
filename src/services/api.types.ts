export type ApiErrorType = {
  status: 'error';
  error: {
    code: number;
    message: string;
  };
};

export type ApiSuccessType<T = null> = {
  status: 'success';
  data: T;
};

export type ApiResponseType<T = null> = ApiErrorType | ApiSuccessType<T>;
