import { environment } from "../../../environments/environment";
import { ICatalog } from "../models/i-catalog.model";
import { IResponse } from "../models/i-response.response";
import { CatalogService } from "./catalog.service";
import { Observable } from "rxjs/Observable";
import { ISignIn } from "../models/i-signin.model";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { IToken } from "../models/i-token.model";
import { CrudService } from "./crud.service";
import { catchError } from "rxjs/operators/catchError";
import { HandleErrorUtils } from "../utils/handle-error.util";
import { IUser } from "../models/i-user.model";
import { BehaviorSubject } from "rxjs/BehaviorSubject";

@Injectable()
export class AuthenticationService{

    private authenticationSubject: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
    public authenticationEmitter: Observable<boolean> = this.authenticationSubject.asObservable();

    static endpoint: string = '/auth/signin';

    constructor(
        public httpClient: HttpClient) { 
    }

    public signIn(request: ISignIn): Observable<IResponse<IUser>> {
        return this.httpClient
            .post<IResponse<IUser>>(`${environment.apiUrl}${AuthenticationService.endpoint}`, request)
                .pipe(catchError(HandleErrorUtils.handleError));
    }

    public signOut(){
        localStorage.clear();
    }

    public setAuthentication() {
        /*this.authenticationSubject.next(localStorage.getItem("token") ? true : false);*/
        this.authenticationSubject.next(localStorage.getItem("user") ? true : false);
    }

    public isAuthenticated(): boolean {
        /*localStorage.getItem("token") ? true : false;*/
        return localStorage.getItem("user") ? true : false;
    }

    public getToken(): IToken {
        let token: IToken = JSON.parse(localStorage.getItem("token"));
        return token;
    }

    public setToken(token: IToken){
        localStorage.setItem("token", JSON.stringify(token));
    }

    public getUser(): IUser {
        let user: IUser = JSON.parse(localStorage.getItem("user"));
        return user;
    }

    public setUser(user: IUser){
        localStorage.setItem("user", JSON.stringify(user));
    }


}