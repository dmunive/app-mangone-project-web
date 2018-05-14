export interface IResponse<T> {
    status?: string;
    message?: string;
    stack?: string;
    data?: T;
}