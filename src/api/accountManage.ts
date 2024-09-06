import { http } from '@/utils/http'

/**
 * 获取所有账号
 */
export const getAllAccountAPI = (): any => {
  return http.get('/newUser/selectAll')
}