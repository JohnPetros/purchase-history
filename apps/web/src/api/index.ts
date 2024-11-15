import { AxiosApiClient } from './axios/client'
import { ProductsService, SuppliersService } from './services'

const apiClient = AxiosApiClient()

// @ts-ignore
apiClient.setBaseUrl(import.meta.env.VITE_SERVER_API_URL)

export const productsService = ProductsService(apiClient)
export const suppliersService = SuppliersService(apiClient)
