import { http } from '@/utils/http'


// import { put } from 'node_modules/axios/index.cjs'
//单个患者删除
export const getDeleteByIdAPI=(id:Number):any=>{
    // return http.delete('/patients/deleteById'),{
    //   params:{
    //     id
    //   }
    // }
    return http({
      url:`/patients/deleteById?id=${id}`,
      method:'delete',
      
    })
  }
  //返回总计数据
  export const getCountAPI=()=>{
    return http.get('/patients/count')
  }
  //新增患者
  export const getAddPatientAPI=(data:object)=>{
    // return http.post('/patients/save')
    return http({
      url:'/patients/save',
      method:'post',
      data
    })
  }
  

  //批量患者删除
  export const getDeleteAPI=(ids:string)=>{
    console.log(ids)
    return http.delete(`/patients/delete?ids=${ids}`)
  }
  //修改患者信息
  export const getUpdateAPI=(data:object
  )=>{
    return http({
      url:'/patients/update',
      method:'put',
      data
    })
  }

  //分页列表  &&  条件查询
  
  // export const getPatientPageAPI=(currentPage:Number,pageSize:Number):any=>{
  //   return http.post(`patients/page?currentPage={currentPage}&pageSize={pageSize}`,{
  //       currentPage,
  //       pageSize
  //   })
  // }
  export const getPatientPageAPI=(currentPage:number,pageSize:number,name?:string,madicalRecord?:string,treatmentPhase?:string,sex?:String):any=>{
    return http.post(`/patients/page?currentPage=${currentPage}&pageSize=${pageSize}`, {
      currentPage,
      pageSize,
      name,
      madicalRecord,
      treatmentPhase,
      sex
    })
  }
  
  /**
   * 下发治疗
   * @param madicalRecord 病历号
   * @param questionnaireId 问卷id序列
   * @param articleId 理论id序列
   * @param videoName 视频名称序列
   */
  export const postDistributeTreatmentAPI=(madicalRecord:string,questionnaireId:string,articleId:string,videoName:string):any=>{
    return http.post('/patients/distributeTreatment',{
      madicalRecord,
      questionnaireId,
      articleId,
      videoName
    })
  }
  //结束治疗
  export const getEndPatientAPI=(madicalRecord:string):any=>{
<<<<<<< HEAD
    // return http({
    //   url:`/patients/endTreatment?madicalRecord=${madicalRecord}`,
    //   method:'put',
    //   madicalRecord
    // })
    return http.put(`/patients/endTreatment?madicalRecord=${madicalRecord}`,{
      madicalRecord
=======
    return http({
      url:`/patients/endTreatment?madicalRecord=${madicalRecord}`,
      method:'put'
>>>>>>> 24d00d0a1975709550c7ef3030f1c022af72b591
    })
  }
  //导出治疗阶段
  export const getPatientsExportAPI=(id:number,treatmentPhase:number)=>{
    return http.get(`/patients/export?userId=${id}&treatmentPhase=${treatmentPhase}`,{
      
    })
  }
  // //导出治疗阶段全部
  // export const getPatientExportAllAPI=(userId:number)=>{
  //   return http.get(`/patients/exportAll?userId={}`,{
  //     params:{
  //       userId
  //     }
  //   })
  // }
  //治疗情况（获取问卷结果）
  export const getQuestionnaireResultAPI=(madicalRecord:string)=>{
    return http.get(`/newQuestionnaire/getQuestionnaireResult?madicalRecord=${madicalRecord}`,{
      params:{
        madicalRecord
      }
    })
  }