export class PromiseFactory {
  /**
   * 主要是统一一下格式，返回error.message，然后是try、catch流程
   * @param tryFn try期间执行的函数，传入的函数参数为resolve、reject，注意🌟🌟使用resolve、reject时需要带return中断流程，不然后续代码会继续执行
   * @param finallyFn finally期间执行的函数
   * @returns Promise
   */
  public static create<T>(
    tryFn: (resolve, reject) => Promise<void>,
    finallyFn: () => Promise<void>
  ): Promise<T> {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve, reject) => {
      try {
        await tryFn(resolve, reject);
      } catch (error) {
        reject(error.message);
      } finally {
        await finallyFn();
      }
    });
  }
}
