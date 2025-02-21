// 全局变量
import { defineStore } from 'pinia'
import { SubsetData } from '../utils/interface'

export const useSubsetStore = defineStore('subset', {
    // 其他配置...
    state: () => {
        return {
          // 所有这些属性都将自动推断出它们的类型
          count: 0,
          data:[] as SubsetData[]
        }
      },
      getters: {
        //其他
        exclude: (state) => {
            let arr= []
            let n = state.count
            //拿到所有id，计算未分组数
            for(let i = 0;i<state.data.length;i++) {
                 arr[i]=state.data[i].id
                 n = n-state.data[i].value
            }
            return { id:arr.join,name:"未分类",value:n }
        }
      },
  })