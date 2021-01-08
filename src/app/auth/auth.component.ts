import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';

import { NgForm } from '@angular/forms';
import {
  Component,
  ComponentFactoryResolver,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Subscription } from 'rxjs';
import { Store } from '@ngrx/store';
import * as fromRoot from '../store/app.reducer';
import * as AuthActions from './store/auth.actions';

@Component({
  selector: 'app-name',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  storeSub: Subscription;

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  constructor(
    private componentFactoryResolver: ComponentFactoryResolver,
    private store: Store<fromRoot.AppState>
  ) {}

  ngOnInit(): void {
    this.storeSub = this.store.select('auth').subscribe((authState) => {
      this.isLoading = authState.loading;
      this.error = authState.authError;
      if (this.error) {
        this.showErrorAlert(this.error);
      }
    });
  }

  onHandleError() {
    this.store.dispatch(new AuthActions.ClearError());
  }

  private showErrorAlert(message: string) {
    const cf = this.componentFactoryResolver.resolveComponentFactory(
      AlertComponent
    ); // return a component factory
    const hostViewContainer = this.alertHost.vcr;
    hostViewContainer.clear();

    const componentRef = hostViewContainer.createComponent(cf);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe;
      hostViewContainer.clear();
    });
  }
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  submit(f: NgForm) {
    if (!f.valid) {
      return;
    }
    const email = f.value.email;
    const pass = f.value.password;
    this.error = null;

    if (this.isLoginMode) {
      // login
      this.store.dispatch(
        new AuthActions.LoginStart({ email: email, password: pass })
      );
    } else {
      // signup
      this.store.dispatch(
        new AuthActions.SignupStart({ email: email, password: pass })
      );
    }
    f.reset();
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    this.storeSub.unsubscribe();
  }
}
