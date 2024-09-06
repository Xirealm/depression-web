import { http } from '@/utils/http'

/**
 * 获取所有账号
 */
export const getAllAccountAPI = (): any => {
  return http.get('/newUser/selectAll')
}
/**
 * 新增账号
 */
export const postaddAccountAPI = (userName:string,userType:string,password:string): any => {
    return http.post('/newUser/insert', {
      userName,
      userType,
      password
    })
}