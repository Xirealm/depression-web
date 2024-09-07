import { http } from '@/utils/http'
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

  //分页列表
  
  // export const getPatientPageAPI=(currentPage:Number,pageSize:Number):any=>{
  //   return http.post(`patients/page?currentPage={currentPage}&pageSize={pageSize}`,{
  //       currentPage,
  //       pageSize
  //   })
  // }
  export const getPatientPageAPI=(currentPage:number,pageSize:number):any=>{
    return http.post('/patients/page?currentPage=1&pageSize=5',{
      currentPage,
      pageSize,
    })
  }
  //导出治疗阶段
  export const getPatientsExportAPI=(userId:number,treatmentPhase:number)=>{
    return http.get(`/patients/export?userId={userId}&treatmentPhase={treatmentPhase}`,{
      params:{
        userId,
        treatmentPhase
      }
    })
  }
  //导出治疗阶段全部
  export const getPatientExportAllAPI=(userId:number)=>{
    return http.get(`/patients/exportAll?userId={}`,{
      params:{
        userId
      }
    })
  }