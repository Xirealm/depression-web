import { defineStore } from "pinia";

export const useStore = defineStore("knowledge", () => {
  const source1 = [
    {
      title:'评估',
      tests:[
      '抑郁症筛查量表(PHQ-9)',
      '广泛焦虑自评量表(GAD-7)',
      '自我分化水平量表',
      '成年人健康自我管理能力测评量表'
      ]
    },
    {
      title: '视频',
      tests: [
        '八总结.mov',
        '第六次.mov',
        '第六次家庭作业.mov',
        '第四次家庭作业.mov',
        '第四次1.mov',
        '第四次2.mov',
        '腹式呼吸训练.mp4',
        '蝴蝶拍.mp4',
        '渐进式肌肉放松训练.mp4',
        '七1-矫正负性自动思维验证法.mp4',
        'D七2-矫正负性自动思维去灾难化重归因.mp4',
        '三1-行为改变的重要性.mp4',
        '三2-建立愉快事件表.mp4',
        '三3-每日活动安排制定表.mp4',
        '十1-新的核心信念形成.mp4 ',
        '挑战负性自动思维.mov',
        '挑战负性自动思维.mp4',
        '挑战负性自动思维技巧.mov',
        '挑战负性自动思维技巧.mp4',
        '五1-介绍认知模型.mp4',
        '五2-识别自动思维.mp4',
        '五3-识别负性自动思维.mp4',
        '一1介绍简化认知行为疗法.mp4 ',
        '一2-抑郁知识.mp4',
        '愉快事件表具体表格.png']
    },
    {
      title: '理论学习',
      tests: [
        '1.1 认知行为治疗',
        '1.2 抑郁是可以治疗的',
        '2.1 动机激发',
        '2.2 成本效益分析',
        '3.1 行为改变的重要性',
        '4.1 任务分级',
        '5.1 认知模型',
        '5.2 自动思维概念',
        '5.3 负性自动思维',
        '6.1 负性自动思维归类',
        '6.2 挑战负性自动思维',
        '6.3 挑战负性想法的技巧',
        '7.1 矫正负性自动思维',
        '8.1 认知演练和应对卡片',
        '9.1 过去如何影响现在',
        '9.2 明确核心信念',
        '9.3 核心信念的三个方面',
        '9.4 发掘核心信念',
        '10.1 形成新的核心信念',
        '10.2 重新理解旧的核心信念',
        '11.1 处理疑虑和保留意见，享受自己的进步',
        '11.2 支持系统',
        '12.1 平衡心态，目标合理',
        '12.2 预防复发']
    }
  ]
  const answers = [
    [
      '完全不会','好几天','一半以上','几乎每天'
    ],
    [
      '从来没有','偶尔','经常','总是'
    ],
    [
      ['总是','经常','有时','偶尔','从不'],
      ['同意','比较同意','不确定','不太同意','不同意'],
      ['有信心','比较有信心','不确定','不太有信心','没有信心']
    ]
  ]
  return {
      source1,
      answers
  }
});