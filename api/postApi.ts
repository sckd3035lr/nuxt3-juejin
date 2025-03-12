import http from '~/api/request';

export const getList = (params: any): Promise<API.BaseResponse> => {
  return http.post("/post/page", params);
};

export const getById = (params: any): Promise<API.BaseResponse> => {
  return http.get("/post/" + params);
};
