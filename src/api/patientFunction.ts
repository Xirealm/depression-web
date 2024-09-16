import { http } from '@/utils/http'

/**
 * 患者获取治疗方案
 * @param madicalRecord 病历号
 */
export const getTreatmentPlan = (madicalRecord:string): any => {
  return http.get('/getTreatmentPlan',{
    params: {
      madicalRecord
    }
  })
}

/**
 * 患者提交治疗表单
 */
export const saveNewQuestionnaire = (data:any): any => {
  return http.post('/newQuestionnaire/saveNewQuestionnaire',data)
}
/**
 * 患者提交治疗时间
 */
export const postSaveTimeAPI = (data:any): any => {
  return http.post('/newQuestionnaire/saveTime', data)
}

/**
 * 患者提交反馈
 */
export const userfeedback = (data:any): any => {
  return http.post('/newUser/feedback',data)
}