export interface IUser {
    _id?: String;
    name: string;
    lastName: string;
    email: string;
    password?: string;
    createdDate?: Date;
    updatedDate?: Date;
    deletedDate?: Date;
    status: number;
}
