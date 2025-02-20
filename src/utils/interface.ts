//回复内容
export type ReplyData = {
    id: number;
    article?: {
        id: number;
        title: string;
    };
    user: {
        id: string | number;
        name: string;
        imgurl: string;
    };
    comment: string; //内容
    moment: string; //时间
    complaint?: number; //举报数
}

//文章分组
export interface SubsetData {
    id: number | string;
    name: string | number;
    value: number;
    moment?:string;
}