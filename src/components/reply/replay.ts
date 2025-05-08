import type { ReplyData } from '../../utils/interface'
export type CommentProps = {
  pageSize: number
  height: string
  showPagination?: boolean
}

export type ReplyProps = {
  content?: ReplyData
  isComment: boolean
}

export type InformationProps = {
  active: boolean
  pageSize: number
}
