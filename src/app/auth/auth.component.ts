import { PlaceholderDirective } from './../shared/placeholder/placeholder.directive';
import { AlertComponent } from './../shared/alert/alert.component';
import { Router } from '@angular/router';
import { AuthService, AuthResponseData } from './auth.service';
import { NgForm } from '@angular/forms';
import {
  Component,
  ComponentFactoryResolver,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription } from 'rxjs';

@Component({
  selector: 'app-name',
  templateUrl: './auth.component.html',
})
export class AuthComponent implements OnInit, OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;
  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub: Subscription;
  constructor(
    private auth: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {}

  ngOnInit(): void {}

  onHandleError() {
    this.error = null;
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
    let authObs: Observable<AuthResponseData> = this.isLoginMode
      ? this.auth.login(email, pass)
      : this.auth.signUp(email, pass);

    this.isLoading = true;
    authObs.subscribe(
      (resData) => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']);
      },
      (error) => {
        this.error = error;
        this.showErrorAlert(error);
        this.isLoading = false;
      }
    );

    f.reset();
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }
}
