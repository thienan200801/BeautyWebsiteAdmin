// post, patch, delete, put api calls

import axios from "axios";
import { BASE_URL } from "utils/constant";

import { getCookie } from "../utils/helper";

axios.defaults.baseURL = BASE_URL;

// cancel old request if there is new request come before old one response
let axiosRequest

// common post
export async function post(endPoint, data) {
  if (axiosRequest)
    axiosRequest.cancel()

  axiosRequest = axios.CancelToken.source()

  const token = getCookie("user");
  const url = `${endPoint}`;
  const response = await axios({
    method: "post",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { ...data },
  });
  return response;
}

//upload image
export async function uploadImage(endPoint, file) {
  if (axiosRequest)
    axiosRequest.cancel()
  axiosRequest = axios.CancelToken.source()

  const form = new FormData();
  form.append("file", file);

  const token = getCookie("user");
  const url = `${endPoint}`;
  const response = await axios({
    method: "post",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
      "Content-Type": "multipart/form-data",
    },
    data: form,
  });
  return response;
}

export async function get(endPoint, data) {
  if (axiosRequest)
    axiosRequest.cancel()

  axiosRequest = axios.CancelToken.source()

  const token = getCookie("user");
  const url = `${endPoint}`;
  const response = await axios({
    method: "get",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: { ...data },
  });
  return response;
}

export async function deleteItem(endPoint) {
  const token = getCookie("user");
  const url = `${endPoint}`;
  const response = await axios({
    method: "delete",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
  });

  return response;
}
export async function Delete(endPoint, data) {
  const token = getCookie("user");
  const url = `${endPoint}`;
  const response = await axios({
    method: "delete",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { ...data },
  });

  return response;
}
//PATCH
export async function patch(endPoint, data) {
  if (axiosRequest)
    axiosRequest.cancel()

  axiosRequest = axios.CancelToken.source()

  const token = getCookie("user");
  const url = `${endPoint}`;
  const response = await axios({
    method: "patch",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    data: { ...data },
  });
  return response;
}
//PATCH
export async function patchWithQuery(endPoint, params) {
  if (axiosRequest)
    axiosRequest.cancel()

  axiosRequest = axios.CancelToken.source()

  const token = getCookie("user");
  const url = `${endPoint}`;
  const response = await axios({
    method: "patch",
    url: url,
    headers: {
      Authorization: "Bearer " + token,
    },
    params: { ...params },
  });
  return response;
}
