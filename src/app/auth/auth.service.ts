import { environment } from './../../environments/environment';
import { Router } from '@angular/router';
import { User } from './user.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface AuthResponseData {
  kind: string;
  idToken: string;
  email: string;
  refreshToken: string;
  expiresIn: string;
  localId: string;
  registered?: boolean;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  user = new BehaviorSubject<User>(null);
  private tokenExpTimer: any;
  private apiKey = environment.firebaseApiKey;
  constructor(private http: HttpClient, private router: Router) {}

  signUp(mail: string, pass: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=' +
          this.apiKey,
        {
          email: mail,
          password: pass,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        // kenapa handleAuth tidak dibuat seperti catchError, karena handleAuth membutuhkan akses ke variable diluar dari method nya
        // sehingga harus dibuat menjadi anonymous function seperti ini
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  login(email: string, password: string) {
    return this.http
      .post<AuthResponseData>(
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=' +
          this.apiKey,
        {
          email: email,
          password: password,
          returnSecureToken: true,
        }
      )
      .pipe(
        catchError(this.handleError),
        // kenapa handleAuth tidak dibuat seperti catchError, karena handleAuth membutuhkan akses ke variable diluar dari method nya
        // sehingga harus dibuat menjadi anonymous function seperti ini
        tap((resData) => {
          this.handleAuth(
            resData.email,
            resData.localId,
            resData.idToken,
            +resData.expiresIn
          );
        })
      );
  }

  autoLogin() {
    const userData: {
      email: string;
      id: string;
      _token: string;
      _tokenExpirationDate: string;
    } = JSON.parse(localStorage.getItem('userData'));
    if (!userData) {
      return;
    }

    const loadedUser = new User(
      userData.email,
      userData.id,
      userData._token,
      new Date(userData._tokenExpirationDate)
    );
    if (loadedUser.token) {
      this.user.next(loadedUser);
      const expDuration =
        new Date(userData._tokenExpirationDate).getTime() -
        new Date().getTime();
      this.autoLogout(expDuration);
    } else {
      this.logout();
    }
  }
  logout() {
    this.user.next(null);
    this.router.navigate(['/auth']);
    localStorage.removeItem('userData');
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
    }
    this.tokenExpTimer = null;
  }
  autoLogout(expDuration: number) {
    this.tokenExpTimer = setTimeout(() => this.logout(), expDuration);
  }
  private handleAuth(
    email: string,
    localId: string,
    idToken: string,
    expiresIn: number
  ) {
    const expDate = new Date(new Date().getTime() + +expiresIn * 1000);
    const user = new User(email, localId, idToken, expDate);
    this.user.next(user);
    this.autoLogout(expiresIn * 1000);
    localStorage.setItem('userData', JSON.stringify(user));
  }
  private handleError(errorRes: HttpErrorResponse) {
    let errMsg = 'An unknown error occured !';

    if (!errorRes.error || !errorRes.error.error) {
      return throwError(errMsg);
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
    return throwError(errMsg);
  }
}
