import { http } from '@/utils/http'

/**
 * 登录
 * @param username 用户名
 * @param password 密码
 */
export const postLoginAPI = (username: string, password: string): any => {
  return http.post('/newUser/login', {
    username,
    password
  })
}
