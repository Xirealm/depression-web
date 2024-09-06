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
/**
 * 删除账号
 */
export const postdeleteAccountAPI = (userName:string): any => {
  return http.post('/newUser/delete', {
    userName
  })
}
/**
 * 重置密码
 */
export const postResetPasswordAPI = (userName:string,password:string): any => {
  return http.post('/newUser/updatePassword', {
    userName,
    password
  })
}
/**
 * 修改用户名
 */
export const getEditUsernameAPI = (userName:string,newUserName:string): any => {
  return http.get('/newUser/updateName', {
    params: {
      userName,
      newUserName
    }
  })
}