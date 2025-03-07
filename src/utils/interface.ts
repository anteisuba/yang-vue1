//回复内容
export type ReplyData = {
  id: number
  article?: {
    id: number
    title: string
  }
  user: {
    id: string | number
    name: string
    imgurl: string
  }
  comment: string //内容
  moment: string //时间
  complaint?: number //举报数
}

//文章分组
export interface SubsetData {
  id: number | string
  name: string | number
  value: number
  moment?: string
}

//标签
  /**
   * Represents a label item
   * @property {number|string} id - Label id
   * @property {string|number} name - Label name
   * @property {string} [moment] - Label creation time
   */
export interface LableData {
  id: number | string
  name: string | number
  moment?: string
}

//文件
export interface FileData {
  id: number
  url: string
  fileName: string
  format: string
  subsetId: number
  selected?: boolean //是否选择
}

//文章
export interface ArticleData {
  id: number
  title: string;
  subsetId?:number;
  moment:Date;
  label?:string[];
  intorduce?:string;
  cover?:string;
  views?:number;
  comment?:number;
  praise?:number;
}