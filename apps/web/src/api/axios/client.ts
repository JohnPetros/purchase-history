import Axios, { type AxiosInstance, type AxiosResponse } from 'axios'

import { ApiResponse } from '@purchase-history/core/responses'
import type { IApiClient } from '@purchase-history/core/interfaces'

import { handleAxiosError } from './utils'

export const AxiosApiClient = (): IApiClient => {
  const axios = Axios.create({
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
  })

  function sendResponse<ResponseBody>(response: AxiosResponse) {
    clearParams()
    return new ApiResponse<ResponseBody>({
      body: response.data,
      statusCode: response.status,
    })
  }

  function clearParams() {
    axios.defaults.params = {}
  }

  return {
    async get<ResponseBody>(url: string) {
      try {
        const response = await axios.get(url)
        return sendResponse<ResponseBody>(response)
      } catch (error) {
        return handleAxiosError<ResponseBody>(error)
      }
    },

    async post<ResponseBody>(
      url: string,
      body: unknown,
    ): Promise<ApiResponse<ResponseBody>> {
      try {
        const response = await axios.post(url, body)
        return sendResponse(response)
      } catch (error) {
        return handleAxiosError<ResponseBody>(error)
      }
    },

    async put<ResponseBody>(
      url: string,
      body: unknown,
    ): Promise<ApiResponse<ResponseBody>> {
      try {
        const response = await axios.put(url, body)
        return sendResponse(response)
      } catch (error) {
        return handleAxiosError<ResponseBody>(error)
      }
    },

    async delete<ResponseBody>(url: string): Promise<ApiResponse<ResponseBody>> {
      try {
        const response = await axios.delete(url)
        return sendResponse(response)
      } catch (error) {
        return handleAxiosError<ResponseBody>(error)
      }
    },

    setHeader(key: string, value: string): void {
      axios.defaults.headers[key] = value
    },

    setParam(key: string, value: string): void {
      axios.defaults.params = {
        [key]: value,
        ...axios.defaults.params,
      }
    },

    setBaseUrl(url: string): void {
      axios.defaults.baseURL = url
    },
  }
}
