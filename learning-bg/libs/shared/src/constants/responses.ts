export const ResponseMessage = {
  SUCCESS: 'Success',
  BAD_REQUEST: 'Bad Request',
  CREATED: 'Created',
  NOT_FOUND: 'Record Not Found',
  INTERNAL_SERVER_ERROR: 'Something Went Wrong',
  INVALID_FILE: 'Invalid file provided',
};

export const INTERNAL_SERVER_RESPONSE = {
  statusCode: 500,
  message: 'Internal server error',
};

export const errorResponse = (
  statusCode: number = 500,
  message: string = 'Internal Server Error',
  error: any = []
) => {
  return {
    statusCode,
    message,
    error,
    data: null,
  };
};

export const successResponse = (
  statusCode: number = 200,
  message: string = 'Success',
  data: any = {},
  pagination?: {
    count: number;
    page: number;
    limit: number;
  }
) => {
  if (pagination) {
    const { count, page, limit } = pagination;
    return {
      statusCode,
      message,
      data,
      count: count,
      pagination:
        Array.isArray(data) && count && limit
          ? {
              page,
              limit,
              totalPages: Math.ceil(count / limit),
              resultCount: data.length,
              totalResult: count,
            }
          : null,
      error: null,
    };
  } else {
    return {
      statusCode,
      message,
      data,
      error: null,
    };
  }
};
