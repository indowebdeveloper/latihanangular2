import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { FormsModule } from '@angular/forms';
import { AuthComponent } from './auth.component';
import { NgModule } from '@angular/core';

@NgModule({
  imports: [
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: 'auth', component: AuthComponent }]),
  ],
  declarations: [AuthComponent],
})
export class AuthModule {}
