import { LoggingService } from './logging.service';
import { AuthService } from './auth/auth.service';
import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import * as fromRoot from './store/app.reducer';
import * as AuthActions from './auth/store/auth.actions';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  constructor(
    private auth: AuthService,
    private logging: LoggingService,
    private store: Store<fromRoot.AppState>
  ) {}
  ngOnInit() {
    // this.auth.autoLogin();
    this.store.dispatch(new AuthActions.AutoLogin());
    this.logging.printLog('Hello AppComponent ngOnInit');
  }
}
