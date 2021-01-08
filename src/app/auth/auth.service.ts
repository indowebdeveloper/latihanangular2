import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as authActions from '../auth/store/auth.actions';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private tokenExpTimer: any;
  constructor(private store: Store<fromRoot.AppState>) {}

  setLogoutTimer(expDuration: number) {
    this.tokenExpTimer = setTimeout(
      () => this.store.dispatch(new authActions.Logout()),
      expDuration
    );
  }

  clearLogoutTimer() {
    if (this.tokenExpTimer) {
      clearTimeout(this.tokenExpTimer);
      this.tokenExpTimer = null;
    }
  }
}
