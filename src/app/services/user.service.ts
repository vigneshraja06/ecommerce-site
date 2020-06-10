import { Injectable } from '@angular/core';
import {AuthService, GoogleLoginProvider, SocialUser} from "angularx-social-login";
import {HttpClient} from "@angular/common/http";
import {environment} from "../../environments/environment";
import {BehaviorSubject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class UserService {
  auth: boolean = false;
  private SERVER_URL = environment.serverURL;
  private user;
  authState$ = new BehaviorSubject<boolean>(this.auth);
  userState$ = new BehaviorSubject<SocialUser | ResponseModel>(null);

  constructor(private authService: AuthService,
              private httpClient: HttpClient) {
    authService.authState.subscribe((user: SocialUser) => {
      if (user !== null) {
        this.auth = true;
        this.authState$.next(this.auth);
        this.userState$.next(user);
      }
    });
  }
    //login with email and password

    loginUser(email: string, password:string) {
    this.httpClient.post(`${this.SERVER_URL}/auth/login`,  {email, password})
      .subscribe((data: ResponseModel) => {
        this.auth = data.auth;
        this.authState$.next(this.auth);
        this.userState$.next(data);
      });
    }

    //for google authentication

  googleLogin() {
    this.authService.signIn(GoogleLoginProvider.PROVIDER_ID);
  }

  logout() {
    this.authService.signOut();
    this.auth = false;
    this.authState$.next(this.auth);
  }
}


export interface ResponseModel {
  token: string;
  auth: boolean;
  email: string;
  username: string;
  fname: string;
  lname: string;
  photoUrl: string;
  userId: number;
}
