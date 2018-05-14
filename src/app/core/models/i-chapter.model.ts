import { IComic } from "./i-comic.model";

export interface IChapter {
    _id?: String;
    comic?: IComic;
    name: string;
    number: number;
    image: String;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    status: number;
}
