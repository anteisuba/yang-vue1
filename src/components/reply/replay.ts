import { ReplyData } from "../../utils/interface";
export type CommentProps = {
    pageSize: number;
    height: string;
}

export type ReplyProps = {
    content?: ReplyData;
    isComment: boolean;

}

export interface InformationProps {
    active: boolean;
    pageSize: number;
}