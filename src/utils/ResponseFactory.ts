export interface Response<T> {
  code: number;
  data: T;
  message: string;
}

export class ResponseFactory {
  public static buildSuccess<T>(
    data: T,
    code = 200,
    message = '成功'
  ): Response<T> {
    return {
      code,
      data,
      message,
    };
  }

  public static buildFail<T>(
    data: T,
    code = 400,
    message = '失败'
  ): Response<T> {
    return {
      code,
      data,
      message,
    };
  }
}
