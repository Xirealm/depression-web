import { http } from '@/utils/http'

/**
 * 医生登录
 * @param username 用户名
 * @param password 密码
 */
export const postDoctorLoginAPI = (userName: string, password: string): any => {
  return http.post('/newUser/login', {
    userName,
    password
  })
}
/**
 * 患者登录
 * @param madicalRecord 病历号
 */
export const getPatientLoginAPI = (madicalRecord: string): any => {
  return http.get('/newUser/patientLogin', {
    params: {
      madicalRecord
    }
  })
}
