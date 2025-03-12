// const baseUrl = "https://api.zngg.net"
const baseUrl = "http://127.0.0.1:8001"

const errorResponse: API.BaseResponse = {
  code: 0,
  message: "",
  data: null
}

const get = async (url: string, params = {}): Promise<API.BaseResponse> => {
  try {
    const token = useCookie("token")?.value || ''
    const res = await $fetch<API.BaseResponse>(baseUrl + url, {
      headers: {
        "Authorization": token,
      },
      method: 'GET',
      params: params
    });
    return res;
  } catch (error) {
    errorResponse.message = error
    return errorResponse;
  }
}

const post = async (url: string, params = {}): Promise<API.BaseResponse> => {
  try {
    const token = useCookie("token")?.value || ''
    const res = await $fetch<API.BaseResponse>(baseUrl + url, {
      headers: {
        "Authorization": token
      },
      method: 'POST',
      body: params
    });
    return res;
  } catch (error) {
    errorResponse.message = "" + error
    return errorResponse;
  }
}

export default {get, post, baseUrl}