import axios from "axios";
import { API_NOTIFICATION_MESSAGE, SERVICE_URL } from "../constants/config";
import { getAccessToken, getType } from "../utils/common-utils";

const API_URL = "http://localhost:8080";
const axiosInstance = axios.create({
  baseURL: API_URL,
  timeout: 10000,
  headers: {
    Accept: "application/json, form-data",
    "Content-Type": "application/json",
  },
});

// request interceptor
axiosInstance.interceptors.request.use(
  function (config) {
    if (config.TYPE.params) {
      config.params = config.TYPE.params;
    } else if (config.TYPE.query) {
      config.url = config.url + "/" + config.TYPE.query;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// response interceptor
axiosInstance.interceptors.response.use(
  function (response) {
    // stop global loader here (if have)

    return precessResponse(response);
  },
  function (error) {
    // stop global loader here (if have)

    return Promise.reject(processError(error));
  }
);

/*
 COMMON METHOD FOR ALL API's

 if response ======>>>> success
    then return {isSuccess : true, data : {object}}

 if response ======>>>> failed
    then return {isFailure : true, status : string, message : string, code : int}
*/

const precessResponse = (response) => {
  if (response?.status === 200) {
    return { isSuccess: true, data: response?.data };
  } else {
    return {
      isFailure: true,
      status: response?.status,
      message: response?.message,
      code: response?.code,
    };
  }
};

const processError = (error) => {
  if (error?.response) {
    // request made but server responded with a status other
    console.log("ERROR IN RESPONSE : ", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGE.responseFailure,
      code: error?.response?.status,
    };
  } else if (error?.request) {
    // request made but no response was received, possible client to server connectvity issue
    console.log("ERROR IN REQUEST : ", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGE.requestFailure,
      code: "",
    };
  } else {
    // something happened in setting up request that triggers an error
    console.log("ERROR IN NETWORK : ", error.toJSON());
    return {
      isError: true,
      message: API_NOTIFICATION_MESSAGE.networkFailure,
      code: "",
    };
  }
};

const API = {};

for (const [key, value] of Object.entries(SERVICE_URL)) {
  API[key] = (body, showUploadProgress, showDownloadProgress) =>
    axiosInstance({
      method: value.method,
      url: value.url,
      data: value.method === "DELETE" ? {} : body,
      responseType: value.responseType,
      headers: {
        authorization: getAccessToken(),
      },
      TYPE: getType(value, body),
      onUploadProgress: function (progressEvent) {
        if (showUploadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showUploadProgress(percentageCompleted);
        }
      },
      onDownloadProgress: function (progressEvent) {
        if (showDownloadProgress) {
          let percentageCompleted = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          showDownloadProgress(percentageCompleted);
        }
      },
    });
}

export { API };
