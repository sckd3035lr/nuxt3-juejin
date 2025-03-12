import httpRequest from "~/utils/request";

export const register_email_code = (params: any) => {
  return httpRequest.post('/post', params)
}