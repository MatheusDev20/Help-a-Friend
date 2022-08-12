class AppResponse {
  public readonly statusCode: number

  public readonly data: any

  constructor(statusCode = 100, data: any) {
    this.statusCode = statusCode;
    this.data = data;
  }

  public formatResponse(data: any) {
    return {
      data,
    };
  }
}

export default AppResponse;
