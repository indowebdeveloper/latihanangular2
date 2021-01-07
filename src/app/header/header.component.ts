import { User } from './../auth/user.model';
import { AuthService } from './../auth/auth.service';
import { DataStorageService } from './../shared/data-storage.service';
import {
  Component,
  EventEmitter,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit, OnDestroy {
  private userSubscription: Subscription;
  isAuth = false;
  collapsed = true;
  constructor(private ds: DataStorageService, private auth: AuthService) {}

  ngOnInit(): void {
    this.userSubscription = this.auth.user.subscribe((user: User) => {
      this.isAuth = !!user;
      console.log(!user, !!user);
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

  logout() {
    this.auth.logout();
  }
  saveData() {
    this.ds.storeRecipes();
  }
  fetchData() {
    this.ds.fetchRecipes().subscribe();
  }
}
