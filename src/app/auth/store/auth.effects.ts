import { AuthService } from './../auth.service';
import { Router } from '@angular/router';
import { environment } from './../../../environments/environment';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Actions, Effect, ofType } from '@ngrx/effects';
import * as authAction from './auth.actions';
import { switchMap, catchError, map, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../user.model';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

const handleAuth = (resData: AuthResponseData) => {
  const expDate = new Date(new Date().getTime() + +resData.expiresIn * 1000);
  const user = new User(
    resData.email,
    resData.localId,
    resData.idToken,
    expDate
  );
  localStorage.setItem('userData', JSON.stringify(user));
  return new authAction.AuthenticateSuccess({
    email: resData.email,
    userId: resData.localId,
    token: resData.idToken,
    expDate: expDate,
    redirect: true,
  });
};
const handleError = (errorRes: HttpErrorResponse) => {
  let errMsg = 'An unknown error occured !';

  if (!errorRes.error || !errorRes.error.error) {
    return errMsg;
  }
  switch (errorRes.error.error.message) {
    case 'EMAIL_EXISTS':
      errMsg = 'The email is already registered';
      break;
    case 'EMAIL_NOT_FOUND':
    case 'INVALID_PASSWORD':
      errMsg = 'The user is not registered or password is invalid!';
      break;
  }
  return new authAction.AuthenticateFail(errMsg);
};

@Injectable()
export class AuthEffects {
  private apiKey = environment.firebaseApiKey;
  @Effect()
  authLogin = this.action$.pipe(
    ofType(authAction.LOGIN_START),
    switchMap((authData: authAction.LoginStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
            this.apiKey,
          {
            email: authData.payload.email,
            password: authData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            return this.auth.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuth(resData);
          }),
          catchError((error) => {
            // ...
            return of(handleError(error)); // return new observable
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authSuccessRedirect = this.action$.pipe(
    ofType(authAction.AUTHENTICATE_SUCCESS),
    tap((authSuccessAction: authAction.AuthenticateSuccess) => {
      if (authSuccessAction.payload.redirect) {
        this.router.navigate(['/']);
      }
    })
  );

  @Effect()
  authSignUp = this.action$.pipe(
    ofType(authAction.SIGNUP_START),
    switchMap((signUpData: authAction.SignupStart) => {
      return this.http
        .post<AuthResponseData>(
          'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
            this.apiKey,
          {
            email: signUpData.payload.email,
            password: signUpData.payload.password,
            returnSecureToken: true,
          }
        )
        .pipe(
          tap((resData) => {
            return this.auth.setLogoutTimer(+resData.expiresIn * 1000);
          }),
          map((resData) => {
            return handleAuth(resData);
          }),
          catchError((error) => {
            // ...
            return of(handleError(error)); // return new observable
          })
        );
    })
  );

  @Effect({ dispatch: false })
  authLogout = this.action$.pipe(
    ofType(authAction.LOGOUT),
    tap(() => {
      localStorage.removeItem('userData');
      this.auth.clearLogoutTimer();
      this.router.navigate(['/auth']);
    })
  );

  @Effect()
  autoLogin = this.action$.pipe(
    ofType(authAction.AUTO_LOGIN),
    map(() => {
      const userData: {
        email: string;
        id: string;
        _token: string;
        _tokenExpirationDate: string;
      } = JSON.parse(localStorage.getItem('userData'));

      if (!userData) {
        return { type: 'DUMMY' };
      }

      const loadedUser = new User(
        userData.email,
        userData.id,
        userData._token,
        new Date(userData._tokenExpirationDate)
      );
      if (loadedUser.token) {
        // this.user.next(loadedUser);
        const expDuration =
          new Date(userData._tokenExpirationDate).getTime() -
          new Date().getTime();
        this.auth.setLogoutTimer(expDuration);
        return new authAction.AuthenticateSuccess({
          email: loadedUser.email,
          userId: loadedUser.id,
          token: loadedUser.token,
          expDate: new Date(userData._tokenExpirationDate),
          redirect: false,
        });
      } else {
        return new authAction.Logout();
      }
      return { type: 'DUMMY' };
    })
  );
  // $ itu adalah naming convention yang menandakan bahwa ini adalah effects
  constructor(
    private action$: Actions,
    private http: HttpClient,
    private router: Router,
    private auth: AuthService
  ) {}
}
