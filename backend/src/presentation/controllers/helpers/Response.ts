class AppResponse {
  public readonly statusCode: number;

  public readonly data: any;

  constructor(data: any, statusCode = 100) {
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
