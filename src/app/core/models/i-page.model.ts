import { IChapter } from "./i-chapter.model";

export interface IPage {
    _id?: String;
    chapter?: IChapter;
    number: number;
    image: String;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    status: number;
}
